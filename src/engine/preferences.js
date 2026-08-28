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
 * NEUTRALIZED: This function now returns candidates unchanged.
 * All Clearline ranking preference has been removed to ensure neutral ranking.
 *
 * Clearline plans are ranked based ONLY on:
 * - User eligibility
 * - Match score calculation
 * - Objective benefit alignment
 *
 * No preference bonus is applied to any HMO.
 *
 * @param {Object[]} rankedCandidates - Already-ranked plans from objective engine
 * @returns {Object[]} Candidates unchanged (no preference applied)
 */
export function applyPreferences(rankedCandidates) {
  // Return candidates exactly as ranked by the objective engine
  // No preference bonus applied to Clearline or any other HMO
  // This ensures neutral, unbiased ranking based on user needs
  return rankedCandidates.map((item) => ({
    ...item,
    preference_applied: false,
    preference_audit: { reason: 'no_preference_applied_ranking_is_neutral' }
  }));
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
