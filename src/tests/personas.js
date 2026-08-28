/**
 * Test Personas
 * PROTOTYPE_TEST_PERSONAS.md
 *
 * Five personas for regression testing
 */

/**
 * PERSONA 1 — CHIDI, 27, Lagos, First-time buyer
 * Expected vector: price 10 · surgery 8 · hospital 5 · maternity 0
 */
export const Persona1Chidi = {
  session_id: 'chidi_1',
  // Q1: Who are we covering?
  customer_type: 'retail_individual',
  // Q2: Which state?
  state: 'Lagos',
  // Q3: How many people?
  lives: 1,
  // Q4: Ages?
  ages: ['adults_18_39'],
  has_children: false,
  has_seniors: false,
  // Q5: Budget?
  budget_total_kobo: 8000000, // ₦80,000
  budget_per_person_kobo: 8000000,
  // Q6: Geography?
  geographic_need: 'just_my_state',
  // Q7: Preferred hospital?
  preferred_hospital: null,
  // Q8: Hospital choice importance?
  hospital_access: 5,
  // Q9: Maternity important?
  maternity: 0, // Not relevant
  // Q10: Children?
  // (already has_children)
  // Q11: Seniors?
  // (already has_seniors)
  // Q12: Chronic?
  chronic: 'no',
  // Q13: Specialist care?
  specialist: 3,
  // Q14: Surgery protection? (6)
  surgery: 6,
  // Q15: Diagnostics?
  diagnostics: 3,
  // Q16: Dental/optical?
  ancillary: 6,
  // Q17: Medication?
  drugs: 6,
  // Q18: Digital?
  digital: 8,
  // Q19: Customer service?
  service: 6,
  // Q20: Restrictions tolerance?
  restriction_tolerance: 'fine_if_cheaper',
  // Q21: Top 3 priorities?
  top_priorities: ['price', 'digital', 'dental'],
  // Q22: Biggest fear?
  biggest_fear: 'paid_a_lot'
};

/**
 * PERSONA 2 — ADAEZE, 31, Abuja, Expecting
 * Expected vector: maternity 10 · hospital 10 · surgery 8 · price 5
 */
export const Persona2Adaeze = {
  session_id: 'adaeze_1',
  customer_type: 'retail_family',
  state: 'FCT',
  lives: 2,
  ages: ['adults_18_39'],
  has_children: true,
  has_seniors: false,
  budget_total_kobo: 40000000, // ₦400,000
  budget_per_person_kobo: 20000000, // ₦200,000/person
  geographic_need: 'just_my_state',
  preferred_hospital: 'Afe Babalola University Teaching Hospital',
  hospital_access: 8, // Want good hospitals
  maternity: 10, // Critical — expecting
  chronic: 'no',
  specialist: 8,
  surgery: 8,
  diagnostics: 8,
  ancillary: 3,
  drugs: 8,
  digital: 6,
  service: 8,
  restriction_tolerance: 'some_rules_ok',
  top_priorities: ['maternity', 'hospital_access', 'specialist'],
  biggest_fear: 'maternity_gap'
};

/**
 * PERSONA 3 — TUNDE, 42, Lagos, Family of 4, Surgery Critical
 * Expected vector: surgery 10 · hospital 10 · maternity 0 · price 5
 * PRIMARY REGRESSION PERSONA
 */
export const Persona3Tunde = {
  session_id: 'tunde_1',
  customer_type: 'retail_family',
  state: 'Lagos',
  lives: 4,
  ages: ['children_under_18', 'adults_18_39', 'adults_40_59'],
  has_children: true,
  has_seniors: false,
  budget_total_kobo: 60000000, // ₦600,000
  budget_per_person_kobo: 15000000, // ₦150,000/person
  geographic_need: 'a_few_states',
  preferred_hospital: null,
  hospital_access: 8, // Want good hospitals
  maternity: 0, // Not relevant
  chronic: 'no',
  specialist: 8,
  surgery: 10, // CRITICAL
  diagnostics: 6,
  ancillary: 6,
  drugs: 8,
  digital: 5,
  service: 6,
  restriction_tolerance: 'minimal_hassle',
  top_priorities: ['surgery', 'hospital_access', 'drugs'],
  biggest_fear: 'surgery_gap'
};

/**
 * PERSONA 4 — MRS OKAFOR, 58, Enugu, Buying for mother (81)
 * Expected vector: surgery 11 · hospital 10 · drugs 10 · price 5
 */
export const Persona4MrsOkafor = {
  session_id: 'okafor_1',
  customer_type: 'retail_senior',
  state: 'Enugu',
  lives: 1,
  ages: ['60_plus'],
  has_children: false,
  has_seniors: true,
  budget_total_kobo: 90000000, // ₦900,000
  budget_per_person_kobo: 90000000,
  geographic_need: 'just_my_state',
  preferred_hospital: 'University of Nigeria Teaching Hospital',
  hospital_access: 10, // Want the best
  maternity: 0, // Not relevant (forced by senior)
  chronic: 'needs_regular_specialist_care',
  specialist: 10, // Critical
  surgery: 10, // Critical
  diagnostics: 8,
  ancillary: 6,
  drugs: 10, // Critical
  digital: 0,
  service: 10, // Critical
  restriction_tolerance: 'walk_in',
  top_priorities: ['specialist', 'drugs', 'hospital_access'],
  biggest_fear: 'emergency_was_hard'
};

/**
 * PERSONA 5 — EMEKA, SME Owner, Port Harcourt, 14 staff
 * Expected pool: SME plans with min_lives ≤ 14
 */
export const Persona5Emeka = {
  session_id: 'emeka_1',
  customer_type: 'sme',
  state: 'Rivers',
  lives: 14,
  ages: ['children_under_18', 'adults_18_39', 'adults_40_59'],
  has_children: true,
  has_seniors: false,
  budget_total_kobo: 140000000, // ₦1,400,000 total (₦100k/person)
  budget_per_person_kobo: 10000000, // ₦100,000/person
  geographic_need: 'a_few_states',
  preferred_hospital: null,
  hospital_access: 5, // Decent options
  maternity: 8, // Important
  chronic: 'managed',
  specialist: 6,
  surgery: 8,
  diagnostics: 6,
  ancillary: 6,
  drugs: 8,
  digital: 6,
  service: 8,
  restriction_tolerance: 'some_rules_ok',
  top_priorities: ['price', 'surgery', 'hospital_access'],
  biggest_fear: 'hospital_not_covered'
};

export default {
  Persona1Chidi,
  Persona2Adaeze,
  Persona3Tunde,
  Persona4MrsOkafor,
  Persona5Emeka
};
