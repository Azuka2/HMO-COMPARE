# PRODUCTION DIVERGENCE FIX REPORT
**Date:** 2026-08-31  
**Status:** AWAITING RAILWAY VERIFICATION

---

## GitHub STATE (VERIFIED)

| Component | Value |
|-----------|-------|
| **Current HEAD** | 59f350e |
| **Phase 2 Merge** | 94aa812 ✓ |
| **Phase 2 Implementation** | 353aaf2 ✓ |
| **Phase 2 Acceptance** | 252de41 ✓ |
| **Dataset Status** | 100 rows, 86 valid plans |
| **Code Status** | Phase 2 renderAlternatives() present |
| **Clearline Preference** | Disabled (PREFERENCE_CONFIG.enabled = false) |

✅ GitHub main is CORRECT and up-to-date

---

## RAILWAY DEPLOYMENT (AWAITING VERIFICATION)

### What to Check

1. **Go to:** https://railway.app
2. **Select:** HMO-COMPARE project
3. **View:** Service → Deployment History
4. **Note:** Current deployed commit hash

### Expected (if correct):
```
Deployed commit: 94aa812 (or later on main)
Branch: main
Status: Success
```

### If Mismatch Found:
```
Deployed commit: [OLDER COMMIT - details below]
Branch: [possibly different branch]
Status: [possible error]
```

---

## LOCAL vs PRODUCTION COMPARISON (PENDING)

### Local Backend Result (VERIFIED)
```
Payload: customer_type=couple, budget=₦300k, lives=9
Candidates: 3
Top 3:
  1. Clearline HMO - Kia Kia
  2. Hygeia - HyEssential  
  3. Bastion - Jade
```

### Production Result (FROM LIVE REQUEST)
```
Payload: same as local
Candidates: 1
Top 3:
  1. Clearline HMO - Kia Kia
```

### Analysis
- LOCAL: 3 candidates
- PRODUCTION: 1 candidate
- **MISMATCH: YES**

---

## POSSIBLE CAUSES & FIXES

### Scenario A: Wrong Deployed Commit (MOST LIKELY)

**Symptom:** Railway showing commit before Phase 2 merge

**Fix:** Redeploy main branch
```bash
# In Railway dashboard:
# 1. Select HMO-COMPARE service
# 2. Click "Redeploy" on latest main
# 3. Or: Connect to main branch and trigger new build
```

### Scenario B: Stale Docker Image (MEDIUM LIKELIHOOD)

**Symptom:** Correct commit but old code running

**Fix:** Clear Railway cache and rebuild
```bash
# In Railway dashboard:
# 1. Go to Service Settings
# 2. Clear build cache
# 3. Trigger rebuild
```

### Scenario C: Different Dataset in Production (LOW LIKELIHOOD)

**Symptom:** Different plan count, different premiums

**Check:** Verify production has same MASTER_PLAN_PRICING.csv
```bash
# In production environment:
wc -l MASTER_PLAN_PRICING.csv
grep "Kia Kia" MASTER_PLAN_PRICING.csv
```

### Scenario D: Environment Variable Issue (LOW LIKELIHOOD)

**Symptom:** Correct code but wrong config

**Check:** Production environment variables match local setup

---

## DEPLOYMENT VERIFICATION CHECKLIST

### Before Fix
- [ ] Railway deployed commit documented
- [ ] Railway build status checked
- [ ] Dataset row count verified (should be 100)
- [ ] Kia Kia premium verified (should be ₦3,000)

### During Fix
- [ ] Redeploy to main (or fix config)
- [ ] Wait for Railway build to complete
- [ ] Verify no build errors in logs

### After Fix
- [ ] Railway deployment successful
- [ ] New commit deployed (94aa812 or later)
- [ ] Test exact payload locally
- [ ] Test exact payload on production

---

## POST-DEPLOYMENT VERIFICATION

### 1. Automated Test (Local)
```bash
# Run exact payload
node production-forensic.js
# Expected output: 3 candidates
```

### 2. Production Test (Browser)
```
URL: https://hmo-compare-production.up.railway.app/
Assessment inputs:
  - customer_type: couple
  - state: Anambra
  - budget: ₦300,000
  - lives: 9
  
Expected Results Page:
  ✓ YOUR BEST MATCH (Clearline Kia Kia)
  ✓ STRONG ALTERNATIVE (Hygeia HyEssential)
  ✓ ANOTHER GOOD OPTION (Bastion Jade)
```

### 3. API Verification
```bash
curl -X POST https://hmo-compare-production.up.railway.app/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "assessment": {
      "customer_type": "couple",
      "state": "Anambra",
      "budget_total": 300000,
      "lives": 9,
      ...
    }
  }'

Expected response:
{
  "top_3": [
    { "plan": { "hmo_name": "Clearline HMO", "plan_name": "Kia Kia" }, ... },
    { "plan": { "hmo_name": "Hygeia", "plan_name": "HyEssential" }, ... },
    { "plan": { "hmo_name": "Bastion", "plan_name": "Jade" }, ... }
  ],
  "total_candidates": 3
}
```

---

## IDENTIFIED ISSUES (To Document, Not Fix Yet)

### Issue 1: Score Transparency
- **Current:** 95% scored on 1 of 8 priorities
- **Problem:** Misleading confidence score
- **Status:** DOCUMENTED, defer to Phase 3
- **Do NOT fix:** During this deployment verification

### Issue 2: Budget + Lives Inconsistency
- **Current:** customer_type=couple (2 people) + lives=9 (contradiction)
- **Problem:** Confusing user input
- **Status:** DOCUMENTED, defer to assessment UX improvements
- **Do NOT fix:** During this deployment verification

### Issue 3: Kia Kia Pricing
- **Current:** ₦3,000/person/year (suspiciously low)
- **Problem:** Verification needed in source data
- **Status:** DOCUMENTED
- **Do NOT change:** During this deployment verification

---

## FINAL FIX SUMMARY

### What Changed
```
BEFORE: Production deployed [UNKNOWN COMMIT] with 1 candidate
AFTER: Production deployed [VERIFIED COMMIT] with 3 candidates
```

### What Did NOT Change
```
✓ Matching engine logic (same)
✓ Scoring formula (same)
✓ Clearline neutrality (preserved)
✓ UI rendering (same)
✓ Assessment questions (same)
```

### Root Cause
Production diverged from main due to:
- Wrong deployed commit, OR
- Stale build cache, OR
- Dataset mismatch

### Verification Method
Single test: Same payload → 3 candidates

---

**Report Status:** PENDING RAILWAY VERIFICATION  
**Next Step:** Check Railway deployed commit, redeploy if needed  
**Timeline:** ~5-10 minutes to verify and redeploy
