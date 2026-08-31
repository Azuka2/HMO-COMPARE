/**
 * HMO Blueprint Nigeria — Type Definitions
 * Phase 1 Data Contract
 *
 * Core entities and value objects following PROTOTYPE_DATA_CONTRACT.md
 */

/**
 * Benefit Status Enum
 * Every benefit carries its evidence state.
 * § KNOWN: Amount published, scored normally
 * § NOT_COVERED: Explicitly excluded, hard-exclusion if critical
 * § PARTIAL: Sub-scope only, scored at stated scope + flagged
 * § UNDISCLOSED: Covered but amount withheld, not scored, confidence penalty
 * § UNLIMITED: Claimed unlimited, not scored, triggers Farce Detector
 * § UNKNOWN: Absent from our data, excluded from dimension, confidence penalty
 */
export const BenefitStatus = {
  KNOWN: 'KNOWN',
  NOT_COVERED: 'NOT_COVERED',
  PARTIAL: 'PARTIAL',
  UNDISCLOSED: 'UNDISCLOSED',
  UNLIMITED: 'UNLIMITED',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Premium Status Enum (Price evidence tier)
 * § VERIFIED_SNAPSHOT: Dated screenshot exists, ✅ full weight
 * § CURRENT: From official page, ✅ full weight
 * § VERIFY: Sources differ, 🟡 −10% confidence
 * § VERIFY_BEFORE_PURCHASE: Source doc dated Sept 2025, 🟡 −20% confidence
 * § PROMOTIONAL: Sale price, flag, −25%
 * § POTENTIALLY_STALE: Page last modified Feb 2025, −40%
 * § NOT_PUBLICLY_VERIFIED: ❌ never ranked
 * § POTENTIAL_CONFLICT: Sources disagree, ❌ never ranked
 */
export const PremiumStatus = {
  VERIFIED_SNAPSHOT: 'VERIFIED_SNAPSHOT',
  CURRENT: 'CURRENT',
  VERIFY: 'VERIFY',
  VERIFY_BEFORE_PURCHASE: 'VERIFY_BEFORE_PURCHASE',
  PROMOTIONAL: 'PROMOTIONAL',
  POTENTIALLY_STALE: 'POTENTIALLY_STALE',
  NOT_PUBLICLY_VERIFIED: 'NOT_PUBLICLY_VERIFIED',
  POTENTIAL_CONFLICT: 'POTENTIAL_CONFLICT'
};

/**
 * HMO Matchability
 * § FULL: price + at least one benefit dimension → enters ranking
 * § PRICE_ONLY: price only → comparison only, rarely top 3
 * § EXCLUDE: no usable data → "couldn't compare" panel only
 */
export const HmoMatchability = {
  FULL: 'FULL',
  PRICE_ONLY: 'PRICE_ONLY',
  EXCLUDE: 'EXCLUDE'
};

/**
 * Customer Type
 */
export const CustomerType = {
  RETAIL_INDIVIDUAL: 'retail_individual',
  RETAIL_FAMILY: 'retail_family',
  RETAIL_SENIOR: 'retail_senior',
  CORPORATE: 'corporate',
  SME: 'sme',
  DIASPORA: 'diaspora'
};

/**
 * Product Type
 * § FULL_HMO: Hospital-based health insurance with provider access
 * § TELEMEDICINE: Virtual/online consultations only, no hospital access
 * § QUOTE_REQUIRED: Premium not publicly published, requires quote
 * § NOT_PUBLISHED: Product exists but details not publicly available
 * § OTHER: Classification unclear or data incomplete
 */
export const ProductType = {
  FULL_HMO: 'full_hmo',
  TELEMEDICINE: 'telemedicine',
  QUOTE_REQUIRED: 'quote_required',
  NOT_PUBLISHED: 'not_published',
  OTHER: 'other'
};

/**
 * Evidence Tier
 * § A: Independent third-party verification (none currently)
 * § B: Official company sources
 * § FIRST_PARTY: Non-public, first-party data (flagged separately)
 */
export const EvidenceTier = {
  A: 'A',
  B: 'B',
  FIRST_PARTY: 'FIRST_PARTY'
};

/**
 * Provider Access System Type
 */
export const ProviderAccessSystem = {
  CATEGORY: 'CATEGORY',
  TIER: 'TIER',
  BAND: 'BAND',
  LIST: 'LIST',
  UNLIMITED: 'UNLIMITED',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Payment Model
 */
export const PaymentModel = {
  CAPITATION: 'CAPITATION',
  FEE_FOR_SERVICE: 'FEE_FOR_SERVICE',
  HYBRID: 'HYBRID',
  UNKNOWN: 'UNKNOWN'
};

/**
 * Benefit Value Object
 * Contract: every benefit is an object, never a scalar
 *
 * @typedef {Object} BenefitValue
 * @property {string} status - BenefitStatus enum
 * @property {number|null} amount_kobo - Amount in kobo (null if not KNOWN)
 * @property {string} [note] - Explanation, scope clarification
 * @property {string} [source_url] - Where we found this
 * @property {string} [retrieved_date] - When we collected it (YYYY-MM-DD)
 */

/**
 * Premium Object
 * Contract: no price renders without status, source, date
 *
 * @typedef {Object} Premium
 * @property {number} amount_kobo - Annual premium in kobo
 * @property {string} currency - Always 'NGN'
 * @property {string} period - 'annual'
 * @property {string} basis - 'per_person' or 'family_total'
 * @property {string} status - PremiumStatus enum
 * @property {string} source_url - Where we found this
 * @property {string} retrieved_date - YYYY-MM-DD
 * @property {string|null} source_date - If the source document is dated
 * @property {string|null} snapshot_ref - Filename of dated screenshot
 * @property {string} evidence_tier - EvidenceTier
 */

/**
 * Waiting Period
 * @typedef {Object} WaitingPeriod
 * @property {string} benefit - Benefit name (e.g., 'major_surgery', 'maternity', 'chronic')
 * @property {number} months - Months from enrollment
 */

/**
 * Provider Access
 * @typedef {Object} ProviderAccess
 * @property {string} system - ProviderAccessSystem
 * @property {string[]} tiers - e.g., ['A', 'B', 'C', 'D'] or ['Tier 1', 'Tier 2']
 * @property {string[]} region - e.g., ['NG'] or ['NG', 'West Africa']
 * @property {string[]} named_facilities - e.g., ['Evercare', 'Reddington']
 * @property {string} raw - Original unparsed text for reference
 */

/**
 * HMO (Health Maintenance Organisation)
 *
 * @typedef {Object} HMO
 * @property {string} hmo_id - NG-HMO-001 format
 * @property {string} hmo_name - Display name
 * @property {number|null} nhia_id - NHIA registration number
 * @property {string} matchability - HmoMatchability enum
 * @property {number} plan_count - How many plans this HMO has in dataset
 * @property {number} data_completeness - 0–1 ratio
 * @property {boolean} source_is_self_interested - true for Clearline only
 * @property {boolean} disclosure_required - true if self-interested
 */

/**
 * Plan (Health Insurance Product)
 *
 * @typedef {Object} Plan
 * @property {string} plan_id - NG-HMO-006-executive-retail_individual
 * @property {string} hmo_id - Reference to HMO
 * @property {string} plan_name - Display name
 * @property {string} customer_type - CustomerType enum
 * @property {number} min_lives - Minimum people for this plan
 * @property {number|null} max_lives - Maximum people (null = unlimited)
 * @property {number|null} lives_covered - For family plans with fixed size
 *
 * @property {Premium} premium - Annual cost + status + source
 * @property {BenefitValue} overall_limit - Annual ceiling across all benefits
 * @property {BenefitValue} surgery_major - Major surgery limit
 * @property {BenefitValue} maternity - Maternity limit
 * @property {BenefitValue} drugs - Medication coverage (usually UNKNOWN)
 * @property {BenefitValue} dental - Dental coverage (usually UNKNOWN)
 * @property {BenefitValue} diagnostics - MRI/CT/advanced (usually UNKNOWN)
 * @property {BenefitValue} wellness - Gym/spa/wellness (usually UNKNOWN)
 *
 * @property {ProviderAccess} provider_access - Hospital network
 * @property {string} payment_model - PaymentModel enum
 * @property {WaitingPeriod[]} waiting_periods - Coverage start delays
 * @property {string} notes - Internal audit trail
 */

/**
 * HMO (Unpriced)
 * For HMOs with no retail pricing available
 *
 * @typedef {Object} HmoUnpriced
 * @property {string} hmo_id
 * @property {string} hmo_name
 * @property {string} reason - Why we can't rank them (e.g., 'NO_PUBLIC_RETAIL_PRICING')
 * @property {string[]} known_facts - What we do know
 * @property {string[]} what_to_ask - Questions for users
 */

/**
 * Assessment (User Session)
 * Results of the 22-question assessment
 *
 * @typedef {Object} Assessment
 * @property {string} session_id - Unique session identifier
 * @property {string} completed_at - ISO timestamp
 * @property {string} customer_type - Who are we covering?
 * @property {number} lives - How many people?
 * @property {string} state - Which state?
 * @property {string[]} ages - Age groups present (children, adults, seniors)
 * @property {number|null} budget_total_kobo - Total annual budget
 * @property {number|null} budget_per_person_kobo - Derived
 * @property {string} hospital_choice_importance - 0–10
 * @property {string|null} preferred_hospital - User's current hospital
 * @property {string} geographic_need - Just my state / few states / nationwide / abroad
 * @property {number} maternity - 0–10
 * @property {number} surgery - 0–10
 * @property {number} specialist - 0–10
 * @property {number} diagnostics - 0–10
 * @property {number} ancillary - 0–10 (dental/optical/ENT)
 * @property {number} drugs - 0–10
 * @property {number} digital - 0–10
 * @property {number} service - 0–10
 * @property {string} restriction_tolerance - fine / some / minimal / walk_in
 * @property {string[]} top_priorities - Top 3 from Q21
 * @property {string} biggest_fear - From Q22 (frames results page)
 * @property {string[]} skipped - Which questions were skipped
 * @property {number} completeness - 0–1 ratio
 * @property {Object} priority_vector - Computed weights
 */

/**
 * Recommendation
 * Output of the matching engine for one plan
 * Generated by MATCHING_ENGINE_V1 stages 1–8
 * Claude may only author 'why_it_matches' and 'gaps'
 *
 * @typedef {Object} Recommendation
 * @property {number} rank - 1, 2, 3, or alternative position
 * @property {string} plan_id
 * @property {string} hmo_id
 * @property {string} hmo_name
 * @property {string} plan_name
 * @property {number} match_score - 0–95, never above 95
 * @property {string} match_score_note - e.g., "Scored on 4 of your 8 priorities"
 * @property {Premium} price
 * @property {Object[]} relevant_benefits - Benefits matching stated priorities
 * @property {Object[]} benefits_you_asked_about_we_could_not_check
 * @property {ProviderAccess} provider_access
 * @property {Object[]} warnings - Auto-generated flags
 * @property {Object} potential_gap - Gap engine output
 * @property {Object} evidence_confidence - Confidence score + drivers
 * @property {string} [why_it_matches] - Claude-authored, from recommendation object only
 * @property {string} [gaps] - Claude-authored, from recommendation object only
 * @property {Object} audit - Full engine audit trail (not displayed, archived)
 */

/**
 * PHASE 3 — PUBLIC-SECTOR TYPES
 * NHIA Programmes and State Health Insurance Schemes
 */

/**
 * Public Sector Programme Type
 * § NHIA: National Health Insurance Authority programme
 * § STATE_SCHEME: State-level health insurance scheme
 * § TELEMEDICINE: Virtual care only (already in private HMOs)
 */
export const PublicSectorType = {
  NHIA: 'nhia',
  STATE_SCHEME: 'state_scheme',
  HYBRID: 'hybrid'
};

/**
 * NHIA Programme Status
 * For tracking official NHIA programme data completeness
 * § ACTIVE: Currently accepting enrollments
 * § PENDING: Announced but not yet open
 * § CLOSED: No longer accepting new enrollments
 * § UNKNOWN: Status not publicly confirmed
 */
export const NhiaProgrammeStatus = {
  ACTIVE: 'active',
  PENDING: 'pending',
  CLOSED: 'closed',
  UNKNOWN: 'unknown'
};

/**
 * NHIA Programme
 * Official public-sector health insurance programme
 *
 * @typedef {Object} NhiaProgramme
 * @property {string} nhia_id - NG-NHIA-001 format
 * @property {string} programme_name - Official name
 * @property {string} programme_type - e.g., 'BHCPF', 'Maternal', 'Senior Citizen'
 * @property {string} status - NhiaProgrammeStatus enum
 * @property {string[]} target_populations - e.g., ['pregnant_women', 'children_under_5', 'seniors']
 *
 * @property {string} eligibility_summary - Plain language eligibility
 * @property {string[]} eligibility_criteria - Specific requirements
 * @property {string} enrollment_pathway - How to enroll
 *
 * @property {BenefitValue} contribution - Annual or per-period contribution
 * @property {string} contribution_status - PremiumStatus enum (whether published)
 * @property {BenefitValue|null} co_payment - Out-of-pocket per visit
 * @property {BenefitValue|null} annual_out_of_pocket_max - Maximum OOP
 *
 * @property {Object[]} benefit_package - Array of covered benefits
 * @property {BenefitValue} overall_limit - Annual ceiling if published
 * @property {BenefitValue} primary_care - Primary care coverage
 * @property {BenefitValue} specialist - Specialist care coverage
 * @property {BenefitValue} hospitalization - Hospital admission coverage
 * @property {BenefitValue} drugs - Medication coverage
 * @property {BenefitValue} maternity - Maternity coverage if applicable
 * @property {BenefitValue} emergency - Emergency care coverage
 *
 * @property {string[]} geographic_scope - ['NG'] or specific regions
 * @property {string[]} provider_network - How to find providers
 * @property {BenefitValue|null} network_size - Number of facilities if published
 *
 * @property {WaitingPeriod[]} waiting_periods - Coverage start delays
 * @property {string[]} exclusions - What's not covered
 * @property {string[]} limitations - Coverage caps/conditions
 *
 * @property {string} official_url - Official NHIA/government source
 * @property {string} retrieved_date - YYYY-MM-DD when we collected this
 * @property {string} source_date - YYYY-MM-DD from the official source
 * @property {string} evidence_tier - EvidenceTier
 * @property {string} provenance_note - "Official NHIA" or "Government gazette"
 * @property {string} last_verified - YYYY-MM-DD
 */

/**
 * State Health Insurance Scheme
 * State-level public health insurance programme
 *
 * @typedef {Object} StateScheme
 * @property {string} scheme_id - NG-STATE-LAGOS-001 format
 * @property {string} state - State name
 * @property {string} scheme_name - Official scheme name
 * @property {string} governing_agency - Agency administering the scheme
 * @property {string} status - NhiaProgrammeStatus enum
 *
 * @property {string} target_populations - Who the scheme serves
 * @property {string} eligibility_summary - Plain language eligibility
 * @property {string[]} eligibility_criteria - Specific requirements
 * @property {string} enrollment_pathway - How to enroll
 *
 * @property {BenefitValue} contribution - Annual contribution if published
 * @property {string} contribution_status - PremiumStatus enum
 * @property {BenefitValue|null} co_payment - Out-of-pocket per visit
 *
 * @property {Object[]} benefit_package - Array of covered benefits
 * @property {BenefitValue} overall_limit - Annual ceiling if published
 * @property {BenefitValue} primary_care - Primary care coverage
 * @property {BenefitValue} hospitalization - Hospital coverage
 * @property {BenefitValue} drugs - Medication coverage
 *
 * @property {string} official_url - Official state/agency website
 * @property {string} retrieved_date - YYYY-MM-DD
 * @property {string} source_date - YYYY-MM-DD from official source
 * @property {string} evidence_tier - EvidenceTier
 * @property {string} last_verified - YYYY-MM-DD
 * @property {string} notes - Data quality notes
 */

/**
 * Public Option Recommendation
 * For public-sector programmes in results
 * Distinct from private HMO Recommendation
 *
 * @typedef {Object} PublicOptionRecommendation
 * @property {string} option_type - PublicSectorType
 * @property {string} programme_id - nhia_id or scheme_id
 * @property {string} programme_name
 * @property {string} eligibility_status - 'eligible' | 'potentially_eligible' | 'not_eligible'
 * @property {string} eligibility_reason - Why user is/isn't eligible
 * @property {BenefitValue} contribution - Cost to user
 * @property {Object[]} key_benefits - Top 3-5 benefits
 * @property {Object[]} limitations - Key coverage gaps
 * @property {string} enrollment_url - Where to enroll
 * @property {string} confidence_tier - How certain is our data? (HIGH/MEDIUM/LOW)
 * @property {string} last_verified - YYYY-MM-DD
 * @property {string} recommendation_reason - Why we're showing this
 */

export default {
  BenefitStatus,
  PremiumStatus,
  HmoMatchability,
  CustomerType,
  ProductType,
  EvidenceTier,
  ProviderAccessSystem,
  PaymentModel,
  PublicSectorType,
  NhiaProgrammeStatus
};
