/**
 * USER PRIORITY MODEL V1
 * Converts 22 assessment answers into priority weights
 *
 * Input: Assessment answers (Q1–Q22)
 * Output: priority_vector with weights for 8 dimensions
 */

/**
 * Base mapping: importance scale → dimension scores
 *
 * Importance: Not important 0 · Nice to have 3 · Important 6 · Very important 8 · Critical 10
 */

export function computePriceBase(budget, topPriorities) {
  if (budget === null || budget === undefined) {
    return 5; // "not sure"
  }

  const budgetPerPerson = budget; // Already per-person from assessment

  if (budgetPerPerson <= 50000) return 9;
  if (budgetPerPerson <= 150000) return 7;
  if (budgetPerPerson <= 400000) return 5;
  return 3;
}

export function computeMaternityBase(q9_maternity, q4_ages) {
  let base = q9_maternity || 0;

  // +2 if Q4 includes adults 18–39 AND Q9 ≠ "not relevant" (cap 10)
  if (q9_maternity !== 0 && q4_ages && q4_ages.includes('adults_18_39')) {
    base = Math.min(10, base + 2);
  }

  return base;
}

/**
 * Top-3 multiplier (Q21)
 * ×1.5, capped at 10
 * Rank within the three does not differentiate
 */
export function applyTopPriorityMultiplier(raw, topPriorities) {
  if (topPriorities && topPriorities.includes('price')) {
    return Math.min(10, raw * 1.5);
  }
  return raw;
}

/**
 * Fear modifier (Q22) — what they'd regret most
 * +2 to the matching dimension, capped at 10
 */
export function applyFearModifier(raw, biggestFear, dimension) {
  const fearMap = {
    surgery_gap: 'surgery',
    maternity_gap: 'maternity',
    hospital_not_covered: 'hospital_access',
    limit_too_low: 'surgery',
    paid_a_lot: 'surgery',
    drugs_excluded: 'drugs',
    emergency_hard: 'hospital_access',
    nobody_answered: 'digital'
  };

  if (fearMap[biggestFear] === dimension) {
    return Math.min(10, raw + 2);
  }

  return raw;
}

/**
 * Senior modifier
 * has_seniors → surgery +1, drugs +1, maternity forced to 0
 */
export function applySeniorModifier(raw, hasSeniors, dimension) {
  if (!hasSeniors) return raw;

  if (dimension === 'maternity') {
    return 0; // Force to 0
  }

  if (dimension === 'surgery' || dimension === 'drugs') {
    return Math.min(10, raw + 1);
  }

  return raw;
}

/**
 * Compute raw priority vector (before normalization)
 *
 * Eight dimensions, but only 4 are currently scoreable
 */
export function computeRawVector(assessment) {
  const raw = {};

  // price: from budget behavior + Q21
  const priceBase = computePriceBase(assessment.budget_per_person_kobo, assessment.top_priorities);
  raw.price = applyTopPriorityMultiplier(priceBase, assessment.top_priorities);
  raw.price = applyFearModifier(raw.price, assessment.biggest_fear, 'price');

  // surgery: Q14 + modifiers
  raw.surgery = assessment.surgery || 0;
  raw.surgery = applyTopPriorityMultiplier(raw.surgery, assessment.top_priorities);
  raw.surgery = applyFearModifier(raw.surgery, assessment.biggest_fear, 'surgery');
  raw.surgery = applySeniorModifier(raw.surgery, assessment.has_seniors, 'surgery');

  // hospital_access: Q8 + modifiers
  raw.hospital_access = assessment.hospital_access || 0;
  raw.hospital_access = applyTopPriorityMultiplier(raw.hospital_access, assessment.top_priorities);
  raw.hospital_access = applyFearModifier(raw.hospital_access, assessment.biggest_fear, 'hospital_access');

  // maternity: composite Q9 + modifiers
  const maternityBase = computeMaternityBase(assessment.maternity, assessment.ages);
  raw.maternity = maternityBase;
  raw.maternity = applyTopPriorityMultiplier(raw.maternity, assessment.top_priorities);
  raw.maternity = applyFearModifier(raw.maternity, assessment.biggest_fear, 'maternity');
  raw.maternity = applySeniorModifier(raw.maternity, assessment.has_seniors, 'maternity');

  // drugs: Q17 + modifiers (not scoreable, but collected)
  raw.drugs = assessment.drugs || 0;
  raw.drugs = applyTopPriorityMultiplier(raw.drugs, assessment.top_priorities);
  raw.drugs = applyFearModifier(raw.drugs, assessment.biggest_fear, 'drugs');
  raw.drugs = applySeniorModifier(raw.drugs, assessment.has_seniors, 'drugs');

  // diagnostics: Q15 (not scoreable)
  raw.diagnostics = assessment.diagnostics || 0;
  raw.diagnostics = applyTopPriorityMultiplier(raw.diagnostics, assessment.top_priorities);

  // digital: Q18 (not scoreable)
  raw.digital = assessment.digital || 0;
  raw.digital = applyTopPriorityMultiplier(raw.digital, assessment.top_priorities);

  // wellness: Q16 (deliberately low)
  raw.wellness = assessment.wellness ? 2 : 0;
  raw.wellness = applyTopPriorityMultiplier(raw.wellness, assessment.top_priorities);

  return raw;
}

/**
 * Normalize weights
 *
 * weight[d] = raw[d] / Σ(raw over SCOREABLE dimensions only)
 * Unscoreable dimensions excluded from denominator
 */
export function normalizeWeights(rawVector) {
  const scoreableDimensions = ['price', 'surgery', 'hospital_access', 'maternity'];
  let sum = 0;

  for (const dim of scoreableDimensions) {
    sum += rawVector[dim] || 0;
  }

  const weights = {};

  if (sum === 0) {
    // Edge case: divide equally
    for (const dim of scoreableDimensions) {
      weights[dim] = 1 / scoreableDimensions.length;
    }
    // Unscoreable get 0
    for (const dim of ['drugs', 'diagnostics', 'digital', 'wellness']) {
      weights[dim] = 0;
    }
  } else {
    for (const dim of scoreableDimensions) {
      weights[dim] = (rawVector[dim] || 0) / sum;
    }
    // Unscoreable get 0
    for (const dim of ['drugs', 'diagnostics', 'digital', 'wellness']) {
      weights[dim] = 0;
    }
  }

  return weights;
}

/**
 * Compute full priority vector
 */
export function computePriorityVector(assessment) {
  const raw = computeRawVector(assessment);
  const weights = normalizeWeights(raw);

  return {
    raw,
    weights,
    scoreableDimensions: {
      price: weights.price,
      surgery: weights.surgery,
      hospital_access: weights.hospital_access,
      maternity: weights.maternity
    },
    unscoreable: {
      drugs: raw.drugs,
      diagnostics: raw.diagnostics,
      digital: raw.digital,
      wellness: raw.wellness
    }
  };
}

/**
 * Plain-language description of weighted vector
 */
export function describePriorityVector(assessment, vectorData) {
  const { weights } = vectorData;
  const scoreableDims = Object.entries(weights)
    .filter(([dim, w]) => w > 0)
    .sort((a, b) => b[1] - a[1]);

  // Collect unscoreable
  const unscoreable = [];
  if (assessment.diagnostics > 0) unscoreable.push('scans');
  if (assessment.drugs > 0) unscoreable.push('medication');
  if (assessment.digital > 0) unscoreable.push('digital');
  if (assessment.ancillary > 0) unscoreable.push('dental, optical, ENT, wellness');

  let description = `We weighted ${scoreableDims.map(([d]) => d.replace(/_/g, ' ')).join(', ')}`;

  if (unscoreable.length > 0) {
    description += `. We couldn't score ${unscoreable.join(', ')} — no public data.`;
  } else {
    description += '.';
  }

  return description;
}

/**
 * Identify dimensions that couldn't be scored
 */
export function getUnscoreableDimensions(assessment) {
  const unscoreable = [];

  if (assessment.diagnostics > 0) {
    unscoreable.push({
      dimension: 'diagnostics',
      label: 'Scans (MRI/CT)',
      reason: 'No HMO publishes this data'
    });
  }

  if (assessment.drugs > 0) {
    unscoreable.push({
      dimension: 'drugs',
      label: 'Medication cover',
      reason: 'No HMO publishes this data'
    });
  }

  if (assessment.digital > 0) {
    unscoreable.push({
      dimension: 'digital',
      label: 'Digital & telemedicine',
      reason: 'No independent data exists'
    });
  }

  if (assessment.ancillary > 0) {
    unscoreable.push({
      dimension: 'ancillary',
      label: 'Dental, optical, ENT, wellness',
      reason: 'No HMO publishes these'
    });
  }

  return unscoreable;
}

export default {
  computePriceBase,
  computeMaternityBase,
  applyTopPriorityMultiplier,
  applyFearModifier,
  applySeniorModifier,
  computeRawVector,
  normalizeWeights,
  computePriorityVector,
  describePriorityVector,
  getUnscoreableDimensions
};
