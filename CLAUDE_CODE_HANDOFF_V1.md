# CLAUDE_CODE_HANDOFF_V1.md

**HMO Blueprint Nigeria** · Phase 1 complete · 27 August 2026
**Build target:** public-facing HTML prototype. No admin system, no backend integrations, no login.

---

## READ THESE FIRST, IN THIS ORDER

1. `MASTER_PLAN_PRICING_DATA_AUDIT.md` — what the data can and cannot support
2. `PROTOTYPE_DATA_CONTRACT.md` — the loader spec; §3 is the critical section
3. `MATCHING_ENGINE_V1.md` — the ranking algorithm
4. `CLEARLINE_BIAS_TEST_V1.md` — **the gate; do not ship without passing it**

The other eleven are reference for their respective screens.

---

## THE FIVE RULES THAT GOVERN EVERYTHING

**1. Every value carries its evidence state.** No component ever receives a bare number. A price without `status`, `source_url` and `retrieved_date` must throw, not default to "current". Benefit fields are objects, never scalars.

**2. Missing data is excluded, never zeroed and never averaged.** `UNKNOWN` / `UNDISCLOSED` / `UNLIMITED` drop out of the dimension and shrink the weight denominator. Scoring absence as 0 punishes HMOs for our research gaps; scoring it as average rewards opacity — NEM's "unlimited" would become an advantage.

**3. The ranking is deterministic. No LLM in stages 1–8.** Claude writes only `why_it_matches` and `gaps`, from the recommendation object, and may never reorder, add or remove a candidate.

**4. No HMO identifier appears anywhere in ranking code.** Static scan for `clearline`, `NG-HMO-003`, `first_party` across stages 1–8 must return zero. The diversity cap and the self-interest disclosure are data-driven, not hardcoded.

**5. `NOT_COVERED` is the most valuable state in the dataset.** Never coerce it to null. When a user marks a benefit critical, plans with `NOT_COVERED` on that benefit are hard-excluded. Persona 3 must not see AIICO Standard or Executive.

---

## WHAT THE DATA ACTUALLY SUPPORTS

99 rows · 16 HMOs · 95 real plans · **6 HMOs fully matchable**, 4 price-only, 6 excludable.

| Scoreable | Coverage | | Collected, not scoreable |
|---|---:|---|---|
| price | 82/95 | | location, drugs, diagnostics |
| surgery | 45/95 | | dental, optical, ENT, wellness |
| hospital_access | 46/95 | | digital, customer service |
| maternity | **17/95** | | |

**Four of eight dimensions score. Eight of twenty-two questions score.** That is defensible only because the UI says so — see honesty tests H1 and H2 in the success criteria. Build those first; they are not polish.

**There is no geography column.** Location is collected for verification guidance only. Provider data (4,885 records, four HMOs) is display-only in v1 — two of the four files are unusable (Clearline's is unattributed, Novo isn't matchable). Enabling location matching would hand one HMO a structural monopoly at the exact moment users decide.

---

## BUILD ORDER

**Sprint 1 — data layer.** Loader with the §8 validation rules. Benefit value objects. `plan_id` generation. Add `source_url`, `retrieved_date`, `snapshot_ref` columns. Split placeholder rows into `hmo_unpriced`. Parse `provider_access` free text into structured tiers. Fail loudly on every violation.

**Sprint 2 — engine.** Stages 1–8, deterministic, no LLM. Run all 5 personas. Run the A/B/C bias test. **Do not proceed until runs A and B produce identical orderings.**

**Sprint 3 — assessment.** 22 questions, one per screen, six groups, all skippable. Priority profile confirmation screen — this is the trust moment and it includes the "couldn't score" line.

**Sprint 4 — results.** Ten sections in fixed order. Sections 4 (Watch out) and 7 (Verify) are mandatory and never collapsed. Match ceiling 95. Confidence never merged with match.

**Sprint 5 — comparison, gap, Farce Detector.** 13 rows including the three with no data. Row 5 (surgery-as-%-of-headline) is the signature output. Gap engine returns `NOT_CALCULABLE`, never ₦0.

**Sprint 6 — mobile, print, WhatsApp share.** WhatsApp is a primary action in Nigeria, not an afterthought.

---

## THE SIGNATURE OUTPUT

If one thing ships correctly, make it this — pure arithmetic on two published numbers, no judgement, no weighting:

```
AIICO Magnum Concierge   ₦50,000,000 advertised → ₦750,000 major surgery    1.5%
AIICO Magnum             ₦10,000,000 advertised → ₦500,000 major surgery    5.0%
Reliance Diamond          ₦3,000,000 advertised → ₦500,000 major surgery   16.7%
Clearline Platinum+       ₦5,000,000 advertised → ₦1,500,000 major surgery 30.0%
```

*A plan advertised at ₦50 million pays up to ₦750,000 for major surgery. The headline is the ceiling across everything in a year — not what you get for one operation.*

Note Clearline appears in six of the twelve rows. Sorted by ratio, not by publisher, and it stays that way.

---

## KNOWN DEFECTS TO HANDLE, NOT FIX

- Hygeia family plans don't state how many lives they cover → excluded from per-person comparison
- 14 SME/corporate plans lack `min_lives` → SME-ineligible
- Clearline corporate pricing comes from a document titled September 2025 → `VERIFY_BEFORE_PURCHASE`
- Reliance pages last modified February 2025 → `POTENTIALLY_STALE`
- IHMS shows strikethrough pricing → `PROMOTIONAL`, standard price unknown
- Duplicate plan names across HMOs (Bronze, Silver, Gold, Platinum, Standard, Diamond) → always render HMO + plan

---

## OPEN P0 ITEMS — NOT PROTOTYPE BLOCKERS

The NHIA paid-up share capital figure (pages 60–95 of the Operational Guidelines 2023) and attribution of the Clearline provider file remain open. Neither blocks this build, because the prototype makes no financial-strength claim and does no location matching. Both block anything beyond it.

---

## THE ACCEPTANCE TEST

Show it to someone at an HMO that ranks poorly, and to someone at Clearline.

If the first says *"that's unfair"* and can't point to a factual error, and the second says *"that's harsher on us than I expected"* — it works.

If the second is pleased, re-run the bias test before believing it.
