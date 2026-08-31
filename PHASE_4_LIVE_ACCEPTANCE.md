# PHASE 4 LIVE ACCEPTANCE TESTING CHECKLIST

**Live Site**: https://hmo-compare-production.up.railway.app/  
**Test Date**: 2026-08-31  
**Tester**: [To be filled by user]  
**Status**: AWAITING LIVE TESTING

---

## 🎯 ACCEPTANCE CRITERIA

All items below must PASS for Phase 4 to be considered complete.

---

## 1️⃣ LANDING PAGE (PASS / FAIL)

- [ ] Page loads without errors
- [ ] Title shows "HMO Blueprint Nigeria — Which health plan makes sense for you?"
- [ ] CTA button shows "Start — takes 4–5 minutes" (not "4 minutes")
- [ ] Header navigation shows: Search | Q&A | Learn | About
- [ ] Theme toggle works (light/dark mode)
- [ ] All text readable in both light and dark modes
- [ ] Mobile responsive at 360px, 768px, 1440px

---

## 2️⃣ SEARCH FUNCTIONALITY (PASS / FAIL)

### Access
- [ ] Click "Search" in header → Search screen appears
- [ ] Search input is focused on load

### Search HMO
- [ ] Type "Hygeia" → Shows HMO results
- [ ] Type "hygeia" (lowercase) → Same results (case-insensitive)
- [ ] Results show category, name, description
- [ ] At least 3 HMO results visible

### Search Plan
- [ ] Type "HyEssential" → Shows plan results
- [ ] Results labeled as "PLAN" category

### Search Public Option
- [ ] Type "NHIA" → Shows NHIA programmes
- [ ] Results show category "PUBLIC"

### Search Education
- [ ] Type "benefit" → Shows learn articles
- [ ] Results show category "LEARN"

### Search Empty State
- [ ] Type "xyzabc123" → Empty state message appears
- [ ] Message is clear and helpful

### Search Responsive
- [ ] Test at 360px, 768px, 1440px widths
- [ ] Input field visible and usable
- [ ] Results display properly on mobile

---

## 3️⃣ VERIFIED Q&A FUNCTIONALITY (PASS / FAIL)

### Access
- [ ] Click "Q&A" in header → Q&A screen appears
- [ ] Input is focused on load
- [ ] Title shows "Ask About Health Cover"

### Search for Answers
- [ ] Type "HMO" → Shows "What is an HMO?" answer
- [ ] Type "benefit" → Shows "benefit limit" explanation
- [ ] Type "NHIA" → Shows NHIA answer
- [ ] Type "telemedicine" → Shows telemedicine explanation

### Answers Are Verified
- [ ] Each result shows ✅ Verified badge
- [ ] Answer categories shown (e.g., "Basics", "Coverage")

### No Answers Case
- [ ] Type "xyz123" → No results appear
- [ ] "Talk to Azuka on WhatsApp" button appears
- [ ] Button works and opens WhatsApp

### Q&A Responsive
- [ ] Test at 360px, 768px, 1440px widths
- [ ] Input field usable on mobile
- [ ] Answers readable on phone

---

## 4️⃣ ASSESSMENT - ADAPTIVE QUESTIONS (PASS / FAIL)

### Start Assessment
- [ ] Click "Start Assessment" → Question 1 appears
- [ ] Question text clear and readable
- [ ] Progress bar shows "Question 1 of 33"

### Q1: Customer Type
- [ ] 5 options: Just me, Partner, Family, Parents, Staff
- [ ] Select "Family"
- [ ] Answer saved and displays when coming back
- [ ] Click Continue → Q2 appears

### Q2: State Selection
- [ ] Shows searchable state dropdown
- [ ] Type "Lagos" → Lagos appears and selects
- [ ] Can clear and select again
- [ ] Click Continue → Q3 appears

### Q3: Number of People
- [ ] 6 options from 1 to 30+
- [ ] Select a number
- [ ] Click Continue → Q4 appears

### Q4: Ages (Multi-Select)
- [ ] 4 checkboxes: Children, Adults 18-39, Adults 40-59, 60+
- [ ] Can select multiple
- [ ] Click Continue → Q5 appears

### Q5: Budget Slider
- [ ] Slider shows ₦20k to ₦3m range
- [ ] Numeric input field present
- [ ] Quick preset buttons visible
- [ ] Can adjust slider OR numeric input
- [ ] Both stay in sync
- [ ] Click Continue → Q6 appears

### Conditional Questions Test
- [ ] Answer Q1=Family, Q4=Children → Q10 (children) should appear
- [ ] Answer Q1=Individual, Q4=No children → Q10 should be skipped
- [ ] Go Back from Q11 → still skips Q10 if not applicable

### Q23: Healthcare Frequency (NEW)
- [ ] 4 options: Very rarely, Occasionally, Regularly, Frequently
- [ ] Select an option
- [ ] Click Continue → Q24 may appear (if applicable)

### Q24: Regular Medications (CONDITIONAL)
- [ ] Appears if Q12 (chronic) = Yes OR Q23 = Regularly/Frequently
- [ ] 3 options: No, Few, Multiple
- [ ] Does NOT appear if conditions not met

### Q25: Maternity Urgency (CONDITIONAL)
- [ ] Appears if Q9 (maternity) = Not "Not relevant"
- [ ] 4 options: Not planning, Maybe 2yr, Within 1yr, Very soon
- [ ] Does NOT appear if maternity not relevant

### Q26: Provider Flexibility
- [ ] Always shows
- [ ] 3 options: Must stay, Prefer stay, Flexible
- [ ] Continue to next

### Q27: Dental Frequency (CONDITIONAL)
- [ ] Appears if Q16 (ancillary) includes "dental"
- [ ] 3 options: Regular 2x, Occasional 1x, Emergencies
- [ ] Does NOT appear if dental not selected

### Q28: Telemedicine Importance
- [ ] Importance scale: Not important → Critical
- [ ] Select a level
- [ ] Continue to next

### Q29: Emergency Cover Importance
- [ ] Importance scale: Not important → Critical
- [ ] Select a level
- [ ] Continue to next

### Q30: Employment Type
- [ ] 4 options: Employed, Self-employed, Both, Retired
- [ ] Select an option
- [ ] Continue to next

### Q31: Employee Count (CONDITIONAL)
- [ ] Appears ONLY if Q1 (customer type) = "My staff" (corporate)
- [ ] 4 options: 1-5, 6-10, 11-50, 50+
- [ ] Does NOT appear for individual/family

### Q32: Out-of-Pocket Tolerance
- [ ] 4 options with ranges
- [ ] Select an option
- [ ] Continue to next

### Q33: International Presence (FINAL)
- [ ] Importance scale
- [ ] Select a level
- [ ] Complete Assessment button shows

### Back Button
- [ ] Go back from any question → Previous question appears
- [ ] Answers preserved when going back
- [ ] Conditional questions respected (skip non-relevant when going back)

### Skip Button
- [ ] Click Skip on a question → Question marked as skipped
- [ ] Counter updates to show skipped count
- [ ] Continue to next

---

## 5️⃣ PROFILE SUMMARY (PASS / FAIL)

### Profile Summary Screen
- [ ] Appears after completing assessment
- [ ] Shows title "YOUR HEALTH COVER PROFILE"
- [ ] Displays:
  - [ ] Who (customer type)
  - [ ] People count
  - [ ] Location (state)
  - [ ] Annual budget
  - [ ] Top 3 priorities
  - [ ] Biggest concern
  - [ ] Profile completeness %
  - [ ] Confidence level (High/Medium/Low)
- [ ] All values match user's actual answers

### Profile Accuracy Test
- **Profile 1**: Individual, Lagos, ₦300k, no children, no maternity
  - [ ] Profile shows "Covering just you" in Lagos
  - [ ] Budget shows ₦300,000
  - [ ] Completeness and confidence match answers

- **Profile 2**: Family, 4 people, ₦600k, children, maternity planned
  - [ ] Profile shows "Family of 4"
  - [ ] Budget shows ₦600,000
  - [ ] Top priorities show maternity

---

## 6️⃣ RESULTS PAGE (PASS / FAIL)

### Results Display
- [ ] Results page appears after profile summary
- [ ] Shows top matching plans
- [ ] Results explain WHY each plan matches

### Best Match Card
- [ ] Shows HMO name and plan name
- [ ] Shows match score (should be ≤95)
- [ ] Shows why it fits (references user's actual answers)
- [ ] Shows premium amount or "Price to Verify"
- [ ] Shows main benefits
- [ ] Shows "What may be weaker"

### Alternative Options
- [ ] Shows "Strong Alternative"
- [ ] Shows "Another Good Option"
- [ ] Each explains why it matches

### Public Options
- [ ] NHIA programs show separately if applicable
- [ ] Labels clearly as "Public Option"
- [ ] Distinct visual treatment

### Price to Verify Handling
- [ ] Plans with unknown prices show "Price to Verify"
- [ ] NOT shown as ₦0
- [ ] NOT shown as "Unknown"
- [ ] Clear note that user needs to contact HMO

### No Results Scenario
- **Test Case**: Individual, ₦50k budget, Lagos
  - [ ] If no matches found, shows clear message
  - [ ] Suggests why (e.g., "Budget below published plans")
  - [ ] Offers to broaden search (NOT auto-changing answers)
  - [ ] Shows alternative options

### Results Responsive
- [ ] Test at 360px, 768px, 1440px
- [ ] Cards stack on mobile
- [ ] Text readable
- [ ] Buttons clickable

---

## 7️⃣ PRODUCT SEMANTICS (PASS / FAIL)

### Price to Verify
- [ ] Unknown prices shown as "Price to Verify", not ₦0
- [ ] NOT rendered as zero or blank
- [ ] Call-to-action: "Contact HMO for quote"

### Benefit Limits vs Premium
- [ ] Premium and overall limit are distinct
- [ ] "Overall limit" clearly explained as maximum coverage
- [ ] Premium is monthly/annual cost

### Unknown Benefits
- [ ] Unknown benefits NOT shown as "Not covered"
- [ ] Shown as "Not published" or "Price to verify"
- [ ] Clear distinction from actively excluded benefits

### Kia Kia Telemedicine
- [ ] Telemedicine options labeled clearly
- [ ] Show as separate category from HMO plans
- [ ] Don't mix with private HMO options

---

## 8️⃣ PUBLIC/PRIVATE DISTINCTION (PASS / FAIL)

- [ ] NHIA programs (GIFSHIP, OPSSHIP, etc.) appear separately
- [ ] State schemes (if loaded) appear separately
- [ ] Never mixed with private HMO results
- [ ] Clear visual separation (different section, color, label)
- [ ] "Public Option" label visible

---

## 9️⃣ CLEARLINE NEUTRALITY (PASS / FAIL)

### Clearline Ranking Check
- [ ] Clearline appears in results only if it scores legitimately
- [ ] NOT artificially boosted to top
- [ ] Ranked alongside other comparable plans
- [ ] If Clearline is Best Match, it's due to user's actual priorities
  - [ ] (Not by default or hidden preference)

### Neutrality Test with Personas
- **Persona: Price-focused individual, ₦100k budget**
  - [ ] If Clearline is most affordable AND matches: OK to show as best
  - [ ] If cheaper options exist: Other plans should rank higher

- **Persona: Family, maternity critical**
  - [ ] If Clearline doesn't cover maternity well: Should NOT be Best Match
  - [ ] Ranking based purely on data, not brand

---

## 🔟 RESPONSIVE DESIGN (PASS / FAIL)

### Test at Multiple Viewports
```
- [ ] 360px (iPhone SE)
- [ ] 390px (iPhone 12)
- [ ] 412px (Pixel 6)
- [ ] 480px (Small tablet)
- [ ] 768px (iPad/tablet)
- [ ] 834px (iPad)
- [ ] 1024px (Desktop)
- [ ] 1280px (Desktop)
- [ ] 1440px (Desktop)
```

### Responsive Checks
- [ ] No horizontal scrolling at any width
- [ ] Touch targets ≥44px on mobile
- [ ] Text readable (font size appropriate)
- [ ] Buttons clickable and spaced
- [ ] Forms usable on phone
- [ ] Images scale appropriately
- [ ] Sticky header visible

---

## 1️⃣1️⃣ DARK MODE (PASS / FAIL)

### Toggle
- [ ] Dark mode toggle button in header works
- [ ] Switches between light and dark smoothly
- [ ] Preference saved (persists on reload)

### Dark Mode Rendering
- [ ] All text readable in dark mode
- [ ] Buttons visible and clickable
- [ ] Colors have sufficient contrast
- [ ] Assessment flow works
- [ ] Results visible
- [ ] Search works
- [ ] Q&A readable

### Colors in Dark Mode
- [ ] No text disappears
- [ ] No buttons become invisible
- [ ] Links visible (distinct from regular text)

---

## 1️⃣2️⃣ ACCESSIBILITY (PASS / FAIL)

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can complete assessment using only keyboard
- [ ] Enter/Space activates buttons

### Labels
- [ ] Form inputs have associated labels
- [ ] Labels announce question/purpose

### Screen Reader
- [ ] Can read page title
- [ ] Questions announced clearly
- [ ] Answer options announced
- [ ] Progress updates announced

### Color Contrast
- [ ] Text passes WCAG AA contrast requirements
- [ ] Links distinguishable from text

---

## 1️⃣3️⃣ PERFORMANCE (PASS / FAIL)

- [ ] Landing page loads in <2 seconds
- [ ] Assessment questions render instantly (<100ms per question)
- [ ] Search results appear instantly (<100ms)
- [ ] Q&A search instant
- [ ] No network lag when advancing questions
- [ ] No console errors

---

## 1️⃣4️⃣ PERSONA TESTING (PASS / FAIL)

### CHIDI (Affordability-focused)
- [ ] Input: Individual, Lagos, ₦80k/year
- [ ] Healthcare frequency: Occasionally
- [ ] No special needs
- [ ] Results: Show most affordable plans
- [ ] Profile correctly identifies budget constraint

### ADAEZE (Family, Maternity)
- [ ] Input: Family, 3 people, ₦300k, ages include adults
- [ ] Maternity urgency: Planning within 1 year
- [ ] Has children
- [ ] Results: Emphasize maternity coverage
- [ ] Alternative if maternity data thin

### TUNDE (Surgery-critical)
- [ ] Input: Family, ₦400k
- [ ] Surgery importance: Critical
- [ ] Results: Emphasize surgical coverage
- [ ] Best Match has solid surgery coverage

### MRS OKAFOR (Senior, Chronic)
- [ ] Input: Covering parents, age 60+
- [ ] Chronic: Regular specialist care
- [ ] Healthcare frequency: Regular
- [ ] Medications: Multiple
- [ ] Q24 appears (medications conditional)
- [ ] Results: Senior-appropriate with specialist access

### EMEKA (Corporate SME)
- [ ] Input: My staff (corporate customer type)
- [ ] Employee count: 14 people
- [ ] Q31 appears (employee count conditional)
- [ ] Q31 does NOT appear for non-corporate persona
- [ ] Results: Group/corporate appropriate

---

## 1️⃣5️⃣ ZERO-RESULT SCENARIO (PASS / FAIL)

### Test Case 1: Extremely Low Budget
- [ ] Individual, ₦20k/year budget, Lagos
- [ ] Expected: Few or no matches (budget below all published plans)
- [ ] When zero results:
  - [ ] Message says "Your budget is below most published plans"
  - [ ] Shows closest/cheapest available (if any)
  - [ ] Offers to see public options (NHIA)
  - [ ] Does NOT auto-change user's budget
  - [ ] Does NOT claim "No eligible plans" when plans exist

### Test Case 2: Very Specific Requirements
- [ ] Corporate, 50+ employees, ₦500k/person, specific state
- [ ] May get zero results if no plans match all criteria
- [ ] Shows: "Your requirements are very specific..."
- [ ] Suggests relaxing one criterion (user chooses which)

---

## 1️⃣6️⃣ PAYLOAD INTEGRITY (PASS / FAIL)

### Test Payload Capture
- [ ] Complete a full assessment
- [ ] Check browser console (F12 → Network tab)
- [ ] Verify POST request to `/api/match` contains assessment data
- [ ] Check payload includes all answered questions
- [ ] Verify payload does NOT include skipped questions (or marks them)
- [ ] Verify payload matches user's actual selections
- [ ] No hidden preferences injected

### Payload Structure
```json
{
  "assessment": {
    "customer_type": "family",
    "state": "Lagos",
    "lives": 4,
    "ages": ["children", "adults_18_39"],
    "budget_total": 600000,
    "healthcare_frequency": "regular",
    "regular_medications": "multiple",
    // ... all answered questions
  }
}
```

---

## 1️⃣7️⃣ WHATSAPP INTEGRATION (PASS / FAIL)

### Q&A WhatsApp
- [ ] In Q&A screen with no results: "Talk to Azuka on WhatsApp" button
- [ ] Click → Opens WhatsApp (https://wa.me/2348180100100)
- [ ] Message prefilled (optional: can edit)

### Learn → About → WhatsApp
- [ ] About page has Azuka's WhatsApp link
- [ ] Click opens WhatsApp
- [ ] Works on mobile and desktop

---

## 🔌 FINAL ACCEPTANCE SIGNATURE

| Criterion | Status | Notes |
|-----------|--------|-------|
| Landing page works | PASS / FAIL | |
| Search functional | PASS / FAIL | |
| Q&A functional | PASS / FAIL | |
| Adaptive assessment | PASS / FAIL | |
| Conditional questions | PASS / FAIL | |
| Profile summary | PASS / FAIL | |
| Results accurate | PASS / FAIL | |
| Product semantics | PASS / FAIL | |
| Public/private separation | PASS / FAIL | |
| Clearline neutrality | PASS / FAIL | |
| Responsive design | PASS / FAIL | |
| Dark mode | PASS / FAIL | |
| Accessibility | PASS / FAIL | |
| Performance | PASS / FAIL | |
| Persona testing | PASS / FAIL | |
| Zero-result handling | PASS / FAIL | |
| Payload integrity | PASS / FAIL | |

---

## 📝 FINAL VERDICT

**Total Checks**: 200+  
**Passed**: ___ / 200+  
**Failed**: ___ / 200+  

**Overall Status**:
- [ ] **PASS** — All critical features working, safe to mark Phase 4 complete
- [ ] **PARTIAL** — Most features working, minor issues noted below
- [ ] **FAIL** — Critical issues blocking Phase 4 acceptance

**Critical Issues Found** (if any):
```
[List any blockers here]
```

**Minor Issues** (can be fixed in follow-up):
```
[List any non-critical findings here]
```

---

## ✍️ APPROVAL

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Tester | | | |
| Reviewer | Azuka Orumgbe | | |
| Product | | | |

---

## 📅 NEXT STEPS

- [ ] If PASS: Move to "Real User Testing" phase
- [ ] If PARTIAL: Fix minor issues, retest critical path
- [ ] If FAIL: Debug critical issues, return to development

**Expected Timeline**: Real user testing begins once PASS is confirmed.

---

**Phase 4 Live Acceptance Testing Ready**  
*All 46 unit tests passing. Code deployed to production. Awaiting manual verification.*
