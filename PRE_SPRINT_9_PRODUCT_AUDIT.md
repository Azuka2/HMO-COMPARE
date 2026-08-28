# PRE-SPRINT 9 PRODUCT AUDIT
## HMO Blueprint Nigeria

**Audit Date:** 2026-08-28  
**Repository:** azuka2/hmo-compare  
**Branch:** claude/hmo-blueprint-acceptance-audit-m4jfqe  
**Audit Scope:** Sprints 1-8 Implementation Acceptance & Full Product User Journey Testing

---

## EXECUTIVE SUMMARY

**STATUS: AUDIT COMPLETE**

**VERDICT: CONTINUE WITH MAJOR FIXES (Before Sprint 10)**

### Key Findings

✅ **WORKING:**
- Application server starts successfully
- API endpoints functional (/api/match, /api/dataset)
- Matching engine deterministic and consistent
- Test suite passes (62/62 tests)
- Price-based plan filtering working (after bug fix)
- Diversity cap (max 1 HMO per top-3) working
- Score ceiling enforced (max 95)
- Five personas tested successfully
- Clearline preference system in place and properly isolated
- Frontend routes defined and structure exists

❌ **CRITICAL ISSUES:**
1. **P0: Data Unit Conversion Bug** - ✅ FIXED
   - Premium prices in CSV were NGN but stored as kobo directly (100x error)
   - Fix: Multiply by 100 when converting NGN to kobo
   - Commit: 7a40f88
   - Status: Verified working

2. **P1: Sparse Benefit Data / No Personalization**
   - 77 of 86 plans have most benefit fields as UNKNOWN
   - All 5 personas receive identical top-3 recommendations
   - Reason: Only price dimension is scoreable for most plans
   - Impact: Product promise of personalization not fulfilled

3. **P1: Confidence Always LOW (0.49)**
   - All recommendations show LOW confidence
   - Correctly reflects data sparsity but concerning for users
   - Users won't trust recommendations based on price only

---

## DETAILED AUDIT FINDINGS

### Repository & Build - ✅ PASS
- Repository clean and synchronized
- All Sprints 1-8 verified in git history
- Build scripts working
- Server initializes successfully with 86 plans from 16 HMOs

### Critical Data Bug - 🔧 FIXED
**Bug:** Premium unit conversion error
- CSV: premium_ngn = 26515 (₦26,515)
- Code (WRONG): Stored as 26515 kobo (₦265.15) 
- Fix: Multiply × 100 → 2,651,500 kobo (₦26,515) ✓
- Impact on testing: Budget filtering now works, prices accurate

### Matching Engine - ✅ WORKING
- 8-stage pipeline functioning correctly
- 62 automated tests pass with no failures
- Determinism verified (100 identical runs = identical output)
- All edge cases handled (score ceiling, diversity cap, etc.)

### Five-Persona Testing - ⚠️ WORKING BUT NOT DIFFERENTIATED
All personas follow same path but get **identical top-3 results**:
1. Hygeia HMO — HyEssential (95 score, UNKNOWN surgery/maternity)
2. Bastion Health — Jade (95 score, UNKNOWN surgery/maternity)
3. Clearline HMO — Kia Kia (95 score, UNKNOWN surgery/maternity)

**Problem:** All benefit data (except price) is UNKNOWN, so priority weighting has no effect.

**Test Personas & Budgets:**
- Chidi: ₦80,000/month, price-focused → Returns price-ranked plans ✓
- Adaeze: ₦200,000/month, maternity critical → Returns same plans (can't score maternity) ✗
- Tunde: ₦150,000/month, surgery critical → Returns same plans (can't score surgery) ✗
- Mrs Okafor: ₦900,000/month, senior → Returns same plans ✗
- Emeka: ₦100,000/month, SME employer → Returns same plans ✗

### Data Quality Assessment - ❌ FAIL
**Benefit Coverage:**
- Price (NGN): 100% of plans
- Surgery amount: ~30% of plans have KNOWN amounts
- Maternity amount: ~35% of plans have KNOWN amounts
- Hospital access tiers: ~20% have tier data populated
- Provider access system: UNKNOWN for most
- Medication coverage: 0% (hardcoded UNKNOWN)
- Diagnostics coverage: 0% (hardcoded UNKNOWN)

**Impact:** Personalization impossible. System reduces to price-only recommendation engine.

### Confidence Levels - ⚠️ CONCERNING
All results: Confidence = LOW (0.49)

Components:
- Premium source: VERIFIED ✓
- Scoreable dimensions: 1/8 ❌
- HMO data completeness: ~18% ❌

**User Impact:** Recommendations feel unreliable despite being technically sound.

### Clearline Preference Audit - ✅ PASS
- Properly isolated in `src/engine/preferences.js`
- Currently disabled (not applied)
- Configuration transparent and auditable
- No scattered Clearline-specific logic in other modules
- Preference audit trail working

### Frontend - ⚠️ PARTIALLY TESTED
- Routes defined: ✓ (landing, assessment, profile, results, comparison, gap calculator, about, learn)
- SPA structure: ✓ (159KB HTML with embedded JS)
- Not tested in actual browser (environment limitation)

### Test Suite - ✅ MOSTLY PASS
```
matching.test.js:  62/62 tests PASS ✓
assessment.test.js: Skipped (uses Jest syntax, needs migration)
Overall: ✅ PASS
```

---

## PRIORITIZED ISSUES & FIXES

### P0 - Critical (Blocks Launch)
**Issue:** Data unit conversion (NGN vs kobo)
- **Status:** ✅ FIXED (Commit 7a40f88)
- **Testing:** Verified - prices now correct

### P1 - Major (Must Fix Sprint 10)
**Issue 1:** Sparse benefit data
- Only price is scoreable for ~90% of plans
- **Fix:** Complete benefit data collection from HMOs
- **Timeline:** 1-2 weeks research/data entry
- **Validation:** Test personas should get different results

**Issue 2:** Personalization broken
- All 5 personas get identical recommendations
- **Root cause:** Insufficient benefit data to differentiate
- **Fix:** Either complete data or adjust product positioning
- **Impact:** Product premise depends on this

**Issue 3:** Confidence always LOW**
- Users see LOW confidence on all recommendations
- **Root cause:** Data sparsity reduces scoring dimensions
- **Fix:** Complete data OR adjust confidence model/messaging

### P2 - Moderate (Should Fix)
**Issue 1:** Assessment test file not running
- Uses Jest syntax, Node.js tests expect native syntax
- **Fix:** Migrate assessment.test.js to Node.js native test API
- **Timeline:** 2-4 hours

**Issue 2:** Provider access tiers not populated
- Hospital access scores default to LOW
- **Fix:** Collect hospital tier classifications
- **Timeline:** 1 week research

**Issue 3:** Source links placeholder
- All evidence links point to example.com
- **Fix:** Add real source URLs
- **Timeline:** 3-5 days

### P3 - Minor (Nice to Have)
**Issue 1:** Waiting period year-one calculation
- Known limitation (documented as expected)
- **Timeline:** Future phase

**Issue 2:** Frequency-based benefit calculation
- Known limitation (documented as expected)
- **Timeline:** Future phase

---

## WHAT SHOULD NOT BE REBUILT

These are working well enough for Sprint 10 to enhance:

1. **Matching Engine** - Correct 8-stage pipeline, deterministic, handles edge cases
2. **Priority Vector** - Correctly weights user inputs with modifiers
3. **Assessment Framework** - 22-question structure exists with state persistence
4. **Server/API** - Clean, simple HTTP interface, proper CORS
5. **Data Loading** - CSV parser and validation framework in place

**Action:** Enhance these, don't rebuild. Focus Sprint 10 on data and frontend verification.

---

## SPRINT 10 PRIORITIES

### Must Have (P0/P1)
1. **Complete Benefit Data** - Research/collect for 50+ plans (1-2 weeks)
2. **Verify Personalization Works** - Test with complete data (3 days)
3. **Fix Assessment Tests** - Migrate to Node.js native syntax (4 hours)

### Should Have (P2)
4. **Browser Frontend Testing** - Verify all routes work (2-3 days)
5. **Mobile Responsiveness** - Test at 360px-1440px (2 days)
6. **Provider Data** - Hospital tier classifications (1 week)
7. **Source Links** - Real URLs for evidence (3-5 days)

### Could Have (P3)
8. **Waiting Period Integration** - If time permits
9. **Frequency Benefit Support** - Future phase

---

## FINAL DECISION

**VERDICT: CONTINUE WITH MAJOR FIXES**

✅ **Continue building** - Core engine is sound and working
🔧 **Fix before launch** - Data sparsity and personalization
⚠️ **Don't ship yet** - Needs complete benefit data

**Timeline:** 3-4 weeks with parallel data collection workstream

---

## AUDIT COMPLETION

- [x] Repository health
- [x] Build & startup
- [x] API endpoints
- [x] Data validation
- [x] Test suite (62/62 pass)
- [x] Matching engine
- [x] Five personas
- [x] Clearline audit
- [x] Frontend structure
- [x] Critical bugs fixed
- [x] Data quality assessment
- [x] Sprint 10 priorities defined

**Audit Date:** 2026-08-28  
**Status:** COMPLETE  
**Next Phase:** Sprint 10 planning with focus on data completion
