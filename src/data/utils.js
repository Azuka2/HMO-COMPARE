/**
 * Data Utilities
 * Inspection, statistics, and common operations on the dataset
 */

import { BenefitStatus, PremiumStatus, CustomerType } from '../types/index.js';

/**
 * Calculate data completeness for a plan
 * Returns 0–1 ratio of populated benefit fields
 */
export function getPlanCompleteness(plan) {
  const benefitFields = [
    'overall_limit',
    'surgery_major',
    'maternity',
    'drugs',
    'dental',
    'diagnostics',
    'wellness'
  ];

  let populated = 0;
  for (const field of benefitFields) {
    const benefit = plan[field];
    if (benefit && benefit.status === BenefitStatus.KNOWN) {
      populated++;
    }
  }

  return populated / benefitFields.length;
}

/**
 * Calculate HMO data completeness
 * Average of all plans from that HMO
 */
export function getHmoCompleteness(hmo, plans) {
  const hmoPlans = plans.filter((p) => p.hmo_id === hmo.hmo_id);
  if (hmoPlans.length === 0) return 0;

  const totalCompleteness = hmoPlans.reduce((sum, plan) => sum + getPlanCompleteness(plan), 0);
  return totalCompleteness / hmoPlans.length;
}

/**
 * Determine HMO matchability based on data
 * § FULL: price + at least one benefit dimension across all plans
 * § PRICE_ONLY: price only, no benefit data
 * § EXCLUDE: no usable data
 */
export function determineHmoMatchability(hmo, plans) {
  const hmoPlans = plans.filter((p) => p.hmo_id === hmo.hmo_id);

  if (hmoPlans.length === 0) {
    return 'EXCLUDE'; // No plans
  }

  // Check if any plan has a price
  const hasPrice = hmoPlans.some((p) => p.premium && p.premium.status !== PremiumStatus.NOT_PUBLICLY_VERIFIED);

  if (!hasPrice) {
    return 'EXCLUDE'; // No pricing
  }

  // Check if any plan has a scoreable benefit
  const hasScoreableBenefit = hmoPlans.some((p) => {
    const benefitFields = ['surgery_major', 'maternity', 'overall_limit'];
    return benefitFields.some(
      (field) => p[field] && p[field].status === BenefitStatus.KNOWN
    );
  });

  if (hasScoreableBenefit) {
    return 'FULL';
  }

  return 'PRICE_ONLY';
}

/**
 * Count scoreable plans per benefit dimension
 */
export function countScoreablePlans(plans, dimension) {
  const fieldMap = {
    price: 'premium',
    surgery: 'surgery_major',
    maternity: 'maternity',
    hospital_access: 'provider_access'
  };

  const field = fieldMap[dimension];
  if (!field) return 0;

  return plans.filter((p) => {
    if (field === 'premium') {
      return p.premium && p.premium.status !== PremiumStatus.NOT_PUBLICLY_VERIFIED && p.premium.amount_kobo;
    }
    if (field === 'provider_access') {
      return p.provider_access && p.provider_access.tiers && p.provider_access.tiers.length > 0;
    }
    // Benefit field
    return p[field] && p[field].status === BenefitStatus.KNOWN;
  }).length;
}

/**
 * Get dataset statistics
 */
export function getDatasetStats(dataset) {
  const { hmos, plans } = dataset;

  const hmosByMatchability = {
    FULL: [],
    PRICE_ONLY: [],
    EXCLUDE: []
  };

  for (const hmo of hmos) {
    const matchability = determineHmoMatchability(hmo, plans);
    hmosByMatchability[matchability].push(hmo);
  }

  const plansWithPrice = plans.filter(
    (p) => p.premium && p.premium.status !== PremiumStatus.NOT_PUBLICLY_VERIFIED && p.premium.amount_kobo
  ).length;

  const plansByCustomerType = {};
  for (const customerType of Object.values(CustomerType)) {
    plansByCustomerType[customerType] = plans.filter((p) => p.customer_type === customerType).length;
  }

  const benefitCoverage = {
    price: countScoreablePlans(plans, 'price'),
    surgery: countScoreablePlans(plans, 'surgery'),
    maternity: countScoreablePlans(plans, 'maternity'),
    hospital_access: countScoreablePlans(plans, 'hospital_access')
  };

  return {
    total_plans: plans.length,
    total_hmos: hmos.length,
    hmos_full_matchable: hmosByMatchability.FULL.length,
    hmos_price_only: hmosByMatchability.PRICE_ONLY.length,
    hmos_excludable: hmosByMatchability.EXCLUDE.length,
    plans_with_price: plansWithPrice,
    plans_by_customer_type: plansByCustomerType,
    benefit_coverage: benefitCoverage,
    hmo_matchability: hmosByMatchability
  };
}

/**
 * Print dataset statistics
 */
export function printDatasetStats(dataset) {
  const stats = getDatasetStats(dataset);

  console.log('\n📊 DATASET STATISTICS\n');
  console.log(`Total Plans: ${stats.total_plans}`);
  console.log(`Total HMOs: ${stats.total_hmos}`);
  console.log(`  ✅ Fully matchable: ${stats.hmos_full_matchable}`);
  console.log(`  🟡 Price-only: ${stats.hmos_price_only}`);
  console.log(`  ❌ Excludable: ${stats.hmos_excludable}`);

  console.log(`\nPlans with pricing: ${stats.plans_with_price}/${stats.total_plans}`);

  console.log('\nBenefit Coverage (scored):');
  console.log(`  Price: ${stats.benefit_coverage.price}/${stats.total_plans}`);
  console.log(`  Surgery: ${stats.benefit_coverage.surgery}/${stats.total_plans}`);
  console.log(`  Maternity: ${stats.benefit_coverage.maternity}/${stats.total_plans}`);
  console.log(`  Hospital Access: ${stats.benefit_coverage.hospital_access}/${stats.total_plans}`);

  console.log('\nPlans by Customer Type:');
  for (const [type, count] of Object.entries(stats.plans_by_customer_type)) {
    if (count > 0) {
      console.log(`  ${type}: ${count}`);
    }
  }

  console.log('\nFully Matchable HMOs:');
  stats.hmo_matchability.FULL.forEach((hmo) => {
    const hmoPlans = dataset.plans.filter((p) => p.hmo_id === hmo.hmo_id);
    console.log(`  ${hmo.hmo_name}: ${hmoPlans.length} plans`);
  });
}

/**
 * Identify which plans would be excluded at each ranking stage
 */
export function analyzeExclusions(plans) {
  const exclusions = {
    not_publicly_verified: [],
    no_premium: [],
    retail_family_no_lives: [],
    sme_corporate_no_min_lives: []
  };

  for (const plan of plans) {
    // Stage 1: NOT_PUBLICLY_VERIFIED
    if (plan.premium?.status === PremiumStatus.NOT_PUBLICLY_VERIFIED) {
      exclusions.not_publicly_verified.push(plan.plan_id);
      continue;
    }

    // No premium
    if (!plan.premium || !plan.premium.amount_kobo) {
      exclusions.no_premium.push(plan.plan_id);
      continue;
    }

    // retail_family without lives_covered
    if (plan.customer_type === 'retail_family' && !plan.lives_covered) {
      exclusions.retail_family_no_lives.push(plan.plan_id);
      continue;
    }

    // SME/corporate without min_lives
    if (
      (plan.customer_type === 'sme' || plan.customer_type === 'corporate') &&
      !plan.min_lives
    ) {
      exclusions.sme_corporate_no_min_lives.push(plan.plan_id);
      continue;
    }
  }

  return exclusions;
}

/**
 * Print exclusion analysis
 */
export function printExclusionAnalysis(plans) {
  const exclusions = analyzeExclusions(plans);
  const totalExcluded = Object.values(exclusions).reduce((sum, arr) => sum + arr.length, 0);

  console.log(`\n⚠️  EXCLUSION ANALYSIS\n`);
  console.log(`Total excluded: ${totalExcluded}/${plans.length} plans`);
  console.log(`\nBreakdown:`);
  console.log(`  NOT_PUBLICLY_VERIFIED: ${exclusions.not_publicly_verified.length}`);
  console.log(`    ${exclusions.not_publicly_verified.slice(0, 3).join(', ')}`);
  if (exclusions.not_publicly_verified.length > 3) {
    console.log(`    ... and ${exclusions.not_publicly_verified.length - 3} more`);
  }

  console.log(`  No premium: ${exclusions.no_premium.length}`);
  console.log(`  Family plans without lives_covered: ${exclusions.retail_family_no_lives.length}`);
  console.log(`    ${exclusions.retail_family_no_lives.join(', ')}`);
  console.log(`  SME/corporate without min_lives: ${exclusions.sme_corporate_no_min_lives.length}`);
  console.log(`    ${exclusions.sme_corporate_no_min_lives.slice(0, 3).join(', ')}`);
  if (exclusions.sme_corporate_no_min_lives.length > 3) {
    console.log(`    ... and ${exclusions.sme_corporate_no_min_lives.length - 3} more`);
  }
}

export default {
  getPlanCompleteness,
  getHmoCompleteness,
  determineHmoMatchability,
  countScoreablePlans,
  getDatasetStats,
  printDatasetStats,
  analyzeExclusions,
  printExclusionAnalysis
};
