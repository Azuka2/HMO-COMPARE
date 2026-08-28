# PRICE_DISPLAY_POLICY_V1.md

**Phase 1** · `PRICE_POLICY_V1`

---

## THE RULE

> **No price renders without its status badge and date.** If a component receives an amount without a status, it must throw — not default to "current".

---

## STATUS → DISPLAY

| `status` | Rows | Badge | Colour | Copy |
|---|---:|---|---|---|
| `VERIFIED_SNAPSHOT` | 14 | ✅ Verified 27 Aug 2026 | green | Confirmed against a dated screenshot |
| `CURRENT` | 52 | Checked 27 Aug 2026 | neutral | From the HMO's official page |
| `VERIFY` | 6 | ⚠ Confirm before paying | amber | Sources differ slightly — confirm the exact figure |
| `VERIFY_BEFORE_PURCHASE` | 6 | ⚠ Price may have changed | amber | Source document dated September 2025 |
| `PROMOTIONAL` | 6 | 🏷 Promotional price | blue | A discounted price. The standard price isn't published |
| `POTENTIALLY_STALE` | 3 | ⚠ Pricing may be outdated | red | The page was last updated in February 2025 |
| `NOT_PUBLICLY_VERIFIED` | 12 | Price not publicly verified | grey | This HMO doesn't publish a price for this plan |
| `POTENTIAL_CONFLICT` | 0 | ⚠ Sources disagree | red | Our sources give different prices. Confirm directly |

---

## WHY THE DATES ARE IN THE COPY

Two live cases from Phase 0, and both are the reason this policy exists.

**Reliance** displays "© 2026" in its footer; the page's own metadata says it was last modified **3 February 2025**. Eighteen months old, presented as current.

**Hygeia** was recorded at seven different prices by two research passes reading the same URL one day apart. A dated screenshot settled it. Those 14 records are the only snapshot-backed prices in the dataset — hence the distinct green badge.

A copyright notice is decoration. Page metadata is better and still insufficient. **A dated snapshot is the only thing that settles a dispute**, which is why `VERIFIED_SNAPSHOT` is its own tier.

---

## EVERY PRICE CARRIES

```
₦480,380  per person / year
✅ Verified 27 August 2026 · Source: hygeiahmo.com ↗
```

Amount · basis (per person / family total) · period · status badge · date checked · source link. **All six. No exceptions, including in comparison cells and PDF export.**

---

## SPECIAL CASES

**Family plans with unknown size** — Hygeia's HyBasic Family (₦292,400) and HyPrime Family (₦916,710) don't state how many people they cover:
> ₦292,400 per year · ⚠ Hygeia doesn't state how many people this covers. Confirm before comparing.
They are excluded from per-person comparison entirely.

**Promotional pricing** — IHMS shows strikethrough prices. Display the current figure, badge it promotional, and state that the standard price isn't published. Never treat a sale price as the standard rate.

**Clearline corporate** — sourced from a document titled *September 2025* though found live in 2026:
> ⚠ From Clearline's September 2025 schedule. Prices may have changed — confirm before paying.

**Per-person vs total** — always show both when lives > 1. The corpus contains a plan whose SME version costs 36% more than its corporate version for half the limit; basis confusion is a real failure mode.

---

## FORBIDDEN

- Any price without a status badge
- The word "current" on a price whose effective date is unknown
- Carrying a stale price forward because a newer one wasn't found — the correct output is `NOT_PUBLICLY_VERIFIED`
- A copyright year used as evidence of price currency
- Hiding badges on mobile or in print
- Ranking a `NOT_PUBLICLY_VERIFIED` plan
