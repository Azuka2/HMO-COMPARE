# SPRINT 7 IMPLEMENTATION REPORT
## HMO Plan Comparison Mode (13-Row Analysis)

**Status:** ✅ COMPLETE  
**Date:** August 28, 2026  
**Files Modified:** 1 (public/index.html)  

---

## EXECUTIVE SUMMARY

Sprint 7 adds a **Plan Comparison Mode** that allows users to select and compare up to 3 HMO plans side-by-side across exactly 13 critical dimensions. The comparison is deterministic, evidence-aware, and neutral — it informs rather than ranks.

Users can now drill deeper into the differences between recommended plans by viewing:
- Price (per person + group total)
- Overall limit & major surgery coverage
- Surgery-to-headline ratio (the "signature row")
- Maternity, hospital access, payment model
- Waiting periods, medication, dental/optical, scans
- Evidence freshness and data status

---

## FILES MODIFIED

**public/index.html** — Extended with Sprint 7 comparison functionality
- Added `/screen-comparison` screen element
- Added comparison selector interface
- Added 13-row comparison table (desktop/mobile)
- Added warning engine
- Added factual insight generation
- Added calculation safety layer
- ~800 lines of new comparison code

---

## ROUTES & NAVIGATION

**New Route:** `/comparison`
- Accessible from results page via "Compare Plans" button
- Supports back navigation to results
- Supports plan selection screen
- Preserves session state

**Navigation Flow:**
```
Results
  ↓
"Compare Plans" button
  ↓
Plan Selector (choose up to 3)
  ↓
13-Row Comparison Table
  ↓
Compare Insights
  ↓
Change Plans or Back to Results
```

---

## COMPARISON SELECTOR

Shows all eligible plans from recommendations (top 3 + alternatives):
- Checkbox selection UI
- Card layout showing HMO, plan name, price, match score
- Max 3 plans enforcement (alerts on 4th selection)
- "Compare N Plans" button (disabled until 2+ selected)
- Selected plans state persisted during session

---

## 13-ROW COMPARISON TABLE

**Exact order (non-negotiable):**

1. **Annual premium** — ₦X per person/year (with status label)
2. **Total for your group** — Computed safely from premium × lives
3. **Overall limit** — ₦X annual benefit limit
4. **Major surgery** — ₦X published limit
5. **Surgery as % of headline** — X.X% with visual bar
6. **Maternity** — ₦X or Not published
7. **Hospital access tier** — Tier 1–4, Band A–D, etc. (plan's own terminology)
8. **Payment model** — Capitation / Fee-for-service / Unknown
9. **Waiting periods** — Maternity: 12mo, Surgery: 6mo, etc.
10. **Medication** — Not published by HMOs
11. **Dental & optical** — Not published by HMOs
12. **Scans (MRI/CT)** — Not published by HMOs
13. **Evidence & date** — Status label + check date

**Desktop View:** Clean 3-column HTML table with headers
**Mobile View:** Stacked cards (attribute + plan values for each row)

---

## KEY CALCULATIONS

### Group Total (Safe)
```
if premium is known
AND lives are known
AND premium basis is per_person or compatible
then:
  total = premium × lives
else:
  return "Not calculable"
```

Never silently defaults to zero.

### Surgery Ratio (Safe)
```
if major_surgery is numeric
AND major_surgery > 0
AND overall_limit is numeric
AND overall_limit > 0
then:
  ratio = (major_surgery / overall_limit) × 100
  display as "X.X% of headline limit"
else:
  return "Not calculable"
```

Prevents division by zero. Handles unknowns and unlimited values.

### Price Basis Matching
```
Detect when plans use different bases:
  - per_person
  - family / per_family
  - corporate / group
  
Display warning:
  "These plans use different price bases. Compare carefully."
```

---

## WARNING ENGINE

Automatically generated warnings above comparison table:

1. **Customer Type Mismatch**
   - Triggers when plans target different customer types
   - Message: "These plans target different customer types..."

2. **Price Basis Mismatch**
   - Triggers when per_person vs family vs corporate
   - Message: "These plans use different price bases..."

3. **Evidence Asymmetry**
   - Triggers when evidence status differs (verified vs stale vs unknown)
   - Message: "Evidence quality is not equal across these plans."

4. **Promotional Pricing**
   - Triggers if any plan.premium.status === PROMOTIONAL
   - Message: "One or more prices are promotional..."

5. **Stale Pricing**
   - Triggers if any plan.premium.status === POTENTIALLY_STALE
   - Message: "One or more prices may be outdated..."

All warnings use red/amber background + text (not color alone).

---

## COMPARISON INSIGHTS

Deterministic, data-driven observations:

- **Surgery comparison:** "X has the highest published surgery limit at ₦Y"
- **Price comparison:** "X has the lowest premium at ₦Y/person"
- **Provider access:** "X offers the widest access tier (A–D)"
- **Maternity insight:** "Only X and Y publish maternity coverage" (contextual)

Generated from actual plan data. No superlatives ("best", "winner").

---

## EVIDENCE DISPLAY

Each plan shows:
- Premium status (CURRENT, VERIFIED_SNAPSHOT, POTENTIALLY_STALE, PROMOTIONAL)
- Retrieved date
- Status label (e.g., "Verified 27 August 2026")

Row 13 (Evidence & Date) is critical for transparency.

---

## UNKNOWN VALUE HANDLING

Never:
- ✗ Display as `—` (looks like zero)
- ✗ Display as blank (implies no data)
- ✗ Convert to `0` (false claim)
- ✗ Say "Not covered" unless explicitly NOT_COVERED

Always:
- ✅ Display as "Not published"
- ✅ For unmeasured benefits (medication, dental, scans): "Not published by HMOs"
- ✅ For unknown fields: "Not published"

---

## MOBILE IMPLEMENTATION

**Desktop (768px+):**
- Standard HTML `<table>` layout
- 3+ columns (Benefit | Plan A | Plan B | Plan C)
- Scrollable horizontally if needed

**Mobile (< 768px):**
- Stacked card layout
- Each row = one card
- Card shows: Attribute | Plan A value | Plan B value | Plan C value
- No horizontal scroll
- Plan names repeated in each row for clarity

CSS media queries toggle display:
```css
@media (min-width: 768px) {
  .comparison-table-desktop { display: table !important; }
  .comparison-table-mobile { display: none !important; }
}
```

---

## ACCESSIBILITY

✅ Verified:
- Semantic table markup on desktop (`<table>`, `<thead>`, `<tbody>`)
- Keyboard navigation (tab, space to select)
- Checkbox labels (implicit and explicit)
- Focus states visible
- Color + text for warnings (not color alone)
- 44px+ touch targets on checkboxes and buttons
- Screen-reader friendly stack layout on mobile

---

## CLEARLINE PREFERENCE VERIFICATION

✅ **CONFIRMED NEUTRAL:**
- Comparison uses engine's existing ranking (no manipulation)
- No special Clearline bonus applied in comparison
- No visibility advantage in comparison table
- Data presentation identical for all HMOs
- Preference setting remains unchanged

Comparison is informational. Ranking already happened.

---

## DATA IMMUTABILITY

Comparison uses **derived state**, never modifies:
- ✅ HMO records
- ✅ Plan records
- ✅ Premium objects
- ✅ Benefit objects
- ✅ Evidence objects
- ✅ Recommendation objects

All calculations work on copied/computed values.

---

## INTEGRATION POINTS

### Results Screen
- Added "Compare Plans" button in footer
- Button calls `initializeComparison(currentRecommendation)`
- Navigates to plan selector

### State Management
- `selectedComparisonPlans[]` — array of selected plan results
- `currentRecommendationForComparison` — full recommendation object
- Session-scoped (cleared on new assessment)

### Routing
- `navigate('comparison')` switches to comparison screen
- State persists during session
- Back button returns to results
- New assessment clears comparison state

---

## TESTING SUMMARY

**All 10 Verification Tests Passed:**
- ✅ Top 3 recommendations generated
- ✅ 13-row table structure complete
- ✅ Surgery ratio calculation safe (not calculable when data missing)
- ✅ Group total calculation safe
- ✅ Price basis detection working
- ✅ Evidence/status tracking active
- ✅ Determinism verified (identical runs → same results)
- ✅ Multi-plan comparison enabled
- ✅ Unknown values handled correctly (not zero, not blank)
- ✅ Clearline neutrality confirmed

**No failing tests.**

---

## COMPONENTS REUSED

- Results screen header/navigation
- Plan data structure (plan, premium, benefits, evidence)
- CSS variables and design system
- Founder/content infrastructure (optional)
- Navigation routing system
- State management patterns

---

## COMPONENTS CREATED

### Comparison Selector
- `initializeComparison(result)` — Entry point from results
- `showComparisonSelector(result)` — Render selector UI
- `togglePlanSelection(planId, planResult)` — Handle checkbox logic
- `startComparison()` — Validate and proceed to comparison

### Comparison Display
- `displayComparison()` — Main orchestrator
- `renderComparison13RowTable(plans)` — Generates HTML table
- `renderComparisonCell(planResult, row)` — Cell value formatter
- `renderComparisonWarnings(warnings)` — Warning display
- `renderComparisonInsights(plans)` — Insight generation

### Warning Engine
- `generateComparisonWarnings(plans)` — Detects conditions
- Checks for: customer type, price basis, evidence asymmetry, promotional, stale

### Insight Engine
- `generateComparisonInsights(plans)` — Factual observations
- Compares: surgery limits, prices, provider access, maternity
- Never declares winner, only states facts

---

## KNOWN LIMITATIONS

### Current Phase
1. **Medication/Dental/Scans:** All display "Not published by HMOs" (no plan publishes this)
2. **Provider verification:** Shows tier but notes verification is needed
3. **Payment model:** Low data coverage (5/95 plans)
4. **Waiting periods:** Partial data availability
5. **Live hospital checking:** Not yet available
6. **Custom price basis calculation:** Uses standard per-person logic

### Future Enhancements
1. **API-driven plan selection:** Additional plans beyond top 3 + alternatives
2. **Downloadable comparison:** PDF/CSV export
3. **Historical comparison:** Track changes to plans over time
4. **Advanced sorting:** (But current design avoids default re-ranking)
5. **Custom benefit selection:** User chooses which rows to compare
6. **Hospital verification integration:** Real-time provider checking

---

## REGRESSION TESTING

All Sprint 1–6 features verified:
- ✅ Assessment flow (22 questions) — unchanged
- ✅ Priority profile — unchanged
- ✅ Results recommendations — unchanged
- ✅ Founder layer — not affected
- ✅ Content library — not affected
- ✅ Routing — extended, not broken
- ✅ State management — isolated comparison state added
- ✅ Matching engine — unchanged
- ✅ Preferences (Clearline) — unchanged

---

## BROWSER VERIFICATION

**Flows Tested:**
- Landing → Assessment → Profile → Results → Compare
- Results → Change Plans selector → Start Comparison
- Comparison Table → Back to Results
- Results → Back to Assessment → Change Answer → New Results → Compare (new results)

**No stale state observed.** Comparison clears when assessment changes.

---

## GIT COMMIT

**Command:**
```bash
git add public/index.html SPRINT_7_IMPLEMENTATION_REPORT.md
git commit -m "feat: add hmo plan comparison mode"
```

**Status:** Ready to commit

---

## SUCCESS VERIFICATION CHECKLIST

### Plan Selection ✅
- [x] Up to 3 plans selectable
- [x] Minimum 2 plans required to compare
- [x] Fourth plan attempt blocked with alert
- [x] Selection state visible (checkboxes + border highlight)
- [x] Add/Remove works correctly

### 13-Row Comparison ✅
- [x] All 13 rows present in exact order
- [x] Premium formatted with basis
- [x] Group total calculated safely
- [x] Overall limit and surgery published correctly
- [x] Surgery ratio calculated only when safe
- [x] Maternity shows value or "Not published"
- [x] Hospital access shows plan's terminology
- [x] Payment model and waiting periods handled
- [x] Medication/dental/scans show "Not published by HMOs"
- [x] Evidence and date visible

### Calculations ✅
- [x] Group total never silently zero
- [x] Surgery ratio never divides by zero
- [x] Unknown never becomes zero
- [x] Unlimited never gets percentage
- [x] Price basis mismatch detected

### Warnings ✅
- [x] Customer type warning
- [x] Price basis warning
- [x] Evidence asymmetry warning
- [x] Promotional pricing warning
- [x] Stale pricing warning
- [x] Only relevant warnings shown
- [x] Warnings use red/amber + text

### Insights ✅
- [x] Surgery limit comparison generated
- [x] Price comparison generated
- [x] Provider access noted
- [x] Maternity insights contextual
- [x] No winner declarations
- [x] No unsupported claims

### Neutrality ✅
- [x] No "best" plan declared
- [x] No reranking in comparison
- [x] Clearline preference unchanged
- [x] No visibility advantage for any HMO

### UX ✅
- [x] Desktop table readable
- [x] Mobile stacked layout works
- [x] No horizontal scroll on mobile
- [x] Plan names visible in each row (mobile)
- [x] Buttons accessible
- [x] Back navigation works
- [x] Change plans button works

### Accessibility ✅
- [x] Keyboard navigation
- [x] Checkboxes labeled
- [x] Focus states visible
- [x] Color + text for warnings
- [x] 44px+ touch targets
- [x] Semantic table markup (desktop)

---

## NEXT STEPS

Sprint 7 is complete and production-ready. The comparison mode provides users with detailed, evidence-aware plan analysis.

**Future Sprints Could Extend:**
- Sprint 8: Benefit Gap Engine (detailed coverage analysis)
- Sprint 9: Mobile App (native iOS/Android)
- Sprint 10: Comparison Export (PDF/CSV)
- Future: Advanced filtering and custom comparisons

---

## FINAL SIGN-OFF

✅ **Sprint 7 Complete**

Comparison mode is fully functional, tested, and ready for user evaluation. All 13 required rows implemented, safety checks in place, warnings working, insights deterministic.

No AI in comparison logic. Neutral presentation. Clearline preference unchanged.

---

*Implemented: August 28, 2026*  
*Model: Claude Haiku 4.5*  
*Project: HMO Blueprint Nigeria*  
*Sprints Completed: 1–7*
