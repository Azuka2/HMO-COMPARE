/**
 * MATCHING ENGINE V1 — Deterministic Ranking Pipeline
 * PROTOTYPE_DATA_CONTRACT.md § stages 1–8
 * USER_PRIORITY_MODEL_V1.md § weight computation
 *
 * Same input → identical output, every time.
 * No LLM. No randomness. No HMO identifiers in logic.
 */

import { BenefitStatus, PremiumStatus, CustomerType, ProductType } from '../types/index.js';

/**
 * Stage 1: Data Eligibility
 *
 * Dropped before anything else:
 * - NOT_PUBLICLY_VERIFIED plans (12 plans)
 * - EXCLUDE matchability HMOs
 * - No premium amount
 * - retail_family with no lives_covered
 * - sme/corporate with no min_lives (when user is SME)
 */
export function stage1DataEligibility(plans, userCustomerType) {
  return plans.filter((plan) => {
    // Exclude telemedicine, quote-required, and not-published products from HMO ranking
    if (plan.product_type === ProductType.TELEMEDICINE ||
        plan.product_type === ProductType.QUOTE_REQUIRED ||
        plan.product_type === ProductType.NOT_PUBLISHED) {
      return false;
    }

    // NOT_PUBLICLY_VERIFIED → drop
    if (plan.premium?.status === PremiumStatus.NOT_PUBLICLY_VERIFIED) {
      return false;
    }

    // No premium → drop
    if (!plan.premium || !plan.premium.amount_kobo) {
      return false;
    }

    // retail_family without lives_covered → drop
    if (plan.customer_type === 'retail_family' && !plan.lives_covered) {
      return false;
    }

    // sme/corporate without min_lives when user is SME → drop
    if (
      userCustomerType === 'sme' &&
      (plan.customer_type === 'sme' || plan.customer_type === 'corporate') &&
      !plan.min_lives
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Stage 2: Customer Type & Lives
 *
 * Hard filters:
 * - customer_type must match derived intent
 * - lives ≥ min_lives
 * - has_seniors unlocks retail_senior
 */
export function stage2CustomerTypeAndLives(
  plans,
  userCustomerType,
  userLives,
  hasSeniors
) {
  return plans.filter((plan) => {
    const planType = plan.customer_type;

    // retail_individual: always eligible
    if (planType === 'retail_individual') {
      return true;
    }

    // retail_senior: only if user has seniors
    if (planType === 'retail_senior') {
      return hasSeniors;
    }

    // retail_family: only for family users
    if (planType === 'retail_family') {
      return userCustomerType === 'retail_family';
    }

    // sme/corporate: only for matching customer type
    if (planType === 'sme') {
      if (userCustomerType !== 'sme') return false;
      if (userLives && plan.min_lives && userLives < plan.min_lives) return false;
      return true;
    }

    if (planType === 'corporate') {
      if (userCustomerType !== 'corporate') return false;
      if (userLives && plan.min_lives && userLives < plan.min_lives) return false;
      return true;
    }

    // diaspora: only for diaspora users
    if (planType === 'diaspora') {
      return userCustomerType === 'diaspora';
    }

    return false;
  });
}

/**
 * Stage 3: Budget
 *
 * Soft filter: keep if premium ≤ budget × 1.15
 * Plans in 100–115% band are kept and flagged
 * If budget = "not sure", no budget filter
 */
export function stage3Budget(plans, budgetPerPersonKobo) {
  if (budgetPerPersonKobo === null || budgetPerPersonKobo === undefined) {
    // "Not sure" → no filtering
    return plans.map((p) => ({ plan: p, over_budget_flag: false }));
  }

  const maxBudget = budgetPerPersonKobo * 1.15;

  return plans
    .map((plan) => {
      const premiumPerPerson = plan.premium.amount_kobo;
      const over_budget_flag = premiumPerPerson > budgetPerPersonKobo && premiumPerPerson <= maxBudget;
      return { plan, over_budget_flag };
    })
    .filter(({ plan }) => {
      return plan.premium.amount_kobo <= budgetPerPersonKobo * 1.15;
    });
}

/**
 * Stage 4: Critical Benefit Exclusion
 *
 * Hard exclusion: if user marked benefit CRITICAL (10),
 * exclude plans where that benefit is NOT_COVERED
 *
 * PARTIAL is NOT excluded — scored at stated scope + flagged
 */
export function stage4CriticalBenefitExclusion(
  plansWithBudgetFlag,
  criticalBenefits
) {
  // Map dimension names to plan field names
  const fieldMap = {
    price: 'premium',
    surgery: 'surgery_major',
    maternity: 'maternity',
    hospital_access: 'provider_access',
    drugs: 'drugs'
  };

  return plansWithBudgetFlag.filter(({ plan }) => {
    for (const dimensionName of criticalBenefits) {
      const fieldName = fieldMap[dimensionName];
      if (!fieldName) continue; // Unknown dimension

      const benefit = plan[fieldName];

      if (benefit && benefit.status === BenefitStatus.NOT_COVERED) {
        // Hard exclusion
        return false;
      }

      // PARTIAL is acceptable but will be flagged
    }

    return true;
  });
}

/**
 * Stage 5: Dimension Scoring
 *
 * Score only dimensions where data exists (KNOWN).
 * UNKNOWN, UNDISCLOSED, UNLIMITED → excluded from dimension and weight denominator
 *
 * Dimensions:
 * - price (0–100)
 * - surgery (0–100)
 * - hospital_access (0–100)
 * - maternity (0–100)
 */

export function scorePrice(premiumKobo, budgetPerPersonKobo) {
  if (!premiumKobo || budgetPerPersonKobo === null || budgetPerPersonKobo === undefined) {
    return null; // Cannot score
  }

  const ratio = premiumKobo / budgetPerPersonKobo;

  if (ratio <= 0.5) return 100;
  if (ratio <= 0.7) return 90;
  if (ratio <= 0.85) return 80;
  if (ratio <= 1.0) return 70;
  if (ratio <= 1.15) return 50;
  return 0;
}

export function scoreSurgery(surgeryBenefit, overallLimit, isPartial = false) {
  if (!surgeryBenefit || surgeryBenefit.status !== BenefitStatus.KNOWN) {
    return null; // Cannot score
  }

  let score = Math.min(100, (surgeryBenefit.amount_kobo / 2000000) * 100);

  // Ratio penalty: if surgery < 20% of overall_limit, subtract 15
  if (
    overallLimit &&
    overallLimit.status === BenefitStatus.KNOWN &&
    overallLimit.amount_kobo
  ) {
    const ratio = surgeryBenefit.amount_kobo / overallLimit.amount_kobo;
    if (ratio < 0.2) {
      score = Math.max(0, score - 15);
    }
  }

  // PARTIAL: score × 0.5
  if (isPartial) {
    score = score * 0.5;
  }

  return score;
}

export function scoreHospitalAccess(providerAccess) {
  if (!providerAccess || !providerAccess.tiers || providerAccess.tiers.length === 0) {
    return null; // Cannot score
  }

  const tiers = providerAccess.tiers;
  let score = 30; // Lowest tier only

  // Check for top-tier indicators
  const topTierKeywords = ['A', 'Tier 1', 'Band A', 'Platinum'];
  if (tiers.some((t) => topTierKeywords.includes(t))) {
    score = 100;
  } else if (tiers.length >= 3) {
    score = 75; // Second tier
  } else if (tiers.length >= 2) {
    score = 75; // Second tier
  } else {
    score = 50; // Third tier
  }

  // +10 for named facilities
  if (providerAccess.named_facilities && providerAccess.named_facilities.length > 0) {
    score = Math.min(100, score + 10);
  }

  // +10 if region extends beyond NG
  if (providerAccess.region && providerAccess.region.length > 1) {
    score = Math.min(100, score + 10);
  }

  return score;
}

export function scoreMaternity(maternityBenefit, isPartial = false) {
  if (!maternityBenefit || maternityBenefit.status !== BenefitStatus.KNOWN) {
    return null; // Cannot score
  }

  let score = Math.min(100, (maternityBenefit.amount_kobo / 500000) * 100);

  // PARTIAL ("ANC only — CS excluded") → 25, flagged
  if (isPartial) {
    score = 25;
  }

  return score;
}

/**
 * Apply waiting period penalties
 *
 * If restriction_tolerance is "minimal hassle" or "walk in and be treated":
 * −10 per benefit rated ≥8 with waiting period >6 months
 * −20 if >12 months
 */
export function applyWaitingPeriodPenalty(
  baseScore,
  waitingPeriods,
  userRatings,
  restrictionTolerance
) {
  if (
    !restrictionTolerance ||
    (restrictionTolerance !== 'minimal_hassle' && restrictionTolerance !== 'walk_in')
  ) {
    return baseScore;
  }

  let penalty = 0;

  if (!waitingPeriods || waitingPeriods.length === 0) {
    return baseScore;
  }

  for (const wp of waitingPeriods) {
    const benefitRating = userRatings[wp.benefit];
    if (benefitRating && benefitRating >= 8) {
      if (wp.months > 12) {
        penalty += 20;
      } else if (wp.months > 6) {
        penalty += 10;
      }
    }
  }

  return Math.max(0, baseScore - penalty);
}

/**
 * Stage 6: Weighted Match Score
 *
 * match = Σ(score[d] × weight[d]) / Σ(weight[d]) over SCORED dimensions only
 * Display rule: never show above 95
 */
export function stage6MatchScore(scores, weights) {
  let weightedSum = 0;
  let weightSum = 0;

  for (const dimension in scores) {
    if (scores[dimension] !== null && scores[dimension] !== undefined) {
      weightedSum += scores[dimension] * (weights[dimension] || 0);
      weightSum += weights[dimension] || 0;
    }
  }

  if (weightSum === 0) {
    return null; // No scored dimensions
  }

  const match = weightedSum / weightSum;
  return Math.min(95, Math.round(match));
}

/**
 * Stage 7: Diversity Cap
 *
 * Maximum one plan per HMO in top 3
 * Highest-scoring plan from each HMO advances
 */
export function stage7DiversityCap(rankedPlans, topN = 3) {
  const hmoSeen = new Set();
  const diverse = [];

  for (const item of rankedPlans) {
    if (diverse.length >= topN) break;

    if (!hmoSeen.has(item.hmo_id)) {
      diverse.push(item);
      hmoSeen.add(item.hmo_id);
    }
  }

  return diverse;
}

/**
 * Stage 8: Confidence
 *
 * confidence_raw = 0.40 × premium_status_weight
 *                + 0.35 × (scored_dimensions / requested_dimensions)
 *                + 0.25 × hmo_data_completeness
 *
 * HIGH ≥ 0.75, MEDIUM 0.50–0.74, LOW < 0.50
 */

export function premiumStatusWeight(premiumStatus) {
  const weights = {
    [PremiumStatus.VERIFIED_SNAPSHOT]: 1.0,
    [PremiumStatus.CURRENT]: 0.9,
    [PremiumStatus.VERIFY]: 0.8,
    [PremiumStatus.VERIFY_BEFORE_PURCHASE]: 0.7,
    [PremiumStatus.PROMOTIONAL]: 0.75,
    [PremiumStatus.POTENTIALLY_STALE]: 0.6
  };
  return weights[premiumStatus] || 0.5;
}

export function stage8Confidence(
  plan,
  scoredDimensions,
  totalDimensions,
  hmoDataCompleteness
) {
  const premiumWeight = premiumStatusWeight(plan.premium?.status);
  const dimensionRatio = totalDimensions > 0 ? scoredDimensions / totalDimensions : 0;
  const completeness = hmoDataCompleteness || 0;

  const confidence =
    0.4 * premiumWeight + 0.35 * dimensionRatio + 0.25 * completeness;

  let level;
  if (confidence >= 0.75) level = 'HIGH';
  else if (confidence >= 0.5) level = 'MEDIUM';
  else level = 'LOW';

  return {
    score: Math.round(confidence * 100) / 100,
    level,
    drivers: {
      premium_status: premiumWeight,
      scored_dimensions: `${scoredDimensions}/${totalDimensions}`,
      hmo_completeness: Math.round(completeness * 100) + '%'
    }
  };
}

/**
 * Tie-breaking (deterministic order)
 *
 * 1. Higher confidence
 * 2. Better premium status (VERIFIED > CURRENT > VERIFY > ...)
 * 3. More scored dimensions
 * 4. Lower premium
 * 5. plan_id ascending
 */
const statusOrder = {
  [PremiumStatus.VERIFIED_SNAPSHOT]: 0,
  [PremiumStatus.CURRENT]: 1,
  [PremiumStatus.VERIFY]: 2,
  [PremiumStatus.VERIFY_BEFORE_PURCHASE]: 3,
  [PremiumStatus.PROMOTIONAL]: 4,
  [PremiumStatus.POTENTIALLY_STALE]: 5
};

export function tieBreak(a, b) {
  // 1. Higher confidence
  if (a.confidence.score !== b.confidence.score) {
    return b.confidence.score - a.confidence.score;
  }

  // 2. Better premium status
  const statusA = statusOrder[a.plan.premium.status] || 999;
  const statusB = statusOrder[b.plan.premium.status] || 999;
  if (statusA !== statusB) {
    return statusA - statusB;
  }

  // 3. More scored dimensions
  const scoredA = Object.values(a.scores).filter((s) => s !== null).length;
  const scoredB = Object.values(b.scores).filter((s) => s !== null).length;
  if (scoredA !== scoredB) {
    return scoredB - scoredA;
  }

  // 4. Lower premium
  if (a.plan.premium.amount_kobo !== b.plan.premium.amount_kobo) {
    return a.plan.premium.amount_kobo - b.plan.premium.amount_kobo;
  }

  // 5. plan_id ascending
  return a.plan.plan_id.localeCompare(b.plan.plan_id);
}

/**
 * Full Pipeline
 *
 * Returns top 3 + alternatives + couldn't compare
 */
export function matchPlans(plans, assessment, hmoDataCompleteness) {
  // Stage 1
  let candidates = stage1DataEligibility(plans, assessment.customer_type);

  // Stage 2
  candidates = stage2CustomerTypeAndLives(
    candidates,
    assessment.customer_type,
    assessment.lives,
    assessment.has_seniors
  );

  // Stage 3
  const withBudgetFlag = stage3Budget(candidates, assessment.budget_per_person_kobo);

  // Stage 4
  // Extract dimensions marked as critical (10) from the original assessment
  const criticalBenefits = [];
  if (assessment.surgery === 10) criticalBenefits.push('surgery');
  if (assessment.maternity === 10) criticalBenefits.push('maternity');
  if (assessment.specialist === 10) criticalBenefits.push('specialist'); // No direct plan field, but could affect scoring
  if (assessment.drugs === 10) criticalBenefits.push('drugs');
  if (assessment.service === 10) criticalBenefits.push('service'); // No direct plan field

  const afterCritical = stage4CriticalBenefitExclusion(withBudgetFlag, criticalBenefits);

  // Stage 5: Score all dimensions
  const scored = afterCritical.map(({ plan, over_budget_flag }) => {
    const scores = {};
    let scoredDims = 0;

    // Price
    if (assessment.budget_per_person_kobo !== null && assessment.budget_per_person_kobo !== undefined) {
      scores.price = scorePrice(plan.premium.amount_kobo, assessment.budget_per_person_kobo);
      if (scores.price !== null) scoredDims++;
    } else {
      scores.price = null;
    }

    // Surgery
    const surgeryPartial = plan.surgery_major?.status === BenefitStatus.PARTIAL;
    scores.surgery = scoreSurgery(
      plan.surgery_major,
      plan.overall_limit,
      surgeryPartial
    );
    if (scores.surgery !== null) {
      scores.surgery = applyWaitingPeriodPenalty(
        scores.surgery,
        plan.waiting_periods,
        { surgery_major: assessment.surgery },
        assessment.restriction_tolerance
      );
      scoredDims++;
    }

    // Hospital Access
    scores.hospital_access = scoreHospitalAccess(plan.provider_access);
    if (scores.hospital_access !== null) scoredDims++;

    // Maternity
    const maternityPartial = plan.maternity?.status === BenefitStatus.PARTIAL;
    scores.maternity = scoreMaternity(plan.maternity, maternityPartial);
    if (scores.maternity !== null) {
      scores.maternity = applyWaitingPeriodPenalty(
        scores.maternity,
        plan.waiting_periods,
        { maternity: assessment.maternity },
        assessment.restriction_tolerance
      );
      scoredDims++;
    }

    // Unscoreable dimensions
    scores.drugs = null;
    scores.diagnostics = null;
    scores.digital = null;
    scores.wellness = null;

    // Stage 6: Match Score
    const match = stage6MatchScore(scores, assessment.priority_vector);

    // Stage 8: Confidence
    const confidence = stage8Confidence(
      plan,
      scoredDims,
      Object.keys(assessment.priority_vector).length,
      hmoDataCompleteness[plan.hmo_id] || 0
    );

    return {
      plan,
      hmo_id: plan.hmo_id,
      scores,
      match_score: match,
      confidence,
      scored_dimensions: scoredDims,
      over_budget_flag,
      audit: {
        stage_1_passed: true,
        stage_2_passed: true,
        stage_3_passed: true,
        stage_4_passed: true,
        stage_5_scored_dimensions: scoredDims
      }
    };
  });

  // Filter out plans with no match score
  const ranked = scored
    .filter((s) => s.match_score !== null)
    .sort((a, b) => {
      if (a.match_score !== b.match_score) {
        return b.match_score - a.match_score;
      }
      return tieBreak(a, b);
    });

  // Stage 7: Diversity Cap
  const top3 = stage7DiversityCap(ranked, 3);

  // Alternatives: next highest after diversity cap, up to 4
  const alternatives = ranked.slice(top3.length, top3.length + 4);

  return {
    top_3: top3,
    alternatives,
    all_ranked: Array.isArray(ranked) ? ranked : [],
    total_candidate_pool: plans.length,
    after_stage_1: stage1DataEligibility(plans, assessment.customer_type).length,
    after_stage_2: stage2CustomerTypeAndLives(
      candidates,
      assessment.customer_type,
      assessment.lives,
      assessment.has_seniors
    ).length,
    after_stage_3: withBudgetFlag.length,
    after_stage_4: afterCritical.length
  };
}

export default {
  stage1DataEligibility,
  stage2CustomerTypeAndLives,
  stage3Budget,
  stage4CriticalBenefitExclusion,
  scorePrice,
  scoreSurgery,
  scoreHospitalAccess,
  scoreMaternity,
  applyWaitingPeriodPenalty,
  stage6MatchScore,
  stage7DiversityCap,
  stage8Confidence,
  tieBreak,
  matchPlans
};
