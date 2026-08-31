# PHASE 3.2 — VERIFIED DATA INTAKE FRAMEWORK

**Status:** AWAITING VERIFIED OFFICIAL-SOURCE DATA  
**Date:** 2026-08-31  
**Architecture:** READY

---

## DATA ARCHITECTURE READY

The following are complete and tested:

✅ `src/types/index.js`
   - NHIA programme type definitions
   - Data contracts for every field
   - Validation enums

✅ `src/data/public-sector.js`
   - Empty NHIA programmes array (ready to populate)
   - Data validation functions
   - Research status tracking

✅ Validation Framework
   - Required fields enforcement
   - Evidence tier validation
   - Premium semantics checking
   - Benefit status validation
   - Source URL verification

---

## WHEN VERIFIED DATA IS PROVIDED

Format expected:

```javascript
{
  nhia_id: 'NG-NHIA-XXXXX-001',
  programme_name: 'Official Name',
  programme_type: 'Programme Type',
  status: 'active|pending|closed|unknown',
  target_populations: ['population_1'],
  eligibility_summary: 'Plain language summary',
  eligibility_criteria: ['Criterion 1'],
  enrollment_pathway: 'How to enroll',
  
  contribution: {
    status: BenefitStatus.KNOWN | NOT_COVERED | UNKNOWN,
    amount_kobo: 0 | null
  },
  contribution_status: PremiumStatus.CURRENT,
  
  // Benefits using same structure
  benefit_package: [],
  overall_limit: { status, amount_kobo, note },
  primary_care: { status, amount_kobo, note },
  specialist: { status, amount_kobo, note },
  hospitalization: { status, amount_kobo, note },
  drugs: { status, amount_kobo, note },
  maternity: { status, amount_kobo, note },
  emergency: { status, amount_kobo, note },
  
  // Geography
  geographic_scope: ['NG'],
  provider_network: 'Description',
  network_size: { status, amount_kobo, note },
  
  // Waiting periods & limitations
  waiting_periods: [],
  exclusions: [],
  limitations: [],
  
  // Provenance — REQUIRED
  official_url: 'https://...',
  retrieved_date: 'YYYY-MM-DD',
  source_date: 'YYYY-MM-DD',
  evidence_tier: 'B',
  provenance_note: 'Official [Agency Name]',
  last_verified: 'YYYY-MM-DD'
}
```

---

## DATA QUALITY REQUIREMENTS

Every record MUST pass:

1. **Source Verification**
   - `official_url` is present and accessible
   - `evidence_tier` is assigned
   - `source_date` is explicit (from official document)
   - `retrieved_date` is current

2. **Field Completeness**
   - Every benefit uses enum: KNOWN | NOT_COVERED | PARTIAL | UNKNOWN
   - No `null` without explicit status
   - Missing data marked: NOT_PUBLICLY_PUBLISHED (in note)

3. **Semantic Correctness**
   - Premium ≠ benefit limit
   - Contribution basis clear (per person, family, government-funded)
   - Waiting periods in months with clear benefit names
   - Exclusions/limitations are actual limitations (not unknowns)

4. **Confidence Rating**
   - HIGH: Recently published by official source, clear/explicit
   - MEDIUM: Published by official source but dated or ambiguous
   - LOW: Requires interpretation or from secondary official source

---

## INTAKE PROCESS

When verified data pack is provided:

### Step 1: Validate Format
```bash
npm test -- --grep "nhia.*structure"
```
Verify every record conforms to data contract.

### Step 2: Add to Dataset
```javascript
// src/data/public-sector.js
export const nhiaProgrammes = [
  // INSERT VERIFIED RECORDS HERE
];
```

### Step 3: Run Full Validation
```bash
npm test
```
Ensure no regressions. All 72+ tests must pass.

### Step 4: Create Commit
```
feat(phase3.2): add verified NHIA programmes from official sources

Programmes added: [count]
Programmes verified: [count]
Source: [list official sources]
Date accessed: [date]
Evidence tier: [B]

All verified records trace to official sources:
- [Programme 1]: [URL]
- [Programme 2]: [URL]
- [etc]

Tests: [count]/[count] passing
```

### Step 5: Document Sources
Create `PHASE_3_NHIA_OFFICIAL_SOURCES.md`:
```
| Programme | Source URL | Publication Date | Date Accessed |
|-----------|------------|------------------|---------------|
| BHCPF | https://... | 2026-XX-XX | 2026-08-31 |
```

---

## WHAT WILL NOT CHANGE

✅ Matching engine — unchanged  
✅ Assessment flow — unchanged  
✅ Existing tests — all still pass  
✅ Private HMO ranking — unchanged  
✅ Clearline neutrality — preserved  
✅ Product semantics — preserved  

---

## WHAT WILL HAPPEN

When verified data is provided:

1. NHIA programmes array will be populated
2. Type validation will enforce correctness
3. User-facing UI (later phase) will show public options separately
4. No impact on private HMO matching
5. No deployment to production yet (P3.4-5 must follow)

---

## DATA STRUCTURE STATUS

| Component | Status | Ready |
|-----------|--------|-------|
| Types | ✅ Complete | Yes |
| Data Module | ✅ Complete | Yes |
| Validation | ✅ Complete | Yes |
| Tests | ✅ Framework | Yes |
| NHIA Data | ⏳ Awaiting | No |
| Matching Integration | ⏸️ Not Started | No |
| UI Presentation | ⏸️ Not Started | No |

---

## AWAITING

Verified NHIA programme data from official sources containing:

- Official programme names
- Current eligibility criteria
- Current contribution amounts (if published)
- Current benefit coverage
- Current enrollment pathways
- Source URLs and publication dates
- All necessary provenance information

---

**Ready to receive and integrate verified official data.**

**Awaiting data pack from external research.**

**Phase 3.2 paused: Data architecture complete, awaiting external verification.**
