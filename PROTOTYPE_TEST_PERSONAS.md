# PROTOTYPE_TEST_PERSONAS.md

**Phase 1** · `PERSONAS_V1` · Five personas. Regression suite for every engine change.

---

## PERSONA 1 — CHIDI, 27, LAGOS, FIRST-TIME BUYER

**Answers:** Just me · Lagos · 1 person · 18–39 · **₦80,000** · one state · no preferred hospital · "I'd like decent options" · maternity not relevant · no children · no seniors · no chronic · specialist 3 · **surgery 6** · scans 3 · dental 6 · drugs 6 · digital 8 · service 6 · "fine if it's cheaper" · top 3 = price, digital, dental · fear = **"I still had to pay a lot"**

**Expected vector:** price 9 ×1.5 → 10 · surgery 6 +2(fear) → 8 · hospital 5 · maternity 0
**Candidate pool:** roughly 6 plans under ₦92,000

**A good result must:** lead with price and the gap calculation (his fear) · **exclude AIICO Standard (₦64,680) — major surgery not covered** · surface the false-economy comparison against slightly pricier plans with real surgery cover · tell him digital and dental couldn't be scored despite being two of his top three.

**Failure modes to catch:** recommending a plan with `NOT_COVERED` surgery because it's cheapest; scoring `UNKNOWN` digital as zero and burying an otherwise good plan; a Bastion plan winning purely on price with no benefit data.

---

## PERSONA 2 — ADAEZE, 31, ABUJA, EXPECTING

**Answers:** Me and my partner · FCT · 2 · 18–39 · **₦400,000** · one state · **"my hospital"** · "I want good hospitals" · **maternity critical** · children planned · no seniors · no chronic · specialist 8 · surgery 8 · scans 8 · dental 3 · drugs 8 · digital 6 · service 8 · "some rules OK" · top 3 = maternity, hospital quality, specialists · fear = **maternity gap**

**Expected vector:** maternity 10 ×1.5 +2 → 10 · hospital 8 ×1.5 → 10 · surgery 8 · price 5

**A good result must:** state plainly that **only 17 of 95 plans publish a maternity limit** — this is the single most important honesty moment in the prototype · warn about maternity waiting periods (AIICO 18 months, AXA 12-month moratorium) since she is already expecting · flag her named hospital into the verification script.

**Failure modes:** silently scoring 83% of plans as maternity-unknown without telling her; recommending a plan whose maternity waiting period exceeds her pregnancy; presenting a maternity limit without its waiting period.

---

## PERSONA 3 — TUNDE, 42, LAGOS, FAMILY OF 4, SURGERY CRITICAL

**Answers:** My family · Lagos · 3–4 · children + 18–39 + 40–59 · **₦600,000** · a few states · no preference · "want good hospitals" · maternity not relevant · children yes · no seniors · no chronic · specialist 8 · **surgery critical (10)** · scans 6 · dental 6 · drugs 8 · digital 5 · service 6 · "minimal hassle" · top 3 = surgery, hospital quality, drugs · fear = **surgery gap**

**Expected vector:** surgery 10 · hospital 10 · maternity 0 · price 5 *(worked in `USER_PRIORITY_MODEL_V1` §6)*

**A good result must:** **hard-exclude AIICO Standard and Executive** (surgery `NOT_COVERED`) · lead with the potential gap against his ₦2,000,000 requirement · fire the ratio rule on every plan below 20% · penalise Reliance for the **15-month major-surgery waiting period** given "minimal hassle" tolerance · show per-person *and* ~4-person totals.

**This is the primary regression persona.** It exercises hard exclusion, the ratio rule, waiting-period penalties, the gap engine and the budget-tolerance band simultaneously.

---

## PERSONA 4 — MRS OKAFOR, 58, ENUGU, BUYING FOR HER MOTHER (81)

**Answers:** My parents · Enugu · 1 · 60+ · **₦900,000** · one state · teaching hospital · "want the best available" · maternity not relevant · no children · **seniors yes** · **chronic — needs regular specialist care** · specialist critical · surgery critical · scans 8 · dental 6 · drugs critical · digital 0 · service critical · "walk in and be treated" · top 3 = specialists, drugs, hospital quality · fear = **"emergency was hard"**

**Expected vector:** surgery 10 (senior +1) · hospital 10 · drugs 10 *(unscoreable)* · maternity forced 0

**A good result must:** surface senior-specific plans (Hygeia Senior Mini/Midi/Premium/Exclusive; Leadway's four Senior plans are `NOT_PUBLICLY_VERIFIED` and must appear only in "couldn't compare") · **warn hard on chronic waiting periods — AIICO's is 24 months, and pre-existing conditions are excluded outright** · tell her drugs, her second priority, cannot be scored · surface Hygeia Senior Exclusive's named-facility access (Evercare, Reddington) as a genuine differentiator · never ask what the condition is.

**Failure modes:** recommending a plan that excludes pre-existing conditions without saying so; scoring digital when she rated it 0; showing Leadway Senior plans as if priced.

---

## PERSONA 5 — EMEKA, SME OWNER, PORT HARCOURT, 14 STAFF

**Answers:** My staff · Rivers · **10–29** · mixed ages · **₦1,400,000 total (₦100,000/person)** · a few states · no preference · "decent options" · maternity important · children yes · no seniors · chronic managed · specialist 6 · surgery 8 · scans 6 · dental 6 · drugs 8 · digital 6 · service 8 · "some rules OK" · top 3 = price, surgery, hospital quality · fear = **"hospital wasn't covered"**

**Expected pool:** SME plans with `min_lives ≤ 14`

**A good result must:** **exclude the 14 SME/corporate plans missing `min_lives`** (IHMS, Bastion, NEM) — an SME plan without a headcount threshold cannot be matched · exclude Clearline corporate (min 30) while retaining Clearline SME (min 11) · lead with the provider caveat, since his fear is coverage and we cannot do location matching in Rivers · surface the Clearline SME-vs-corporate inversion if both appear (SME Bronze ₦84,000/₦500k limit vs corporate Bronze ₦61,525/₦1m limit).

**Failure modes:** offering a corporate plan requiring 30 lives to a 14-person business; implying we verified hospitals in Port Harcourt.

---

## EXECUTION

Run all five against A/B/C per `CLEARLINE_BIAS_TEST_V1`. Record: top 3 per persona, match scores, exclusions with reasons, warnings fired, confidence, dimensions scored vs collected.

**Regression rule:** any engine or weight change re-runs all five. Any change to a top-3 result must be explainable by the change made. Unexplained movement is a bug, not an improvement.

**Sensitivity check:** ±20% on every weight. If top-3 membership shifts, the model is over-tuned and the weights are not ready to freeze.
