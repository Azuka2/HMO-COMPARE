# PROTOTYPE_USER_JOURNEY.md

**Phase 1** · `JOURNEY_V1` · Ten screens, one path, no branches.

---

## THE PATH

```
1  LANDING
2  ASSESSMENT (22 questions, 6 groups)
3  PRIORITY PROFILE  ← user confirms/corrects
4  FILTERING (transparent, ~2s)
5  TOP 3 RESULTS
6  WHY THIS MATCH
7  COMPARE
8  BENEFIT GAP
9  VERIFY BEFORE BUYING
10 SAVE / SHARE
```

Linear. Back always works. Answers persist in session state. No login, no email gate — an email wall on a neutral platform makes it a lead funnel, which is exactly what this project must not become.

---

## 1. LANDING

**Headline:** *Which health plan actually makes sense for you?*
**Sub:** *Answer 22 short questions. We'll show you what each plan really covers — including the parts they don't put on the poster.*

One CTA: **Start — takes 4 minutes**.

Below the fold, three honesty blocks — these are the credibility layer and must ship in v1:

- **What we cover** — 95 plans from 16 HMOs. Six HMOs have enough public data to compare properly. Ten don't, and we'll show you which.
- **Where our numbers come from** — every price links to its source and the date we checked.
- **Who built this** — the disclosure from `ANTI_BIAS_PROTOCOL.md` §5, in full, above the fold on mobile.

The disclosure is not a footer link. Someone comparing HMOs deserves to know the builder works at one of them *before* they read a recommendation.

---

## 2. ASSESSMENT

One question per screen. Progress bar `Question 7 of 22`. Six groups with a short interstitial each:

| Group | Qs | Interstitial |
|---|---|---|
| Who & where | 1–4 | "First, who are we covering?" |
| Money | 5 | "Let's talk budget." |
| Hospitals | 6–8 | "Where you get treated matters." |
| Health needs | 9–17 | "What do you actually need cover for?" |
| Service | 18–20 | "How do you like to be looked after?" |
| Priorities | 21–22 | "Last two — these matter most." |

Every question skippable. Skips reduce confidence, never block. Tap targets ≥44px, no typing except budget and hospital name.

---

## 3. PRIORITY PROFILE — THE TRUST MOMENT

Before any result, show what we understood:

> **You're a family-protection buyer.**
> Covering 4 people in Lagos on about ₦600,000 a year. You told us surgery and maternity are critical, hospital choice matters a lot, and you'd rather pay more than risk a big bill.
>
> **We weighted:** surgery, maternity, hospital access, drugs
> **We didn't weight:** gym, spa
> **We couldn't score:** dental, optical, diagnostics — not enough public data

Two buttons: **That's right** · **Let me fix something**.

The third line is the one that earns trust. Admitting what we couldn't score, before showing results, is worth more than any match percentage.

---

## 4. FILTERING

~2 seconds, steps visible:

```
Checking 95 plans across 16 HMOs
Removing plans you're not eligible for       → 68 left
Removing plans outside your budget           → 31 left
Removing plans that don't cover what's critical → 19 left
Scoring against your priorities              → 19 scored
```

Then, always:

> **6 HMOs had enough public data to compare properly. 10 did not — we'll show you those separately.**

The counts are real, computed live. No fake progress.

---

## 5. TOP 3 RESULTS

Three cards. Rank 1 larger. Each shows: HMO + plan, match %, price with status badge, 3 relevant benefit lines, 1 warning, confidence pill.

Below: **Strong alternatives** (2–4) · **Couldn't compare these** (the 6 unpriced HMOs + what to ask them).

Never more than one plan per HMO in the top 3 (`MATCHING_ENGINE_V1.md` §7).

---

## 6. WHY THIS MATCH

Expanded view per `RESULTS_PAGE_SPEC_V1.md`. Sections in fixed order:
Why we chose it · What you get · **Watch out** · Potential gap · Confidence · Verify before paying.

**"Watch out" is never collapsed and never empty.** If a plan genuinely has no flags, it says so explicitly — an empty warning box reads as an oversight.

---

## 7. COMPARE

Up to 3 plans, 13 rows, mobile = horizontal scroll with sticky labels. Cells show value + status. `UNKNOWN` renders as "Not published", never as a dash — a dash reads as zero.

---

## 8. BENEFIT GAP

User enters what they'd want protected (default ₦2,000,000 surgery). Shows requirement, plan limit, gap, and the mandatory caveat:

> This is an analytical estimate based on published limits — not a prediction of what you'd actually pay.

---

## 9. VERIFY BEFORE BUYING

The screen that makes this a consumer tool rather than a comparison site.

3–5 generated questions specific to the user's plan and priorities, plus a copyable phone script and the standing provider caveat. Buttons: **Copy questions** · **Share to WhatsApp**.

WhatsApp matters — it is how this will actually travel in Nigeria.

---

## 10. SAVE / SHARE

Print-friendly summary, WhatsApp share, "start over". No account, no email capture.

---

## OUT OF SCOPE FOR V1

Login · saved sessions · lead capture · quote requests · provider search by location (§7 of the data contract) · admin dashboard · payments · live HMO integrations · natural-language input.

---

## THE TEST

A user who completes this journey and buys nothing should still leave able to say:

> *I now know what to ask before I pay, and I know what "unlimited" doesn't mean.*

If the prototype achieves that and nothing else, it has worked.
