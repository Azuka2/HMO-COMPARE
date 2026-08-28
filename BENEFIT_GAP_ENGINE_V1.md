# BENEFIT_GAP_ENGINE_V1.md

**Phase 1** · `GAP_ENGINE_V1`

---

## PURPOSE

Convert an abstract benefit limit into the number a buyer actually cares about: **if this went wrong, how much might I still owe?**

---

## INPUTS

| Input | Source | Default |
|---|---|---|
| `benefit` | user-selected | `surgery` |
| `required_amount` | user slider | ₦2,000,000 (surgery) |
| `plan_limit` | `plan[benefit]` | — |
| `plan_limit_status` | benefit object | — |

**Reference requirements** — assumptions, labelled as such in the UI, editable:

| Benefit | Default | Basis |
|---|---:|---|
| Major surgery | ₦2,000,000 | Coverage-gap examples in the project corpus |
| Maternity (CS) | ₦800,000 | Sits above every published maternity limit in the dataset |
| ICU / admission | ₦1,500,000 | — |
| Cancer care | ₦3,000,000 | — |

These are **not** market price research. The UI says: *"This is our starting assumption — change it to whatever you'd want protected."* Establishing real treatment costs is Phase 2 work against the NHIA fee-for-service schedule.

---

## CALCULATION

```
KNOWN:        gap = max(0, required − plan_limit)
NOT_COVERED:  gap = required                    → "This plan covers none of it."
PARTIAL:      gap = required − limit            → + scope warning
UNDISCLOSED:  gap = NOT_CALCULABLE              → "Amount not published — ask before you buy."
UNLIMITED:    gap = NOT_CALCULABLE              → Farce Detector
UNKNOWN:      gap = NOT_CALCULABLE              → "Not publicly verified."
```

**Never compute a gap of zero from missing data.** `UNDISCLOSED`, `UNLIMITED` and `UNKNOWN` all return `NOT_CALCULABLE` — the absence of a limit is not the absence of a gap. Returning ₦0 there would be the single most dangerous bug this engine could have.

---

## OUTPUT

```
You'd want protected      ₦2,000,000
This plan covers            ₦400,000
──────────────────────────────────────
Potential gap             ₦1,600,000   (80% of what you wanted)
```

**Mandatory caveat, rendered at the same visual weight as the figure:**

> This is an analytical estimate based on published limits — not a prediction of what you would actually pay. Actual costs depend on the treatment, the hospital, and your policy conditions.

Never labelled "out-of-pocket cost", "you will pay", or "shortfall". Always **potential coverage gap**.

---

## NOT_CALCULABLE STATES

**UNLIMITED** — *"NEM's corporate plans state an unlimited annual limit but don't publish a surgery limit. We can't calculate your gap. Ask for the surgery figure in writing."*

**NOT_COVERED** — *"AIICO Executive doesn't cover major surgery at all. Your potential gap is the full ₦2,000,000."* Shown in red, not as a computed row.

**UNKNOWN** — *"This HMO doesn't publish a surgery limit. That's a reason to ask, not a reason to assume."*

---

## THE RATIO CALLOUT

Where `overall_limit` is known and the ratio is below 20%, add:

> ⚠️ **This plan is advertised at ₦10,000,000. It pays up to ₦500,000 for major surgery — 5% of the headline.** The headline limit is the ceiling across everything combined, not what you get for one operation.

---

## WAITING-PERIOD OVERLAY

Where a waiting period applies, the gap in year one is the full requirement regardless of the limit:

> ⚠️ **Reliance major surgery cover starts in month 15.** If you needed surgery in your first year, your potential gap would be the full ₦2,000,000 — the limit doesn't apply yet.

This is a distinct calculation from the steady-state gap and must be shown separately, because it is the difference between a plan that protects you now and one that protects you eventually.

---

## MULTI-BENEFIT VIEW

Optional table across all four reference benefits, with `NOT_CALCULABLE` rows preserved rather than dropped.

---

## FORBIDDEN

- Estimating actual treatment costs (no verified price data — Phase 2, via the NHIA FFS schedule)
- Returning ₦0 for any non-`KNOWN` status
- Presenting the gap as a prediction, guarantee or expected cost
- Summing gaps across benefits into a single "total exposure" figure
- Dropping the caveat on mobile or in print
