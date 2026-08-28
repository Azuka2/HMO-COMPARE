# COMPARISON_ENGINE_V1.md

**Phase 1** · `COMPARISON_V1` · Up to 3 plans side by side.

---

## THE RULE

> **Never compare on "covered / not covered."** Two plans both saying "surgery covered" can differ by an order of magnitude. Show the number, the scope, the conditions and the evidence state — or show that the figure isn't published.

---

## 13 ROWS

| # | Row | Source | Data coverage |
|---|---|---|---|
| 1 | Annual premium | `premium` | 82/95 |
| 2 | Total for your group | computed | derived |
| 3 | Overall limit | `overall_limit` | 39/95 |
| 4 | **Major surgery** | `surgery_major` | 45/95 |
| 5 | **Surgery as % of headline** | computed | 14 plans |
| 6 | Maternity | `maternity` | 17/95 |
| 7 | Hospital access tier | `provider_access` | 46/95 |
| 8 | Payment model | `payment_model` | 5/95 |
| 9 | Waiting periods | `waiting_periods` | partial |
| 10 | Medication | — | **0/95** |
| 11 | Dental & optical | — | **0/95** |
| 12 | Scans (MRI/CT) | — | **0/95** |
| 13 | Evidence & date | `status` | 99/99 |

Rows 10–12 ship in v1 showing *"Not published by any HMO we hold."* Hiding them would imply we compared things we didn't.

---

## ROW 5 — THE SIGNATURE ROW

`surgery_major ÷ overall_limit`, displayed as a percentage with a bar.

```
AIICO Magnum Concierge   ₦50,000,000 headline → ₦750,000 surgery      1.5%  ▏
AIICO Magnum             ₦10,000,000 headline → ₦500,000 surgery      5.0%  ▎
Reliance Diamond          ₦3,000,000 headline → ₦500,000 surgery     16.7%  ▊
Clearline Platinum+       ₦5,000,000 headline → ₦1,500,000 surgery   30.0%  ███
```

Caption: *A plan advertised at ₦50 million pays up to ₦750,000 for major surgery. The headline is the ceiling across everything — not what you get for one operation.*

This is the platform's most distinctive output. It requires no judgement, no weighting and no ranking — only arithmetic on two published numbers.

---

## CELL RENDERING

| Status | Cell |
|---|---|
| `KNOWN` | **₦400,000** |
| `NOT_COVERED` | 🔴 **Not covered** |
| `PARTIAL` | ⚠️ ₦500,000 *(minor surgery only)* |
| `UNDISCLOSED` | ⚠️ *Covered — amount not published* |
| `UNLIMITED` | ⚠️ *"Unlimited"* → Farce Detector |
| `UNKNOWN` | *Not published* |

**Never render `UNKNOWN` as `—`, `0` or blank.** A dash reads as zero, and zero is a factual claim we cannot make.

---

## HIGHLIGHTING

Best value per row gets a subtle mark — **only when every compared plan has `KNOWN`** for that row. If any cell is `UNKNOWN`, no winner is marked, because a plan cannot win a row by not publishing.

No overall "winner" is declared. The comparison informs; the ranking already happened.

---

## COMPARISON WARNINGS

Auto-generated above the table:

- **Different customer types** — *"You're comparing a retail plan with an SME plan. The SME plan needs at least 5 people."*
- **Different price bases** — *"One is per person, one is a family total."*
- **Asymmetric evidence** — *"We have snapshot-verified data for Hygeia and a page last modified in February 2025 for Reliance."*
- **Same HMO** — *"All three are from one HMO. Add a plan from another for a real comparison."*

---

## MOBILE

Sticky first column, horizontal scroll, snap-to-column. Row 4 (surgery) and row 5 (ratio) pinned near the top — they carry the most decision weight and must not be buried below rows 10–12 which contain no data.
