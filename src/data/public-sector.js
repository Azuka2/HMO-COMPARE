/**
 * PHASE 3 — Public-Sector Health Programmes
 * Official NHIA programmes and State health insurance schemes
 *
 * CRITICAL: Only data from official primary sources
 * No fabrication. No estimates. No interpolation.
 * If data cannot be verified: marked as NOT_VERIFIED
 *
 * Sources:
 * - https://nhia.gov.ng/ (Official NHIA)
 * - Federal Ministry of Health publications
 * - State-specific health insurance websites
 * - Government gazette publications
 */

import { BenefitStatus, PremiumStatus, EvidenceTier } from '../types/index.js';

/**
 * NHIA Programmes
 * Verified from official NHIA sources (to be populated with Phase 3.2 research)
 *
 * Structure prepared. Data to be researched from official sources.
 */
export const nhiaProgrammes = [
  // PLACEHOLDER - To be populated by P3.2 NHIA Research
  // Examples of structure (not actual data):
  // {
  //   nhia_id: 'NG-NHIA-BHCPF-001',
  //   programme_name: 'Basic Health Care Provision Fund',
  //   programme_type: 'BHCPF',
  //   status: 'active',
  //   target_populations: ['pregnant_women', 'children_under_5'],
  //   eligibility_summary: 'Primary health care for vulnerable populations',
  //   eligibility_criteria: [
  //     'Pregnant women aged 15-49',
  //     'Children under 5 years'
  //   ],
  //   enrollment_pathway: 'Through primary health center in your community',
  //   contribution: {
  //     status: BenefitStatus.NOT_COVERED, // BHCPF is government-funded
  //     amount_kobo: 0
  //   },
  //   contribution_status: PremiumStatus.CURRENT,
  //   benefit_package: [],
  //   overall_limit: {
  //     status: BenefitStatus.UNKNOWN,
  //     amount_kobo: null,
  //     note: 'Information not publicly available'
  //   },
  //   primary_care: {
  //     status: BenefitStatus.KNOWN,
  //     amount_kobo: null,
  //     note: 'Primary health care coverage included'
  //   },
  //   official_url: 'https://nhia.gov.ng/programmes/bhcpf',
  //   retrieved_date: '2026-08-31',
  //   source_date: 'NOT_YET_VERIFIED',
  //   evidence_tier: EvidenceTier.B,
  //   provenance_note: 'To be verified from official NHIA source',
  //   last_verified: null
  // }
];

/**
 * State Health Insurance Schemes
 * Verified from official state sources (to be populated by Phase 3.3 research)
 *
 * Structure prepared. Data to be researched from official sources.
 */
export const stateSchemes = [
  // PLACEHOLDER - To be populated by P3.3 State Research
  // Examples of structure (not actual data):
  // {
  //   scheme_id: 'NG-STATE-LAGOS-001',
  //   state: 'Lagos',
  //   scheme_name: 'Lagos State Health Scheme',
  //   governing_agency: 'Lagos State Health Management Agency',
  //   status: 'active',
  //   target_populations: 'All Lagos residents',
  //   eligibility_summary: 'Open to all Lagos state residents',
  //   eligibility_criteria: [
  //     'Lagos state resident',
  //     'Must register with scheme'
  //   ],
  //   enrollment_pathway: 'Registration through LASHMA offices or online',
  //   contribution: {
  //     status: BenefitStatus.KNOWN,
  //     amount_kobo: 50000 * 100 // Example: 50k/year in kobo
  //   },
  //   contribution_status: PremiumStatus.VERIFY,
  //   benefit_package: [],
  //   overall_limit: {
  //     status: BenefitStatus.UNKNOWN,
  //     amount_kobo: null
  //   },
  //   official_url: 'https://lashma.gov.ng/',
  //   retrieved_date: '2026-08-31',
  //   source_date: 'TO_BE_VERIFIED',
  //   evidence_tier: EvidenceTier.B,
  //   last_verified: null,
  //   notes: 'Data to be researched from official LASHMA website'
  // }
];

/**
 * Public-Sector Research Status
 * Tracks completeness and verification status
 */
export const publicSectorResearchStatus = {
  nhia_programmes: {
    researched: 0,
    verified: 0,
    with_pricing: 0,
    with_benefits: 0,
    notes: 'PHASE 3.2: Official NHIA programme research pending'
  },
  state_schemes: {
    researched: 0,
    verified: 0,
    with_pricing: 0,
    with_benefits: 0,
    notes: 'PHASE 3.3: State scheme research pending'
  },
  last_updated: '2026-08-31',
  data_integrity_notes: [
    'No fabricated data',
    'All sources must be official/primary',
    'Missing data marked as NOT_VERIFIED',
    'Premium/benefit status tracked independently',
    'Confidence tier required for all entries'
  ]
};

/**
 * Public Sector Data Loader
 * Safe loading with validation
 */
export async function loadPublicSectorData() {
  return {
    nhia_programmes: validateNhiaProgrammes(nhiaProgrammes),
    state_schemes: validateStateSchemes(stateSchemes),
    research_status: publicSectorResearchStatus
  };
}

/**
 * Validate NHIA programme structure
 */
function validateNhiaProgrammes(programmes) {
  return programmes.filter(p => {
    if (!p.nhia_id || !p.programme_name) {
      console.warn('Invalid NHIA programme:', p);
      return false;
    }
    if (!p.evidence_tier) {
      console.warn('NHIA programme missing evidence tier:', p.nhia_id);
      return false;
    }
    return true;
  });
}

/**
 * Validate state scheme structure
 */
function validateStateSchemes(schemes) {
  return schemes.filter(s => {
    if (!s.scheme_id || !s.state || !s.scheme_name) {
      console.warn('Invalid state scheme:', s);
      return false;
    }
    if (!s.evidence_tier) {
      console.warn('State scheme missing evidence tier:', s.scheme_id);
      return false;
    }
    return true;
  });
}

export default {
  nhiaProgrammes,
  stateSchemes,
  publicSectorResearchStatus,
  loadPublicSectorData
};
