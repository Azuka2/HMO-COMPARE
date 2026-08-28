# USER_PRIORITY_MODEL_V1.md

**Phase 1** · `PRIORITY_MODEL_V1` · **Weights are provisional and versioned. Nothing here is frozen.**

---

## 1. WHAT THIS DOES

Converts 22 answers into a priority vector on 0–10, then normalises to weights summing to 1.0. The vector is the *only* thing the matching engine sees from the user. It is displayed to the user before results and is editable.

---

## 2. DIMENSIONS

Eight dimensions. **Only four are currently scoreable.**

| Dimension | Source | Data coverage | Scoreable? |
|---|---|---|---|
| `price` | Q5, Q21 | 82/95 plans | ✅ |
| `surgery` | Q14, Q21, Q22 | 45/95 | ✅ |
| `hospital_access` | Q8, Q21 | 46/95 | ✅ |
| `maternity` | Q9, Q10, Q21, Q22 | **17/95** | 🟡 thin |
| `drugs` | Q17, Q21 | 0/95 | ❌ |
| `diagnostics` | Q15, Q21 | 0/95 | ❌ |
| `digital` | Q18, Q21 | 0/95 | ❌ |
| `wellness` | Q16, Q21 | 0/95 | ❌ |

**Unscoreable dimensions stay in the vector.** They are displayed to the user, excluded from scoring, and logged. When the data arrives they light up without a model change — and in the meantime the gap between "what you said mattered" and "what we could check" is visible rather than hidden.

---

## 3. BASE MAPPING

```
importance:  Not important 0 · Nice to have 3 · Important 6 · Very important 8 · Critical 10
```

**price** — derived from budget behaviour, not asked directly:
```
"not sure"           → 5
budget ≤ ₦50k/person → 9
₦50–150k/person      → 7
₦150–400k/person     → 5
> ₦400k/person       → 3
"low price" in Q21   → floor of 8
```

**surgery** = Q14 · **hospital_access** = Q8 · **drugs** = Q17 · **diagnostics** = Q15 · **digital** = Q18

**maternity** — composite, because Q9 alone understates it:
```
Q9 "critical"        → 10
Q9 "planning soon"   → 8
Q9 "maybe in future" → 4
Q9 "not relevant"    → 0
+2 if Q4 includes adults 18–39 AND Q9 ≠ "not relevant"   (cap 10)
```

**wellness** = 2 if selected in Q16, else 0. Deliberately low. The corpus shows gym and spa are the benefits HMOs advertise hardest and buyers regret weighting.

---

## 4. MODIFIERS

**Top-3 multiplier (Q21):** ×1.5, capped at 10. Rank within the three does not differentiate — a 3-way ranking from one tap sequence is not reliable enough to weight.

**Fear modifier (Q22):** +2 to the matching dimension, capped at 10.
`surgery_gap → surgery` · `maternity_gap → maternity` · `hospital_not_covered → hospital_access` · `limit_too_low → surgery` · `paid_a_lot → surgery` · `drugs_excluded → drugs` · `emergency_hard → hospital_access` · `nobody_answered → digital`

Rationale: stated priorities are what people think they want; the fear question surfaces what they'd actually regret. It nudges rather than overrides.

**Senior modifier:** `has_seniors` → surgery +1, drugs +1, maternity forced to 0.

**Restriction tolerance (Q20)** does not enter the vector. It gates waiting-period penalties in the matching engine.

---

## 5. NORMALISATION

```
weight[d] = raw[d] / Σ(raw over SCOREABLE dimensions only)
```

Unscoreable dimensions are excluded from the denominator, so a user who cares deeply about drugs does not have their surgery weight diluted by a dimension we cannot assess. They are told this.

---

## 6. WORKED EXAMPLE — PERSONA 3

Family of 4, Lagos, ₦600,000, surgery critical, maternity critical, hospital choice "want good hospitals", top 3 = surgery / hospital quality / maternity, fear = surgery gap.

```
raw:  surgery 10 (Q14) ×1.5 → 10 (cap), +2 fear → 10
      maternity 10 ×1.5 → 10
      hospital_access 8 ×1.5 → 10
      price: ₦150k/person → 5
      drugs 6 · diagnostics 6 · digital 3 · wellness 0     [unscoreable]

scoreable raw: surgery 10, maternity 10, hospital 10, price 5   Σ=35

weights: surgery 0.286 · maternity 0.286 · hospital_access 0.286 · price 0.143
```

Displayed as: *"We weighted surgery, maternity and hospital access equally, and price about half as much. We couldn't score drugs, scans or digital — no public data."*

---

## 7. WHY THESE NUMBERS ARE PROVISIONAL

They are reasoned, not validated. No user testing, no outcome data, no expert panel.

**Known weaknesses:**
- ×1.5 and +2 are round numbers chosen for legibility, not fitted
- Price weight derived from budget may under-weight genuinely cost-driven buyers
- Maternity's +2 age modifier assumes intent from demographics — thin
- Equal weighting of three "critical" answers may not reflect real trade-offs

**Validation before any public ranking:** run all 5 personas, confirm results are defensible; run the anonymised-ID swap test; sensitivity-test ±20% on every weight and check whether top-3 membership changes; if it does, the model is over-tuned.

**Version every change.** Record `priority_model_version` on every recommendation. Never adjust a weight after seeing which HMO it favours — that is the specific failure mode `ANTI_BIAS_PROTOCOL.md` §8 names.
