# SPRINT 10 HIGH-VALUE DATA COMPLETION
## Priority Maternity Data Additions

**Strategy:** Add maternity data to enable Adaeze persona differentiation without fabricating unsupported values.

**Sources Used:**
- AIICO_Multishield.md (official documentation in repo)
- Bastion_HMO.md (official documentation in repo)
- Clearline_HMO.md (corporate plans confirmed)
- Hygeia_HMO.md (existing plan data)
- Avon_Healthcare.md (existing plan data)

**Target: Enable Adaeze (maternity-critical) to differentiate from Chidi (price-focused)**

---

## High-Value Additions (Verified from Repo Research)

### BATCH 1: Bastion Health Plans
**Source:** SPRINT_10_DATA_DIAGNOSTIC.md shows these already have Price + Surgery + Overall_Limit**
- Need to add: Maternity

From repo research (Bastion_HMO.md lines 56+):
- Boss Life: Published maternity ₦400k
- Sapphire: Inferred tier maternity (published inpatient/coverage)
- Ruby: Inferred from tier (published inpatient)
- Emerald: Inferred from tier
- Diamond: Inferred from tier
- Crimson: Inferred from tier
- Beryl: Inferred from tier

**Confidence:** Boss Life HIGH (explicit). Others MEDIUM (tier inference).

### BATCH 2: Clearline Corporate Plans  
From Clearline_HMO.md (lines 14-24):
- Bronze: Not published separately (would need research)
- Silver: Not published separately
- Gold: Not published separately
- Gold+: Not published separately
- Platinum: Not published separately
- Platinum+: Not published separately

**Status:** Corporate maternity not explicitly published in research doc. Skip for now.

### BATCH 3: AIICO Plans
From AIICO_Multishield.md (lines 65-77):
- Executive: Maternity ₦250k (explicit)
- Super Executive: Maternity ₦250k (explicit)
- Magnum: Maternity ₦400k (explicit)
- Magnum Concierge: Maternity ₦400k (explicit)
- Standard: Maternity not published (skip)

**Confidence:** HIGH (explicit in doc)

### BATCH 4: Hygeia Plans
Existing data in CSV:
- HyBasic: Maternity ₦100k (already in CSV)
- HyPrime: Maternity ₦200k (already in CSV)
- HyPrime Plus: Maternity ₦200k (already in CSV, verify)
- HyPrime Exclusive: Maternity ₦300k (already in CSV, verify)

**Status:** Already populated. Verify in next section.

### BATCH 5: Avon Plans
From Avon_Healthcare.md (lines 39-74):
- Premium Life: Maternity ₦250k (explicit, line 47)
- Boss Life: Maternity ₦400k (explicit, line 64)
- Life Plus: NOT COVERED (explicit, line 37)

**Confidence:** HIGH

---

## DATA VALIDATION BEFORE UPDATE

**Current CSV Status Check:**
- AIICO Standard: Has maternity? (need to check)
- Bastion plans: Maternity status?
- Clearline retail: Maternity status?
- Others: Current state?

**Action:** Verify before adding to avoid duplicates.

---

## Update Plan

### PHASE 1: Add Verified High-Confidence Maternity
Priority:
1. Bastion Boss Life: ₦400k (HIGH confidence)
2. AIICO Executive: ₦250k (if not present)
3. AIICO Super Executive: ₦250k (if not present)  
4. AIICO Magnum: ₦400k (if not present)
5. Avon Premium Life: ₦250k (if not present)
6. Avon Boss Life: ₦400k (if not present)

**Effort:** < 1 hour
**Expected impact:** Enable Adaeze to see plans with maternity emphasis

### PHASE 2: Verify Existing Hygeia Maternity
Confirm:
- HyBasic: ₦100k
- HyPrime: ₦200k
- HyPrime Plus: ₦200k
- HyPrime Exclusive: ₦300k

**Effort:** 15 minutes
**Expected impact:** Ensure no data loss

### PHASE 3: Re-test Personalization
After adding maternity data:
1. Run 5 personas
2. Verify Adaeze gets different recommendation
3. Verify confidence improves
4. Update personalization report

**Effort:** 30 minutes
**Expected impact:** Demonstrate personalization works with better data

---

## Data Integrity Rules (Enforced)
- NO fabricated amounts
- NO tier inference without support
- Sources documented
- Conflicts marked
- Duplicate prevention

---

## Success Criteria
- Maternity coverage improves from 18% → 30%+
- Adaeze persona produces different top-1 result
- Confidence improves with better data
- No price regressions
- No calculation errors

