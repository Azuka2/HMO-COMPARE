# PROTOTYPE_SUCCESS_CRITERIA.md

**Phase 1** · `SUCCESS_V1`

---

## GATE 1 — MUST PASS TO SHIP

Binary. Any failure blocks release.

| # | Criterion | Test |
|---|---|---|
| 1 | User completes all 22 questions | All 5 personas, mobile + desktop |
| 2 | Personalised top 3 returned | Different personas → different results |
| 3 | Every recommendation explainable | Every reason traceable to the recommendation object |
| 4 | Price visible with status badge and date | Zero prices render bare |
| 5 | Relevant benefits shown | Only benefits matching stated priorities |
| 6 | Limits visible as naira, not "covered" | No boolean-only benefit display |
| 7 | Uncertainty visible | Confidence + "scored N of 8" on every result |
| 8 | Comparison works, 13 rows | `UNKNOWN` renders as "Not published", never `—` or `0` |
| 9 | Gap calculator works | Returns `NOT_CALCULABLE` for non-`KNOWN`, never ₦0 |
| 10 | Provider caveat on every result | Present, not collapsed |
| 11 | **No hidden HMO preference** | `CLEARLINE_BIAS_TEST_V1` runs A/B/C pass, all 8 criteria |
| 12 | Mobile experience strong | 360px viewport, 44px targets, no horizontal scroll |
| 13 | Ranking deterministic | Same input → identical output, 100 runs |
| 14 | No LLM in the ranking path | Static scan of stages 1–8 |
| 15 | Disclosure on landing and every results page | Above fold on mobile |
| 16 | `NOT_PUBLICLY_VERIFIED` never ranked | 12 plans, zero appearances |
| 17 | `NOT_COVERED` triggers exclusion when critical | Persona 3 must not see AIICO Standard or Executive |
| 18 | No match score above 95 | Ceiling enforced |

---

## GATE 2 — QUALITY

Not blocking, but tracked.

- Assessment completes in under 5 minutes
- Fewer than 3 skipped questions per session (median)
- Results render in under 2 seconds after filtering
- Every warning is specific to the plan — no generic filler
- Verification questions name the user's plan and hospital
- Farce Detector fires at expected symmetry (Clearline ≥ 7)
- Print/PDF preserves all ten result sections including caveats

---

## GATE 3 — THE HONESTY TESTS

These matter more than any of the above, and they are the ones most likely to be quietly dropped under delivery pressure.

**H1 — The unscored disclosure.** Every user is told, before results, which of their priorities could not be scored. Persona 1 rated digital 8 and dental 6 in his top three; both are unscoreable. If he reaches a recommendation without knowing that, the prototype has misled him.

**H2 — The maternity statement.** A user marking maternity critical is told that only 17 of 95 plans publish a maternity limit. Silence here would be the most consequential omission available to us.

**H3 — No implied location matching.** Location is collected and never used for ranking. No screen may imply we checked hospitals near the user.

**H4 — The "couldn't compare" panel renders.** Six HMOs publishing nothing is a finding about the market. Hiding it would make our coverage look better than it is.

**H5 — Confidence never reads as quality.** Copy must carry the distinction on every LOW/MEDIUM result.

**H6 — Warnings never suppressed for the top result.** Rank 1 gets the same scrutiny as rank 3. A results page whose best match has no warnings is suspicious, not clean.

---

## WHAT SUCCESS IS NOT

Not: every HMO covered · every benefit scored · location matching · a definitive ranking of Nigerian HMOs · high match scores · lead generation.

**The prototype succeeds if a user who buys nothing still leaves able to say:**

> *I know what to ask before I pay, and I know what "unlimited" doesn't mean.*

---

## THE SINGLE HARDEST TEST

Show the prototype to someone who works at an HMO that ranks poorly, and to someone who works at Clearline.

If the first says *"that's unfair"* and cannot point to a specific factual error, and the second says *"that's harsher on us than I expected"* — it is working.

If the second is pleased with how Clearline looks, re-run the bias test before believing it.
