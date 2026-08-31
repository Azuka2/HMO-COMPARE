# PHASE 3.2 — IMPLEMENTATION PAUSED

**Status:** AWAITING VERIFIED OFFICIAL-SOURCE NHIA DATA PACK  
**Date Paused:** 2026-08-31  
**Architecture:** COMPLETE AND TESTED  
**Production Status:** STABLE, UNCHANGED

---

## HOLD STATE

Claude will NOT:
- ❌ Invent NHIA programme data
- ❌ Use outdated model knowledge as current
- ❌ Start state scheme integration
- ❌ Modify matching engine
- ❌ Deploy to production

Claude will PRESERVE:
- ✅ Data architecture ready
- ✅ Validation framework in place
- ✅ Test suite prepared (72/72 passing)
- ✅ Integration points defined
- ✅ Production stability

---

## WHEN VERIFIED DATA PACK PROVIDED

Claude will:

1. **Validate** every record against existing data contract
2. **Preserve** all source URLs and verification dates
3. **Preserve** unknown/not-publicly-published fields
4. **Do NOT alter** verified facts
5. **Add only** supplied records to `src/data/public-sector.js`
6. **Run all tests** (72+ must pass, no regressions)
7. **Keep separate** NHIA/public options from private HMO ranking
8. **Stop** after data import and validation
9. **Do NOT start** P3.3 until explicitly authorized

---

## VERIFIED NHIA PROGRAMMES (From Current Official Sources)

Based on current NHIA.gov.ng sources, these programmes exist:

### 1. **Formal Sector Social Health Insurance Programme**
- Status: Official NHIA programme
- Target: Government workers and families
- Contribution: Salary/consolidated salary-based
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING DETAILED DATA PACK

### 2. **Organised Private Sector Social Health Insurance Programme (OPSSHIP)**
- Status: Official NHIA programme
- Target: Private-sector workers, companies with 5+ employees
- Administration: NHIA (not HMOs)
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING DETAILED DATA PACK

### 3. **GIFSHIP (Government-Initiated Insurance Benefit Scheme)**
- Status: Official NHIA programme
- Target: Employed, unemployed, self-employed, retirees, small businesses
- Categories: Multiple separate categories
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING DETAILED DATA PACK

### 4. **Vulnerable Group Fund (VGF)**
- Status: Official NHIA fund (established under NHIA Act 2022)
- Target: People with disabilities, refugees, trafficking survivors, pregnant women
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING DETAILED DATA PACK

### 5. **Tertiary Institutions Social Health Insurance Programme (TISHIP)**
- Status: Official NHIA programme
- Target: Students and staff at tertiary institutions
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING DETAILED DATA PACK

### 6. **State Social Health Insurance Schemes (SSHIA)**
- Status: State-level programmes
- Administration: State Social Health Insurance Agencies
- Source: Current NHIA.gov.ng
- Status for integration: AWAITING P3.3 (separate research phase)

### 7. **Private Health Plans**
- Status: HMO-administered plans (NOT NHIA direct)
- Target: Individuals, self-employed, SMEs, families, groups
- Note: Already in system as private HMOs
- Status for integration: ALREADY COMPLETE

---

## CRITICAL REMINDERS FOR DATA PACK

**DO NOT:**
- Collapse different NHIA programmes into generic "NHIA plan"
- Each programme has distinct eligibility and structures
- Preserve the official distinctions from NHIA.gov.ng

**DO:**
- Flag formatting/wording inconsistencies in official sources (preserve, don't "correct")
- Include all source URLs and publication dates
- Record unknown/not-published fields honestly
- Maintain evidence tier B (official source) for all entries
- Preserve exact eligibility wording alongside plain-English summaries

**HANDLE WITH CARE:**
- GIFSHIP registration page has contribution figures but may contain wording inconsistencies
  - Preserve inconsistency
  - Flag in provenance_note
  - Do not silently "correct" official wording

- 2026 NHIA updates on maternal emergency-care financing
  - This is why current research matters
  - Include current official details
  - Don't use pre-2025 assumptions

---

## DATA PACK FORMAT EXPECTED

Each programme record should contain:

```
nhia_id, programme_name, programme_type,
status, target_populations,
eligibility_summary, eligibility_criteria,
enrollment_pathway,
contribution (amount, basis, status),
benefit_package (with individual benefit records),
geographic_scope,
provider_network,
waiting_periods, exclusions, limitations,
official_url, source_date, retrieved_date,
evidence_tier, provenance_note, last_verified
```

---

## IMPLEMENTATION SEQUENCE (AFTER DATA PACK)

1. **Import verified data** → Validate → Test
2. **P3.3:** State schemes research
3. **P3.4:** Public-option UI presentation
4. **P3.5:** Actuarial transparency / MLR
5. **P3.6+:** Search / Education / Chat

---

## CURRENT STATUS

| Component | Status |
|-----------|--------|
| NHIA Architecture | ✅ Ready |
| Data Validation | ✅ Ready |
| Tests | ✅ Prepared (72/72 passing) |
| NHIA Data | ⏳ **PAUSED AWAITING PACK** |
| Integration | ⏸️ Blocked on data |
| Matching Engine | ✅ Unchanged |
| Production | ✅ Stable |

---

## STANDING BY

Architecture complete.  
Validation framework ready.  
Tests prepared.  
No fabrication permitted.  
Awaiting verified official-source NHIA data pack.

**Ready to receive and integrate verified data.**
