# RESULTS_PAGE_SPEC_V1.md

**Phase 1** · `RESULTS_SPEC_V1`

---

## SECTION ORDER — FIXED

```
0  Fear-framed opener      (from Q22)
1  Your best match
2  Why we chose it
3  What you get
4  Watch out               ← never collapsed, never empty
5  Potential gap
6  Confidence
7  Verify before paying
8  Strong alternatives
9  Couldn't compare these
10 Disclosure
```

Sections 4 and 7 are mandatory on every result. A results page that shows a recommendation without warnings and verification questions has failed regardless of how good the match is.

---

## 0. FEAR-FRAMED OPENER

One line, driven by Q22. Same ranking, different entry point:

| Fear | Opener |
|---|---|
| `surgery_gap` | *You said you'd most regret a surgery gap. Here's what each plan actually covers for major surgery — it's usually far less than the headline.* |
| `hospital_not_covered` | *You said you'd most regret your hospital not being covered. Read the verification section before you pay — it's the part that protects you.* |
| `limit_too_low` / `paid_a_lot` | *You said you'd most regret still having to pay. We've calculated your potential gap on every plan below.* |
| `maternity_gap` | *You said you'd most regret a maternity gap. Only some HMOs publish a maternity limit — we've flagged which.* |
| `nobody_answered` | *You said you'd most regret poor support. We can't score customer service yet — no independent data exists. Here's how to test it yourself.* |

---

## 1. YOUR BEST MATCH

```
┌────────────────────────────────────┐
│ YOUR BEST MATCH                    │
│                                    │
│ Hygeia HMO                         │
│ HyPrime Plus                       │
│                                    │
│        88% match                   │
│   Scored on 4 of your 8 priorities │
│                                    │
│ ₦480,380 per person / year         │
│ ~₦1,921,520 for 4 people           │
│ ✅ Verified 27 August 2026          │
│                                    │
│ Confidence: MEDIUM                 │
└────────────────────────────────────┘
```

**Rules.** Match % never above 95. The "scored on N of 8" line sits directly beneath it and is never omitted — a bare percentage implies completeness we don't have. Price shows per-person *and* estimated total when lives > 1. Status badge always visible. Confidence never merged with match.

---

## 2. WHY WE CHOSE IT

3–5 bullets, Claude-authored from the recommendation object only. Each ties a plan attribute to something the user actually said.

> - You said hospital choice matters a lot. This plan opens Category A–D, which includes Hygeia's top-tier hospitals.
> - Maternity is critical for you. This plan publishes a ₦300,000 maternity limit — many plans we checked publish nothing.
> - The price is verified against a screenshot we took today, so you're not looking at a stale figure.

**Forbidden:** superlatives ("the best option in Nigeria"), comparisons to HMOs outside the result set, any fact not in the object.

---

## 3. WHAT YOU GET

Only benefits matching a stated priority, plus limits. Then, in a visually distinct block:

> **What we couldn't check**
> You told us medication cover, scans and dental/optical matter. None of the HMOs we hold publish these figures. We've listed them in your verification questions instead.

This block ships in v1. Omitting it would let silence read as coverage.

---

## 4. WATCH OUT

Red/amber, expanded, above the fold on mobile.

> ⚠️ **At ₦480,380 per person, four people costs about ₦1.92m — more than triple your ₦600,000 budget.**
> ⚠️ **The ₦400,000 surgery limit sits inside a ₦2,500,000 inpatient limit.** Inpatient cover and surgery cover are not the same thing.
> ⚠️ **Hygeia's family plans don't state how many people they cover.** We've priced per person — confirm this.

If a plan genuinely has no warnings, print *"We found no specific concerns with this plan — but see the verification questions below."* Never render an empty box.

---

## 5. POTENTIAL GAP

```
You'd want protected     ₦2,000,000
This plan covers           ₦400,000
─────────────────────────────────────
Potential gap            ₦1,600,000
```

Mandatory caveat, same weight as the figure:

> This is an analytical estimate based on published limits — not a prediction of what you would actually pay. Actual costs depend on treatment, hospital and policy conditions.

The default ₦2,000,000 requirement is an assumption and is labelled as one, with an inline control to change it.

---

## 6. CONFIDENCE

Pill + drivers, with the separation stated in plain words:

> **MEDIUM confidence**
> ✅ Price verified against a dated screenshot
> ✅ Surgery and maternity limits published
> ⚠️ No provider confirmation for Lagos
> ⚠️ 4 of your 8 priorities couldn't be scored
>
> *Confidence describes our evidence, not this plan's quality. A good plan can score LOW here simply because the HMO publishes little.*

---

## 7. VERIFY BEFORE PAYING

Highest-value screen in the product.

> **Call before you pay.** A hospital appearing on any list — including ours — does not mean it will accept your exact plan today.

3–5 generated questions, plus a copyable script and **Copy** / **Share to WhatsApp** buttons. WhatsApp is how this travels in Nigeria and should be a primary action, not an afterthought.

---

## 8. STRONG ALTERNATIVES

2–4 cards, one per HMO. False-economy candidates carry a distinct flag:

> 🔍 **Worth a second look — Reliance Alexandrite, ₦117,420**
> 27% more than Red Beryl for double the surgery limit. If surgery is your priority, the cheaper plan may be the more expensive choice.
> ⚠️ Major surgery cover doesn't start until month 15.

---

## 9. COULDN'T COMPARE THESE

> **6 HMOs don't publish enough for us to compare them**
> That's not evidence they're bad — it means we can't check. Here's what to ask them.

Names, known facts, four questions. This section is a finding about the Nigerian market, presented as such.

---

## 10. DISCLOSURE

Full text from `ANTI_BIAS_PROTOCOL.md` §5, on every results page. If a Clearline plan appears in the results, the disclosure renders **directly above** section 1 rather than at the foot.

---

## MOBILE

Single column, 16px+ body, 44px targets, sticky "Verify before paying" button. Section 4 must be reachable without horizontal scroll. Print/PDF preserves all ten sections including caveats.

---

## LANGUAGE

Grade-8 reading level. "Limit" not "sub-limit ceiling". "Waiting period" always glossed on first use. Naira always formatted with separators. Never: *guaranteed*, *best HMO*, *fully covered*, *comprehensive*, *unlimited* (except when quoting a claim in order to challenge it).
