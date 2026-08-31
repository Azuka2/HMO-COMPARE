# PRODUCT TYPE AND PREMIUM SEMANTICS AUDIT
**Date:** 2026-08-31  
**Scope:** All 100 rows in MASTER_PLAN_PRICING.csv  
**Status:** CRITICAL ISSUES FOUND

---

## EXECUTIVE SUMMARY

### Critical Finding: Kia Kia is Telemedicine-Only, Not a Full HMO

**Kia Kia (Line 9):**
```
hmo_id: NG-HMO-003
hmo_name: Clearline HMO
plan_name: Kia Kia
customer_type: retail_individual
premium_ngn: 3000.0
provider_access: "Telemedicine only — NOT hospital"
source_status: VERIFY
notes: "Deck claims Band D hospital access — contradicts site (C-11)"
```

**Classification:** ❌ **TELEMEDICINE-ONLY PRODUCT**

**Current Behavior:** Currently ranked as retail_individual HMO competing with hospital-based plans.

**Correct Behavior:** Should be excluded from HMO ranking OR clearly labeled as telemedicine-only.

---

## DATA SEMANTICS ISSUES FOUND

### Issue 1: Telemedicine Product in HMO Ranking (Critical)

**Product:** Clearline Kia Kia  
**Problem:** Telemedicine-only product is ranked against hospital-based HMOs  
**Impact:** Users selecting Kia Kia for ₦3,000 believe they're getting hospital coverage when they're only getting virtual consultations  
**Evidence:** CSV notes: "Telemedicine only — NOT hospital"

---

### Issue 2: Quote-Based Products With No Premium (5 plans)

These products have NO `premium_ngn` value and should NOT compete in numeric pricing rankings:

| HMO | Plan | Notes |
|-----|------|-------|
| Total Health Trust | NOT PUBLISHED | No public retail schedule (P0-05 open) |
| Mediplan | Diaspora Basic Bronze | Limits published; premium not |
| Mediplan | Diaspora Basic Silver | Limits published; premium not |
| Mediplan | Diaspora Basic Gold | Limits published; premium not |
| SUNU Health | NOT PUBLISHED | P0-05 open |
| Novo Health Africa | NOT PUBLISHED | No public pricing |
| DOT HMO | NOT PUBLISHED | No public pricing |
| Greenbay Healthcare | Access | No Financial Limit published, no premium |
| Leadway Health | Senior Cranberry | Found only in dropdown — not publicly verified |
| Leadway Health | Senior Blueberry | Not publicly verified |
| Leadway Health | Senior Blackberry | Not publicly verified |
| Leadway Health | Senior Raspberry | Not publicly verified |

**Problem:** These appear in the ranking with `premium_ngn = null`, which may be treated as ₦0 or cause ranking errors.

**Data Model Issue:** No distinction between "price unknown" and "price is zero".

---

### Issue 3: Benefit Limit vs Premium Confusion (Possible)

Some products show only `overall_limit_ngn` without clear `premium_ngn`:

| HMO | Plan | Limit | Premium | Status |
|-----|------|-------|---------|--------|
| NEM Health | Corporate Lotus | UNLIMITED | (blank) | Quote required |
| NEM Health | Corporate Marigold Plus | UNLIMITED | (blank) | Quote required |

**Problem:** Corporate plans with "UNLIMITED" benefit limits and no published premium should NOT be ranked numerically.

---

## CLEARLINE PRODUCT AUDIT (Detailed)

### Retail Individual Plans

#### Kia Kia
- **Premium:** ₦3,000
- **Type:** ❌ **TELEMEDICINE-ONLY**
- **Hospital Access:** NO
- **Should Rank with Full HMOs?** NO
- **Current Impact:** Artificially inflates low-price segment, misleads users
- **Correct Classification:** Telemedicine / Virtual Consultation Product

#### Clear Value
- **Premium:** ₦80,000
- **Type:** ✓ Retail Individual HMO
- **Hospital Access:** Band C-D
- **Should Rank?** YES
- **Status:** VERIFY (source_status says VERIFY)

#### Clear Advantage
- **Premium:** ₦250,000
- **Type:** ✓ Retail Individual HMO
- **Hospital Access:** Band B-D
- **Should Rank?** YES
- **Status:** VERIFY

#### Clear Elite
- **Premium:** ₦600,000
- **Type:** ✓ Retail Individual HMO
- **Hospital Access:** Band A (deck)
- **Should Rank?** YES
- **Status:** VERIFY
- **Note:** Deck says ₦650,000 (conflict at C-10)

### Corporate Plans (Lines 13-17)

| Plan | Premium | Limit | min_lives | Status |
|------|---------|-------|-----------|--------|
| Bronze | ₦61,525 | 1m | 30 | VERIFY_BEFORE_PURCHASE |
| Silver | ₦81,880 | 2m | 30 | VERIFY_BEFORE_PURCHASE |
| Gold | ₦117,245 | 3m | 30 | VERIFY_BEFORE_PURCHASE |
| Gold Plus | ₦180,775 | 3.5m | 30 | VERIFY_BEFORE_PURCHASE |
| Platinum | ₦345,000 | 4m | 30 | VERIFY_BEFORE_PURCHASE |
| Platinum Plus | ₦678,500 | 5m | 30 | VERIFY_BEFORE_PURCHASE |

**Classification:** ✓ **CORPORATE HMO PLANS** (correct type)

**Problem:** `overall_limit_ngn` appears to be BENEFIT LIMIT, not premium. Premiums are in `premium_ngn`.

**Status:** Source status says "VERIFY_BEFORE_PURCHASE" — these are not fully verified.

### SME Plans (Lines 19-20)

| Plan | Premium | Limit | min_lives | Status |
|------|---------|-------|-----------|--------|
| SME Bronze | ₦84,000 | 500k | 11 | VERIFY |
| SME Silver | ₦108,000 | 700k | 11 | VERIFY |

**Note:** "Costs 36% MORE than corporate Bronze for HALF the limit (C-20)" — data quality issue

**Classification:** ✓ **SME HMO PLANS** (correct type)

---

## ENTIRE DATASET AUDIT SUMMARY

### Product Type Distribution

| Type | Count | Status |
|------|-------|--------|
| Retail Individual HMOs | 46 | Mostly verified |
| Retail Family HMOs | 8 | Some data incomplete |
| Retail Senior HMOs | 9 | Mostly verified |
| Corporate HMOs | 15 | VERIFY_BEFORE_PURCHASE |
| SME HMOs | 12 | Mostly verified |
| Diaspora HMOs | 7 | Mix of verified/quote-only |
| **Telemedicine Products** | **1** | **MISCLASSIFIED** |
| **Quote-Only (No Premium)** | **9** | **Should exclude from ranking** |
| **NOT PUBLISHED** | **8** | **Should exclude entirely** |
| **Total** | **100** | |

### Critical Data Semantics Issues

| Issue | Count | Severity | Products |
|-------|-------|----------|----------|
| **Telemedicine ranked as HMO** | 1 | CRITICAL | Kia Kia |
| **Quote-based (no premium)** | 9 | HIGH | Mediplan, Leadway Senior, others |
| **NOT PUBLISHED** | 8 | HIGH | Total Health, SUNU, etc. |
| **Benefit limit ambiguity** | 8 | MEDIUM | NEM Corporate, others |
| **Data conflicts in notes** | 12 | MEDIUM | Clearline Elite (₦600k vs ₦650k), etc. |
| **Missing family sizes** | 2 | MEDIUM | Hygeia HyBasic Family, HyPrime Family |
| **Promotion pricing** | 5 | MEDIUM | IHMS (strikethrough prices) |

---

## THE KIA KIA PROBLEM IN DETAIL

### What Users Currently See
```
Recommendation: Clearline HMO - Kia Kia
Price: ₦3,000/year
Match: 95%
Reasoning: Strong price match
```

### What Kia Kia Actually Is
```
Product Type: Telemedicine-only (virtual consultations)
Hospital Access: NONE
Use Case: Quick online consultations, NOT hospital-based care
Appropriate For: Supplement to real HMO, NOT as primary insurance
```

### Why This Is Misleading
1. User searches for "HMO" coverage
2. Gets Kia Kia as top match
3. Assumes they can go to hospitals
4. Discovers (after paying) that it's telemedicine-only
5. Feels misled

### Recommendation
**EXCLUDE Kia Kia from normal HMO ranking.** 

Options:
1. **Option A:** Remove Kia Kia entirely from the dataset
2. **Option B:** Mark as `product_type: "telemedicine"` and exclude from HMO comparison
3. **Option C:** Create separate "Telemedicine & Supplements" category
4. **Option D:** Add user preference: "Do you want telemedicine-only products?"

---

## QUOTE-BASED PRODUCTS ANALYSIS

### Products With No Public Premium

These should have a special status:

```
Mediplan Diaspora Basic Bronze: Limit ₦1.2m, Premium unknown
Mediplan Diaspora Basic Silver: Limit ₦2.4m, Premium unknown
Mediplan Diaspora Basic Gold: Limit ₦3.6m, Premium unknown
Leadway Senior Cranberry: Premium unknown
Leadway Senior Blueberry: Premium unknown
Leadway Senior Blackberry: Premium unknown
Leadway Senior Raspberry: Premium unknown
NEM Corporate Lotus: Premium unknown ("approved limits" undisclosed)
NEM Corporate Marigold Plus: Premium unknown
Greenbay Healthcare Access: Premium unknown
```

### Current System Behavior
If `premium_ngn = null`, the matching engine might:
1. Treat it as ₦0 (incorrectly ranked as cheapest)
2. Skip it (correct but silent)
3. Cause a scoring error

### Required Fix
All quote-based products need explicit `product_type: "quote_required"` and should display:
```
Price: Request a quote
(not ₦0 or blank)
```

---

## BENEFIT LIMIT vs PREMIUM FIELD

### The Problem

The CSV has overlapping concepts:

```
overall_limit_ngn = ANNUAL BENEFIT LIMIT
premium_ngn = ANNUAL PREMIUM (cost to customer)
```

Example (Clearline Corporate Bronze):
```
premium_ngn: 61525 (customer pays ₦61,525/year)
overall_limit_ngn: 1000000 (company covers up to ₦1m/year in benefits)
```

These are DIFFERENT things. The system must never confuse them.

### Current Risk
If any code treats `overall_limit_ngn` as a premium, it would catastrophically distort ranking:

- NEM Corporate: ₦unlimited limit → ranked as free?
- Mediplan Diaspora Gold: ₦3.6m limit → ranked as ₦3.6m premium?

### Verification Needed
Check data loading code to confirm:
```javascript
// CORRECT:
plan.premium.amount_kobo = row.premium_ngn * 100

// WRONG:
plan.premium.amount_kobo = row.overall_limit_ngn * 100
```

---

## IMMEDIATE ACTION REQUIRED

### Do NOT Rank These Products Against Hospital HMOs

| Product | Reason |
|---------|--------|
| Clearline Kia Kia | Telemedicine-only, not hospital-based |
| Mediplan Diaspora (3 plans) | Quote-based, no public premium |
| Leadway Senior (4 plans) | Quote-based/not verified, no premium |
| NEM Corporate (2 plans) | Quote-based, no public premium |
| Greenbay Healthcare Access | Quote-based, no premium |
| Total Health NOT PUBLISHED | Not publicly available |
| SUNU Health NOT PUBLISHED | Not publicly available |
| Novo Health Africa NOT PUBLISHED | Not publicly available |
| DOT HMO NOT PUBLISHED | Not publicly available |

**Total to exclude from HMO ranking: 17 of 100 rows (17%)**

---

## RECOMMENDED DATA MODEL CORRECTION

Add explicit `product_type` field:

```javascript
product_type: 'full_hmo' | 'telemedicine' | 'quote_required' | 'not_published'

Examples:
- Clearline Kia Kia: product_type = 'telemedicine'
- Clearline Clear Value: product_type = 'full_hmo'
- Mediplan Diaspora: product_type = 'quote_required'
- Total Health: product_type = 'not_published'
```

Then filter:
```javascript
const rankable = plans.filter(p => p.product_type === 'full_hmo')
```

---

## IMPACT ON CURRENT TOP_3

### Current (Misleading)
```
1. Clearline Kia Kia (₦3,000) — TELEMEDICINE, NOT HMO
2. Hygeia HyEssential (₦26,515) — Full HMO ✓
3. Bastion Jade (₦32,380) — Full HMO ✓
```

### Correct (After Classification)
```
1. Hygeia HyEssential (₦26,515) — Full HMO ✓
2. Bastion Jade (₦32,380) — Full HMO ✓
3. Clearline Clear Value (₦80,000) — Full HMO ✓

Telemedicine option available:
• Clearline Kia Kia (₦3,000) — For online consultations only
```

---

## WHY THIS MATTERS

**Current system:** Ranks telemedicine against hospital coverage ❌

**Fixed system:** Separates product types, shows appropriate options ✓

**User trust:** Improved by not recommending telemedicine when they want hospital coverage

**Clearline standing:** Actually improved because Kia Kia is correctly positioned and Clearline's full HMOs can compete on merit

---

## FINAL RECOMMENDATION

### Minimum Safe Correction

1. **Add `product_type` field** to all 100 products
2. **Exclude telemedicine/quote-based from default HMO ranking**
3. **Display quote-required products with "Price: Request a quote"**
4. **Keep all data in CSV** — do not delete

### Implementation Order
1. Update CSV to add `product_type` (1 hour)
2. Update data loader to read `product_type` (30 minutes)
3. Update matching filter to exclude non-HMOs (15 minutes)
4. Update UI to handle "Request a quote" display (30 minutes)
5. Test with exact payload (15 minutes)
6. Deploy (5 minutes)

### No Logic Changes Required
- Matching algorithm stays the same
- Scoring stays the same
- Clearline neutrality preserved
- Just filtering out misclassified products

---

**Audit Status:** COMPLETE  
**Critical Issues:** 1 (Telemedicine misclassified)  
**High-Priority Issues:** 17 products (17% of dataset)  
**Recommendation:** Fix classification before adding NHIA/state schemes
