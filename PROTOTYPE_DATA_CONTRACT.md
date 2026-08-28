# PROTOTYPE_DATA_CONTRACT.md

**Phase 1** · `DATA_CONTRACT_V1` · Target: Claude Code

---

## 0. THE ONE RULE

> **Every value the application displays carries its own evidence state. A number never travels without its status.**

There is no "just the price" path through this system. If a component receives a bare number, the contract has been violated upstream.

---

## 1. ENTITIES

Five tables. The prototype needs no more.

```
hmo            16 rows   organisations
plan           95 rows   priced/named products      (placeholders excluded)
hmo_unpriced    6 rows   HMOs with no usable plan data
provider     4,885 rows  DISPLAY ONLY in v1 — see §7
assessment      —        user session
```

---

## 2. HMO

```json
{
  "hmo_id": "NG-HMO-003",
  "hmo_name": "Clearline HMO",
  "nhia_id": 3,
  "matchability": "FULL",
  "plan_count": 12,
  "data_completeness": 0.71,
  "source_is_self_interested": true,
  "disclosure_required": true
}
```

`matchability` — `FULL` (price + at least one benefit dimension) · `PRICE_ONLY` · `EXCLUDE`.
Only `FULL` HMOs enter ranking. `PRICE_ONLY` appear in comparison. `EXCLUDE` appear only in the "we could not compare these" panel.

`source_is_self_interested` is true for `NG-HMO-003` only, and drives the disclosure banner. It must be a data field, not a hardcoded condition — hardcoding a competitor's name into presentation logic is exactly what the anti-bias protocol forbids.

---

## 3. PLAN — AND THE BENEFIT VALUE OBJECT

The central design decision. **Every benefit field is an object, never a scalar.**

```json
{
  "plan_id": "NG-HMO-006-executive-retail_individual",
  "hmo_id": "NG-HMO-006",
  "plan_name": "Executive",
  "customer_type": "retail_individual",
  "min_lives": 1,
  "max_lives": null,
  "lives_covered": null,

  "premium": {
    "amount_kobo": 10961000,
    "currency": "NGN",
    "period": "annual",
    "basis": "per_person",
    "status": "CURRENT",
    "source_url": "https://www.aiicomultishield.com/index.php/retail/compare-plans",
    "retrieved_date": "2026-08-27",
    "source_date": null,
    "snapshot_ref": null,
    "evidence_tier": "B"
  },

  "overall_limit":    { "status": "KNOWN",       "amount_kobo": 50000000 },
  "surgery_major":    { "status": "NOT_COVERED", "amount_kobo": null,
                        "note": "Major surgery is not covered on this plan" },
  "maternity":        { "status": "KNOWN",       "amount_kobo": 25000000 },
  "drugs":            { "status": "UNKNOWN" },
  "dental":           { "status": "UNKNOWN" },

  "provider_access": {
    "system": "CATEGORY", "tiers": ["Primary","Secondary"],
    "region": ["NG"], "named_facilities": [], "raw": "Primary/Secondary"
  },
  "payment_model": "CAPITATION",
  "waiting_periods": [
    {"benefit":"elective_surgery","months":12},
    {"benefit":"maternity","months":18},
    {"benefit":"chronic_new","months":24}
  ],
  "notes": "Major surgery NOT covered at ₦109,610"
}
```

### 3.1 Benefit value status enum — mandatory

| Status | Meaning | Ranking effect | UI |
|---|---|---|---|
| `KNOWN` | Amount published | Scored normally | Show the amount |
| `NOT_COVERED` | Explicitly excluded | **Hard exclusion** if user marked it critical | "Not covered" in red |
| `PARTIAL` | Sub-scope only (`MINOR ONLY`, `ANC only`) | Scored at the stated scope, flagged | Show amount + scope |
| `UNDISCLOSED` | Covered, amount withheld ("approved limits") | **Not scored.** Confidence penalty. | "Amount not published" ⚠ |
| `UNLIMITED` | Claimed unlimited | **Not scored.** Triggers Farce Detector. | "Unlimited" + challenge |
| `UNKNOWN` | Absent from our data | **Excluded from dimension.** Confidence penalty. | "Not publicly verified" |

**`UNKNOWN` ≠ 0 and `UNKNOWN` ≠ average.** A dimension with unknown data is dropped from that plan's score and the denominator shrinks. Treating absence as zero punishes HMOs for our research gaps; treating it as average rewards them for opacity. Neither is acceptable.

**`NOT_COVERED` is the highest-value state in the dataset.** AIICO Executive costs ₦109,610, advertises a ₦500,000 limit, and does not cover major surgery. That must reach the user.

---

## 4. PREMIUM STATUS ENUM

Seven states, exactly as they appear in the CSV.

| `status` | Rows | Rankable | Badge |
|---|---:|---|---|
| `VERIFIED_SNAPSHOT` | 14 | ✅ full weight | ✅ Verified 27 Aug 2026 |
| `CURRENT` | 52 | ✅ full weight | Current |
| `VERIFY` | 6 | ✅ −10% confidence | ⚠ Confirm before paying |
| `VERIFY_BEFORE_PURCHASE` | 6 | ✅ −20% confidence | ⚠ Price may have changed |
| `PROMOTIONAL` | 6 | 🟡 −25%, flag | 🏷 Promotional price |
| `POTENTIALLY_STALE` | 3 | 🟡 −40%, flag | ⚠ Pricing may be outdated |
| `NOT_PUBLICLY_VERIFIED` | 12 | ❌ **never ranked** | Not publicly verified |
| `POTENTIAL_CONFLICT` | 0 | ❌ never ranked | ⚠ Sources disagree |

`POTENTIAL_CONFLICT` currently has no rows — C-40 was resolved by snapshot. The state must exist anyway; it will recur.

---

## 5. CONFIDENCE

Computed per recommendation, never authored.

```
confidence_raw = 0.40 × premium_status_weight
               + 0.35 × (scored_dimensions / requested_dimensions)
               + 0.25 × hmo_data_completeness

HIGH    ≥ 0.75      MEDIUM 0.50–0.74      LOW < 0.50
```

**Confidence is about our evidence, never about plan quality.** The UI must never let them blur: a plan can be an excellent match at LOW confidence, and the copy must say so — *"this looks like a strong fit, and we cannot verify enough to be sure."*

---

## 6. HMO_UNPRICED

Six HMOs — THT, SUNU, DOT, Greenbay, Novo, Mediplan — publish no retail premium.

```json
{ "hmo_id":"NG-HMO-002", "hmo_name":"Total Health Trust",
  "reason":"NO_PUBLIC_RETAIL_PRICING",
  "known_facts":["1,700+ providers claimed","Tangerine-owned since Jan 2023"],
  "what_to_ask":["What is the annual premium for my family size?",
                 "What is the major surgery limit?",
                 "Which hospitals near me accept this exact plan?"] }
```

These render in a distinct panel: **"Six HMOs don't publish enough to compare. Here's what to ask them."** That is a real finding about the market, not an apology for our data.

---

## 7. PROVIDER — DISPLAY ONLY IN V1

4,885 records exist across four HMOs. **They are not joined to plans and must not drive matching in v1.**

| HMO | Records | LGA | Plan-scoped |
|---|---:|---|---|
| Clearline | 2,141 | ❌ | Band only, **HMO unattributed** |
| Novo | 2,080 | ✅ | ❌ |
| AXA EC Easy Care | 419 | ❌ | ✅ |
| AIICO Standard | 245 | ✅ | ✅ |

Two of the four cannot be used at all: Clearline's is unattributed (P0-03) and Novo is not a matchable HMO. Coverage is nowhere near complete for any HMO.

**Contract:** the app collects location, uses it for the verification script and education, and displays on every result:

> We can't yet confirm which hospitals near you accept this exact plan. Call before you pay — this is the single most common way Nigerians get caught out.

Building fake location matching on 4,885 partial records would break trust at precisely the moment it matters.

---

## 8. VALIDATION — LOADER MUST REJECT

1. Any plan without `plan_id`, `hmo_id`, `customer_type`
2. Any benefit field that is a bare number rather than an object
3. Any premium without `status`, `source_url`, `retrieved_date`
4. `NOT_PUBLICLY_VERIFIED` reaching the ranker
5. `retail_family` without `lives_covered` entering comparison
6. `sme`/`corporate` without `min_lives` entering SME matching
7. Any coercion of `NOT COVERED` / `UNLIMITED` / `UNDISCLOSED` to null

**Fail loudly. A silent null here becomes a wrong recommendation about someone's health cover.**

---

## 9. WHAT V1 DOES NOT CONTRACT

Deliberately out of scope, stated so nobody builds around a phantom: drugs, dental, optical, diagnostics, ENT, wellness and digital fields (no data); provider-to-plan joins; MLR; capitation rates; corporate negotiated pricing; state schemes.

Assessment questions 15–19 are collected and **shape the explanation, not the score.** The user is told which of their priorities we could score and which we could not. That honesty is the product.
