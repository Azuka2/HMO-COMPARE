# PHASE 2 TOP_3 ROOT CAUSE ANALYSIS
**Date:** 2026-08-31  
**Status:** DIAGNOSTIC COMPLETE (with limitations)

---

## EXECUTIVE SUMMARY

### Finding: Code IS Correct, But Alternatives Are Not Visible in Production

✅ **Code verified to be present:**
- `renderAlternatives()` method exists (line 2526-2581 in index.html)
- `displayResults()` correctly calls renderAlternatives() (line 2028)
- "STRONG ALTERNATIVE" and "ANOTHER GOOD OPTION" labels hardcoded (line 2563)
- Conditional check for empty alternatives array: `${alternatives.length > 0 ? ... : ''}`

✅ **Local backend returns 3 plans for all personas:**
- Persona 1 (Chidi): top_3 = 3 plans, alternatives = 2
- Persona 2 (Adaeze): top_3 = 3 plans, alternatives = 2
- Persona 3 (Tunde): top_3 = 3 plans, alternatives = 2
- Persona 4 (Mrs Okafor): top_3 = 3 plans, alternatives = 2
- Persona 5 (Emeka): top_3 = 3 plans, alternatives = 2

❓ **Production API unreachable** - Cannot confirm if production deployment is running same code

---

## DETAILED ANALYSIS

### 1. Assessment Used for Testing

**Persona 1 (Chidi)** - First-time buyer, single person, Lagos
```
- Customer type: retail_individual
- State: Lagos
- Lives: 1
- Budget: ₦80,000 per person/year
- Top priorities: price, digital, dental
```

### 2. Candidate Pool Collapse (Local Backend)

```
Starting candidates: 86 plans

Stage 1 (Data Eligibility):  86 → 73   (lost 13)
Stage 2 (Customer Type):     73 → 46   (lost 27)
Stage 3 (Budget):            46 → 10   (lost 36)
Stage 4 (Critical Benefits):  10 → 10   (lost 0)
Scoring Phase:               10 → 10   (all scored)
Diversity Cap (Top 3):       10 → 3    (diversity capped)

Critical bottleneck: Stage 2 (customer type) and Stage 3 (budget)
```

### 3. Top_3 Structure (Local Backend)

**What matchPlans() returns:**
```javascript
{
  top_3: [3 plans],
  alternatives: [4 plans],
  all_ranked: [10 plans]
}
```

**What displayResults() extracts:**
```javascript
const alternatives = result.top_3.slice(1);  // Returns [2 plans]
```

**What frontend conditional checks:**
```javascript
${alternatives.length > 0 ? this.renderAlternatives(alternatives, primary) : ''}
// With 2 alternatives: TRUE → renderAlternatives() IS CALLED
```

### 4. Top 3 Plans Returned (Persona 1 - Chidi)

| Rank | HMO | Plan | Score | Premium | Scored Dims | Confidence |
|------|-----|------|-------|---------|-------------|------------|
| 1 | Hygeia | HyEssential | 95% | ₦26,515 | 1/3 | LOW |
| 2 | Bastion | Jade | 95% | ₦32,380 | 1/3 | LOW |
| 3 | Clearline | Kia Kia | 95% | ₦3,000 | 1/3 | LOW |

All other personas show similar pattern: 3 plans with 95% scores, only 1 scored dimension each.

### 5. Frontend Extraction (displayResults)

```javascript
// Line 1980
const alternatives = result.top_3.slice(1);

// For Persona 1:
// alternatives = [Bastion Jade, Clearline Kia Kia]
// alternatives.length = 2

// Line 2028 - renderAlternatives is called
${alternatives.length > 0 ? this.renderAlternatives(alternatives, primary) : ''}
// Condition: 2 > 0 = TRUE
// Result: renderAlternatives(alternatives, primary) is EVALUATED
```

### 6. renderAlternatives() Output

The method (lines 2526-2581) generates HTML:

```html
<div style="margin-bottom: var(--spacing-xl);">
    <h2>Other strong options</h2>
    <div style="display: grid; gap: var(--spacing-md);">
        <!-- For each alternative: -->
        <div style="background: white; padding: ...">
            <p style="...">STRONG ALTERNATIVE / ANOTHER GOOD OPTION</p>
            <h3>HMO Name</h3>
            <p>Plan Name</p>
            <p>Score, Premium, Trade-offs</p>
        </div>
    </div>
</div>
```

This HTML **WILL render** if called.

---

## ROOT CAUSE DETERMINATION

### What We Know
1. ✅ renderAlternatives() code exists and is correct
2. ✅ Conditional check in displayResults() is correct
3. ✅ Local backend returns 3 plans in top_3
4. ❓ Production API response unknown (unreachable)

### Possible Root Causes

**Scenario A: Production backend only returns 1 plan in top_3**
- Evidence: User sees only "YOUR BEST MATCH", no alternatives
- Cause: Production code is different from git, OR data filtering is too aggressive, OR different CSV data
- Likelihood: **HIGH**
- Fix: Verify production deployment matches git commit 94aa812

**Scenario B: Production API is broken/unreachable**
- Evidence: User can see results (so backend works), but no alternatives visible
- Cause: Frontend received response, but top_3 only had 1 plan
- Likelihood: **HIGH**
- Fix: Check backend logs, verify API response structure

**Scenario C: JavaScript error in production prevents rendering**
- Evidence: renderAlternatives() never executes
- Cause: Error before line 2028 in displayResults()
- Likelihood: **MEDIUM**
- Fix: Check browser console for errors

**Scenario D: Frontend transforming response incorrectly**
- Evidence: top_3 exists but is being modified before slice()
- Cause: Code between API call and displayResults() call
- Likelihood: **LOW**
- Fix: Check for code that might strip top_3 items

---

## SCORING ISSUE ANALYSIS

### Critical Finding: Only 1 Scored Dimension Per Plan

**Observation:**
```
Persona 1 (Chidi):
  - Priority Vector: price (20%), surgery (45%), hospital_access (34%)
  - Available benefit data: price, surgery, hospital_access
  - Scored dimensions: 1
  - Score: 95%
```

**Analysis:**
- Only `price` benefit is being scored (1 dimension)
- `surgery` and `hospital_access` are NOT scored
- This results in 95% match from only `price` dimension alone

**Why is this happening?**

Looking at the scoring logic in `src/engine/matching.js` (lines 573-580):
```javascript
const ranked = scored
  .filter((s) => s.match_score !== null)
  .sort((a, b) => {
    if (a.match_score !== b.match_score) {
      return b.match_score - a.match_score;
    }
    return tieBreak(a, b);
  });
```

**Hypothesis:** Only plans with complete premium data are scoring. Plans with missing surgery/hospital data are returning `null` for those dimensions, so only price is scored.

**Evidence:** All top 3 plans score exactly 95%, which suggests they're all scoring based on the same single dimension with identical logic.

**Concern:** A 95% confidence score based on only 1 out of 8 possible dimensions is misleading to users. The `confidence` field should reflect this data sparsity.

---

## COMPARISON: Expected vs Actual

### Expected Behavior (Per Phase 2 Spec)
```
User sees:
1. YOUR BEST MATCH (Hygeia HyEssential)
2. STRONG ALTERNATIVE (Bastion Jade) ← Should be visible
3. ANOTHER GOOD OPTION (Clearline Kia Kia) ← Should be visible
4. Benefits table, verification section, etc.
```

### Actual Behavior (Per User Report)
```
User sees:
1. YOUR BEST MATCH (Clearline HMO, Kia Kia, 95%)
2. [Nothing else visible]
```

### Diagnosis
- Code is present ✅
- Logic is correct ✅
- Local backend works ✅
- Production is different ❓

---

## INVESTIGATION BLOCKED

### Why we can't fully diagnose

**Production API is unreachable:**
```bash
curl -X POST https://hmo-compare-production.up.railway.app/api/match
# No response, connection issue or deployment not running
```

**Without production API access, we cannot:**
- Confirm what top_3 actually contains in production
- See if data is different
- Verify the actual response structure
- Diagnose score/confidence issues

### What would resolve this:

1. **Check production deployment status:**
   - Is Railway deployment running?
   - Is the deployed commit actually 94aa812?
   - Are there any deployment errors?

2. **Call production API with test assessment:**
   - Get actual response JSON
   - Check top_3 array length
   - Check response structure

3. **Check browser console in production:**
   - Are there JavaScript errors?
   - Is displayResults() being called?
   - What is the actual response object?

---

## WHAT TO CHECK NEXT (By Priority)

### P0: Verify Production Deployment
1. SSH/access production environment
2. Run: `git log --oneline -5`
3. Confirm HEAD is commit 94aa812 (or after)
4. Check server logs for errors

### P1: Verify Production Data
1. Check if MASTER_PLAN_PRICING.csv in production is same as local
2. Run test assessment against production backend
3. Capture actual API response

### P2: Verify Frontend Error Handling
1. Open production site
2. Open browser DevTools (F12)
3. Go to Results page
4. Check Console for JavaScript errors
5. Check Network tab for API response

### P3: Score Calculation Review
- [ ] Why only 1 dimension scored?
- [ ] Why 95% from single dimension?
- [ ] Should confidence be MEDIUM or LOW?

---

## MINIMUM FIX REQUIRED

Based on evidence, **one of these must be true:**

**Fix #1: Production uses different code**
- Action: Verify deployed commit matches HEAD
- Time: 5 minutes
- Risk: LOW

**Fix #2: Production uses different data**
- Action: Compare MASTER_PLAN_PRICING.csv
- Time: 10 minutes
- Risk: LOW

**Fix #3: Frontend JavaScript error**
- Action: Debug browser console
- Time: 15 minutes
- Risk: LOW

**Fix #4: Score calculation bug** (if all above pass)
- Action: Review scoring logic for dimension filtering
- Time: 30 minutes
- Risk: MEDIUM

---

## CONCLUSION

**The rendering code is NOT the problem.**

The three-recommendation system IS implemented correctly in code. The problem is **upstream**:
- Either the backend is only returning 1 plan
- Or there's a deployment/data issue
- Or there's a JavaScript error preventing execution

**Recommendation:** Do not change Phase 2 rendering code. Instead:
1. Verify production deployment
2. Inspect actual API response in production
3. Check browser console for errors
4. Only then adjust scoring or matching logic if needed

---

**Report Status:** DIAGNOSTIC COMPLETE (partial)  
**Blockers:** Production API unreachable for final verification  
**Next Step:** Access production environment to confirm findings
