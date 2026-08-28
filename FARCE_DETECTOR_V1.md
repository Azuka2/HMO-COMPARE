# FARCE_DETECTOR_V1.md

**Phase 1** · `FARCE_V1` · Rule-based. No LLM in detection.

---

## PURPOSE

Translate marketing language into what it means for a buyer. Every rule fires on **any** HMO — including Clearline. A detector that never produces an unflattering finding about the builder's employer is not a detector.

---

## RULE 1 — "UNLIMITED" / "NO FINANCIAL LIMIT"

**Fires on:** `overall_limit.status == UNLIMITED`
**Live cases:** NEM corporate & SME (all 11 plans); Greenbay ("No Financial Limit to Cover"); Reliance small-business ("unlimited admissions")

> **They say:** Annual benefit limit — Unlimited
> **What it means:** No cap on the *total* across all services in a year.
> **The condition:** Individual services still have their own limits. NEM's same table says surgery is *"covered to approved limits"* — four rows below the word unlimited. Those approved limits aren't published anywhere on the page.
> **Ask them:** What is the actual naira limit for major surgery? For maternity? For cancer? Send it in writing.

**Severity: HIGH** when sub-limits are undisclosed. Unlimited is not scored as a benefit — it is scored as missing data plus a warning.

---

## RULE 2 — HEADLINE-TO-SURGERY RATIO

**Fires on:** `surgery_major / overall_limit < 0.20`, both `KNOWN`
**Live cases:** 8 of 14 plans where both figures exist

> **They say:** ₦50,000,000 cover
> **What it means:** ₦750,000 for major surgery — **1.5%** of the headline.
> **The condition:** A headline limit is the ceiling across everything combined in a year. Almost no one reaches it. The surgery sub-limit is what applies when you need an operation.
> **Ask them:** What is the major surgery limit, in naira? Is it separate from the overall limit or inside it?

Severity scales: <5% CRITICAL · 5–10% HIGH · 10–20% MEDIUM.

---

## RULE 3 — "THOUSANDS OF HOSPITALS"

**Fires on:** any provider count claim
**Live cases:** Clearline 1,400+ / 2,000+ / 2,500+ across three of its own documents; Reliance 450 displayed / 2,600+ Nigeria / 3,800+ global; AXA 400+ vs 2,004 per plan; Leadway 1,000+ vs 2,500+; THT 1,700+ NG / 7,000+ Africa

> **They say:** 2,500+ hospitals nationwide
> **What it means:** A count across the whole organisation — every tier, every plan, sometimes every country.
> **The condition:** Your plan opens a *subset*. AXA's entry retail list contains 419 hospitals against a page advertising up to 2,004. AIICO's Standard plan opens 245. Network size tells you nothing about whether your hospital, in your area, takes your tier.
> **Ask them:** How many hospitals does *my plan* open, in *my state*? Is [my hospital] on that list today?

**Severity: HIGH** where the same HMO publishes conflicting counts — currently Clearline, Reliance, AXA and Leadway.

---

## RULE 4 — "NATIONWIDE"

**Fires on:** any nationwide/national coverage claim

> **What it means:** They have providers in many states — usually not all 36 + FCT, and rarely evenly.
> **The condition:** Every provider file we hold concentrates in Lagos. Novo's 2,080 records are 29% Lagos; the AXA retail list has no Kebbi or Nasarawa coverage at all.
> **Ask them:** How many hospitals do you have in my state, on my plan?

---

## RULE 5 — "COMPREHENSIVE" / "FULL COVER"

> **What it means:** Nothing specific. There is no regulatory definition.
> **The condition:** Every plan we hold has exclusions. Avon's published list runs to 17 categories including cancer treatment, organ transplant and congenital conditions.
> **Ask them:** Send me the full exclusion list and the waiting periods.

---

## RULE 6 — "BEST HMO" / "#1"

**Fires on:** superlative ranking claims
**Live cases:** Bastion's blog ranks Bastion #1; a Nairaland "Top 10" with no stated methodology; several aggregator lists carrying prices contradicted by the HMOs' own pages

> **What it means:** Usually that the publisher sells the product, or that no methodology exists.
> **The condition:** One aggregator claims an HMO partners with "over 150,000 hospitals" — roughly ten times NHIA's entire national accredited-provider count of 15,458.
> **Ask them:** Who wrote this, what was measured, and what were they selling?

**This rule applies to us.** Our own match percentages are capped at 95 and carry "scored on N of 8 priorities" for the same reason.

---

## RULE 7 — "PREMIUM HOSPITALS"

> **What it means:** Sometimes specific and verifiable — Hygeia's Senior Exclusive names Evercare and Reddington. Usually not.
> **Ask them:** Name them. Then call one and confirm it takes this exact plan.

---

## RULE 8 — WAITING PERIODS BURIED

**Fires on:** any waiting period > 6 months on a benefit the user rated ≥ 8
**Live cases:** Reliance major surgery month 15; AIICO chronic 24 months, maternity 18; Avon optical/dental 6

> **What it means:** You're paying from day one. The cover starts later.
> **The condition:** Reliance publishes a six-quarter release schedule. Major surgery arrives in month 15 — you must have renewed to reach it.
> **Ask them:** What can I actually use in month one? When does surgery cover begin?

**Severity: CRITICAL** where the delayed benefit is one the user called critical.

---

## OUTPUT

```json
{"rule":"HEADLINE_RATIO","severity":"CRITICAL","hmo_id":"NG-HMO-006",
 "plan_id":"NG-HMO-006-magnum-concierge-retail_individual",
 "claim":"₦50,000,000 cover","reality":"₦750,000 for major surgery (1.5%)",
 "conditions":["Headline is annual aggregate","Surgery sub-limit applies per event"],
 "verify":["What is the major surgery limit in naira?"],
 "evidence":{"overall_limit":50000000,"surgery_major":750000,"source":"aiicomultishield.com"}}
```

---

## SYMMETRY AUDIT — MANDATORY

Log every fire by HMO. Publish the distribution internally each release.

Expected v1 distribution: AIICO (ratio ×2, waiting ×2) · NEM (unlimited ×11, undisclosed ×2) · Reliance (ratio ×3, waiting ×3, counts ×1) · Clearline (ratio ×6, counts ×1) · AXA (counts ×1) · Greenbay (unlimited ×1) · Leadway (counts ×1) · THT (counts ×1) · Bastion (superlative ×1)

**Clearline fires 7 times.** If a code change reduces that without a corresponding data change, treat it as a regression and investigate.

---

## TONE

Explain, never sneer. The claims are mostly legal and often technically accurate — the problem is that the information is arranged so a normal buyer will not compute the consequence. The detector does the arithmetic the buyer would do if they had time.

Never: *"they're lying"*, *"scam"*, *"avoid this HMO"*. Always: what they say → what it means → what to ask.
