# ASSESSMENT_V1_QUESTIONS.md

**Phase 1** · `ASSESSMENT_V1` · 22 questions, one per screen.

---

## PRINCIPLES

Conversational, not bureaucratic. No insurance jargon without a plain-language gloss. Everything tappable except budget and hospital name. Every question skippable — skipping lowers confidence, never blocks.

**Importance scale, used throughout:**
`Not important (0)` · `Nice to have (3)` · `Important (6)` · `Very important (8)` · `Critical (10)`

"Critical" is load-bearing: it triggers **hard exclusion** of plans where that benefit is `NOT_COVERED`. Q14 shows this in the helper text so the user understands the power of the word.

---

## GROUP 1 — WHO & WHERE (Q1–4)

**Q1. Who are we finding cover for?**
Just me · Me and my partner · My family · My parents / older relatives · My staff
→ `customer_type`

**Q2. Which state do you live in?**
Searchable list, 36 states + FCT.
Helper: *We use this to tell you what to check about hospitals near you.*
→ `state`
**Honesty note:** we cannot yet match plans by location (data contract §7). This question shapes verification guidance, not the score. The helper text says exactly that — no implied capability.

**Q3. How many people in total?**
1 · 2 · 3–4 · 5–9 · 10–29 · 30+
→ `lives`, `min_lives` filter

**Q4. Roughly what ages?** *(multi-select)*
Children under 18 · Adults 18–39 · Adults 40–59 · 60+
→ `has_children`, `has_seniors`

---

## GROUP 2 — MONEY (Q5)

**Q5. What can you comfortably spend per year, in total?**
Slider ₦20,000 – ₦3,000,000, plus **I'm not sure yet**.
Live helper: *"About ₦150,000 per person"* when lives > 1.
→ `budget_total`, `budget_per_person`

Budget is a **soft** filter: plans up to 15% over budget are retained and flagged, because the false-economy case often lives just above the line. "Not sure" disables budget filtering entirely.

---

## GROUP 3 — HOSPITALS (Q6–8)

**Q6. Do you need cover in more than one state?**
No, just my state · Yes, a few states · Yes, nationwide · I travel abroad too
→ `geographic_need`

**Q7. Is there a hospital you already use and want to keep?**
Free text + *No particular hospital*.
Helper: *We'll add this to your verification list.*
→ `preferred_hospital`
Feeds the verify screen verbatim. Not scored.

**Q8. How much does hospital choice matter to you?**
*I'll go wherever I'm covered* · *I'd like decent options* · *I want good hospitals* · *I want the best available, and I'll pay for it*
→ `hospital_access` (0/5/8/10) — maps to provider tier scoring

---

## GROUP 4 — HEALTH NEEDS (Q9–17)

**Q9. Is maternity cover important?**
Not relevant · Maybe in future · Yes, planning soon · Yes, critical
→ `maternity`
⚠ **Only 17% of plans carry a maternity figure.** If the user answers "critical", the results screen must say so explicitly rather than quietly scoring 83% of plans as unknown.

**Q10. Any children who'd need cover?** Yes / No → `has_children`

**Q11. Any parents or older relatives?** Yes / No → `has_seniors` (surfaces senior-specific plans)

**Q12. Does anyone have an ongoing condition needing regular treatment?**
No · Yes, managed · Yes, needs regular specialist care · Prefer not to say
Helper: *We don't ask what the condition is — just how much cover you need.*
→ `chronic`
**Privacy rule (constitution §72): never ask for a diagnosis.** "Prefer not to say" is treated as "no" for scoring and adds a waiting-period warning, because chronic waiting periods run 12–24 months.

**Q13. How important is specialist care?** Importance scale → `specialist`

**Q14. How important is protection against a big surgery bill?**
Importance scale.
Helper: *Choosing "Critical" will rule out plans that don't cover major surgery at all — and some popular plans don't.*
→ `surgery`
**The most decision-relevant question in the assessment.** Surgery data exists for 45 plans, and `NOT_COVERED` appears on plans costing over ₦100,000.

**Q15. How important are scans — MRI, CT, advanced diagnostics?** → `diagnostics`
⚠ Collected, **not scored** — no data. User is told.

**Q16. Dental, optical, ENT, wellness?** *(multi-select + not important)* → `ancillary`
⚠ Collected, **not scored** — no data.

**Q17. How important is medication cover?** Importance scale → `drugs`
⚠ Collected, **not scored** — no data. Notable given drugs is one of the most-complained-about themes in the sentiment corpus.

---

## GROUP 5 — SERVICE (Q18–20)

**Q18. How much do you care about apps and telemedicine?** → `digital` *(not scored)*

**Q19. How important is fast, human customer service?** → `service` *(not scored — zero mystery shopping conducted)*

**Q20. How do you feel about rules — referrals, approvals, using set hospitals?**
*Fine if it's cheaper* · *Some is OK* · *I want minimal hassle* · *I want to walk in and be treated*
→ `restriction_tolerance`

---

## GROUP 6 — PRIORITIES (Q21–22)

**Q21. Pick your top 3 — what matters most?** *(exactly 3, ranked by tap order)*
Low price · Hospital quality · Surgery protection · Maternity · Medication · Specialists · Scans · Dental & optical · Digital service · Fast support · Wellness
→ `top_priorities[]` — applies a **1.5× multiplier** to those dimensions (`USER_PRIORITY_MODEL_V1.md` §4)

**Q22. If your plan let you down at the worst moment, what would you most regret not checking?**
Hospital wasn't covered · Limit was too low · I still had to pay a lot · Emergency was hard · Maternity gap · Surgery gap · Drugs excluded · Nobody answered
→ `biggest_fear`

**Q22 does not score. It writes the top of the results page.** Someone who fears "I still had to pay a lot" opens on the benefit-gap figure; someone who fears "hospital wasn't covered" opens on the provider caveat. Same ranking, different framing — the question tells us which truth they need first.

---

## SCORED vs COLLECTED

| Scored (data exists) | Collected only (no data) |
|---|---|
| Q1, Q3, Q4 — eligibility | Q2 — location |
| Q5 — budget | Q7 — preferred hospital |
| Q8 — hospital access → provider tier | Q15 — diagnostics |
| Q9 — maternity *(17% coverage)* | Q16 — dental/optical/ENT/wellness |
| Q11 — senior plans | Q17 — drugs |
| Q14 — surgery *(47% coverage)* | Q18 — digital |
| Q20 — restrictions → waiting periods | Q19 — service |
| Q21 — priority multipliers | Q22 — framing |

**8 scored, 14 collected.** The priority profile screen (journey §3) states this to the user before results. Asking 22 questions and scoring 8 is defensible only if we say so — otherwise it's theatre.

---

## OUTPUT

```json
{ "session_id":"...", "completed_at":"...", "answers":{...},
  "skipped":["Q7"], "customer_type":"family", "lives":4,
  "state":"Lagos", "budget_total_kobo":60000000,
  "priority_vector":{...}, "top_priorities":["surgery","hospital_quality","maternity"],
  "biggest_fear":"surgery_gap", "completeness":0.95 }
```
