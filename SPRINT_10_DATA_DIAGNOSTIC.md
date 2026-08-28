# SPRINT 10 DATA DIAGNOSTIC REPORT
## HMO Blueprint Nigeria - Data Completeness Analysis

**Date:** 2026-08-28  
**Branch:** claude/sprint-10-personalization-hardening

---

## EXECUTIVE SUMMARY

**Current Data Status:** SEVERELY INCOMPLETE  
**Primary Blocker:** Maternity data missing for 82% of plans  
**Impact on Personalization:** Adaeze persona (maternity-critical) can't be scored meaningfully

**Field Coverage:**
| Field | Populated | Missing | % Complete |
|-------|-----------|---------|-----------|
| Price | 82/95 | 13 | **86%** ✓ |
| Overall Limit | 39/95 | 56 | 41% |
| Surgery Benefit | 45/95 | 50 | 47% |
| Maternity Benefit | 17/95 | 78 | **18%** ❌ |
| **All 4 fields** | **7/95** | **88** | **7%** |

---

## CRITICAL FINDING

**Only 7 plans out of 95 have all 4 core benefit fields populated.**

This explains why all 5 personas get identical recommendations:
- No surgery differentiation (53% missing)
- No maternity differentiation (82% missing)
- No overall limit for gap calculations (59% missing)

---

## HIGH-VALUE DATA PRIORITIES

### PRIORITY 1: Maternity Data (Impact: CRITICAL)
**Why:** Adaeze persona (expecting) can't be differentiated without maternity data  
**Current:** 17/95 plans have maternity amounts (18%)  
**Target:** 50+/95 (>50%)  
**Value:** Enables Adaeze persona to get different results

**Current Plans With Maternity Data:**
- AIICO Multishield: Standard, Executive, Super Executive, Magnum, Magnum Concierge (5)
- Clearline: SME Bronze, SME Silver (2)
- Hygeia: HyBasic, HyPrime, HyPrime Plus, HyPrime Exclusive, HyBasic Family (5)
- Avon: Life Plus, Premium Life, Boss Life (3)
- Others: 2 more

### PRIORITY 2: Overall Limit Data (Impact: MAJOR)
**Why:** Needed for coverage gap calculations  
**Current:** 39/95 plans have limits (41%)  
**Target:** 60+/95 (>60%)  
**Value:** Enables gap calculations for all personas

### PRIORITY 3: Surgery Benefit Data (Impact: MAJOR)
**Why:** Tunde persona (surgery-critical) needs surgery scores  
**Current:** 45/95 plans have surgery amounts (47%)  
**Target:** 60+/95 (>60%)  
**Value:** Enables Tunde persona differentiation

---

## PLANS WITH COMPLETE DATA (ALL 4 FIELDS)

Only these 7 plans are fully complete:
1. AIICO Multishield — Standard
2. AIICO Multishield — Executive
3. AIICO Multishield — Super Executive
4. AIICO Multishield — Magnum
5. AIICO Multishield — Magnum Concierge
6. Clearline HMO — SME Bronze
7. Clearline HMO — SME Silver

**Note:** AIICO has 5/6 AIICO plans complete. Clearline has 2/12 complete.

---

## PLANS WITH 3/4 FIELDS

These 8 plans are missing only 1 field:

### Missing Overall Limit Only:
- Hygeia HyBasic (Price ✓, Surgery ✓, Maternity ✓)
- Hygeia HyPrime (Price ✓, Surgery ✓, Maternity ✓)
- Hygeia HyPrime Plus (Price ✓, Surgery ✓, Maternity ✓)
- Hygeia HyPrime Exclusive (Price ✓, Surgery ✓, Maternity ✓)
- Avon Life Plus (Price ✓, Surgery ✓, Maternity ✓)
- Avon Premium Life (Price ✓, Surgery ✓, Maternity ✓)
- Avon Boss Life (Price ✓, Surgery ✓, Maternity ✓)
- Hygeia HyBasic Family (Price ✓, Surgery ✓, Maternity ✓)

**Action:** Add overall_limit for these 8 plans (low effort, high value)

---

## HMO-BY-HMO COMPLETENESS

### Hygeia HMO (12 plans)
- Completely absent maternity: HyEssential, HyEssential Family, Senior Exclusive, Senior Exclusive Concierge
- Missing overall limit: HyBasic, HyPrime, HyPrime Plus, HyPrime Exclusive, HyBasic Family
- Complete (0/12): None

### Clearline HMO (12 plans)
- Complete: SME Bronze, SME Silver (2/12)
- Most retail/individual plans missing surgery/maternity
- Corporate plans mostly complete

### AIICO Multishield (6 plans)
- Complete: 5/6 (Standard, Executive, Super Executive, Magnum, Magnum Concierge)
- Missing: Wellness (missing all benefits except price)

### Bastion Health (13 plans)
- All plans missing maternity
- Most have surgery, no overall limits

### Other HMOs
- Reliance: Some surgery data, missing maternity
- AXA Mansard: Some data, incomplete
- NEM Health: Limited data
- Leadway: Limited data

---

## SPRINT 10 DATA COMPLETION STRATEGY

### Phase 1: High-Effort, High-Value (8 Plans)
**Add Overall Limit to these 8 Hygeia + Avon plans:**
- Hygeia HyBasic: Need overall limit (all other fields present)
- Hygeia HyPrime: Need overall limit
- Hygeia HyPrime Plus: Need overall limit
- Hygeia HyPrime Exclusive: Need overall limit
- Avon Life Plus: Need overall limit
- Avon Premium Life: Need overall limit
- Avon Boss Life: Need overall limit
- Hygeia HyBasic Family: Need overall limit

**Effort:** Low (research/existing docs)  
**Impact:** High (makes 8 plans complete)

### Phase 2: Medium-Effort, High-Impact (15+ Plans)
**Add Maternity Data to:**
- Clearline individual/family plans (need maternity)
- Bastion plans (have surgery, need maternity)
- NEM plans (selective maternity)
- Reliance plans (selective maternity)

**Effort:** Medium (research HMO docs)  
**Impact:** Enables Adaeze persona

### Phase 3: Medium-Effort (10+ Plans)
**Add Overall Limit where missing:**
- Bastion plans
- NEM plans
- Reliance plans

**Effort:** Medium  
**Impact:** Gap calculator functionality

---

## WHAT NOT TO COMPLETE

Do NOT complete for Sprint 10:
- Medication (0 data, requires formulary research)
- Diagnostics (0 data, complex)
- Dental/Optical (sparse, lower priority)
- Frequency-based benefits (requires calculation support)

These are correct to mark as "Not calculable" given current data state.

---

## PERSONALIZATION IMPACT MATRIX

Which data improvements will actually change persona results?

| Persona | Currently | Needs | Data Gap |
|---------|-----------|-------|----------|
| **Chidi** (price) | Price scoring | Already works | None - should work |
| **Adaeze** (maternity) | Price scoring only | Maternity scoring | 82% missing maternity |
| **Tunde** (surgery) | Price scoring only | Surgery scoring | 53% missing surgery |
| **Mrs Okafor** (senior) | Price scoring only | Surgery + hospital | Missing both |
| **Emeka** (SME) | Price scoring only | Price + provider | Missing provider tiers |

**Conclusion:** Completing MATERNITY data will immediately enable Adaeze differentiation. Completing SURGERY will enable Tunde differentiation.

---

## DATA COMPLETION ROADMAP FOR SPRINT 10

### Quick Wins (Day 1)
- [ ] Add 8 missing overall_limit values to Hygeia/Avon plans
- [ ] Verify all price values are correct post-unit-fix
- [ ] Validate existing surgery/maternity values

### Medium Effort (Days 2-3)
- [ ] Research and add maternity data to 15+ plans (target: Clearline, Bastion, NEM, Reliance)
- [ ] Add overall_limit to remaining HMOs

### Validation (Day 4)
- [ ] Re-test all 5 personas with improved data
- [ ] Verify personalization differentiation appears
- [ ] Update confidence scores with better data coverage

---

## VALIDATION CRITERIA

After data completion, SUCCESS means:

1. **Maternity Coverage:** ≥50% (currently 18%)
2. **Overall Limit:** ≥60% (currently 41%)
3. **Surgery Coverage:** ≥60% (currently 47%)
4. **Adaeze Results:** Different from Chidi (maternity weighting)
5. **Tunde Results:** Different from Chidi (surgery weighting)
6. **Confidence:** Improves from 0.49 (LOW) to ≥0.60

---

**Next Step:** Begin Phase 1 data completion (add 8 missing overall_limit values)

