/**
 * Data Validation — PROTOTYPE_DATA_CONTRACT.md §8
 *
 * Validation rules that the loader must enforce.
 * Fail loudly on every violation. Never silently repair.
 */

import { BenefitStatus, PremiumStatus } from '../types/index.js';

/**
 * Validation error with context
 */
export class ValidationError extends Error {
  constructor(planId, field, message) {
    super(`[${planId}] ${field}: ${message}`);
    this.planId = planId;
    this.field = field;
  }
}

/**
 * Validate a benefit value object
 * Rule: never a bare number
 */
export function validateBenefitValue(planId, fieldName, benefitValue) {
  if (benefitValue === null || benefitValue === undefined) {
    return; // Acceptable to omit
  }

  if (typeof benefitValue === 'number') {
    throw new ValidationError(
      planId,
      fieldName,
      `Benefit is a bare number (${benefitValue}). Contract violation: benefits must be objects with {status, amount_kobo, ...}`
    );
  }

  if (typeof benefitValue !== 'object') {
    throw new ValidationError(
      planId,
      fieldName,
      `Benefit is ${typeof benefitValue}, not an object`
    );
  }

  if (!benefitValue.status || !Object.values(BenefitStatus).includes(benefitValue.status)) {
    throw new ValidationError(
      planId,
      fieldName,
      `Missing or invalid status. Got: ${benefitValue.status}. Must be one of: ${Object.values(BenefitStatus).join(', ')}`
    );
  }
}

/**
 * Validate premium object
 * Rule: no price without status, source_url, retrieved_date
 */
export function validatePremium(planId, premium) {
  if (!premium || typeof premium !== 'object') {
    return; // Plans can have no premium
  }

  if (!premium.status) {
    throw new ValidationError(
      planId,
      'premium.status',
      'Missing status. Contract violation: every price must carry evidence state'
    );
  }

  if (!Object.values(PremiumStatus).includes(premium.status)) {
    throw new ValidationError(
      planId,
      'premium.status',
      `Invalid status: ${premium.status}. Must be one of: ${Object.values(PremiumStatus).join(', ')}`
    );
  }

  // NOT_PUBLICLY_VERIFIED cannot enter ranking
  if (premium.status === PremiumStatus.NOT_PUBLICLY_VERIFIED) {
    return; // Acceptable, but plan will be excluded
  }

  if (!premium.source_url) {
    throw new ValidationError(
      planId,
      'premium.source_url',
      'Missing source URL. Contract violation: every price must cite its source'
    );
  }

  if (!premium.retrieved_date) {
    throw new ValidationError(
      planId,
      'premium.retrieved_date',
      'Missing retrieved_date. Contract violation: every price must carry its collection date'
    );
  }

  // Validate date format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(premium.retrieved_date)) {
    throw new ValidationError(
      planId,
      'premium.retrieved_date',
      `Invalid date format: ${premium.retrieved_date}. Must be YYYY-MM-DD`
    );
  }
}

/**
 * Validate plan record
 * Rule 1: must have plan_id, hmo_id, customer_type
 * Rule 2: no benefit field is a bare number
 * Rule 3: premium carries status, source_url, retrieved_date
 * Rule 4: NOT_PUBLICLY_VERIFIED not in ranking
 * Rule 5: retail_family without lives_covered excluded
 * Rule 6: sme/corporate without min_lives excluded
 * Rule 7: NOT_COVERED / UNLIMITED / UNDISCLOSED never coerced to null
 */
export function validatePlan(plan, isSmePlan = false) {
  const { plan_id, hmo_id, customer_type } = plan;

  // Rule 1: mandatory fields
  if (!plan_id) throw new ValidationError(plan_id || 'UNKNOWN', 'plan_id', 'Missing plan_id');
  if (!hmo_id) throw new ValidationError(plan_id, 'hmo_id', 'Missing hmo_id');
  if (!customer_type) throw new ValidationError(plan_id, 'customer_type', 'Missing customer_type');

  // Rule 2: no bare numbers in benefits
  const benefitFields = [
    'overall_limit',
    'surgery_major',
    'maternity',
    'drugs',
    'dental',
    'diagnostics',
    'wellness'
  ];

  for (const field of benefitFields) {
    if (field in plan) {
      validateBenefitValue(plan_id, field, plan[field]);
    }
  }

  // Rule 3: premium validation
  validatePremium(plan_id, plan.premium);

  // Rule 4: NOT_PUBLICLY_VERIFIED cannot rank
  if (plan.premium?.status === PremiumStatus.NOT_PUBLICLY_VERIFIED) {
    // Acceptable, but will be excluded from ranking
  }

  // Rule 5: retail_family without lives_covered excluded
  if (customer_type === 'retail_family' && !plan.lives_covered) {
    throw new ValidationError(
      plan_id,
      'lives_covered',
      'Family plan without lives_covered. Rule: retail_family plans must specify coverage size or be excluded'
    );
  }

  // Rule 6: sme/corporate without min_lives excluded when matching SME
  if ((customer_type === 'sme' || customer_type === 'corporate') && !plan.min_lives && isSmePlan) {
    throw new ValidationError(
      plan_id,
      'min_lives',
      'SME/corporate plan without min_lives. Rule: SME-eligible plans must specify minimum headcount'
    );
  }

  // Rule 7: NOT_COVERED, UNLIMITED, UNDISCLOSED never null
  for (const field of benefitFields) {
    const benefit = plan[field];
    if (benefit && benefit.status) {
      if (
        benefit.status === BenefitStatus.NOT_COVERED ||
        benefit.status === BenefitStatus.UNLIMITED ||
        benefit.status === BenefitStatus.UNDISCLOSED
      ) {
        if (benefit.amount_kobo === null && benefit.status !== BenefitStatus.NOT_COVERED) {
          throw new ValidationError(
            plan_id,
            field,
            `${benefit.status} must not be coerced to null. Original state must be preserved.`
          );
        }
      }
    }
  }

  return true;
}

/**
 * Validate entire HMO
 */
export function validateHmo(hmo) {
  if (!hmo.hmo_id) throw new Error(`HMO missing hmo_id`);
  if (!hmo.hmo_name) throw new Error(`HMO ${hmo.hmo_id} missing hmo_name`);
  return true;
}

/**
 * Validation report
 */
export class ValidationReport {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.plansValidated = 0;
    this.plansValid = 0;
    this.hmosValidated = 0;
    this.hmosValid = 0;
  }

  addError(error) {
    this.errors.push(error);
  }

  addWarning(warning) {
    this.warnings.push(warning);
  }

  recordPlanValidation(isValid) {
    this.plansValidated++;
    if (isValid) this.plansValid++;
  }

  recordHmoValidation(isValid) {
    this.hmosValidated++;
    if (isValid) this.hmosValid++;
  }

  summary() {
    return {
      success: this.errors.length === 0,
      plans_validated: this.plansValidated,
      plans_valid: this.plansValid,
      hmos_validated: this.hmosValidated,
      hmos_valid: this.hmosValid,
      errors: this.errors.length,
      warnings: this.warnings.length,
      error_list: this.errors.slice(0, 20), // First 20 for brevity
      warning_list: this.warnings.slice(0, 20)
    };
  }

  print() {
    console.log('\n=== VALIDATION REPORT ===\n');
    console.log(`Plans: ${this.plansValid}/${this.plansValidated} valid`);
    console.log(`HMOs: ${this.hmosValid}/${this.hmosValidated} valid`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS (first 20):');
      this.errors.slice(0, 20).forEach((e) => console.log(`  ${e.message}`));
      if (this.errors.length > 20) {
        console.log(`  ... and ${this.errors.length - 20} more`);
      }
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (first 20):');
      this.warnings.slice(0, 20).forEach((w) => console.log(`  ${w}`));
      if (this.warnings.length > 20) {
        console.log(`  ... and ${this.warnings.length - 20} more`);
      }
    }

    console.log('\n' + (this.errors.length === 0 ? '✅ VALIDATION PASSED' : '❌ VALIDATION FAILED'));
    console.log('========================\n');
  }
}

export default {
  ValidationError,
  validateBenefitValue,
  validatePremium,
  validatePlan,
  validateHmo,
  ValidationReport
};
