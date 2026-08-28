# MASTER_PLAN_PRICING_DATA_AUDIT.md

**Phase 1** · 27 August 2026 · `DATA_AUDIT_V1`
**Source:** `MASTER_PLAN_PRICING.csv`, 99 rows, unaltered.

---

## 1. HEADLINE

| Metric | Value |
|---|---:|
| Rows | 99 |
| HMOs represented | 16 |
| **Real plan records** | **95** |
| Placeholder rows (`plan_name = NOT PUBLISHED`) | 4 |
| Plans with a premium | 82 |
| Plans with no premium | 13 |
| **HMOs fully matchable** | **6** |
| HMOs price-only (rankable on cost, not benefit) | 4 |
| HMOs excludable (no usable data) | 2 |
| HMOs with zero priced plans | 6 |

**The single most important finding: only 6 of 16 HMOs carry enough data to be scored on anything other than price.** The prototype must be built around that reality rather than around the row count.

---

## 2. BY CUSTOMER TYPE

| customer_type | Rows |
|---|---:|
| retail_individual | 47 |
| corporate | 15 |
| sme | 14 |
| retail_senior | 9 |
| diaspora | 6 |
| retail_family | 4 |
| *null (placeholder rows)* | 4 |

**retail_family has only 4 records across 2 HMOs** (Hygeia ×2, Avon ×2). Persona 2 and Persona 3 are both families. The prototype cannot answer a family query from family-typed plans alone — it must treat individual plans as family-eligible with a stated per-person assumption, and say so on screen.

---

## 3. BY SOURCE STATUS

| Status | Rows | Display treatment |
|---|---:|---|
| CURRENT | 52 | Standard |
| **VERIFIED_SNAPSHOT_2026-08-27** | **14** | Highest confidence — dated screenshot exists |
| NOT_PUBLICLY_VERIFIED | 12 | Never priced; excluded from ranking |
| VERIFY | 6 | Warning badge |
| VERIFY_BEFORE_PURCHASE | 6 | Warning badge — source doc dated Sept 2025 |
| PROMOTIONAL | 6 | Sale-price badge; list price unknown |
| POTENTIALLY_STALE | 3 | Strong warning — page last modified Feb 2025 |

**Only 14 of 99 records (14%) are snapshot-backed.** All 14 are Hygeia. Everything else rests on an unarchived retrieval.

**Evidence tier:** 97 Tier B (official company sources), 2 FIRST_PARTY (Clearline SME, non-public). **Zero Tier A, C, D or E records.** The dataset is entirely composed of what HMOs say about themselves.

---

## 4. FIELD COMPLETENESS

| Field | Populated | % | Verdict |
|---|---:|---:|---|
| hmo_id, hmo_name, plan_name | 99 | 100% | ✅ |
| evidence_tier, source_status | 99 | 100% | ✅ |
| customer_type | 95 | 96% | ✅ (4 nulls are placeholders) |
| premium_ngn | 82 | 83% | 🟡 |
| min_lives | 79 | 80% | 🟡 |
| provider_access | 46 | 47% | 🔴 |
| surgery_major_ngn | 45 | 46% | 🔴 |
| overall_limit_ngn | 39 | 39% | 🔴 |
| maternity_ngn | 17 | 17% | 🔴 **critical** |
| payment_model | 5 | 5% | 🔴 AIICO only |

**Maternity at 17% is the binding constraint on the prototype.** Assessment question 9 asks whether maternity matters. For 83% of plans there is no maternity figure to match against. Persona 2 (family, maternity important) cannot currently be served with evidence — only with an honest statement of absence.

---

## 5. MATCHABILITY BY HMO

| HMO | Plans | Priced | Overall limit | Surgery | Access | Tier |
|---|---:|---:|---:|---:|---:|---|
| Hygeia | 14 | 14 | 0 | 13 | 14 | **FULL** |
| Clearline | 12 | 12 | 8 | 10 | 4 | **FULL** |
| Reliance | 7 | 7 | 7 | 3 | 3 | **FULL** |
| AXA Mansard | 6 | 6 | 0 | 6 | 6 | **FULL** |
| AIICO Multishield | 5 | 5 | 5 | 3 | 1 | **FULL** |
| Avon | 5 | 5 | 0 | 3 | 0 | **FULL** |
| Bastion | 17 | 17 | 11 | 0 | 0 | PRICE_ONLY |
| IHMS | 6 | 6 | 0 | 0 | 0 | PRICE_ONLY |
| Leadway | 9 | 5 | 0 | 0 | 5 | PRICE_ONLY |
| NEM Health | 10 | 5 | 3 | 0 | 10 | PRICE_ONLY |
| Greenbay | 1 | 0 | 0 | 0 | 1 | EXCLUDE |
| Mediplan | 3 | 0 | 3 | 0 | 0 | EXCLUDE |
| THT, SUNU, Novo, DOT | 1 each | 0 | 0 | 0 | 0 | EXCLUDE (placeholder) |

**Bastion is the trap in this table.** It has the most plans (17) and every one is priced — so a naive price-driven matcher would surface Bastion constantly. It has **zero** surgery data. A cheap plan with no benefit data will beat an expensive plan with documented protection on any scoring model that treats missing data as neutral.

**Rule this forces: missing data must never score as zero, and never as average. It must be excluded from the dimension and reduce confidence.** This is stated formally in `MATCHING_ENGINE_V1.md` §4.

---

## 6. ANTI-BIAS COMPOSITION OF THE MATCHABLE POOL

Because only 6 HMOs are fully matchable, the pool composition matters more than it would at scale.

| HMO | Matchable plans | Share |
|---|---:|---:|
| Hygeia | 14 | 28.6% |
| **Clearline** | **12** | **24.5%** |
| Reliance | 7 | 14.3% |
| AXA Mansard | 6 | 12.2% |
| AIICO | 5 | 10.2% |
| Avon | 5 | 10.2% |

**Clearline holds 24.5% of all fully-matchable plans — roughly one in four.** More plans means more chances to occupy a top-3 slot, entirely independent of quality.

Narrowing to `retail_individual` (the prototype's core journey) improves it materially: **26 plans, Clearline holds 4 — 15.4%**, behind AXA (6), Hygeia (5) and AIICO (5). Price-band spread across the six HMOs is reasonably even.

**Mitigation required in the prototype:** a per-HMO cap in the results set (see `MATCHING_ENGINE_V1.md` §7) so that no single HMO can occupy more than one of the top 3 slots. This is a general fairness rule, not a Clearline rule, and it also prevents Bastion's 17 cheap plans from flooding low-budget results.

---

## 7. INTEGRITY CHECKS

**Clean:**
- No duplicate `(hmo_id, plan_name)` pairs — the composite key holds
- No plan where surgery limit exceeds the overall limit
- No plan where premium exceeds the overall limit
- No two plans from the same HMO sharing a premium

**Duplicate plan names across different HMOs** — expected, not an error, but proves `plan_name` alone is not a key:
`Bronze` ×2 · `Silver` ×2 · `Gold` ×2 · `Platinum` ×2 · `Platinum Plus` ×2 · `Standard` ×2 · `Diamond` ×2

Clearline and AXA both sell "Platinum Plus"; Reliance and Bastion both sell "Diamond" at ₦172,140 and ₦344,755 respectively. **The UI must always render `HMO + plan`, never plan alone.**

---

## 8. TYPE VIOLATIONS — NUMERIC COLUMNS CONTAINING TEXT

Seven rows carry non-numeric values in numeric fields. Each is semantically meaningful and must not be coerced to null.

| Field | Value | Rows | Meaning |
|---|---|---:|---|
| overall_limit_ngn | `UNLIMITED` | 2 | NEM corporate — see C-42 |
| surgery_major_ngn | `NOT COVERED` | 2 | AIICO Standard, Executive |
| surgery_major_ngn | `"approved limits" undisclosed` | 2 | NEM corporate |
| surgery_major_ngn | `MINOR ONLY 500000/1000000/2500000` | 3 | NEM HomeReach — minor surgery only |
| maternity_ngn | `NOT COVERED` | 2 | AIICO Standard, Avon Life Plus |
| maternity_ngn | `ANC only — CS excluded` | 1 | Greenbay Access |

**`NOT COVERED` is not missing data — it is the most decision-relevant value in the dataset.** A user who says surgery is critical must see AIICO Executive (₦109,610, ₦500,000 headline limit) ruled out because major surgery is not covered at all. If the loader coerces this to null, that plan silently becomes "unknown" instead of "excluded."

**Required:** every numeric benefit field becomes a structured object — see `PROTOTYPE_DATA_CONTRACT.md` §3.

---

## 9. MISSING KEYS

**`min_lives` absent on 14 SME/corporate rows** — IHMS, Bastion, NEM. An SME plan without a minimum headcount cannot be filtered for Persona 5. Those rows are ineligible for SME matching until filled.

**Family size absent on all 4 `retail_family` rows.** Hygeia's HyBasic Family (₦292,400) and HyPrime Family (₦916,710) do not state how many lives they cover — confirmed absent on the dated screenshot, so this is Hygeia's omission, not ours. **A family premium without a life count cannot be converted to per-person cost and cannot be compared to anything.** Gap P0-10 stands.

---

## 10. THE FIELD THAT DOES NOT EXIST

**There is no geography column.** No state, no LGA, no region.

Assessment questions 2 (location), 6 (multiple states) and 7 (preferred hospitals) have nothing in this dataset to match against.

Provider data does exist, in four separate files totalling 4,885 records — Clearline 2,141 (unattributed, no LGA), Novo 2,080 (LGA-complete), AXA EC Easy Care 419 (plan-scoped), AIICO Standard 245 (plan-scoped, LGA-complete). **None is joined to the pricing table, and the two largest belong to HMOs that are not fully matchable or not attributed.**

Consequence for Phase 1: **the prototype cannot perform genuine location matching.** It must collect location, use it for education and verification prompts, and state plainly that provider-level matching is not yet available. Faking it would be the single most damaging thing this prototype could do, because provider access is the moment a user's trust is won or lost.

---

## 11. NORMALIZATION REQUIRED BEFORE LOAD

| # | Issue | Action |
|---|---|---|
| N-1 | Benefit fields mix numbers and status text | Convert to `{status, amount, scope, note}` objects |
| N-2 | `provider_access` free text (`Tier 4`, `Category C-D`, `Band C-D`, `Nigeria+India`, `SIP/DIP/VIP`) | Parse into `{system, tiers[], region[], named_facilities[]}` |
| N-3 | `min_lives` missing on 14 rows | Fill or mark plan SME-ineligible |
| N-4 | `retail_family` rows lack life count | Mark uncomparable |
| N-5 | 4 placeholder rows | Move to a separate `hmo_unpriced` table — never in the plan table |
| N-6 | `payment_model` 5% populated | Keep nullable; display only when known |
| N-7 | Premiums carry decimals (`₦104,997.75`) | Store as integer kobo |
| N-8 | No `source_url` / `retrieved_date` / `snapshot_ref` columns | **Add all three** — required by the price display policy |
| N-9 | No stable `plan_id` | Generate `{hmo_id}-{slug(plan_name)}-{customer_type}` |

---

## 12. VERDICT

**The dataset is good enough for a prototype and not good enough for a ranking.**

It supports: price comparison across 82 plans; surgery-limit comparison across 45; the headline-limit-vs-surgery ratio across 14; provider-tier display across 46; and honest uncertainty display across all 99.

It does not support: location matching, maternity matching for 83% of plans, drugs/dental/optical/diagnostics matching at all, or any claim that the top result is the best available option in Nigeria.

**Build the prototype on the six fully-matchable HMOs, show the other ten as "insufficient public data — here is what to ask them," and make the gap visible rather than hiding it.** A user who learns that ten of sixteen HMOs will not publish enough to be compared has learned something true and useful about the Nigerian market.
