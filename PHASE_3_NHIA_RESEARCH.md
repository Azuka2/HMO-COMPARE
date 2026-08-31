# PHASE 3.2 — OFFICIAL NHIA PROGRAMME RESEARCH

**Status:** In Progress  
**Date Started:** 2026-08-31  
**Methodology:** Official Primary Sources Only

---

## RESEARCH PROTOCOL

### Primary Sources (In Order of Preference)

1. **NHIA Official Website**
   - https://nhia.gov.ng/
   - Official programme pages
   - Published benefits, eligibility, enrollment info

2. **Federal Ministry of Health (FMoH)**
   - Official publications
   - Policy documents
   - Government gazette announcements

3. **Government of Nigeria**
   - Presidency/Executive publications
   - Policy directives
   - Official statutory instruments

### NEVER Use

- Blog posts (even "credible" ones)
- News articles (without official source cited)
- Third-party interpretations
- Estimates or projections
- Unverified social media claims

### Data Quality Requirements

- Each fact must have: `source_url`, `retrieved_date`, `source_date`
- Evidence tier must be: `EvidenceTier.B` (official source)
- Missing data marked: `NOT_PUBLICLY_PUBLISHED` (not `null`)
- Confidence: Record actual confidence in the data quality

---

## KNOWN NHIA PROGRAMMES (To Research)

Based on official announcements and publications, these programmes are known to exist or have been announced:

### 1. Basic Health Care Provision Fund (BHCPF)

**What We Know:**
- Government-funded primary health care programme
- Targets vulnerable populations (pregnant women, children under 5)
- Rolled out at primary health center level
- No direct premium from beneficiaries (government-funded)

**To Research:**
- Official NHIA page: [search nhia.gov.ng]
- Current enrollment numbers
- Exact benefits covered
- Enrollment process
- Provider network size
- Coverage by state

**Research Status:** NOT YET STARTED

---

### 2. Maternal Care Programme (if exists as separate NHIA programme)

**What We Know:**
- May be part of BHCPF or separate programme
- Targets pregnant women

**To Research:**
- Is this a separate NHIA programme?
- Benefits and coverage details
- Eligibility criteria
- Enrollment pathway

**Research Status:** NOT YET STARTED

---

### 3. Senior Citizen Health Insurance (if NHIA-administered)

**What We Know:**
- Some states have senior citizen programs
- Federal NHIA may have a component

**To Research:**
- Does federal NHIA have a senior programme?
- Coverage details
- Eligibility (age threshold)
- Contribution requirements

**Research Status:** NOT YET STARTED

---

### 4. Other NHIA Programmes

**Potential Programmes to Research:**
- Children's health programmes
- Emergency care programmes
- Chronic disease management programmes
- Mental health programmes

**Research Status:** NOT YET STARTED

---

## RESEARCH TRACKER

### BHCPF Progress

| Task | Status | Source | Date |
|------|--------|--------|------|
| Find official NHIA BHCPF page | ⏳ | | |
| Verify program name and acronym | ⏳ | | |
| Document eligibility criteria | ⏳ | | |
| Document enrollment process | ⏳ | | |
| Confirm government-funded (no premium) | ⏳ | | |
| List covered benefits | ⏳ | | |
| Confirm provider network scope | ⏳ | | |
| Verify current status (active/pending/closed) | ⏳ | | |

### Other Programmes

| Programme | Task | Status | Source |
|-----------|------|--------|--------|
| Maternal | Official page found? | ⏳ | |
| Seniors | Official page found? | ⏳ | |
| Others | To be identified | ⏳ | |

---

## DATA ENTRY TEMPLATE

When a programme is researched, enter into `src/data/public-sector.js`:

```javascript
{
  nhia_id: 'NG-NHIA-XXXXX-001',
  programme_name: 'Official Programme Name',
  programme_type: 'Type/Acronym',
  status: 'active|pending|closed|unknown',
  target_populations: ['population_1', 'population_2'],
  eligibility_summary: 'Plain language summary',
  eligibility_criteria: [
    'Criterion 1',
    'Criterion 2'
  ],
  enrollment_pathway: 'How to enroll',
  contribution: {
    status: BenefitStatus.KNOWN_OR_NOT_COVERED,
    amount_kobo: 0 // if government-funded
  },
  contribution_status: PremiumStatus.CURRENT,
  co_payment: {
    status: BenefitStatus.KNOWN,
    amount_kobo: 0 // if known
  },
  benefit_package: [
    {
      benefit_name: 'Primary care',
      status: BenefitStatus.KNOWN,
      note: 'Details from official source'
    }
  ],
  overall_limit: {
    status: BenefitStatus.UNKNOWN,
    amount_kobo: null,
    note: 'Information not publicly available'
  },
  primary_care: { /* benefit object */ },
  specialist: { /* benefit object */ },
  hospitalization: { /* benefit object */ },
  drugs: { /* benefit object */ },
  maternity: { /* benefit object */ },
  emergency: { /* benefit object */ },
  
  geographic_scope: ['NG'],
  provider_network: 'Description from official source',
  network_size: { /* benefit object */ },
  
  waiting_periods: [
    {
      benefit: 'benefit_name',
      months: 0
    }
  ],
  exclusions: ['List of exclusions from official source'],
  limitations: ['List of limitations from official source'],
  
  official_url: 'https://nhia.gov.ng/programmes/xxx',
  retrieved_date: '2026-08-31',
  source_date: '2026-08-28', // Date from official document
  evidence_tier: EvidenceTier.B,
  provenance_note: 'Official NHIA website',
  last_verified: '2026-08-31'
}
```

---

## CRITICAL REMINDERS

✅ **MUST HAVE:**
- Official source URL
- Retrieved date
- Source document date
- Evidence tier
- All missing data marked NOT_PUBLICLY_PUBLISHED

❌ **NEVER:**
- Estimate or guess benefit limits
- Assume coverage from other programmes
- Use news summaries instead of official docs
- Mark unknown data as zero
- Fabricate eligibility criteria

⚠️ **IF CONFLICTED:**
- Document the conflict
- Use most authoritative source
- Mark confidence as LOW
- Note the discrepancy in provenance_note

---

## RESEARCH STANDARDS

Each programme entry must pass:

1. **Source Verification**
   - Is the source official/primary? YES/NO
   - Can we access it now? YES/NO
   - Does it explicitly state the claim? YES/NO

2. **Data Completeness**
   - All fields populated (or marked NOT_PUBLISHED)
   - Evidence tier assigned
   - Retrieved/source dates recorded

3. **Accuracy Check**
   - Names match official spelling
   - Numbers verified (not typos)
   - Eligibility criteria are exact quotes or clear summaries
   - No inference beyond what's published

4. **Confidence Assessment**
   - HIGH: Recently published by NHIA, clear statement
   - MEDIUM: Published by NHIA but dated or ambiguous
   - LOW: Indirect source or requires interpretation

---

## REPORTING

After researching each programme:

1. Update RESEARCH TRACKER
2. Enter data into `src/data/public-sector.js`
3. Commit with evidence links
4. Run validation
5. Document any gaps/unknowns

---

## NEXT STEPS (After P3.2)

Once NHIA programmes are researched:

1. **P3.3 — State Scheme Research**
   - Repeat for each state with available data
   - Focus on states with published schemes

2. **P3.4 — Public Option Presentation**
   - Design how NHIA options appear in results
   - Separate from private HMO ranking
   - Clear eligibility logic

3. **P3.5 — Actuarial Transparency**
   - Explain premium/contribution differences
   - Educational context about public vs private

---

## CURRENT STATUS

| Phase | Status | Committed |
|-------|--------|-----------|
| P3.1 Data Architecture | ✅ COMPLETE | be6a174 |
| P3.2 NHIA Research | ⏳ IN PROGRESS | — |
| P3.3 State Research | ⏸️ PENDING | — |
| P3.4 Public Options | ⏸️ PENDING | — |
| P3.5+ | ⏸️ PENDING | — |

---

**Last Updated:** 2026-08-31  
**Researcher:** Claude Code (Phase 3 Implementation)
