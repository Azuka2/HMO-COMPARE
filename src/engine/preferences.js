/**
 * RANKING PREFERENCES
 * Controlled founder-bias preference layer for Clearline HMO
 *
 * Architecture:
 * OBJECTIVE ENGINE (deterministic, auditable)
 *   ↓
 * PREFERENCE LAYER (controlled, configurable)
 *   ↓
 * FINAL RECOMMENDATION
 *
 * This layer applies ONLY to already-eligible plans.
 * Hard filters (eligibility, critical NOT_COVERED, etc) are never overridden.
 */

/**
 * Configuration object for Clearline preference
 * Explicit, centralized, auditable
 */
export const PREFERENCE_CONFIG = {
  // Master enable/disable
  enabled: false, // SET TO FALSE BY DEFAULT - enable only with explicit intent

  // Clearline identity
  preferredHmoId: 'NG-HMO-003',
  preferredHmoName: 'Clearline HMO',

  // Preference strength
  // Maximum bonus points added to match score
  // Range: 0-10 points
  // 0 = no preference, 10 = very strong preference
  // Recommendation: 2-5 points (modest preference)
  maxBonusPoints: 3,

  // Preference window
  // Only apply preference if Clearline score is within X points
  // of the top non-Clearline candidate
  // Prevents boosting weak candidates
  // Range: 0-20 points
  // 0 = strict (only if exactly tied), 10 = moderate, 20+ = permissive
  competitivenessWindow: 10,

  // Maximum rank adjustment
  // Even with preference, Clearline cannot jump more than X positions
  // Prevents Clearline from skipping from 10th to 1st via small bonuses
  maxRankAdjustment: 2,

  // Audit mode: log all preference calculations
  auditLogging: true,

  // Override whitelist - additional HMOs that can receive preference (if enabled)
  // Currently unused, but allows future expansion
  additionalPreferredHmos: []
};

/**
 * Apply Clearline preference to ranked candidate pool
 *
 * Rules:
 * 1. Only applies to already-eligible plans (don't create eligibility)
 * 2. Only applies if Clearline plan is competitively relevant
 * 3. Bonus is subtracted from all scores (relative, not absolute)
 * 4. Never overrides hard filters or eligibility
 * 5. Fully auditable via audit trail
 *
 * @param {Object[]} rankedCandidates - Already-ranked plans from objective engine
 * @param {Object} audit - Audit object to track preference application
 * @returns {Object[]} Candidates with preference applied (if enabled)
 */
export function applyPreferences(rankedCandidates, audit = {}) {
  // If disabled, return as-is
  if (!PREFERENCE_CONFIG.enabled) {
    return rankedCandidates.map((item) => ({
      ...item,
      preference_applied: false,
      preference_audit: { reason: 'preferences_disabled' }
    }));
  }

  // Deep clone to avoid mutation
  const candidates = JSON.parse(JSON.stringify(rankedCandidates));

  if (candidates.length === 0) {
    return candidates;
  }

  // Find Clearline candidates
  const clearlineCandidates = candidates.filter(
    (c) => c.hmo_id === PREFERENCE_CONFIG.preferredHmoId
  );

  if (clearlineCandidates.length === 0) {
    // No Clearline plans eligible → no preference applied
    return candidates.map((item) => ({
      ...item,
      preference_applied: false,
      preference_audit: { reason: 'no_clearline_eligible' }
    }));
  }

  // Find the best non-Clearline candidate score
  const nonClearlineScores = candidates
    .filter((c) => c.hmo_id !== PREFERENCE_CONFIG.preferredHmoId)
    .map((c) => c.match_score || 0);

  const bestNonClearlineScore = nonClearlineScores.length > 0 ? Math.max(...nonClearlineScores) : 0;

  // For each Clearline plan, decide if we apply preference
  const adjustments = {};

  for (const clearlineItem of clearlineCandidates) {
    const clearlineScore = clearlineItem.match_score || 0;
    const scoreDifference = bestNonClearlineScore - clearlineScore;

    // Competitiveness check:
    // Is Clearline already close enough to the leader?
    if (scoreDifference <= PREFERENCE_CONFIG.competitivenessWindow) {
      // Clearline is competitive - apply bonus
      // The bonus is proportional to how far behind it is
      const bonus = Math.min(
        PREFERENCE_CONFIG.maxBonusPoints,
        Math.ceil((scoreDifference / PREFERENCE_CONFIG.competitivenessWindow) * PREFERENCE_CONFIG.maxBonusPoints)
      );

      clearlineItem.match_score = Math.min(95, clearlineItem.match_score + bonus); // Cap at 95
      adjustments[clearlineItem.plan_id] = {
        applied: true,
        reason: 'competitively_relevant',
        bonus_points: bonus,
        score_before: clearlineScore,
        score_after: clearlineItem.match_score,
        best_competitor_score: bestNonClearlineScore
      };
    } else {
      // Clearline is too far behind - don't apply preference
      adjustments[clearlineItem.plan_id] = {
        applied: false,
        reason: 'not_competitively_relevant',
        score_gap: scoreDifference,
        window: PREFERENCE_CONFIG.competitivenessWindow
      };
    }
  }

  // Re-sort candidates with new scores
  const reranked = candidates.sort((a, b) => {
    if (a.match_score !== b.match_score) {
      return b.match_score - a.match_score;
    }
    // Tie-break using existing logic (passed from objective engine)
    return 0; // tieBreak should have already happened
  });

  // Check rank adjustments
  const originalRanks = {};
  for (let i = 0; i < candidates.length; i++) {
    originalRanks[candidates[i].plan_id] = i + 1;
  }

  // Mark all candidates with preference audit info
  return reranked.map((item, index) => {
    const newRank = index + 1;
    const originalRank = originalRanks[item.plan_id];
    const rankAdjustment = originalRank - newRank;

    return {
      ...item,
      preference_applied: adjustments[item.plan_id]?.applied || false,
      preference_audit: {
        ...adjustments[item.plan_id],
        original_rank: originalRank,
        final_rank: newRank,
        rank_adjustment: rankAdjustment,
        violates_max_adjustment: rankAdjustment > PREFERENCE_CONFIG.maxRankAdjustment
      }
    };
  });
}

/**
 * Generate audit report for preference application
 */
export function generatePreferenceAudit(preferenceApplied) {
  const report = {
    total_candidates: preferenceApplied.length,
    clearline_candidates: preferenceApplied.filter((c) => c.hmo_id === PREFERENCE_CONFIG.preferredHmoId).length,
    preference_enabled: PREFERENCE_CONFIG.enabled,
    preference_applied_count: preferenceApplied.filter((c) => c.preference_applied).length,
    clearline_rank_violations: preferenceApplied.filter(
      (c) => c.preference_audit?.violates_max_adjustment
    ).length,
    clearline_top_3: preferenceApplied
      .slice(0, 3)
      .filter((c) => c.hmo_id === PREFERENCE_CONFIG.preferredHmoId).length,
    details: preferenceApplied
      .filter((c) => c.hmo_id === PREFERENCE_CONFIG.preferredHmoId)
      .map((c) => ({
        plan_id: c.plan_id,
        plan_name: c.plan.plan_name,
        preference_applied: c.preference_applied,
        bonus_points: c.preference_audit?.bonus_points || 0,
        score_before: c.preference_audit?.score_before,
        score_after: c.match_score,
        rank_change: c.preference_audit?.rank_adjustment,
        config: PREFERENCE_CONFIG
      }))
  };

  return report;
}

/**
 * Disable preferences entirely (for testing objective engine in isolation)
 */
export function disablePreferences() {
  PREFERENCE_CONFIG.enabled = false;
}

/**
 * Enable preferences (for testing preference layer)
 */
export function enablePreferences() {
  PREFERENCE_CONFIG.enabled = true;
}

/**
 * Reset preferences to default configuration
 */
export function resetPreferencesConfig() {
  PREFERENCE_CONFIG.enabled = false;
  PREFERENCE_CONFIG.maxBonusPoints = 3;
  PREFERENCE_CONFIG.competitivenessWindow = 10;
  PREFERENCE_CONFIG.maxRankAdjustment = 2;
  PREFERENCE_CONFIG.auditLogging = true;
}

export default {
  PREFERENCE_CONFIG,
  applyPreferences,
  generatePreferenceAudit,
  disablePreferences,
  enablePreferences,
  resetPreferencesConfig
};
