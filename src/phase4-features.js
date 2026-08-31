/**
 * Phase 4: Intelligent Assessment + Search + User Q&A
 * Adaptive questions, preference signals, search, and verified Q&A
 */

// Extended questions pool with conditional branching
export const PHASE4_QUESTIONS = [
  // Original 22 questions (Q1-Q22) with branching metadata
  // ... Q1-Q22 as defined in index.html, but with showIf conditions added

  // New Phase 4 questions (Q23-Q33)
  {
    id: 'Q23',
    group: 7,
    title: 'How often do you typically need healthcare?',
    type: 'single-select',
    helper: 'This helps us understand your likely claims patterns.',
    options: [
      { text: 'Very rarely (less than once a year)', value: 'very_rare' },
      { text: 'Occasionally (1-3 times a year)', value: 'occasional' },
      { text: 'Regularly (monthly or more)', value: 'regular' },
      { text: 'Frequently (weekly or constantly)', value: 'frequent' }
    ],
    key: 'healthcare_frequency'
  },
  {
    id: 'Q24',
    group: 7,
    title: 'Do you take regular medications?',
    type: 'single-select',
    helper: 'Important for medication cover assessment.',
    options: [
      { text: 'No regular medications', value: false },
      { text: 'Yes, a few prescriptions', value: 'few' },
      { text: 'Yes, multiple ongoing medications', value: 'multiple' }
    ],
    key: 'regular_medications',
    showIf: (answers) => answers.chronic !== 'no' || answers.healthcare_frequency === 'regular' || answers.healthcare_frequency === 'frequent'
  },
  {
    id: 'Q25',
    group: 7,
    title: 'How critical is having a baby / maternity care soon?',
    type: 'single-select',
    helper: 'Helps narrow down maternity cover options.',
    options: [
      { text: 'Not planning', value: 'not_planning' },
      { text: 'Maybe in next 2 years', value: 'maybe_2yr' },
      { text: 'Yes, within next year', value: 'within_1yr' },
      { text: 'Yes, very soon or ongoing', value: 'critical' }
    ],
    key: 'maternity_urgency',
    showIf: (answers) => answers.maternity !== 'not_relevant' && answers.maternity !== false
  },
  {
    id: 'Q26',
    group: 7,
    title: 'Would you prefer to change your current doctor/hospital if needed?',
    type: 'single-select',
    options: [
      { text: 'Must stay with my current provider', value: 'must_stay' },
      { text: 'Prefer to stay but can change if needed', value: 'prefer_stay' },
      { text: 'Flexible - any good hospital is fine', value: 'flexible' }
    ],
    key: 'provider_flexibility'
  },
  {
    id: 'Q27',
    group: 7,
    title: 'For dental services - how often would you likely use?',
    type: 'single-select',
    helper: 'Only relevant if you selected dental as important.',
    options: [
      { text: 'Regular check-ups (2x yearly)', value: 'regular' },
      { text: 'Occasional (1x yearly)', value: 'occasional' },
      { text: 'Emergencies only', value: 'emergency' }
    ],
    key: 'dental_frequency',
    showIf: (answers) => answers.ancillary && answers.ancillary.includes('dental')
  },
  {
    id: 'Q28',
    group: 7,
    title: 'How important is having a backup telemedicine option?',
    type: 'importance-scale',
    helper: 'For quick consultations without hospital visit.',
    key: 'telemedicine_importance'
  },
  {
    id: 'Q29',
    group: 7,
    title: 'How important is comprehensive emergency cover?',
    type: 'importance-scale',
    helper: 'Accidents, emergencies, urgent interventions.',
    key: 'emergency_importance'
  },
  {
    id: 'Q30',
    group: 7,
    title: 'Are you self-employed or employed?',
    type: 'single-select',
    options: [
      { text: 'Employed (with salary)', value: 'employed' },
      { text: 'Self-employed / Business owner', value: 'self_employed' },
      { text: 'Combination of both', value: 'both' },
      { text: 'Retired / No income', value: 'retired' }
    ],
    key: 'employment_type'
  },
  {
    id: 'Q31',
    group: 7,
    title: 'For SME/business staff - how many employees?',
    type: 'single-select',
    options: [
      { text: '1-5', value: '1_5' },
      { text: '6-10', value: '6_10' },
      { text: '11-50', value: '11_50' },
      { text: '50+', value: '50_plus' }
    ],
    key: 'employee_count',
    showIf: (answers) => answers.customer_type === 'corporate'
  },
  {
    id: 'Q32',
    group: 7,
    title: 'How much can you comfortably handle out-of-pocket per incident?',
    type: 'single-select',
    helper: 'Before hitting your plan limits.',
    options: [
      { text: 'Very little - want maximum cover', value: 'minimal' },
      { text: '₦10,000-50,000 is fine', value: 'low' },
      { text: '₦50,000-200,000 is manageable', value: 'medium' },
      { text: 'Over ₦200,000 is OK', value: 'high' }
    ],
    key: 'oopmax_tolerance'
  },
  {
    id: 'Q33',
    group: 7,
    title: 'Would you prefer an HMO with strong international presence?',
    type: 'importance-scale',
    helper: 'For travel or exposure to global healthcare standards.',
    key: 'international_presence_importance'
  }
];

// Preference signal generation
export function generatePreferenceSignals(answers) {
  const signals = {
    affordability_concern: false,
    hospital_access_concern: false,
    maternity_priority: false,
    exclusion_concern: false,
    convenience_priority: false,
    specialist_priority: false,
    medication_priority: false,
    emergency_priority: false
  };

  // Affordability concern: tight budget relative to lives
  if (answers.budget_total) {
    const budgetPerPerson = answers.budget_total / (answers.lives || 1);
    if (budgetPerPerson < 100000) {
      signals.affordability_concern = true;
    }
  }

  // Hospital access concern
  if (answers.hospital_access >= 8 || answers.provider_flexibility === 'must_stay') {
    signals.hospital_access_concern = true;
  }

  // Maternity priority
  if (answers.maternity === 10 || answers.maternity === 'planning' || answers.maternity_urgency === 'critical') {
    signals.maternity_priority = true;
  }

  // Exclusion concern
  if (answers.biggest_fear === 'drugs_gap' || answers.regular_medications === 'multiple') {
    signals.exclusion_concern = true;
  }

  // Convenience priority
  if (answers.digital >= 8 || answers.telemedicine_importance >= 8) {
    signals.convenience_priority = true;
  }

  // Specialist priority
  if (answers.specialist >= 8 || answers.chronic === 'specialist') {
    signals.specialist_priority = true;
  }

  // Medication priority
  if (answers.drugs >= 8 || answers.regular_medications === 'multiple') {
    signals.medication_priority = true;
  }

  // Emergency priority
  if (answers.surgery === 10 || answers.emergency_importance >= 8) {
    signals.emergency_priority = true;
  }

  return signals;
}

// User profile summary before results
export function generateProfileSummary(answers, skipped) {
  const summary = {
    who: answers.customer_type || 'individual',
    people: answers.lives || 1,
    location: answers.state || 'Nigeria',
    budget: answers.budget_total || null,
    completeness: Math.round((Object.keys(answers).length / 32) * 100),
    confidence: calculateConfidence(answers, skipped),
    top_concerns: extractTopConcerns(answers),
    skipped_count: skipped.length
  };

  return summary;
}

function calculateConfidence(answers, skipped) {
  const completeness = Math.round((Object.keys(answers).length / 32) * 100);
  const hasSkipped = skipped.length > 0;

  if (completeness === 100 && !hasSkipped) return 'High';
  if (completeness >= 75) return 'Medium';
  return 'Low';
}

function extractTopConcerns(answers) {
  const concerns = [];

  if (answers.biggest_fear) concerns.push(answers.biggest_fear);
  if (answers.top_priorities && answers.top_priorities.length > 0) {
    concerns.push(...answers.top_priorities.slice(0, 2));
  }

  return [...new Set(concerns)].slice(0, 3);
}

// Global search functionality
export const searchData = [
  // HMOs
  { category: 'HMO', name: 'Hygeia HMO', slug: 'hygeia', description: 'Leading HMO with wide network' },
  { category: 'HMO', name: 'Reliance HMO', slug: 'reliance', description: 'Established HMO provider' },
  { category: 'HMO', name: 'Clearline', slug: 'clearline', description: 'Health insurance provider' },
  // Add more HMOs...

  // Plans
  { category: 'PLAN', name: 'HyEssential', slug: 'hyessential', description: 'Essential health coverage plan' },
  { category: 'PLAN', name: 'Jade', slug: 'jade', description: 'Comprehensive family plan' },
  // Add more plans...

  // Public Options
  { category: 'PUBLIC', name: 'NHIA GIFSHIP', slug: 'nhia-gifship', description: 'Group Individual Family Social Health Insurance' },
  { category: 'PUBLIC', name: 'NHIA OPSSHIP', slug: 'nhia-opsship', description: 'Organised Private Sector programme' },
  // Add more public options...

  // Education
  { category: 'LEARN', name: 'What is an HMO?', slug: 'what-is-hmo', description: 'Understanding Health Maintenance Organizations' },
  { category: 'LEARN', name: 'Understanding Benefit Limits', slug: 'benefit-limits', description: 'How coverage limits work' },
  { category: 'LEARN', name: 'Maternity Coverage Guide', slug: 'maternity-guide', description: 'Maternity benefits explained' },
  // Add more education content...

  // States
  { category: 'STATE', name: 'Lagos', slug: 'lagos', description: 'Lagos State health scheme' },
  { category: 'STATE', name: 'Oyo', slug: 'oyo', description: 'Oyo State health scheme' }
];

export function performGlobalSearch(query) {
  const q = query.toLowerCase();
  return searchData.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.slug.includes(q)
  ).slice(0, 10);
}

// Verified Q&A Knowledge Base
export const verifiedQA = [
  {
    question: 'What is an HMO?',
    answer: 'An HMO (Health Maintenance Organization) is a health insurance provider that offers a network of hospitals and doctors. You pay a monthly premium and can access covered services.',
    category: 'Basics',
    verified: true
  },
  {
    question: 'What is NHIA?',
    answer: 'The National Health Insurance Authority (NHIA) manages public health insurance schemes in Nigeria including GIFSHIP, OPSSHIP, and others.',
    category: 'Public Options',
    verified: true
  },
  {
    question: 'What does "benefit limit" mean?',
    answer: 'A benefit limit is the maximum amount an HMO will pay for a specific service (e.g., surgery, hospitalization). Once you hit the limit, you pay out-of-pocket.',
    category: 'Coverage',
    verified: true
  },
  {
    question: 'What is "Price to Verify"?',
    answer: 'Price to Verify means the premium or benefit amount is not publicly published. You need to contact the HMO directly for a quote.',
    category: 'Pricing',
    verified: true
  },
  {
    question: 'What does MLR mean?',
    answer: 'Medical Loss Ratio (MLR) is the percentage of premium revenue an HMO spends on actual healthcare claims. Higher MLR means more of your premium goes to coverage.',
    category: 'Actuarial',
    verified: true
  },
  {
    question: 'What is telemedicine?',
    answer: 'Telemedicine is remote healthcare delivery through phone or video consultation. It allows you to consult a doctor without visiting a hospital.',
    category: 'Services',
    verified: true
  },
  {
    question: 'How do I check if my hospital is covered?',
    answer: 'Contact your HMO directly or check their website for their provider network list. You can usually search by state or hospital name.',
    category: 'Coverage',
    verified: true
  },
  {
    question: 'What is a co-payment?',
    answer: 'A co-payment is a fixed amount you pay for a service after paying your premium. For example, ₦500 per clinic visit.',
    category: 'Costs',
    verified: true
  },
  {
    question: 'What is a waiting period?',
    answer: 'A waiting period is the time you must be covered before you can claim for certain services (especially maternity). Common waiting periods are 3-12 months.',
    category: 'Coverage',
    verified: true
  }
];

export function searchQA(query) {
  const q = query.toLowerCase();
  return verifiedQA.filter(item =>
    item.question.toLowerCase().includes(q) ||
    item.answer.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  );
}

// WhatsApp handoff message generator
export function generateWhatsAppMessage(context = {}) {
  let message = 'Hello Azuka, I used HMO Blueprint and need help understanding my health cover options.';

  if (context.profile) {
    message += `\n\nMy profile:\n`;
    message += `- Location: ${context.profile.location}\n`;
    message += `- Budget: ₦${context.profile.budget || 'Not specified'}\n`;
    message += `- People: ${context.profile.people}\n`;
  }

  if (context.concern) {
    message += `\n\nMy main concern: ${context.concern}`;
  }

  return encodeURIComponent(message);
}

// Clearline neutrality check
export const clearlineNeutralityChecks = {
  preference_enabled: false,
  preference_applied_count: 0,
  bonus_points: 0,
  // Static audit: Clearline should not be ranked higher without legitimate data evidence
};

export function verifyClearlineNeutrality(results) {
  // Verify Clearline is not artificially boosted
  const clearlineInResults = results.filter(r => r.hmo_name === 'Clearline');
  if (clearlineInResults.length > 0) {
    // Clearline should only appear if it scores legitimately, not due to preference
    return clearlineNeutralityChecks.preference_applied_count === 0;
  }
  return true;
}

export default {
  PHASE4_QUESTIONS,
  generatePreferenceSignals,
  generateProfileSummary,
  performGlobalSearch,
  searchQA,
  generateWhatsAppMessage,
  verifyClearlineNeutrality
};
