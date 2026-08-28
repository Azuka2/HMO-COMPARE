# SPRINT 10 BROWSER QA PLAN
## HMO Blueprint Nigeria - Real Browser Testing

**Purpose:** Verify the frontend actually works before claiming personalization/mobile/accessibility readiness.

**Scope:** All routes, all screen sizes, all major flows

**Execution:** This plan should be run in actual browser (Chrome/Firefox), not just unit tests.

---

## PRE-TESTING SETUP

### Start Server
```bash
npm start
# Server listens on http://localhost:3000
```

### Browser Access
Open: http://localhost:3000

### Console Monitoring
Open DevTools (F12) throughout testing:
- Console tab: Watch for JavaScript errors
- Network tab: Monitor API calls
- Watch for uncaught exceptions

---

## CORE FLOW TEST (Primary Path)

### 1. Landing Page
**URL:** http://localhost:3000

**Expected:**
- [ ] Page loads without errors
- [ ] "HMO Blueprint Nigeria" visible
- [ ] Headline/hero text readable
- [ ] "Start Assessment" button visible and clickable
- [ ] No console errors
- [ ] No missing images/assets
- [ ] Founder section visible (if present)

**Test Action:**
```
Open http://localhost:3000
Inspect: Page loads in <2 seconds
Click "Start Assessment" button
Record any console errors
```

---

### 2. Assessment Flow (Q1-Q22)

**Expected per question:**
- [ ] Question text visible and readable
- [ ] Question number shown (Q1, Q2, etc.)
- [ ] Progress bar updates
- [ ] Answer controls work (radio, checkbox, text, slider)
- [ ] Continue/Back/Skip buttons responsive
- [ ] No console errors
- [ ] Answer persists if Back then Forward

**Test Questions by Type:**

#### Text Input (Q3 - State)
```
Answer: "Lagos"
Expected: Text input accepts input, continues to Q4
```

#### Single Select (Q1 - Customer Type)
```
Options: individual / family / senior / sme / corporate
Expected: Can select one, button enables "Continue"
```

#### Multiple Select (Q4 - Ages, if present)
```
Options: adults_18_39, children, seniors
Expected: Can select multiple, can deselect
```

#### Importance Scale (0-10)
```
Example: Q8 - Hospital access importance
Expected: Slider/input accepts 0-10, display updates
```

#### Budget Input (₦X)
```
Example: Q5 - Monthly budget
Test values: ₦20k, ₦100k, ₦1m
Expected: Accepts input, validates range if any
```

**Execute Full Assessment:**
- Proceed through all 22 questions
- Answer realistically for Chidi persona (price-focused)
- Record any questions that don't render
- Note any console errors per question
- Test navigation: Q1 → Q5 (Skip Q2-4) → Back to Q4 (should retain Q5)

**Validation:**
```
✅ All 22 questions render
✅ Each question type (text, select, slider) works
✅ Navigation (continue/back/skip) works
✅ No console errors during assessment
✅ Page doesn't freeze/crash
```

---

### 3. Priority Profile Page

**URL:** http://localhost:3000 (after assessment)

**Expected:**
- [ ] Priority profile displays
- [ ] Shows customer type (individual)
- [ ] Shows budget
- [ ] Shows top priorities
- [ ] Shows priority vector/weights if shown
- [ ] Shows completeness metric
- [ ] Shows confidence level
- [ ] "See My Matches" or "Continue" button clickable
- [ ] No console errors

**Test Action:**
```
Complete assessment as Chidi
Verify profile shows:
  - Customer type: individual
  - Budget: ₦80,000
  - Top priorities
  - Completeness %
Click "See My Matches" or equivalent button
```

---

### 4. Results Page

**Expected:**
- [ ] Top-1 recommendation loads
- [ ] Plan name, HMO, score visible
- [ ] "Why This Match" explanation visible (not generic)
- [ ] Benefits listed
- [ ] Watch Out warnings shown
- [ ] Confidence level shown
- [ ] "Verify Before Buying" questions appear
- [ ] Alternatives section shows 3-4 plans
- [ ] "Couldn't Compare" section appears if applicable
- [ ] Disclosure visible
- [ ] No console errors

**Test Actions:**
```
After matching completes:
Scroll through entire results page
Record: Title, score, explanation, benefits, warnings
Click on different sections (accordion if present)
Verify all sections load
Watch console for network errors
```

**Acceptance:**
```
✅ Recommendation loads within 3 seconds
✅ All sections render (why, benefits, warnings, alternatives)
✅ No hardcoded text (should be plan-specific)
✅ No white-screen errors
```

---

### 5. Comparison Mode

**Expected:**
- [ ] Can select 2nd plan from results or alternatives
- [ ] 3-plan limit enforced (can't add 4th)
- [ ] Comparison table renders
- [ ] 13-row comparison visible:
  1. Premium
  2. Total for group
  3. Overall limit
  4. Major surgery
  5. Surgery as %
  6. Maternity
  7. Hospital access
  8. Payment model
  9. Waiting periods
  10. Medication
  11. Dental & optical
  12. Scans
  13. Evidence & date
- [ ] Can remove plan from comparison
- [ ] Can swap plans
- [ ] Comparison doesn't declare "winner" or "best"
- [ ] No console errors

**Test Actions:**
```
From results, click "Compare" on 2 plans
Verify table renders with all rows
Test: Remove one plan
Test: Add different plan
Test: No horizontal scroll on mobile (will test in mobile section)
```

---

### 6. Coverage Gap Calculator

**Expected:**
- [ ] Can input requirement amount (₦X)
- [ ] Can select plan
- [ ] Calculator runs
- [ ] Shows potential gap (not "you will pay ₦X")
- [ ] Handles "UNKNOWN" correctly
- [ ] Handles "UNLIMITED" correctly
- [ ] Handles "NOT_COVERED" correctly
- [ ] No negative gaps
- [ ] No console errors

**Test Scenarios:**
```
Scenario A: Known benefit
  Requirement: ₦2,000,000
  Plan limit: ₦750,000
  Expected gap: "Potential gap: ₦1,250,000"
  NOT: "You will pay ₦1,250,000"

Scenario B: Unknown limit
  Requirement: ₦2,000,000
  Plan limit: UNKNOWN
  Expected: "Gap not calculable" or similar
  NOT: ₦0 or blank

Scenario C: Unlimited
  Requirement: ₦2,000,000
  Plan limit: UNLIMITED
  Expected: "No gap" or "Covered"
  NOT: ₦0
```

---

### 7. Farce Detector / Watch Out

**Expected:**
- [ ] Appears for plans with suspicious claims
- [ ] Shows:
  - Claim being flagged
  - Published evidence
  - Interpretation
  - Verification question
- [ ] Does NOT accuse of fraud
- [ ] Does NOT reduce ranking automatically
- [ ] Applied consistently to all HMOs
- [ ] No Clearline exceptions

**Test Actions:**
```
Open results with plans making big claims
(Look for: "unlimited", "comprehensive", "nationwide", etc.)
Verify "Look Closer" or "Watch Out" appears
Click to expand
Verify claim, evidence, and question shown
Check consistency: Same rule applied to all HMOs
```

---

### 8. Founder / About Section

**Expected:**
- [ ] About page loads
- [ ] Founder photo displays (if present)
- [ ] Founder name visible
- [ ] Biography/story readable
- [ ] Attribution clear
- [ ] Social links functional (not tested as "go to Twitter" but verify clickable)
- [ ] No unverified credentials
- [ ] Disclosure present

**Test Actions:**
```
Navigate to /about or "About" link
Scroll through page
Verify all text and images load
Click social links (verify they point to correct URLs)
Check for any suspicious claims
```

---

### 9. Content / Learn Section

**Expected:**
- [ ] Page loads
- [ ] Resource cards render
- [ ] Images load
- [ ] Titles readable
- [ ] No fabricated publication dates
- [ ] Links work (or at least point to valid URLs)

**Test Actions:**
```
Navigate to /learn or "Content"
Scroll through all resources
Hover over/click resources to verify details
```

---

### 10. WhatsApp Integration

**Expected:**
- [ ] WhatsApp button/link present
- [ ] Clicking opens WhatsApp
- [ ] Message is prefilled but editable
- [ ] NO sensitive health data auto-filled
- [ ] User can choose not to send

**Test Actions:**
```
From results or any page, find WhatsApp button
Click it
Verify: WhatsApp opens with prefilled message
Check message doesn't contain: Health conditions, budget, priorities
User should be able to edit before sending
```

---

### 11. WellnessOS Link

**Expected:**
- [ ] Link present
- [ ] Points to https://wellnessos.com.ng
- [ ] Does NOT affect HMO ranking
- [ ] Does NOT set any Clearline preference

**Test Actions:**
```
Click WellnessOS link
Verify goes to correct URL
Navigate back
Verify HMO rankings unchanged
```

---

### 12. Social Links

**Expected:**
- [ ] Facebook link (if shown)
- [ ] LinkedIn link (if shown)
- [ ] Instagram link (if shown)
- [ ] X/Twitter link (if shown)
- [ ] YouTube link (if shown)
- [ ] All point to real URLs
- [ ] No broken links

**Test Actions:**
```
Right-click social link → Copy link → Inspect URL
Verify URL format matches platform (facebook.com, linkedin.com, etc.)
Do NOT navigate (may not work in test environment)
```

---

### 13. Direct Route Test

**Expected:** Each route loads without errors

```
✅ http://localhost:3000/ → Landing
✅ http://localhost:3000/assessment → Assessment (or redirects to landing)
✅ http://localhost:3000/profile → Profile (shows placeholder or redirects)
✅ http://localhost:3000/results → Results (shows placeholder or redirects)
✅ http://localhost:3000/compare → Comparison
✅ http://localhost:3000/coverage-gap → Gap calculator
✅ http://localhost:3000/about → About page
✅ http://localhost:3000/learn → Learn/Content page
```

**Test Actions:**
```
For each URL:
  Open it directly
  Verify page loads (no 404)
  Verify no console errors
  If blank/placeholder, acceptable
  If error page, FAIL
```

---

### 14. Back Button Behavior

**Expected:** Browser back button works correctly

```
Landing → Assessment Q1 → Q5 → Back (should go to Q4)
         → Back → Assessment start (or landing)
Results → Back → Profile
       → Back → Assessment Q22 (or Profile)
       → Back → Assessment start
```

**Test Actions:**
```
Follow happy path: Landing → Assessment → Profile → Results
At Results page:
  Click browser back button
  Should show Profile (not go back into Assessment)
Click back again:
  Should show Assessment or Landing
Verify NO data loss
  Go forward: profile data still there
  Go back: assessment answers preserved
```

---

## MOBILE RESPONSIVENESS TEST

### Viewport: 360px (small phone)

**Test:**
```
Resize browser to 360px width
Run through full flow:
  ✅ Landing → readable, button tappable
  ✅ Assessment → questions visible, no horizontal scroll
  ✅ Profile → data visible, no overflow
  ✅ Results → plan cards stack, warnings visible
  ✅ Comparison → table scrolls horizontally if needed (not body scroll)
  ✅ Gap calculator → input fields accessible
  ✅ About/Learn → text readable, no overlap
```

**Checks:**
- [ ] No horizontal body scroll
- [ ] Button minimum 44px touch target
- [ ] Text readable without zooming
- [ ] Cards stack vertically
- [ ] No clipped content

---

### Viewport: 390px (standard phone)

Same tests as 360px

---

### Viewport: 768px (tablet)

**Test:**
```
Resize to 768px
Verify:
  ✅ Layout adapts
  ✅ 2-column layout if present works
  ✅ Comparison table usable
  ✅ No content hidden
```

---

### Viewport: 1024px (desktop)

**Test:**
```
Resize to 1024px
Verify:
  ✅ Full layout renders
  ✅ Sidebar (if present) works
  ✅ Good spacing
  ✅ Professional appearance
```

---

### Viewport: 1440px (large desktop)

Same as 1024px, verify layout doesn't break at wide sizes

---

## ACCESSIBILITY TEST

### Keyboard Navigation

**Test:**
```
Press TAB repeatedly through entire page
Verify:
  ✅ Every interactive element (button, input, link) focusable
  ✅ Focus visible (outline/highlight shown)
  ✅ Tab order logical (left-to-right, top-to-bottom)
  ✅ Can press ENTER on buttons
  ✅ Can press SPACE on checkboxes
  ✅ Can use arrow keys on sliders/selects
```

### Labels and Semantics

**Test:**
```
Inspect HTML for:
  ✅ <label> tags on form inputs
  ✅ <button> tags for buttons (not <div class="button">)
  ✅ <h1>, <h2>, <h3> semantic headings
  ✅ <a> tags for links
  ✅ ARIA attributes where needed (aria-label, aria-hidden, etc.)
```

### Color Contrast

**Test:**
```
Look at text-on-background colors:
  ✅ Dark text on light background: sufficient contrast
  ✅ Warning text: not red-only (should have icon or text)
  ✅ Disabled elements: acceptable gray
```

---

## CONSOLE ERROR CHECK

**Throughout all tests:**
- [ ] Zero JavaScript errors (red ✖ in console)
- [ ] Acceptable warnings only (minor deprecations OK)
- [ ] No 404 network errors for assets
- [ ] No failed API calls

**Red Flags:**
```
FAIL: Uncaught TypeError: Cannot read property...
FAIL: 404 on http://localhost:3000/assets/...
FAIL: Failed to fetch /api/match (should succeed)
OK: Deprecation warning for old API
OK: Minor lint warnings
```

---

## PRICING UNIT VERIFICATION

**Critical: Verify prices display correctly after NGN→kobo fix**

```
✅ CSV: premium_ngn = 26515 (₦26,515)
✅ API: amount_kobo = 2,651,500
✅ Display: ₦26,515
  NOT: ₦265.15 (would be 100× too small)
  NOT: ₦2,651,500 (would be 100× too large)

Test multiple prices:
  ₦3,000 → ₦3,000 ✓
  ₦61,525 → ₦61,525 ✓
  ₦750,000 → ₦750,000 ✓
  ₦1,115,000 → ₦1,115,000 ✓
```

---

## PERSONALIZATION VERIFICATION

**After improving data (if done), test personas:**

```
✅ Chidi (price-focused): Sees affordable plans first
✅ Adaeze (maternity critical): IF maternity data added, sees plans with high maternity first
✅ Tunde (surgery critical): IF surgery data added, sees high-surgery plans first
✅ Mrs Okafor (senior): Sees senior-appropriate plans
✅ Emeka (SME): Sees corporate/SME plans
```

**Success Criteria:**
- Different personas get different top-3 results (if sufficient data)
- OR explanations reflect user priorities
- OR benefit emphasis changes by persona

---

## FINAL VERDICT TEMPLATE

```
BROWSER QA RESULT: [PASS / PARTIAL / FAIL]

Passing Criteria Met:
- [ ] Landing page loads
- [ ] Full assessment flow works (Q1-Q22)
- [ ] Profile displays
- [ ] Results load
- [ ] No critical console errors
- [ ] Mobile 360px-1440px functional
- [ ] Keyboard navigation works
- [ ] Pricing units correct
- [ ] All routes accessible

Issues Found:
- [List any issues]

Blockers:
- [List critical issues that prevent launch]

Nice-to-haves:
- [List minor improvements]

Recommended Actions:
- [Fix blockers before launch]
```

---

**Next Step:** Execute this plan in browser. Document results. Fix any blockers.

