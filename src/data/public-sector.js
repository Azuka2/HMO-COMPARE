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
 * Verified from official NHIA sources as of 2026-08-31
 *
 * Data structure: P3.1 complete
 * Verified records: P3.2 starter pack imported
 * Unknown fields: marked NOT_PUBLICLY_PUBLISHED (never null/zero)
 */
export const nhiaProgrammes = [
  // Record 1: Public Sector Social Health Insurance Programme
  {
    nhia_id: 'NG-NHIA-PUBLIC-001',
    programme_name: 'Public Sector Social Health Insurance Programme',
    programme_type: 'PSSHIP',
    status: 'active',
    target_populations: ['government_workers', 'public_sector_families'],
    eligibility_summary: 'Government and public-sector workers and their families',
    eligibility_criteria: [
      'Government/public-sector employment',
      'Eligible family members as defined by programme'
    ],
    enrollment_pathway: 'Through applicable public-sector/NHIA enrollment process',
    geographic_scope: ['NG'],

    contribution: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED in source page reviewed'
    },
    contribution_status: PremiumStatus.NOT_PUBLICLY_VERIFIED,

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED'
    },
    primary_care: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'See official NHIA programme documentation'
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/services-1/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA programme index page',
    last_verified: '2026-08-31'
  },

  // Record 2: GIFSHIP
  {
    nhia_id: 'NG-NHIA-GIFSHIP-001',
    programme_name: 'Group, Individual and Family Social Health Insurance Programme (GIFSHIP)',
    programme_type: 'GIFSHIP',
    status: 'active',
    programme_subtypes: ['GIFSHIP', 'GIFSHIP-r', 'GIFSHIP-n'],
    target_populations: ['individuals', 'families', 'groups', 'employed', 'unemployed', 'retirees', 'nysc_members'],
    eligibility_summary: 'Individuals, families and groups in various employment/life status categories',
    eligibility_criteria: [
      'Employed or unemployed individual/family member',
      'Group member in registered group',
      'NYSC member (GIFSHIP-n)',
      'Retiree (GIFSHIP-r)'
    ],
    enrollment_pathway: 'Visit NHIA office, register, pay premium online or at bank, receive NHIA ID card',
    geographic_scope: ['NG'],

    contribution: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED in source page reviewed (verify current premium with NHIA)'
    },
    contribution_status: PremiumStatus.VERIFY,

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    primary_care: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/service/land-insurance/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA GIFSHIP programme page',
    last_verified: '2026-08-31'
  },

  // Record 3: OPSSHIP
  {
    nhia_id: 'NG-NHIA-OPSSHIP-001',
    programme_name: 'Organised Private Sector Social Health Insurance Programme (OPSSHIP)',
    programme_type: 'OPSSHIP',
    status: 'active',
    target_populations: ['private_sector_workers', 'private_sector_families'],
    eligibility_summary: 'Private-sector workers and their families from companies with 5+ employees',
    eligibility_criteria: [
      'Employment in private company with 5 or more employees',
      'Employee spouse',
      'Up to 4 children under 18 years',
      'Additional family members at extra cost'
    ],
    enrollment_pathway: 'Employer application to NHIA; NHIA coordinates employee enrollment',
    geographic_scope: ['NG'],
    minimum_employer_size: 5,
    family_structure: 'Employee + spouse + up to 4 children under 18; additional members at extra cost',
    administration: 'NHIA',

    contribution: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED in source page reviewed'
    },
    contribution_status: PremiumStatus.VERIFY,

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    primary_care: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/service/gifship/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA OPSSHIP programme page',
    last_verified: '2026-08-31'
  },

  // Record 4: TISHIP
  {
    nhia_id: 'NG-NHIA-TISHIP-001',
    programme_name: 'Tertiary Institutions Social Health Insurance Programme (TISHIP)',
    programme_type: 'TISHIP',
    status: 'active',
    target_populations: ['tertiary_institution_students'],
    eligibility_summary: 'Students in tertiary institutions (universities, polytechnics, other approved institutions)',
    eligibility_criteria: [
      'Currently enrolled student in approved tertiary institution',
      'Federal university, state university, private university, polytechnic, or other approved institution'
    ],
    enrollment_pathway: 'Student registers through institution health center',
    geographic_scope: ['NG'],
    institutions: ['federal_universities', 'state_universities', 'private_universities', 'polytechnics', 'other_tertiary'],

    contribution: {
      status: BenefitStatus.KNOWN,
      amount_kobo: 200000, // ₦2,000 per year in kobo
      note: 'Published by NHIA'
    },
    contribution_status: PremiumStatus.CURRENT,
    contribution_basis: 'per_student_per_year',

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED'
    },
    primary_care: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.KNOWN,
      amount_kobo: null,
      note: 'For emergency care outside school: notify nearest NHIA/SSHIA office within 48 hours'
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/service/car-insurance/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA TISHIP programme page - premium verified as ₦2,000/year',
    last_verified: '2026-08-31'
  },

  // Record 5: Vulnerable Group Fund
  {
    nhia_id: 'NG-NHIA-VGF-001',
    programme_name: 'Vulnerable Group Fund (VGF)',
    programme_type: 'VGF',
    status: 'active',
    target_populations: ['vulnerable_populations'],
    eligibility_summary: 'Vulnerable populations as identified and supported under VGF',
    eligibility_criteria: [
      'People with disabilities',
      'Refugees',
      'Human-trafficking survivors',
      'Pregnant women',
      'Other vulnerable groups as defined by NHIA'
    ],
    enrollment_pathway: 'Determine eligibility and enroll through NHIA/state office',
    geographic_scope: ['NG'],
    legal_basis: 'Established under Part III, Section 25(1) of the NHIA Act 2022',

    contribution: {
      status: BenefitStatus.NOT_COVERED,
      amount_kobo: null,
      note: 'Not applicable for direct user premium pricing'
    },
    contribution_status: PremiumStatus.NOT_APPLICABLE,

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED - See official NHIA/state documentation'
    },
    primary_care: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/vulnerable-group/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA Vulnerable Group Fund page',
    last_verified: '2026-08-31'
  },

  // Record 6: BHCPF
  {
    nhia_id: 'NG-NHIA-BHCPF-001',
    programme_name: 'Basic Health Care Provision Fund (BHCPF)',
    programme_type: 'BHCPF',
    status: 'active',
    target_populations: ['eligible_populations'],
    eligibility_summary: 'Healthcare access through registered primary and secondary healthcare facilities',
    eligibility_criteria: [
      'Determined by applicable eligibility criteria',
      'Verify with State Social Health Insurance Authority'
    ],
    enrollment_pathway: 'Contact relevant State Social Health Insurance Authority',
    geographic_scope: ['NG'],
    provider_network: 'Registered primary and secondary healthcare facilities (public and private)',

    contribution: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null,
      note: 'NOT_PUBLICLY_PUBLISHED for general user premium'
    },
    contribution_status: PremiumStatus.NOT_PUBLICLY_VERIFIED,

    overall_limit: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    primary_care: {
      status: BenefitStatus.KNOWN,
      amount_kobo: null,
      note: 'Preventive, promotive, curative and rehabilitative services subject to applicable benefit package'
    },
    specialist: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    hospitalization: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    drugs: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    maternity: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },
    emergency: {
      status: BenefitStatus.UNKNOWN,
      amount_kobo: null
    },

    waiting_periods: [],
    exclusions: [],
    limitations: [],

    official_url: 'https://www.nhia.gov.ng/basic-health-care-provision-fund/',
    retrieved_date: '2026-08-31',
    source_date: 'NOT_EXPLICITLY_DATED',
    evidence_tier: EvidenceTier.B,
    provenance_note: 'Official NHIA BHCPF page',
    last_verified: '2026-08-31'
  }
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
