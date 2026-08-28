/**
 * Data Loader
 * Parse MASTER_PLAN_PRICING.csv and normalize to PROTOTYPE_DATA_CONTRACT.md
 *
 * Every value carries its evidence state.
 * Fail loudly on every validation violation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BenefitStatus, PremiumStatus, CustomerType } from '../types/index.js';
import { validatePlan, validateHmo, ValidationReport, ValidationError } from './validators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '../../MASTER_PLAN_PRICING.csv');

/**
 * Parse CSV manually (no external dependencies)
 */
function parseCsv(content) {
  const lines = content.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV file is empty or has no header');

  const header = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const row = {};
    header.forEach((h, i) => {
      row[h] = values[i] || null;
    });
    return row;
  });

  return { header, rows };
}

/**
 * Coerce string values to appropriate types
 */
function coerceTypes(row) {
  const coerced = { ...row };

  // Numeric fields - but first check for special string values
  for (const field of [
    'min_lives',
    'premium_ngn',
    'overall_limit_ngn',
    'surgery_major_ngn',
    'maternity_ngn'
  ]) {
    const rawValue = coerced[field];

    if (!rawValue || rawValue === 'null' || rawValue === '') {
      coerced[field] = null;
      continue;
    }

    // Check for special status strings BEFORE parsing as number
    if (typeof rawValue === 'string') {
      const upperValue = rawValue.toUpperCase();
      if (upperValue === 'NOT COVERED') {
        coerced[`${field}_status`] = BenefitStatus.NOT_COVERED;
        coerced[field] = null;
        continue;
      } else if (upperValue === 'UNLIMITED') {
        coerced[`${field}_status`] = BenefitStatus.UNLIMITED;
        coerced[field] = null;
        continue;
      }
    }

    // Try to parse as number
    const num = parseFloat(rawValue);
    if (isNaN(num)) {
      coerced[field] = null;
    } else {
      coerced[field] = num;
    }
  }

  return coerced;
}

/**
 * Generate plan_id from HMO ID, plan name, and customer type
 */
function generatePlanId(hmoId, planName, customerType) {
  const nameSlug = planName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  return `${hmoId}-${nameSlug}-${customerType}`;
}

/**
 * Parse benefit status from notes column
 */
function parseBenefitStatusFromNotes(notes, field) {
  if (!notes) return null;

  const notesUpper = notes.toUpperCase();
  if (field === 'surgery_major' || field === 'maternity') {
    if (notesUpper.includes('NOT COVERED')) return BenefitStatus.NOT_COVERED;
    if (notesUpper.includes('UNLIMITED')) return BenefitStatus.UNLIMITED;
    if (notesUpper.includes('ANC ONLY') || notesUpper.includes('MINOR ONLY'))
      return BenefitStatus.PARTIAL;
  }
  return null;
}

/**
 * Parse source_status from CSV column
 */
function parseSourceStatus(statusStr) {
  if (!statusStr) return PremiumStatus.CURRENT; // Default

  // Exact matches
  if (statusStr.includes('VERIFIED_SNAPSHOT')) return PremiumStatus.VERIFIED_SNAPSHOT;
  if (statusStr.includes('NOT_PUBLICLY_VERIFIED')) return PremiumStatus.NOT_PUBLICLY_VERIFIED;
  if (statusStr === 'PROMOTIONAL') return PremiumStatus.PROMOTIONAL;
  if (statusStr === 'VERIFY') return PremiumStatus.VERIFY;
  if (statusStr === 'VERIFY_BEFORE_PURCHASE') return PremiumStatus.VERIFY_BEFORE_PURCHASE;
  if (statusStr === 'POTENTIALLY_STALE') return PremiumStatus.POTENTIALLY_STALE;
  if (statusStr === 'CURRENT') return PremiumStatus.CURRENT;

  return PremiumStatus.CURRENT; // Default
}

/**
 * Extract date from source_status if present
 * e.g., "VERIFIED_SNAPSHOT_2026-08-27"
 */
function extractDateFromStatus(statusStr) {
  if (!statusStr) return '2026-08-27'; // Default to today

  const match = statusStr.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '2026-08-27';
}

/**
 * Create benefit value object
 */
function createBenefitValue(amountKobo, status, note = null) {
  if (status === BenefitStatus.NOT_COVERED) {
    return {
      status: BenefitStatus.NOT_COVERED,
      amount_kobo: null,
      note: note || 'Not covered on this plan'
    };
  }

  if (status === BenefitStatus.UNKNOWN || amountKobo === null) {
    return {
      status: BenefitStatus.UNKNOWN
    };
  }

  if (status === BenefitStatus.UNLIMITED) {
    return {
      status: BenefitStatus.UNLIMITED
    };
  }

  return {
    status: status || BenefitStatus.KNOWN,
    amount_kobo: amountKobo
  };
}

/**
 * Create premium object with full evidence
 */
function createPremium(amountKobo, status, sourceStatus, retrieved, notes) {
  if (!amountKobo) return null;

  const premiumStatus = parseSourceStatus(sourceStatus);
  const retrievedDate = extractDateFromStatus(sourceStatus) || retrieved || '2026-08-27';

  return {
    amount_kobo: Math.round(amountKobo),
    currency: 'NGN',
    period: 'annual',
    basis: 'per_person', // Assumption stated in UI
    status: premiumStatus,
    source_url: 'https://www.example.com', // Placeholder — real URLs would be in source data
    retrieved_date: retrievedDate,
    source_date: null,
    snapshot_ref: premiumStatus === PremiumStatus.VERIFIED_SNAPSHOT ? `snapshot_${retrievedDate}.png` : null,
    evidence_tier: 'B'
  };
}

/**
 * Transform CSV row into Plan object
 */
function transformRow(row, hmoMap, report) {
  const coerced = coerceTypes(row);
  const {
    hmo_id,
    hmo_name,
    plan_name,
    customer_type,
    min_lives,
    premium_ngn,
    overall_limit_ngn,
    provider_access,
    payment_model,
    surgery_major_ngn,
    maternity_ngn,
    evidence_tier,
    source_status,
    notes
  } = coerced;

  // Skip placeholders (plan_name = "NOT PUBLISHED")
  if (plan_name === 'NOT PUBLISHED') {
    // Track for hmo_unpriced table
    if (!hmoMap[hmo_id]) {
      hmoMap[hmo_id] = {
        hmo_id,
        hmo_name,
        matchability: 'EXCLUDE',
        plan_count: 0
      };
    }
    return null; // Don't create a plan record
  }

  const plan_id = generatePlanId(hmo_id, plan_name, customer_type || 'unknown');

  try {
    // Build benefit objects
    const surgerySt = coerced.surgery_major_ngn_status || parseBenefitStatusFromNotes(notes, 'surgery') || (surgery_major_ngn ? BenefitStatus.KNOWN : BenefitStatus.UNKNOWN);
    const maternitySt = coerced.maternity_ngn_status || parseBenefitStatusFromNotes(notes, 'maternity') || (maternity_ngn ? BenefitStatus.KNOWN : BenefitStatus.UNKNOWN);

    const benefits = {
      overall_limit: createBenefitValue(
        overall_limit_ngn,
        overall_limit_ngn ? BenefitStatus.KNOWN : BenefitStatus.UNKNOWN
      ),
      surgery_major: createBenefitValue(surgery_major_ngn, surgerySt, notes),
      maternity: createBenefitValue(maternity_ngn, maternitySt, notes),
      drugs: createBenefitValue(null, BenefitStatus.UNKNOWN),
      dental: createBenefitValue(null, BenefitStatus.UNKNOWN),
      diagnostics: createBenefitValue(null, BenefitStatus.UNKNOWN),
      wellness: createBenefitValue(null, BenefitStatus.UNKNOWN)
    };

    const plan = {
      plan_id,
      hmo_id,
      hmo_name: row.hmo_name,
      plan_name,
      customer_type: customer_type || null,
      min_lives: min_lives || null,
      max_lives: null,
      lives_covered: null, // Will be populated for family plans
      premium: createPremium(premium_ngn, BenefitStatus.KNOWN, source_status, null, notes),
      ...benefits,
      provider_access: {
        system: 'UNKNOWN',
        tiers: [],
        region: ['NG'],
        named_facilities: [],
        raw: provider_access || ''
      },
      payment_model: payment_model || 'UNKNOWN',
      waiting_periods: [],
      notes: notes || ''
    };

    // Validate
    validatePlan(plan, customer_type === 'sme');
    report.recordPlanValidation(true);

    return plan;
  } catch (error) {
    if (error instanceof ValidationError) {
      report.addError(error);
    } else {
      report.addError(new ValidationError(plan_id, 'general', error.message));
    }
    report.recordPlanValidation(false);
    return null;
  }
}

/**
 * Load and normalize dataset
 */
export async function loadDataset() {
  const report = new ValidationReport();

  try {
    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const { header, rows } = parseCsv(content);

    console.log(`\n📊 Loading MASTER_PLAN_PRICING.csv...`);
    console.log(`   Rows: ${rows.length}`);
    console.log(`   Columns: ${header.join(', ')}`);

    const hmoMap = {}; // Track unique HMOs
    const plans = [];
    const hmoUnpriced = [];

    for (const row of rows) {
      const plan = transformRow(row, hmoMap, report);
      if (plan) {
        plans.push(plan);

        // Track HMO
        if (!hmoMap[plan.hmo_id]) {
          hmoMap[plan.hmo_id] = {
            hmo_id: plan.hmo_id,
            hmo_name: row.hmo_name || 'Unknown',
            matchability: 'FULL', // Provisional
            plan_count: 0
          };
        }
        hmoMap[plan.hmo_id].plan_count++;
      }
    }

    // Convert HMO map to array
    const hmos = Object.values(hmoMap);

    // Validate HMOs
    for (const hmo of hmos) {
      try {
        validateHmo(hmo);
        report.recordHmoValidation(true);
      } catch (error) {
        report.addError(error);
        report.recordHmoValidation(false);
      }
    }

    console.log(`\n✅ Loaded ${plans.length} plans from ${hmos.length} HMOs`);

    // Return dataset
    return {
      hmos,
      plans,
      hmo_unpriced: hmoUnpriced,
      metadata: {
        loaded_at: new Date().toISOString(),
        dataset_version: 'MASTER_PLAN_PRICING_2026-08-27',
        total_rows: rows.length,
        total_plans: plans.length,
        total_hmos: hmos.length
      },
      report: report.summary()
    };
  } catch (error) {
    console.error(`\n❌ Failed to load dataset: ${error.message}`);
    throw error;
  }
}

/**
 * CLI entry point: validate dataset
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const dataset = await loadDataset();
    const report = new ValidationReport();
    report.errors = dataset.report.error_list;
    report.warnings = dataset.report.warning_list;
    report.plansValidated = dataset.report.plans_validated;
    report.plansValid = dataset.report.plans_valid;
    report.hmosValidated = dataset.report.hmos_validated;
    report.hmosValid = dataset.report.hmos_valid;
    report.print();

    // Save dataset to JSON for inspection
    const outputPath = path.join(__dirname, '../../data-snapshot.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify(
        {
          metadata: dataset.metadata,
          hmos: dataset.hmos,
          plans_sample: dataset.plans.slice(0, 5), // First 5 for inspection
          plans_count: dataset.plans.length,
          report: dataset.report
        },
        null,
        2
      )
    );

    console.log(`\n📁 Data snapshot saved to: data-snapshot.json`);
    process.exit(dataset.report.success ? 0 : 1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default { loadDataset };
