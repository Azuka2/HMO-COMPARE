# CLEARLINE_BIAS_TEST_V1.md

**Phase 1** · `BIAS_TEST_V1` · **Gating test. The prototype does not ship until it passes.**

---

## WHY THIS TEST EXISTS

The project owner works in corporate partnerships at ClearlineHMO. Clearline holds **24.5% of all fully-matchable plans** (12 of 49) and **15.4% of matchable retail-individual plans** (4 of 26). It is also the only HMO contributing non-public first-party data.

The risk is not that someone favours Clearline deliberately. It is that structural advantages — more plans, better data, a project whose scoring concepts were partly derived from a Clearline sales book — convert into ranking advantage automatically, and every individual step looks defensible.

---

## THE THREE RUNS

For each of the 5 personas, run the identical engine three ways:

**A — INCLUDED.** Normal. Record full ranked output.

**B — ANONYMISED.** Replace every HMO name and ID with random labels (`HMO_A`…`HMO_P`), shuffled per run with a fixed seed. Strip HMO names from `plan_name`. The engine must produce **identical ordering** to Run A after de-anonymisation.

**C — REMOVED.** Delete all 12 Clearline plans. Record what fills the gap.

---

## PASS CRITERIA

| # | Criterion | Threshold |
|---|---|---|
| **1** | Run A ordering ≡ Run B ordering (de-anonymised) | **Exact match, all 5 personas.** Any difference proves a brand-keyed path. Hard fail. |
| **2** | Match scores identical between A and B | **Exact, to the integer.** |
| **3** | Clearline top-3 appearances | ≤ 2 of 15 slots (5 personas × 3). Above expectation (15.4% ≈ 2.3) triggers investigation, not automatic failure. |
| **4** | Run C degradation | Removing Clearline must not improve results. If it does, Clearline plans were displacing better matches. |
| **5** | Every Clearline appearance traceable | Each must be explainable by dimension scores alone. |
| **6** | Farce Detector symmetry | Clearline fires ≥ 7 times across the dataset. Fewer means rules were softened. |
| **7** | No HMO identifier in ranking code | Static scan of stages 1–8 for `clearline`, `NG-HMO-003`, `first_party`. **Zero matches.** |
| **8** | Warnings applied symmetrically | Clearline's Sept-2025 pricing must carry `VERIFY_BEFORE_PURCHASE` exactly as Reliance's Feb-2025 page carries `POTENTIALLY_STALE`. |

---

## THE INVERSE TEST — EQUALLY IMPORTANT

Over-correction is also bias. Run a fourth pass with Clearline relabelled as a random competitor **and** a competitor relabelled as Clearline. If Clearline's plans score differently under the competitor's label, the model discriminates — in either direction.

Deliberately marking Clearline down, or holding its claims to a stricter evidence standard than Leadway's or THT's identical claims, corrupts the methodology just as surely as favouring it.

---

## KNOWN STRUCTURAL ADVANTAGES — AND THEIR CONTROLS

| Advantage | Control |
|---|---|
| 12 of 49 matchable plans | Diversity cap: max 1 plan per HMO in top 3 (`MATCHING_ENGINE_V1` §7) |
| Only HMO with first-party benefit data (SME schedule) | Non-public rows flagged `FIRST_PARTY`; SME plans compete only in SME journeys |
| Only HMO with a full provider file | **Provider data excluded from matching entirely in v1** (data contract §7) |
| Scoring concepts partly derived from Clearline's sales book | Every dimension justified by buyer need from the assessment, not vendor differentiation |
| Project named after a Clearline publication | Rename before public launch (`ANTI_BIAS_PROTOCOL` §6) |

**The provider exclusion is the most important of these.** Clearline has 2,141 provider records; four other matchable HMOs have none or partial. Location matching would have handed Clearline a structural monopoly at the exact moment users decide — seeing a hospital they recognise near home. It is excluded until competitors have comparable data.

---

## THE STANDING QUESTION

Asked at every model version, answer recorded in the version log:

> **If ClearlineHMO ranked 7th on this dimension, would we accept the result without adjusting the methodology?**

If the honest answer is no, the methodology is not ready.

---

## RED FLAGS — HALT AND ESCALATE

- A weight changed after seeing which HMO it favoured
- A dimension added that maps to a Clearline differentiator
- The diversity cap removed, raised, or exempted
- Provider data enabled for matching before competitors have comparable coverage
- A Farce Detector rule narrowed in a way that reduces Clearline fires
- The disclosure shortened, moved below the fold, or softened
- Clearline's Sept-2025 pricing badged more leniently than Reliance's Feb-2025 pricing

---

## REPORTING

Every release publishes: per-persona rankings for runs A/B/C, top-3 share by HMO, Farce Detector fires by HMO, static-scan result, and the standing question with its answer.

**If Clearline ranks first for a persona, that result ships** — provided runs A and B match exactly and the score is traceable to dimensions. The test exists to make favouritism impossible, not to make a good result unpublishable.
