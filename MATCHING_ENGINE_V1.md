# MATCHING_ENGINE_V1.md

**Phase 1** · `MATCHING_ENGINE_V1` · Deterministic. No LLM in the ranking path.

---

## 0. THE CONSTITUTIONAL RULE

> The engine ranks. Claude explains. **Claude never re-orders, never adds, never removes a candidate.**

Same input → same output, every time. If the ranking is not reproducible from the data and the weights alone, the implementation is wrong.

---

## 1. PIPELINE

```
95 plans
  ↓ STAGE 1  Data eligibility        → drop unrankable
  ↓ STAGE 2  Customer-type & lives   → hard
  ↓ STAGE 3  Budget                  → soft (+15% tolerance)
  ↓ STAGE 4  Critical-benefit        → hard exclusion on NOT_COVERED
  ↓ STAGE 5  Dimension scoring       → 0–100 per scoreable dimension
  ↓ STAGE 6  Weighted match score
  ↓ STAGE 7  Diversity cap           → max 1 plan per HMO in top 3
  ↓ STAGE 8  Confidence
  → Top 3 + 2–4 alternatives + "couldn't compare" panel
```

---

## 2. STAGE 1 — DATA ELIGIBILITY

Dropped before anything else:

- `premium.status == NOT_PUBLICLY_VERIFIED` (12 plans)
- `hmo.matchability == EXCLUDE` (Greenbay, Mediplan + 4 placeholders)
- No premium amount (13 plans)
- `retail_family` with no `lives_covered` (4 plans — Hygeia/Avon family)
- `sme`/`corporate` with no `min_lives`, when the user is an SME (14 plans)

`PRICE_ONLY` HMOs (Bastion, IHMS, Leadway, NEM) **remain eligible** but can only score on price and provider access. They surface in alternatives, rarely in the top 3, and always carry a "limited benefit data published" flag.

---

## 3. STAGES 2–4 — FILTERS

**Stage 2 (hard):** `customer_type` must match the derived intent; `lives ≥ min_lives`; `has_seniors` unlocks `retail_senior`.

**Stage 3 (soft):** keep if `premium ≤ budget × 1.15`. Plans in the 100–115% band are kept and flagged *"slightly over budget — may still be better value"*. This band is where the false-economy case lives: Reliance Alexandrite at ₦117,420 doubles Red Beryl's surgery cap for 27% more money.

If budget = "not sure", no budget filter.

**Stage 4 (hard):** for any dimension the user marked **Critical (10)**, exclude plans where that benefit is `NOT_COVERED`.

Live consequence: a user marking surgery critical loses AIICO Standard (₦64,680) and AIICO Executive (₦109,610) — both advertise ₦350k/₦500k limits and neither covers major surgery. Excluding those two plans is the clearest single piece of consumer protection this engine performs.

`PARTIAL` is not excluded — it is scored at its stated scope and flagged (NEM HomeReach covers minor surgery only).

---

## 4. STAGE 5 — DIMENSION SCORING

**The missing-data rule, restated because it is the most abusable part of the system:**

> `UNKNOWN`, `UNDISCLOSED` and `UNLIMITED` are **excluded from the dimension and removed from the weight denominator.** They are never 0 and never average.

Scoring absence as 0 punishes HMOs for our research gaps. Scoring it as average rewards opacity — and NEM's "Annual Benefit Limit: Unlimited / Surgery: covered to approved limits" would become an advantage. Exclusion is the only neutral treatment, and it costs the plan confidence instead.

### price (0–100)
```
ratio = premium / budget_per_person
≤0.5 →100 · ≤0.7 →90 · ≤0.85 →80 · ≤1.0 →70 · ≤1.15 →50 · else 0
budget "not sure": rank-percentile within candidate set
```

### surgery (0–100)
```
NOT_COVERED  → excluded by Stage 4 if critical; else 0
UNKNOWN      → dimension excluded
KNOWN:  min(100, (surgery_major / 2,000,000) × 100)
PARTIAL: score × 0.5, flagged
```
₦2,000,000 is the reference surgical exposure, drawn from the corpus's own coverage-gap examples. It is an assumption and is labelled as one in the UI.

**Ratio penalty:** if `overall_limit` is known and `surgery / overall_limit < 0.20`, subtract 15 points and raise a Farce Detector flag. This is the ₦50m/₦750k case (AIICO Magnum Concierge, 1.5%) — a headline limit that misrepresents surgical protection should not score as though it were protection.

### hospital_access (0–100)
Parsed from `provider_access.tiers`:
```
top-tier included (A / Tier 1 / Band A / Platinum) → 100
second tier → 75 · third → 50 · lowest only → 30
+10 if named_facilities present (Hygeia Senior Exclusive)
+10 if region extends beyond NG (Leadway, NEM Marigold)
UNKNOWN → excluded
```

### maternity (0–100)
```
NOT_COVERED → 0 (or Stage-4 exclusion if critical)
KNOWN: min(100, (maternity / 500,000) × 100)
PARTIAL ("ANC only — CS excluded") → 25, flagged
UNKNOWN → excluded
```
With 17/95 coverage, most plans will be excluded from this dimension. When the user marked maternity critical, the results page must state: *"Only N of the plans we checked publish a maternity limit."*

### Waiting-period penalty
Applied after dimension scoring, gated by Q20:
```
restriction_tolerance = "minimal hassle" or "walk in and be treated":
  −10 per benefit the user rated ≥8 that has a waiting period >6 months
  −20 if >12 months
```
Reliance's 15-month major-surgery delay and AIICO's 24-month chronic wait both bite here. A user who says surgery is critical should not be shown a plan whose surgery cover starts in month 16 without that being scored.

---

## 5. STAGE 6 — MATCH SCORE

```
scored   = dimensions with a value AND weight > 0
match    = Σ(score[d] × weight[d]) / Σ(weight[d])   over scored only
match_display = round(match)
```

**Display rule:** never show a match % above 95. The data does not support that precision, and a "98% match" on four scored dimensions with 17% maternity coverage is a false claim about our own confidence.

---

## 6. STAGE 8 — CONFIDENCE

Per `PROTOTYPE_DATA_CONTRACT.md` §5. Displayed beside every result, never merged with match %.

A plan may be a 91% match at LOW confidence. The copy must carry it: *"Strong fit on what we could check — and we couldn't check enough to be sure."*

---

## 7. STAGE 7 — DIVERSITY CAP

**Maximum one plan per HMO in the top 3.** The highest-scoring plan from each HMO advances; siblings move to alternatives.

Two reasons, both structural:

**Fairness.** Clearline holds 24.5% of fully-matchable plans (12 of 49). Bastion holds 17 priced plans with zero surgery data. Without a cap, plan *count* converts into result *share* regardless of quality.

**Usefulness.** Three tiers of one HMO is not a comparison. A user choosing between Clearline Bronze, Silver and Gold has been given a pricing table, not a recommendation.

The cap is HMO-agnostic and must be implemented as a general rule with no HMO named in the code.

---

## 8. TIE-BREAKING — DETERMINISTIC ORDER

Ties are common with four dimensions. Resolve in this fixed order:
1. Higher confidence
2. Better premium status (`VERIFIED_SNAPSHOT` > `CURRENT` > `VERIFY` > …)
3. More scored dimensions
4. Lower premium
5. `plan_id` ascending

**No randomness. No recency-of-load. No alphabetical-by-HMO** — alphabetical would systematically favour AIICO and AXA.

---

## 9. OUTPUT

Top 3, then 2–4 alternatives (next-highest after the cap, plus any flagged false-economy candidate), then the `hmo_unpriced` panel.

**Every result carries its full audit trail** — weights used, dimensions scored, dimensions excluded and why, filters applied, model version. The audit object ships in v1 even though the UI only exposes part of it; a ranking that cannot be reconstructed afterwards cannot be defended.

---

## 10. WHAT THE ENGINE MUST NOT DO

- Call an LLM anywhere in stages 1–8
- Score `UNKNOWN` as 0 or as average
- Apply any HMO-specific rule, bonus, penalty or ordering
- Show a match % over 95
- Rank a `NOT_PUBLICLY_VERIFIED` plan
- Claim location matching (no geography in the dataset)
- Silently drop a plan without recording the reason
