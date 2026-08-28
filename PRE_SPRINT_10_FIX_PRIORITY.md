# PRE-SPRINT 10 FIX PRIORITY LIST
## HMO Blueprint Nigeria

**Based on:** Pre-Sprint 9 Product Audit  
**Date:** 2026-08-28  
**Status:** Ready for Sprint 10 Planning

---

## MUST FIX BEFORE SPRINT 10 CAN SHIP

### 1. Complete Benefit Data Collection
**Severity:** P1 - CRITICAL  
**Issue:** 77% of plans missing benefit data (surgery, maternity, overall_limit)  
**Impact:** Personalization completely broken; all users get identical recommendations  
**Current State:** Only price is scoreable for ~90% of plans  
**User Impact:** Product doesn't deliver promised personalization  

**Required Data:**
- Overall plan limit (₦X) for 50+ plans
- Surgery major benefit limit (₦X) for 50+ plans  
- Maternity benefit limit (₦X) for 30+ plans
- Hospital access tiers/classifications
- Provider network information

**Estimated Effort:** 1-2 weeks (research or HMO outreach)  
**Success Criteria:**
- ≥50% of plans have surgery data populated
- ≥50% of plans have maternity data populated  
- ≥50% of plans have hospital tier data populated
- Five personas produce DIFFERENT top-3 results

**Owner:** Data Research Team  
**Timeline:** Start immediately, parallel to dev

---

### 2. Verify Personalization Actually Works
**Severity:** P1 - CRITICAL  
**Issue:** Need to prove that with better data, recommendations differentiate  
**Impact:** Validates entire product premise  
**Current State:** All 5 personas get identical top-3 despite different priorities  

**Test Protocol:**
```
Run each persona through matching engine with 100% complete data:
1. Chidi (price-focused) → Should get budget-friendly plans
2. Adaeze (maternity critical) → Should prioritize maternity benefits
3. Tunde (surgery critical) → Should prioritize surgery benefits
4. Mrs Okafor (senior, hospital access) → Should prioritize access
5. Emeka (SME employer) → Should consider group benefits

Success = Different top-3 results for different personas
```

**Estimated Effort:** 3-5 days  
**Success Criteria:** At least 3 personas have different top-3 results  
**Owner:** QA/Test Team  
**Timeline:** After data collection phase 1

---

### 3. Fix Assessment Test Suite
**Severity:** P1 - MAJOR  
**Issue:** assessment.test.js uses Jest syntax; doesn't run with Node.js native tests  
**Impact:** Test suite incomplete; QA gaps  
**Current State:** 62/62 matching tests pass, but assessment tests skipped  

**Required Changes:**
- Migrate from Jest describe/it to Node.js native test (or use test runner)
- Ensure all assessment logic gets test coverage
- Validate 22-question handling

**Estimated Effort:** 2-4 hours  
**Success Criteria:** All tests run and pass  
**Owner:** Dev Team  
**Timeline:** Start of Sprint 10

---

## SHOULD FIX DURING SPRINT 10

### 4. Provider Access Data Collection
**Severity:** P2 - MAJOR  
**Issue:** Hospital access tiers empty for all plans (UNKNOWN)  
**Impact:** Hospital access scoring broken; second-most important dimension can't work  
**Current State:** tiers array empty for 99% of plans  

**Required Data:**
- Hospital tier classifications (Tier A, B, C, D, etc.)
- Named facility lists
- Regional coverage

**Estimated Effort:** 1 week  
**Success Criteria:** 50+ plans have populated tiers; hospital_access scores above null  
**Owner:** Data Research Team  
**Timeline:** Parallel with other data work

---

### 5. Real Source Links Integration
**Severity:** P2 - MAJOR  
**Issue:** All evidence links point to 'https://www.example.com'  
**Impact:** Users can't verify claims; trust risk  
**Current State:** Placeholder URLs only  

**Required Data:**
- Real source URLs for each plan's evidence
- Verify links are still valid/accessible
- Document any inaccessible sources

**Estimated Effort:** 3-5 days  
**Success Criteria:** Real URLs in data, links verified as working  
**Owner:** Data Team  
**Timeline:** Mid-Sprint 10

---

### 6. Frontend Browser Testing
**Severity:** P2 - MAJOR  
**Issue:** Frontend not tested in actual browser  
**Impact:** Unknown functionality/layout issues possible  
**Current State:** Routes defined, not verified in browser  

**Test Checklist:**
- [ ] Landing page loads and displays correctly
- [ ] Assessment flow: Q1-Q22 all render and answer controls work
- [ ] Navigation: Next/Back/Skip all functional
- [ ] Answer persistence: Refresh browser doesn't lose answers
- [ ] Profile calculation: Shows correct priority vector
- [ ] Results loading: Matching engine called, results displayed
- [ ] Comparison mode: Can add/remove/select 2-3 plans
- [ ] Coverage gap: Calculator works with different requirements
- [ ] About/Learn pages: Load and display correctly
- [ ] Links: WhatsApp, WellnessOS, social media work

**Estimated Effort:** 2-3 days  
**Success Criteria:** All routes working, no console errors  
**Owner:** QA/Frontend Team  
**Timeline:** Early-mid Sprint 10

---

### 7. Mobile Responsiveness Testing
**Severity:** P2 - MAJOR  
**Issue:** Mobile testing not performed  
**Impact:** App unusable on phones (primary user device)  
**Current State:** Responsive design CSS in place, not verified  

**Test Viewports:**
- 360px (small phone)
- 390px (standard phone)
- 768px (tablet)
- 1024px (desktop)
- 1440px (wide desktop)

**Checklist:**
- [ ] No horizontal overflow at any viewport
- [ ] Buttons/inputs 44px+ minimum touch target
- [ ] Text readable without zooming
- [ ] Assessment controls work at 360px
- [ ] Results cards readable on mobile
- [ ] Comparison table scrolls properly on mobile

**Estimated Effort:** 2 days  
**Success Criteria:** No layout issues at any viewport  
**Owner:** QA/Frontend Team  
**Timeline:** Mid-Sprint 10

---

### 8. Confidence Model Review
**Severity:** P2 - MODERATE  
**Issue:** All recommendations show CONFIDENCE: LOW (0.49)  
**Impact:** Users won't trust recommendations despite being technically sound  
**Current State:** Low confidence correctly reflects data sparsity  

**Options:**
A) Recalibrate confidence model to account for sparse-data scenarios
B) Adjust UI messaging to explain why confidence is low
C) Both A and B

**Decision Required:** Product team to decide approach  
**Estimated Effort:** 2-3 days  
**Success Criteria:** Users understand why confidence is low OR confidence score improves with better data  
**Owner:** Product/Dev Team  
**Timeline:** Mid-to-late Sprint 10

---

## NICE TO FIX (If Time Permits)

### 9. Waiting Period Year-One Integration
**Severity:** P3 - NICE TO HAVE  
**Issue:** Waiting periods not included in year-one coverage gap calculation  
**Impact:** Gap calculation less accurate for first-year users  
**Current State:** Known limitation documented  
**Timeline:** Future phase if not addressed in Sprint 10

---

### 10. Frequency-Based Benefit Support
**Severity:** P3 - NICE TO HAVE  
**Issue:** Dialysis, physiotherapy, gym frequency benefits not supported  
**Impact:** Gap calculator shows "Not calculable" for frequency benefits  
**Current State:** Known limitation, returns appropriate message  
**Timeline:** Future phase

---

### 11. MRI/CT Distinction in Diagnostics
**Severity:** P3 - NICE TO HAVE  
**Issue:** Diagnostics as single category, no MRI/CT distinction  
**Impact:** Can't score MRI vs CT separately  
**Current State:** Known limitation  
**Timeline:** Future phase

---

## DEFER TO FUTURE PHASE

### 12. Medication Formulary Support
**Status:** Currently hardcoded as UNKNOWN  
**Effort:** Significant (requires HMO formulary data)  
**Timeline:** Phase 2+

---

### 13. Digital/Telemedicine Scoring
**Status:** Currently hardcoded as UNKNOWN  
**Effort:** Requires independent data collection  
**Timeline:** Phase 2+

---

### 14. Dental/Optical Scoring  
**Status:** Currently hardcoded as UNKNOWN  
**Effort:** Requires HMO coverage data  
**Timeline:** Phase 2+

---

## SPRINT 10 WORKSTREAM PLAN

### Phase 1: Foundation (Days 1-3)
- [ ] Fix assessment test suite (P1)
- [ ] Start data collection (parallel)
- [ ] Begin frontend browser testing

### Phase 2: Data Completion (Days 4-10, Parallel)
- [ ] Complete 50% benefit data (surgery/maternity)
- [ ] Collect provider tier data
- [ ] Gather real source URLs
- [ ] Continue mobile testing

### Phase 3: Validation (Days 11-15)
- [ ] Verify personalization with complete data
- [ ] Complete mobile testing
- [ ] Review confidence model
- [ ] Fix any frontend issues found

### Phase 4: Polish (Days 16-20)
- [ ] Fix confidence model if needed
- [ ] Complete remaining data (80%+ coverage)
- [ ] Full regression testing
- [ ] Prepare launch checklist

---

## SUCCESS CRITERIA FOR SPRINT 10

### Launch Readiness Checklist
- [ ] Benefit data ≥80% coverage
- [ ] Five personas get differentiated results
- [ ] All tests pass (62+ tests)
- [ ] Frontend works in browser (all routes)
- [ ] Mobile works at all breakpoints
- [ ] Source links functional
- [ ] Confidence score acceptable or messaging clear
- [ ] No P0/P1 issues remaining

### Decision Gate
**Before moving to launch:**
1. Run full 5-persona test with complete data
2. Verify personalization working (different results)
3. QA sign-off on browser testing
4. Product sign-off on confidence/messaging
5. Legal/compliance review of claims and sources

---

## RESOURCE ALLOCATION

**Recommended Team:**
- **Data Team:** 2-3 people (benefit data, provider info, source links)
- **Dev Team:** 1-2 people (test fixes, bug fixes, data integration)
- **QA Team:** 1-2 people (browser testing, mobile testing, regression)
- **Product:** 1 person (decisions, validation, go/no-go)

**Critical Path:** Data collection (must start immediately, parallel to dev)

---

## RISK MITIGATION

### Risk 1: Data Collection Takes Longer Than Expected
- **Mitigation:** Start immediately, recruit HMO contacts
- **Fallback:** Prioritize top 5-10 HMOs; launch subset if needed

### Risk 2: Personalization Still Doesn't Work with Complete Data
- **Mitigation:** Re-examine matching algorithm during Sprint 10
- **Fallback:** Redesign product positioning as "price-focused guide"

### Risk 3: Mobile Testing Finds Major Layout Issues
- **Mitigation:** Add 1-2 extra days for fixes
- **Fallback:** Mark Sprint 10 as "desktop launch, mobile in phase 2"

---

**Next Step:** Review this prioritization with Sprint 10 team  
**Timeline:** Immediate (data team starts today if possible)  
**Success Gate:** Complete Sprint 10 checklist before launch

