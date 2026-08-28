# HMO BLUEPRINT NIGERIA
# MASTER INTELLIGENCE, PRODUCT & EXECUTION BLUEPRINT
## Claude Project → HMO Intelligence Engine → Claude Code → Production Platform

**Merged edition:** 1.0  
**Prepared:** August 2026

> This master document combines the complete HMO Blueprint Nigeria specification with the Claude Project → Claude Code execution roadmap. Use it as the primary project-control document.

---

# PART I — COMPLETE HMO BLUEPRINT NIGERIA SPECIFICATION

# HMO BLUEPRINT NIGERIA
## Complete Product, Research, Data, Scoring, Claude-Engine & Front-End Execution Specification

**Version:** 1.0  
**Date:** August 2026  
**Product type:** Consumer health-insurance intelligence and decision platform  
**Primary implementation:** Responsive HTML/CSS/JavaScript front end + secure backend + structured HMO intelligence database + Claude reasoning layer

---

# 0. EXECUTIVE DIRECTIVE TO CLAUDE

You are helping build **HMO Blueprint Nigeria**, an independent health-insurance intelligence and decision platform for Nigeria.

This is NOT merely an HMO directory.

It is NOT a generic comparison website.

It is NOT an advertorial.

It is NOT an AI chatbot that invents recommendations.

It is a **Nigeria Health Insurance Decision Engine**.

Its purpose is to help a Nigerian individual, family, SME, HR professional, employer, association or corporate buyer answer:

> **“Given what I actually need, my location, my budget and my priorities, which health-insurance options fit me best — what exactly do they cover, where are the gaps, and what should I verify before I pay?”**

The platform must combine:

- NHIA information
- State Social Health Insurance information
- HMO profiles
- Plan/benefit packages
- Provider and hospital networks
- Premiums
- Benefit limits
- Exclusions
- Waiting periods
- Referral requirements
- Preauthorization requirements
- Customer experience signals
- Public reviews
- Digital maturity
- AI maturity
- Financial/organizational signals
- Capitation and payment-model information
- Medical Loss Ratio analysis where data exists
- Historical information
- Market sentiment
- Corporate/SME preferences
- Consumer preferences
- Evidence quality
- Personalized user inputs

The user interacts with a polished HTML interface.

The user answers approximately 22 smart questions.

The system converts those answers into structured variables.

A deterministic scoring engine compares those variables against the verified HMO/plan database.

Claude then explains the result in natural language.

**The database is the source of truth. Claude is the reasoning and explanation layer.**

Do not allow the LLM to invent facts, randomly rank organizations, or silently fill missing information.

---

# 1. THE PRODUCT VISION

## Working name

# HMO BLUEPRINT
### Nigeria Health Insurance Intelligence & Decision Engine

Core consumer promise:

> **Tell us what matters to you. We will help you understand which health-insurance options fit your needs — and show you exactly why.**

Alternative hero:

> **Don't choose an HMO because someone recommended it. Find the one that fits YOU.**

Subheadline:

> Answer 22 smart questions. Compare benefits, limits, hospitals, prices and real-world signals. Get a recommendation explained in plain language.

Primary CTA:

**Find My HMO**

Secondary CTAs:

- Explore HMOs
- Compare Plans
- Find Hospitals
- Calculate Coverage
- Calculate MLR
- Explore NHIA
- Explore State Schemes
- Read the HMO Blueprint

---

# 2. THE CENTRAL PRODUCT PHILOSOPHY

The platform must not ask:

> “Which HMO is the best?”

It should ask:

> **“Which health-insurance option is the best fit for this person or organization?”**

There is rarely one universally best HMO.

There may be:

- Best HMO for maternity
- Best HMO for families
- Best HMO for SMEs
- Best HMO for large corporates
- Best HMO for premium hospital access
- Best HMO for value
- Best HMO for digital experience
- Best HMO for surgery protection
- Best HMO for seniors
- Best HMO for Lagos
- Best HMO for Benin City
- Best HMO for nationwide organizations
- Best HMO for wellness
- Best HMO for low out-of-pocket risk

The user's needs determine the weighting.

---

# 3. CURRENT REGULATORY STARTING POINT

Use the **National Health Insurance Authority (NHIA)** as the primary regulatory source.

The current NHIA HMO directory should be treated as the initial authoritative HMO universe, but the system must still validate status and date because directories change.

The current NHIA directory retrieved during preparation contains 94 numbered entries, including a repeated Health Assur entry under different IDs. Do not blindly interpret the row count as the number of unique active HMOs. Deduplicate by legal identity, NHIA ID, and regulatory status, and preserve the discrepancy as a data-quality issue.

NHIA also maintains a State Social Health Insurance Agency directory. The platform should cover the national HMO layer AND the state insurance layer.

The NHIA Act 2022 defines capitation and fee-for-service. The platform should use the Act and current NHIA regulations/guidelines as primary references.

IMPORTANT:

Do not hard-code a claim that “NHIA requires/recommends ₦400 million capitalization” until the exact current legal/regulatory source, effective date, organization category and meaning of the amount have been verified.

Likewise, do not hard-code a claim that ClearlineHMO has ₦1 billion in relevant capital unless independently verified from an appropriate source.

The system must distinguish:

- paid-up share capital
- regulatory minimum capital
- solvency/capital requirement
- shareholders' funds
- parent-company support
- assets
- revenue
- healthcare expenditure

These are not interchangeable.

---

# 4. WHAT THE PLATFORM MUST COVER

The database must ultimately cover:

## HMO universe

Every NHIA-accredited HMO that can be reliably identified.

## State schemes

36 states + FCT where applicable.

## NHIA programmes

Relevant national programmes, including private health plans and other NHIA-administered schemes where applicable.

## Providers

Healthcare facilities, pharmacies, laboratories, diagnostics, dental, optical, specialist and other relevant providers.

## Plans

Individual, family, SME, corporate, executive, premium, customized and other publicly documented products.

---

# 5. MASTER HMO RESEARCH REQUIREMENTS

For every HMO, research the following.

## 5.1 Identity

- Legal name
- Trading name
- NHIA ID
- Accreditation status
- Accreditation date
- Current status
- Headquarters
- Branches
- States of operation
- Website
- Email
- Phone
- Call centre
- WhatsApp
- Social accounts
- Mobile app
- Customer portal
- Enrollment portal

## 5.2 History

- Founded
- Started operations
- Founding story
- Original ownership
- Original name
- Rebranding
- Mergers
- Acquisitions
- Major milestones
- Major crises
- Major expansions
- Major partnerships
- Major awards
- Major strategic changes

## 5.3 Ownership

Research only publicly available evidence:

- Founder
- Ultimate parent
- Parent company
- Shareholders
- Institutional investors
- Group companies
- Subsidiaries
- Sister companies
- Strategic partners
- Funding
- Acquisitions
- Mergers

Never infer private ownership.

## 5.4 Board and leadership

- Chairman
- Board members
- CEO/MD
- Executive team
- Key management
- Professional backgrounds
- Tenure
- Previous companies
- Public appointments
- Public professional affiliations

Only include public, verifiable information.

## 5.5 Company portfolio

Where applicable:

- Parent group
- Insurance businesses
- Banks
- Pharmaceutical businesses
- Hospitals
- Clinics
- Technology companies
- Other healthcare businesses
- Other subsidiaries

Map potential vertical integration but do not assume it is automatically good or bad.

---

# 6. PRODUCTS AND PLAN DATABASE

For every plan:

- Plan name
- Plan category
- Individual
- Family
- SME
- Corporate
- Executive
- Premium
- International
- Senior
- Student
- Other
- Target customer
- Number of lives
- Minimum lives
- Geographic availability
- Annual premium
- Monthly equivalent
- Enrollment fee
- Add-ons
- Discounts
- Renewal
- Waiting period
- Co-pay
- Deductible
- Authorization
- Referral requirements
- Exclusions
- Benefit limits
- Provider restrictions

---

# 7. PREMIUM INTELLIGENCE

Do not store one “premium” field.

Store:

### Published premium

What the official website/brochure says.

### Official quoted premium

A quotation supplied by the HMO.

### Observed market quotation

A quote independently obtained under controlled conditions.

### Negotiated premium

A verified corporate/custom quote.

### Historical premium

Older documented pricing.

### Market-reported premium

Publicly reported but not independently verified.

### Estimated premium

Algorithmic estimate.

### Unknown

No reliable public figure.

Every premium must include:

- amount
- currency
- plan
- number of lives
- age assumptions
- location
- date
- source
- verification status
- conditions

Never present a negotiated corporate quotation as the universal price.

---

# 8. BENEFIT PACKAGE INTELLIGENCE

The platform must not use a simple:

> Covered = Yes

model.

For every benefit capture:

- Covered?
- Exact service
- Annual limit
- Per-event limit
- Frequency
- Monetary limit
- Percentage
- Co-payment
- Deductible
- Waiting period
- Referral
- Preauthorization
- Provider restriction
- Plan tier
- Exclusion
- Exception
- Source
- Verification date

Two plans can both say “surgery covered” and still have radically different real-world value.

---

# 9. BENEFIT TAXONOMY

## Primary care

- GP
- Consultation
- Follow-up
- Preventive care

## Specialist

- Cardiology
- Neurology
- Dermatology
- Gastroenterology
- Urology
- Orthopaedics
- Gynaecology
- Paediatrics
- Psychiatry
- Other specialties

## Surgery

- Minor surgery
- Major surgery
- General surgery
- Orthopaedic
- Obstetric
- Caesarean
- Other procedures

## Hospitalization

- Admission
- Ward
- Theatre
- ICU
- Nursing
- Specialist care

## Diagnostics

- Laboratory
- X-ray
- Ultrasound
- CT
- MRI
- Endoscopy
- ECG
- Echocardiography
- Other imaging

## Maternity

- Antenatal
- Normal delivery
- Caesarean
- Complications
- Newborn care

## ENT

- Consultation
- Procedures
- Surgery
- Hearing-related care

## Dental

- Consultation
- Cleaning
- Fillings
- Extraction
- Root canal
- Dental surgery
- Other

## Optical

- Eye examination
- Frames
- Lenses
- Contact lenses
- Surgery

## Drugs

- Formulary
- Prescription
- Chronic medication
- Brand restrictions
- Generic restrictions
- Exclusions

## Chronic disease

- Diabetes
- Hypertension
- Asthma
- Other chronic conditions

## High-cost care

- Cancer
- Dialysis
- ICU
- Major surgery
- Specialized diagnostics
- Prostheses/implants where applicable

## Wellness

- Gym
- Spa
- Fitness
- Wellness checks
- Screening
- Lifestyle programmes

---

# 10. THE “UNLIMITED” DETECTOR

Never assume:

> Unlimited = best.

Whenever a plan says “unlimited”, Claude must investigate:

- What exact service?
- Unlimited consultations or all care?
- GP only?
- Specialist?
- Drugs?
- Diagnostics?
- Hospitalization?
- Surgery?
- Dental?
- Optical?
- Maternity?
- Is there an annual aggregate?
- Are there provider restrictions?
- Are referrals required?
- Is preauthorization required?
- Are clinical guidelines applicable?
- Are exclusions applicable?

Display:

### “Unlimited — verify the conditions.”

---

# 11. BENEFIT DEPTH SCORE

A service should be scored based on depth.

Example:

### Surgery

Plan A:
Covered: Yes
Limit: ₦300,000
Preauthorization: Yes
Co-pay: 20%

Plan B:
Covered: Yes
Limit: ₦2,000,000
Preauthorization: Yes
Co-pay: 0%

The engine must not award the same score.

The benefit score should consider:

- Breadth
- Monetary depth
- Conditions
- User requirement
- Provider availability
- Frequency
- Restrictions

---

# 12. PROVIDER NETWORK DATABASE

Each provider becomes an individual record.

Fields:

- Provider ID
- Provider name
- HMO
- Plan
- State
- LGA
- City
- Address
- GPS
- Provider type
- Hospital
- Clinic
- Pharmacy
- Laboratory
- Dental
- Optical
- Diagnostic
- Specialist
- Maternity
- Emergency
- CEmONC if applicable
- Telephone
- WhatsApp
- Website
- Opening hours
- 24-hour emergency
- HMO plans accepted
- Last verified
- Verification method
- Source

---

# 13. NEVER RANK BY RAW PROVIDER COUNT ALONE

A provider count of 3,000 is not automatically better than 1,000.

Calculate:

### Relevant Network Score

Based on:

- User location
- Distance
- Provider density
- Emergency access
- Specialist availability
- Maternity
- Diagnostics
- Pharmacy
- Dental
- Optical
- Preferred hospitals
- Plan-specific participation
- Verification freshness

A national network can be huge and still be weak for a particular user's location.

---

# 14. PROVIDER VERIFICATION

Build:

# CALL BEFORE YOU BUY

The platform should tell users:

> A hospital list is not enough. Confirm the exact HMO and exact plan with the hospital before paying.

Verification questions:

> “Do you currently accept [HMO] [Plan]?”

> “Do you accept this exact tier?”

> “Do you currently provide maternity/surgery/diagnostics under this plan?”

> “Is authorization required?”

> “Are there any services you do not process under this plan?”

Users can report:

- Confirmed
- Not confirmed
- Hospital says no
- Could not reach hospital
- Outdated information

This can become a community verification layer.

---

# 15. CUSTOMER EXPERIENCE INTELLIGENCE

Research:

- Enrollment
- Onboarding
- Call centre
- WhatsApp
- Email
- App
- Authorization
- Referral
- Complaint
- Refund
- Claims
- Provider changes
- Dependant additions
- Plan upgrades
- Renewal
- Cancellation
- Emergency response

Where possible, conduct standardized mystery-shopping tests.

Record:

- Response time
- Accuracy
- Clarity
- Courtesy
- Sales pressure
- Follow-up
- Price transparency
- Benefit transparency
- Escalation quality

Do not call private information “secret recipe”.

Call it:

# Operational Intelligence

---

# 16. DIGITAL AND AI MATURITY

Create a:

# DIGITAL HEALTH INSURANCE INDEX

Measure:

- Website
- Online enrollment
- Online quote
- Online payment
- Provider search
- App
- WhatsApp
- Telemedicine
- Digital claims
- Customer portal
- Electronic authorization
- Digital onboarding
- API/integration
- Chatbot
- AI
- Personalization
- Automated support

Do not award AI points just because a company has a chatbot.

Measure whether technology actually reduces customer friction.

---

# 17. CUSTOMER SENTIMENT

Research public sources where legally and technically appropriate:

- Google
- Facebook
- X
- LinkedIn
- YouTube
- TikTok
- Reddit
- Nairaland
- App stores
- Consumer forums
- News

Classify:

### Praise

- Service
- Hospitals
- Drugs
- Maternity
- Customer support
- App
- Wellness

### Complaints

- Authorization
- Delays
- Hospital refusal
- Drugs
- Customer service
- Billing
- Claims/refunds
- Provider quality
- App
- Communication
- Benefit misunderstanding

Never present a handful of reviews as a statistically representative survey.

Use:

> **Public sentiment signal — not a scientific customer satisfaction survey.**

---

# 18. EMPLOYEE EXPERIENCE

Where public data exists:

- Staff reviews
- Leadership
- Training
- Career development
- Compensation sentiment
- Work-life balance
- Culture
- Retention signals
- Employer awards

Sample size must be displayed.

---

# 19. CORPORATE CUSTOMER INTELLIGENCE

Only publish:

- Publicly disclosed corporate clients
- Publicly disclosed government contracts
- Case studies
- Announced institutional relationships
- Public partnerships
- Publicly disclosed covered lives

Do not publish alleged confidential customer lists.

Use:

> **Publicly disclosed relationships**

rather than:

> Major customers

unless the evidence supports the latter.

---

# 20. FINANCIAL AND CAPITALIZATION INTELLIGENCE

Research where publicly available:

- Paid-up capital
- Shareholders' funds
- Revenue
- Healthcare expenditure
- Claims/benefit expenditure
- Assets
- Parent-company support
- Funding
- Investment
- Acquisitions
- Group financial statements
- Regulatory financial information
- Capital adequacy indicators
- Other sustainability indicators

Do not confuse:

- capital
- revenue
- assets
- cash
- shareholders' equity
- premium income

Use the exact terminology from the source.

---

# 21. CAPITATION MODULE

Explain capitation in plain language.

Capitation is a prospective payment arrangement in which a healthcare provider receives a defined payment for covered services for an enrollee, regardless of whether the enrollee uses the service within the covered arrangement.

Research:

- Capitation arrangements where publicly disclosed
- Relevant regulatory requirements
- Provider payment structure
- Financial sustainability indicators
- Public provider complaints where credible

Do not assume:

> Higher capitation = better HMO.

The relevant question is whether the organization has adequate financial and operational capacity to meet obligations and deliver care.

---

# 22. FEE-FOR-SERVICE MODULE

Explain:

### Fee-for-service

Payment for healthcare services rendered, outside a capitation arrangement.

Use current official NHIA professional fee schedules/reference material where applicable.

Store:

- Service
- Fee
- Date
- Source
- Applicable category
- Version

Never assume a public FFS schedule equals what every provider actually charges in every circumstance.

---

# 23. MLR CALCULATOR

Create:

# MEDICAL LOSS RATIO CALCULATOR

Basic formula:

**MLR = Medical/healthcare expenditure ÷ applicable premium/contribution revenue × 100**

Inputs:

- Premium/contribution revenue
- Medical/claims expenditure
- Year
- Optional other fields depending on methodology

Outputs:

- MLR
- Year-on-year trend
- Comparison
- Interpretation

Important warning:

> MLR methodology varies. This calculator is an analytical estimate unless the entered data and methodology exactly match the applicable regulatory/accounting definition.

Never state:

> Higher MLR automatically means better HMO.

Interpret in context.

---

# 24. PREMIUM CALCULATOR

Inputs:

- Adults
- Children
- Ages
- Location
- Plan
- Optional benefits
- Payment frequency
- Number of employees
- Number of dependants

Outputs:

- Annual premium
- Monthly equivalent
- Cost per person
- Family cost
- Corporate cost
- Comparison
- Benefit value

Never fabricate pricing.

---

# 25. BENEFIT-LIMIT CALCULATOR

User enters:

- Surgery requirement
- MRI
- CT
- Dental
- Optical
- Maternity
- Drugs
- Specialist care
- Other desired services

Example:

User requirement:
Surgery = ₦2,000,000

Plan limit:
₦1,000,000

Output:

> Potential coverage gap: ₦1,000,000

Clearly label:

**Potential coverage gap**

not guaranteed out-of-pocket cost.

---

# 26. COVERAGE SCENARIO SIMULATOR

Scenarios:

- Caesarean
- Appendectomy
- MRI
- Hospital admission
- Emergency
- Dental procedure
- Optical
- Chronic medication
- ICU
- Specialist treatment

Show:

- Illustrative healthcare cost range
- Plan benefit
- Relevant limit
- Potential gap
- Conditions
- Authorization requirements

Use ranges where exact current prices cannot be reliably verified.

Label:

> **Illustrative estimate — not a quotation.**

---

# 27. FALSE-ECONOMY DETECTOR

Example:

Plan A:
Premium ₦80,000
Surgery limit ₦300,000

Plan B:
Premium ₦110,000
Surgery limit ₦2,000,000

The platform should explain:

> Plan A is cheaper, but your stated priority is major-care protection. Plan B costs more but may provide materially stronger protection for the risk you care about.

Never simply rank by cheapest price.

---

# 28. OUT-OF-POCKET RISK SCORE

Calculate an indicative score from:

- Premium
- Benefit limits
- Major-care exposure
- Co-payments
- Deductibles
- Exclusions
- Waiting periods
- Provider restrictions
- User health-service priorities

Output:

- Low
- Moderate
- High

This is an analytical indicator, not a guarantee.

---

# 29. HMO “FARCE DETECTOR”

The platform should challenge marketing language.

Example:

### Marketing claim:
“3,000+ hospitals nationwide.”

Response:

> Network size alone does not tell you how useful the network is for you.
>
> Check your city, preferred hospital, emergency access, specialist access, exact plan tier and last verification date.

Example:

### Claim:
“Unlimited consultations.”

Response:

> What exactly is unlimited?
>
> Check referral requirements, provider restrictions, specialist access, plan conditions and exclusions.

Example:

### Claim:
“₦10 million coverage.”

Response:

> Total coverage is not necessarily ₦10 million for every service.
>
> Check the individual benefit sub-limits.

This feature is a major differentiator.

---

# 30. HMO SWOT

For every deeply researched HMO:

## Strengths

Evidence-backed advantages.

## Weaknesses

Evidence-backed disadvantages.

## Opportunities

Market opportunities.

## Threats

Regulatory, operational, technological, financial and competitive threats.

Then:

### Why this HMO wins

### Why this HMO loses

### What competitors do better

---

# 31. RANKING METHODOLOGY

Do not create a ranking nobody can audit.

Create a published methodology.

Potential dimensions:

| Dimension | Initial Weight |
|---|---:|
| Benefit value | 15% |
| Provider network | 15% |
| Customer/service experience | 15% |
| Organizational/financial strength | 10% |
| Digital capability | 10% |
| Customer sentiment | 10% |
| Transparency | 10% |
| Longevity/stability | 5% |
| Corporate capability | 5% |
| Innovation | 5% |

These weights are a starting hypothesis, not a permanent truth.

The scoring system should be tested using synthetic users and historical cases.

Create multiple rankings:

- Overall
- Value
- Family
- SME
- Corporate
- Premium care
- Hospital network
- Maternity
- Surgery
- Digital
- Customer experience
- Wellness
- Transparency
- State-specific

---

# 32. PERSONALIZED MATCHING

The user profile becomes a weighting vector.

Example:

A maternity-focused user:

- Maternity = very high
- Hospital network = high
- Surgery = high
- Cost = high
- Gym = low

A young digital-first user:

- Digital = very high
- Cost = high
- Telemedicine = high
- Hospital network = medium
- Maternity = low

An HR manager:

- Network = very high
- Corporate service = very high
- Cost = high
- Employee needs = very high
- Digital = high
- Reporting = high

The same HMO can rank differently for each user.

---

# 33. THE 22-QUESTION USER ASSESSMENT

The UI should ask questions progressively.

## Q1 — Who are you covering?

- Me
- Me + spouse
- Family
- Parents/dependants
- Employees
- SME
- Association
- Multiple locations

## Q2 — Where are you based?

State → LGA → city.

## Q3 — How many people?

Adults, children, dependants.

## Q4 — Age profile?

Age ranges.

## Q5 — What is your annual budget?

Slider/input.

## Q6 — Which states must the plan cover?

Multi-select.

## Q7 — Do you already have preferred hospitals?

Search/select.

## Q8 — How important is hospital choice?

Low → critical.

## Q9 — Is maternity important?

Yes/no/very important.

## Q10 — Do you have children/dependants?

Age profile.

## Q11 — Do you need senior/dependent-parent care?

Yes/no.

## Q12 — How important is chronic-care support?

Low → critical.

## Q13 — How important is specialist access?

Low → critical.

## Q14 — How important is surgery/major-care protection?

Low → critical.

## Q15 — How important are diagnostics?

MRI/CT/labs/etc.

## Q16 — Which everyday extras matter?

- Dental
- Optical
- ENT
- Physiotherapy
- Wellness
- Gym
- Spa

## Q17 — How important are drugs?

Low → critical.

## Q18 — How important is digital access?

App, WhatsApp, telemedicine, online support.

## Q19 — How important is customer-service speed?

Low → critical.

## Q20 — How much restriction are you willing to tolerate?

Low premium with restrictions vs higher premium with stronger coverage.

## Q21 — What matters most?

Select top 3.

## Q22 — What are you most afraid of?

- Hospital not covered
- Benefit limit too low
- Unexpected payment
- Emergency difficulty
- Maternity gap
- Surgery gap
- Drug exclusions
- Slow customer service
- Authorization delays
- Cheap plan with poor value

---

# 34. PSYCHOLOGICAL RESULT

Do not just output scores.

Create a user narrative:

> **You are a protection-first buyer.**
>
> Your answers show that your priority is reducing unexpected healthcare costs, not simply finding the lowest premium.

Or:

> **You are a value-conscious family buyer.**
>
> You want meaningful protection but do not want to pay for benefits you are unlikely to use.

Or:

> **You are a convenience-first buyer.**
>
> Digital access, quick support and nearby providers matter almost as much as price.

This should be generated from structured answers.

---

# 35. RESULT PAGE

## YOUR HMO MATCH

### 92% FIT

**HMO A**

### Why we matched you

- Location
- Preferred hospitals
- Budget
- Maternity
- Surgery
- Digital
- Other user priorities

### What looks strong

### What concerns us

### What you should verify

### Potential coverage gaps

### Confidence

**High**

Because:

- High data completeness
- Fresh evidence
- Strong provider verification
- Strong plan documentation

---

# 36. COMPARISON TABLE

Allow 2–5 HMOs.

Rows:

- Premium
- Hospital network
- Nearby providers
- GP
- Specialist
- Surgery
- Maternity
- Dental
- Optical
- ENT
- Diagnostics
- MRI
- CT
- Drugs
- Chronic care
- Mental health
- ICU
- Emergency
- Wellness
- Gym
- Spa
- Telemedicine
- App
- Customer support
- Limits
- Waiting periods
- Co-pay
- Authorization

Do not display only Yes/No.

Display actual limits and conditions.

---

# 37. HMO PROFILE

Each HMO page:

1. Overview
2. History
3. Ownership
4. Leadership
5. Products
6. Premiums
7. Benefits
8. Limits
9. Exclusions
10. Provider network
11. Hospital finder
12. Digital
13. AI
14. Customer sentiment
15. Employee sentiment
16. Financial signals
17. Capitation/payment-model information
18. SWOT
19. Strengths
20. Weaknesses
21. Best for
22. Not ideal for
23. Questions to ask
24. Evidence
25. Data gaps
26. Last verified

---

# 38. STATE HEALTH INSURANCE SECTION

For each state and FCT:

- Agency
- Programme
- Eligibility
- Premium/contribution
- Benefits
- Provider network
- Enrollment
- Waiting periods
- Exclusions
- HMO relationships
- Digital service
- Contact
- Public performance information
- Last verification

Do not assume every state scheme has identical structure.

---

# 39. NHIA EXPLAINER

Create simple sections:

- What is NHIA?
- What is an HMO?
- What is a private health plan?
- What is a State Social Health Insurance Scheme?
- How do they relate?
- What is capitation?
- What is fee-for-service?
- What is accreditation?
- What does accreditation NOT guarantee?
- What should consumers verify?

Use official NHIA sources first.

---

# 40. EVIDENCE ARCHITECTURE

Every significant claim needs:

```text
claim_id
hmo_id
category
claim
value
source
source_url
source_type
publication_date
retrieval_date
evidence_level
confidence
verification_status
valid_from
valid_to
notes
contradiction_id
```

Evidence hierarchy:

### A — Regulatory/government/legal

### B — Official company

### C — Audited/public corporate

### D — Credible independent

### E — User-generated

### F — Unverified

Never mix F with A/B in confidence.

---

# 41. EVIDENCE LANGUAGE

Use these labels:

- Verified
- Official
- Publicly documented
- Independently reported
- Observed
- Public sentiment
- Market-reported
- Inferred
- Unverified
- Not publicly verified

When sources conflict:

> **Sources conflict — see evidence record.**

Never silently choose one.

---

# 42. DATA COMPLETENESS SCORE

Every HMO gets:

### Data completeness: 94%

based on:

- Benefits
- Premiums
- Providers
- Ownership
- Leadership
- Digital
- Sentiment
- Financial
- Historical
- Evidence

An HMO with limited public information should not be treated as equally researched.

Add:

### Evidence confidence

High / Medium / Low.

---

# 43. DATA FRESHNESS

Every volatile field needs:

- Last checked
- Source date
- Retrieval date
- Expiration/review date

Examples:

- Premium
- Provider list
- Accreditation
- Leadership
- Phone
- App
- Benefit schedule

Display:

> Verified 18 days ago

or:

> ⚠ Last verified 14 months ago

---

# 44. ANTI-BIAS PROTOCOL

This is mandatory because the platform creator works in the HMO industry and has a professional relationship with ClearlineHMO.

The platform must disclose the relationship appropriately.

Rules:

1. Clearline gets no automatic advantage.
2. Clearline must be scored with the same framework.
3. Positive Clearline claims require evidence.
4. Negative Clearline claims require evidence.
5. Missing Clearline data stays missing.
6. Competitors are not penalized for being competitors.
7. Sponsorship cannot alter independent scores.
8. Methodology is public.
9. Evidence is retained.
10. Contradictions are displayed.
11. The system must be capable of recommending a competitor over Clearline.
12. The system must be capable of recommending Clearline when evidence and user fit justify it.

MASTER CLAUDE RULE:

> You are not an employee or promoter of ClearlineHMO. Treat ClearlineHMO as one HMO among all others. If another HMO is a better fit based on the user's needs and verified evidence, recommend it. If ClearlineHMO is the better fit, recommend it. Never alter scores to protect, promote or attack ClearlineHMO.

Use anonymized HMO IDs during scoring validation whenever possible.

---

# 45. POLITICAL AND RELIGIOUS INFORMATION

Research only publicly documented evidence.

Never speculate about:

- political backing
- political affiliation
- religious affiliation
- ethnicity
- secret networks

Use categories:

- Verified
- Publicly reported
- Alleged
- Inferred
- Unknown

Do not use religion, ethnicity or politics as a proxy for healthcare quality.

Cultural analysis should focus on observable service variables:

- language access
- regional presence
- community programmes
- communication style
- cultural sensitivity
- provider footprint

---

# 46. PUBLIC CUSTOMER REVIEWS

Treat reviews as signals, not truth.

Every review dataset should store:

- Platform
- Date
- Rating
- Text/category
- Sentiment
- Theme
- Verified status if platform provides it
- Sample size

Calculate:

- Sentiment distribution
- Complaint categories
- Praise categories
- Trend
- Volume

Do not claim:

> “Customers think X”

when the evidence is tiny.

Say:

> “Among the public reviews we found…”

---

# 47. EMPLOYEE REVIEWS

Same principle.

Display:

- Number of reviews
- Date range
- Main themes
- Positive themes
- Negative themes
- Confidence

Do not treat anonymous employee reviews as definitive.

---

# 48. CORPORATE RELATIONSHIPS

Only publish publicly disclosed relationships.

Capture:

- Organization
- Relationship
- Date
- Source
- Nature
- Publicly disclosed lives if available

Never publish confidential lists.

---

# 49. “WHAT MAKES THEM UNIQUE?”

For each HMO, Claude must answer:

### What do they do differently?

### What do they do exceptionally well?

### Why might customers choose them?

### Why might SMEs choose them?

### Why might corporates choose them?

### What are competitors better at?

### What are their weaknesses?

### What appears to be their strategic positioning?

Do not confuse marketing claims with proven competitive advantage.

---

# 50. MARKET PREFERENCE ENGINE

Research what different customer groups value.

Segments:

- Individual
- Family
- SME
- Corporate
- HR
- Executive
- Senior
- Young professional
- Parents
- Large geographically distributed workforce

Identify:

- Price sensitivity
- Hospital preference
- Benefit preference
- Digital preference
- Trust concerns
- HMO prejudices
- Service concerns
- Network concerns
- Maternity concerns
- Drug concerns
- Claims concerns

These should influence assessment weights.

---

# 51. “SPEAK THEIR MIND” ENGINE

The platform should transform structured inputs into natural-language interpretation.

Example:

User:
“I have three children, I live in Benin, my biggest fear is paying ₦500k unexpectedly, and I want a good hospital.”

Output:

> You are not primarily looking for the cheapest plan. You are trying to protect your family from a large unexpected bill while keeping access to good hospitals around Benin.
>
> That means we should prioritize:
> 1. Hospital availability around your location
> 2. Major-care/surgery limits
> 3. Maternity/children's care
> 4. Drug coverage
> 5. Low potential out-of-pocket exposure
>
> We should care less about lifestyle extras such as spa access unless they are important to you.

This is the emotional intelligence layer.

---

# 52. “WHAT YOU MAY BE PAYING FOR”

If a user selects low cost and a plan has expensive benefits they do not value:

> You may be paying for benefits that are not important to you.

If a user prioritizes surgery and chooses a cheap plan:

> The cheaper premium may create a meaningful major-care gap.

This creates useful trade-off analysis.

---

# 53. “WHAT YOU SHOULD ACTUALLY LOOK OUT FOR”

Every result should include personalized red flags.

Examples:

- Hospital list may be outdated
- Exact plan tier must be confirmed
- Surgery limit may be lower than expected
- “Unlimited” requires clarification
- Waiting period
- Preauthorization
- Drug formulary
- Specialist referral
- Maternity conditions
- Annual aggregate limit
- Co-pay
- Exclusions
- Provider participation

---

# 54. CONSUMER VERIFICATION SCRIPT

Give users a ready-made script:

> Hello. I am considering [HMO] [Plan]. Before I enroll, please confirm:
>
> 1. Do you currently accept this exact plan?
> 2. What services are covered?
> 3. What are the limits for surgery, diagnostics, maternity and drugs?
> 4. Which services require authorization?
> 5. Is there a waiting period?
> 6. What happens after I reach a benefit limit?
> 7. Are there any services listed as covered that you currently do not process?

---

# 55. DISCLAIMER

Use a visible disclaimer:

> This platform is an independent health-insurance information and comparison tool. Recommendations are generated from available evidence, published information, plan documents, provider data and user inputs. Benefits, premiums, provider participation, exclusions, limits, waiting periods and service availability can change.
>
> A recommendation does not guarantee that every service will be approved or that a particular hospital will accept a plan at the time of treatment.
>
> Always confirm the current benefit schedule and exact plan with the HMO and confirm provider participation directly with the healthcare facility before purchasing or receiving major care.
>
> Cost estimates are illustrative unless explicitly identified as official quotations.
>
> Public reviews and sentiment are signals, not a scientific customer-satisfaction survey.
>
> This platform does not provide medical diagnosis or treatment advice.
>
> Rankings are methodology-based and should not be interpreted as guarantees or endorsements.

---

# 56. FRONT-END EXPERIENCE

Build a premium, modern, mobile-first HTML experience.

Design inspiration should combine:

- modern fintech
- premium health technology
- conversational onboarding
- clean data dashboards
- intelligent recommendation systems

Avoid:

- clutter
- tiny text
- giant tables on mobile
- government-style forms
- excessive paragraphs
- confusing insurance jargon

---

# 57. LANDING PAGE

Hero:

> **Which HMO actually makes sense for you?**

Subheadline:

> Tell us what you need. We compare the benefits, limits, hospitals, prices and evidence so you can make a smarter decision.

CTA:

**Find My HMO**

Supporting cards:

- Compare HMOs
- Find Hospitals
- Check Benefits
- Calculate Premium
- Calculate MLR
- Explore NHIA
- Explore State Schemes

---

# 58. ASSESSMENT UI

Use:

**Question 7 of 22**

Progress bar.

One major decision per screen.

Components:

- cards
- chips
- sliders
- toggles
- search
- location picker
- number input
- multi-select
- hospital selector

Make it feel like a conversation.

---

# 59. RESULTS PAGE

Large:

# YOUR HMO MATCH

Then:

### 92% Match

HMO A

### Why

### Strengths

### Concerns

### Potential gaps

### What to verify

### Confidence

Then comparison.

---

# 60. NATIONAL DASHBOARD

Cards:

- HMOs tracked
- Unique HMOs
- State schemes tracked
- Providers tracked
- Plans analyzed
- Benefits compared
- Premiums tracked
- Last database update

Charts:

- HMO distribution
- State coverage
- Benefit breadth
- Premium ranges
- Provider density
- Digital maturity
- Customer sentiment
- Overall scores

---

# 61. TECHNICAL ARCHITECTURE

## Front end

- HTML5
- CSS
- JavaScript
- Responsive
- Accessible
- Mobile-first
- API-ready

## Backend

- Database
- Evidence store
- Provider database
- Benefit database
- Premium database
- Scoring engine
- Assessment engine
- Retrieval layer
- Claude API
- Analytics

NEVER put API keys inside the HTML.

---

# 62. SYSTEM ARCHITECTURE

```text
                 NHIA / GOVERNMENT
                       |
        +--------------+--------------+
        |              |              |
     HMOs          PROVIDERS       STATE SCHEMES
        |              |              |
        +--------------+--------------+
                       |
                EVIDENCE DATABASE
                       |
          +------------+------------+
          |                         |
   SCORING ENGINE              SEARCH/RAG
          |                         |
          +------------+------------+
                       |
                CLAUDE ENGINE
                       |
        +--------------+--------------+
        |              |              |
   ASSESSMENT      EXPLANATION    COMPARISON
        |              |              |
        +--------------+--------------+
                       |
                 HTML FRONT END
                       |
                     USER
```

---

# 63. DATABASE STRUCTURE

Recommended project structure:

```text
hmo-nigeria-intelligence/
│
├── 00_PROJECT/
│   ├── PROJECT_BRIEF.md
│   ├── PRODUCT_SPEC.md
│   ├── METHODOLOGY.md
│   ├── SCORING_MODEL.md
│   ├── EVIDENCE_POLICY.md
│   ├── DATA_DICTIONARY.md
│   ├── CLAUDE.md
│   └── CHANGELOG.md
│
├── 01_NHIA/
│   ├── hmo_directory/
│   ├── hcp_directory/
│   ├── regulations/
│   ├── accreditation/
│   ├── benefits/
│   ├── drugs/
│   ├── treatment_guidelines/
│   └── programmes/
│
├── 02_STATE_SCHEMES/
│   ├── abia/
│   ├── adamawa/
│   ├── anambra/
│   └── ...
│
├── 03_HMOS/
│   ├── hmo_001/
│   │   ├── profile.json
│   │   ├── benefits.json
│   │   ├── plans.json
│   │   ├── providers.json
│   │   ├── premiums.json
│   │   ├── evidence.json
│   │   ├── sentiment.json
│   │   ├── digital.json
│   │   ├── financial.json
│   │   └── analysis.md
│   └── ...
│
├── 04_PROVIDERS/
├── 05_BENEFITS/
├── 06_PREMIUMS/
├── 07_SENTIMENT/
├── 08_EMPLOYEE_EXPERIENCE/
├── 09_OWNERSHIP/
├── 10_FINANCIALS/
├── 11_DIGITAL_AI/
├── 12_MYSTERY_SHOPPING/
├── 13_HISTORICAL/
├── 14_RANKINGS/
├── 15_ASSESSMENT_ENGINE/
├── 16_BOOK/
└── 17_FRONTEND/
```

---

# 64. MASTER HMO JSON

```json
{
  "hmo_id": "HMO-001",
  "legal_name": "",
  "brand_name": "",
  "nhia": {
    "id": "",
    "status": "",
    "verified_date": "",
    "source": ""
  },
  "history": {},
  "ownership": {},
  "leadership": {},
  "plans": [],
  "benefits": [],
  "providers": [],
  "premiums": [],
  "financial_signals": {},
  "payment_models": {},
  "digital": {},
  "customer_sentiment": {},
  "employee_sentiment": {},
  "corporate_relationships": [],
  "swot": {},
  "scores": {},
  "evidence": [],
  "data_completeness": 0,
  "confidence": "",
  "last_verified": ""
}
```

---

# 65. DATA DICTIONARY PRINCIPLE

Every important field needs:

- Name
- Definition
- Data type
- Allowed values
- Source requirement
- Freshness requirement
- Confidence
- Whether it affects ranking
- Whether it is consumer-visible

---

# 66. CLAUDE RESEARCH WORKFLOW

Do NOT ask Claude:

> “Research all Nigerian HMOs.”

Instead execute in waves.

## Phase 1

Regulatory foundation.

## Phase 2

HMO universe.

## Phase 3

Provider universe.

## Phase 4

Top commercial cohort.

## Phase 5

Remaining HMOs.

## Phase 6

State schemes.

## Phase 7

Sentiment.

## Phase 8

Mystery shopping.

## Phase 9

Scoring.

## Phase 10

Front end.

---

# 67. HMO RESEARCH PROMPT

Use this per HMO:

> Research [HMO NAME] for the Nigeria Health Insurance Intelligence Database.
>
> Do not provide a generic company profile.
>
> Perform a forensic, evidence-based competitive analysis covering:
>
> 1. Legal identity
> 2. NHIA accreditation
> 3. Accreditation history
> 4. Founding history
> 5. Ownership
> 6. Parent company
> 7. Public shareholders
> 8. Chairman
> 9. Board
> 10. Management
> 11. Group companies
> 12. Funding
> 13. Financial strength signals
> 14. Products
> 15. Individual plans
> 16. Family plans
> 17. SME plans
> 18. Corporate plans
> 19. Executive plans
> 20. Published premiums
> 21. Observed quotations
> 22. Custom pricing
> 23. Benefit packages
> 24. Exclusions
> 25. Limits
> 26. Waiting periods
> 27. Authorization
> 28. Provider network
> 29. Geographic coverage
> 30. Specialist network
> 31. Emergency network
> 32. Maternity
> 33. Dental
> 34. Optical
> 35. ENT
> 36. Diagnostics
> 37. Chronic disease
> 38. Mental health
> 39. Telemedicine
> 40. Digital platforms
> 41. Mobile app
> 42. Customer acquisition
> 43. Customer onboarding
> 44. Customer support
> 45. Claims/refunds
> 46. Complaint patterns
> 47. Customer reviews
> 48. Employee reviews
> 49. Social sentiment
> 50. Publicly disclosed corporate clients
> 51. Government relationships
> 52. Partnerships
> 53. Awards
> 54. Marketing strategy
> 55. Digital maturity
> 56. AI maturity
> 57. Historical milestones
> 58. Competitive advantages
> 59. Weaknesses
> 60. SWOT
> 61. Market position
> 62. Consumer perception
> 63. SME perception
> 64. Corporate perception
> 65. Provider perception
> 66. Employee perception
> 67. Risks
> 68. Opportunities
> 69. Competitors
> 70. What it does exceptionally well
> 71. What it does poorly
> 72. Evidence gaps
> 73. Source conflicts
> 74. Overall score
>
> For every significant claim provide source and evidence classification.
>
> Do not infer private political connections, religious affiliations, hidden ownership or confidential customer relationships.
>
> If something is not publicly verifiable, write:
> “Not publicly verified.”
>
> Finish with:
> A. Executive summary
> B. Evidence table
> C. SWOT
> D. Competitive scorecard
> E. Data gaps
> F. Mystery-shopping questions
> G. User profiles for whom this HMO may be a strong fit
> H. User profiles for whom it may be a weak fit.

---

# 68. MASTER CLAUDE SYSTEM RULE

> You are the lead intelligence engine for HMO Blueprint Nigeria.
>
> Your job is not to sell health insurance.
>
> Your job is to help users make better health-insurance decisions.
>
> Treat every HMO equally.
>
> ClearlineHMO is not entitled to a ranking advantage.
>
> If another HMO is a better match, recommend it.
>
> If ClearlineHMO is the better match, recommend it.
>
> Never invent data.
>
> Never turn marketing claims into facts without evidence.
>
> Never turn “covered” into “adequately covered”.
>
> Never turn “unlimited” into “best”.
>
> Never turn provider count into network quality.
>
> Always inspect limits, exclusions, waiting periods, authorization, referrals and provider restrictions.
>
> Always distinguish published, quoted, negotiated, estimated and historical prices.
>
> Always expose uncertainty.
>
> When evidence is insufficient, say:
> “Not publicly verified.”
>
> When sources conflict, show the conflict.
>
> Every recommendation must explain:
> - what the user wants
> - what the evidence says
> - why the match exists
> - what the weaknesses are
> - what the user should verify
>
> The objective is informed choice, not conversion.

---

# 69. FIRST CLAUDE EXECUTION PROMPT

> Do not build the final website yet.
>
> Read this specification as the master product requirement.
>
> First create:
>
> 1. Complete database architecture
> 2. Data dictionary
> 3. Evidence architecture
> 4. Benefit taxonomy
> 5. Provider schema
> 6. Premium schema
> 7. Capitation/FFS schema
> 8. MLR calculator specification
> 9. Benefit-limit calculator
> 10. Coverage-gap calculator
> 11. 22-question assessment
> 12. Deterministic scoring engine
> 13. Confidence model
> 14. Anti-bias protocol
> 15. Ranking methodology
> 16. Front-end information architecture
> 17. API contract
> 18. Research workflow
> 19. Evidence policy
> 20. Testing strategy
>
> Do not rank HMOs yet.
>
> Do not promote Clearline.
>
> Do not fabricate missing information.
>
> Identify every data field required before a recommendation can be considered reliable.
>
> At the end, produce an implementation roadmap broken into small executable tasks.

---

# 70. FRONT-END API CONTRACT

The HTML front end should eventually send:

```json
{
  "user_profile": {
    "coverage_type": "family",
    "state": "Edo",
    "lga": "",
    "city": "Benin City",
    "adults": 2,
    "children": 3,
    "budget": 500000
  },
  "priorities": {
    "hospital_choice": 10,
    "maternity": 10,
    "surgery": 9,
    "drugs": 9,
    "digital": 6,
    "wellness": 2
  },
  "preferred_hospitals": [],
  "risk_tolerance": "low",
  "biggest_fear": "unexpected_cost"
}
```

Backend returns:

```json
{
  "profile": {},
  "recommendations": [],
  "comparison": [],
  "coverage_gaps": [],
  "questions_to_ask": [],
  "confidence": {},
  "evidence": []
}
```

---

# 71. EXAMPLE RECOMMENDATION RESPONSE

```text
YOUR BEST MATCH

HMO A
91% fit

Why:
You prioritized maternity, surgery, hospital choice and low unexpected costs.
This plan scores strongly in those areas for your location.

Strong points:
- Strong relevant hospital network
- Higher surgery limit than comparable plans
- Maternity benefit aligns with your requirement
- Good drug coverage

Watch-outs:
- MRI has a separate limit
- Some specialist services require referral
- Provider participation should be confirmed

Potential gap:
Your stated surgery requirement is ₦2m.
The documented plan limit is ₦1m.
Potential gap: ₦1m.

Confidence:
High

Why confidence is high:
- Current plan document
- Current provider evidence
- Current premium evidence
- High data completeness
```

---

# 72. TESTING THE RECOMMENDATION ENGINE

Create synthetic personas.

## Persona A — Price-first young adult

Low budget, digital, no dependants.

Expected:
Value/digital weighting.

## Persona B — Family protection

Three children, maternity, drugs, hospital choice.

Expected:
Family/maternity/provider weighting.

## Persona C — Executive

Premium hospitals, specialist, low OOP.

Expected:
Premium-care weighting.

## Persona D — SME

50 employees, multiple locations, cost control.

Expected:
Network/corporate/service/value.

## Persona E — HR

500 employees, high reporting/service needs.

Expected:
Corporate capability.

## Persona F — Senior dependent

Older parent, chronic care, specialist.

Expected:
Senior/chronic-care weighting.

Test that recommendations actually change.

---

# 73. BIAS TESTING

Run:

### Test 1

Clearline included.

### Test 2

Clearline anonymized.

### Test 3

Clearline removed.

If rankings change unexpectedly because the name is visible, investigate.

The model must not use brand familiarity as a hidden scoring variable.

---

# 74. DATA CONFLICT TESTING

If one source says:

> Provider accepted.

and another says:

> Provider no longer accepts.

Do not pick one silently.

Show:

> Conflicting provider status. Direct verification recommended.

---

# 75. SECURITY

The HTML must never contain:

- Claude API key
- database credentials
- private HMO information
- confidential customer data
- secret research credentials

Use secure backend endpoints.

---

# 76. PRIVACY

Do not collect unnecessary health information.

The assessment should avoid asking for diagnoses unless absolutely necessary.

If health information is eventually collected:

- explain why
- minimize collection
- secure it
- obtain appropriate consent
- avoid retaining unnecessary sensitive information

The first version should be primarily needs-based rather than diagnosis-based.

---

# 77. BUSINESS MODEL

Potential future layers:

## Free

- Assessment
- Basic HMO comparison
- Basic hospital finder
- NHIA education
- State scheme information

## Premium consumer

- Detailed recommendation
- Coverage-gap analysis
- Plan comparison
- Personal report

## HR/SME

- Corporate HMO shortlist
- Workforce needs analysis
- Plan comparison
- Provider mapping
- Benefit-gap analysis
- Procurement questions

## Enterprise

- HMO procurement intelligence
- Multi-state provider analysis
- Renewal comparison
- Employee preference analysis
- Claims/service analytics where data is legitimately available

Commercial relationships must never silently alter independent ranking.

---

# 78. HMO BLUEPRINT BOOK

The existing HMO Blueprint should become the intellectual and educational layer of the platform.

Rewrite it as:

# THE HMO BLUEPRINT 2.0
## The Nigerian's Complete Guide to Choosing, Comparing and Using Health Insurance

Suggested structure:

### Part I — Understanding Nigerian health insurance

### Part II — What HMOs don't always explain clearly

### Part III — How to read a benefit package

### Part IV — How to compare premiums

### Part V — Hospital networks

### Part VI — Hidden limitations

### Part VII — Preauthorization and referrals

### Part VIII — Drugs and formularies

### Part IX — Emergency care

### Part X — Maternity

### Part XI — Specialist care

### Part XII — Family plans

### Part XIII — SME/corporate plans

### Part XIV — State insurance schemes

### Part XV — NHIA

### Part XVI — How to test an HMO before buying

### Part XVII — HMO scorecards

### Part XVIII — Switching HMOs

### Part XIX — HR HMO procurement

### Part XX — The 22-question assessment

The book should teach people how to think.

The website should let them apply that thinking.

---

# 79. “HMO BLUEPRINT” EDUCATIONAL PRINCIPLES

Teach users:

### A cheap premium can be expensive.

### A large provider list can be misleading.

### A covered benefit can have a tiny limit.

### Unlimited does not necessarily mean unlimited.

### A high total annual limit does not mean every service has that limit.

### A premium hospital list is useless if your exact plan is not accepted there.

### A good app does not compensate for weak medical coverage.

### A large HMO is not automatically the right HMO.

### A small HMO is not automatically poor.

### Customer reviews are signals, not universal truth.

### Provider verification matters.

### Waiting periods matter.

### Authorization matters.

### Exclusions matter.

### The user's own priorities should determine the recommendation.

---

# 80. “WHAT YOU SHOULD NOT TRUST BLINDLY”

Flag:

- “Thousands of hospitals”
- “Unlimited coverage”
- “Millions in coverage”
- “Best HMO”
- “Fastest service”
- “Nationwide coverage”
- “Premium hospitals”
- “Comprehensive care”
- “AI-powered”
- “24/7 support”

The platform should ask:

> What does that actually mean?

Then show evidence.

---

# 81. METHODOLOGY PAGE

Create a public:

# HOW WE RANK HMOs

Explain:

- Data sources
- Evidence hierarchy
- Weighting
- User personalization
- Provider verification
- Premium verification
- Sentiment methodology
- Data freshness
- Limitations
- Conflict handling
- Sponsorship separation
- Clearline disclosure

The methodology should be understandable by an ordinary Nigerian, not just an actuary.

---

# 82. ERROR REPORTING

Every major page should have:

> **See something wrong? Report it.**

Allow:

- Incorrect premium
- Wrong hospital
- Wrong benefit
- Outdated phone
- Wrong leadership
- Incorrect ranking
- Other

Capture:

- claim
- correction
- evidence
- reporter
- date

Do not automatically overwrite verified data.

Route corrections into an evidence-review queue.

---

# 83. HMO RESPONSE/RIGHT-OF-REPLY

Eventually create:

> **HMO Response**

If an HMO disputes information, allow it to submit evidence.

Do not automatically change the independent score.

Record:

- HMO response
- Submitted evidence
- Review date
- Resolution
- Methodology impact

This protects fairness and improves data quality.

---

# 84. DATA UPDATE ENGINE

Schedule periodic reviews.

High-frequency:

- Premium
- Provider network
- Contact information

Medium:

- Benefits
- Digital services
- Leadership

Low:

- History
- Founding story

Every field should have a review cadence.

---

# 85. PHASED EXECUTION PLAN

## PHASE 0 — Product architecture

Claude outputs:

- master schema
- scoring methodology
- UX architecture
- API architecture

## PHASE 1 — Regulatory foundation

Collect:

- NHIA directory
- HCP directory
- NHIA Act
- regulations
- accreditation
- benefits
- FFS
- programmes
- State schemes

## PHASE 2 — HMO master registry

Normalize all HMOs.

Deduplicate.

Validate.

Assign IDs.

## PHASE 3 — Provider master registry

Normalize facilities.

Assign provider IDs.

Map location.

## PHASE 4 — Deep HMO research

Research the first commercial cohort.

## PHASE 5 — Benefit normalization

Convert PDF/brochure language into structured fields.

## PHASE 6 — Premium intelligence

Published vs observed vs negotiated.

## PHASE 7 — Sentiment

Collect public signals.

## PHASE 8 — Digital/AI

Score digital maturity.

## PHASE 9 — Financial/payment models

Capitation, FFS, MLR, capital/sustainability indicators.

## PHASE 10 — Scoring

Build deterministic engine.

## PHASE 11 — Assessment

Build 22-question engine.

## PHASE 12 — HTML

Build the polished front end.

## PHASE 13 — Backend

Secure API + database + Claude.

## PHASE 14 — Testing

Bias, data, UX, security, recommendation consistency.

## PHASE 15 — Pilot

Release to a small group.

## PHASE 16 — Scale

Expand all HMOs and state schemes.

---

# 86. DO NOT MAKE THESE MISTAKES

1. Do not build the UI before the data model.
2. Do not let Claude invent missing data.
3. Do not rank by provider count alone.
4. Do not rank by premium alone.
5. Do not treat “covered” as adequate.
6. Do not treat “unlimited” as superior.
7. Do not treat public sentiment as a scientific survey.
8. Do not publish allegations as facts.
9. Do not infer politics/religion.
10. Do not publish confidential customer lists.
11. Do not hard-code outdated regulatory numbers.
12. Do not place API keys in HTML.
13. Do not let Clearline receive automatic advantage.
14. Do not hide uncertainty.
15. Do not pretend estimates are quotations.
16. Do not treat a provider list as permanently valid.
17. Do not assume one national ranking fits everyone.

---

# 87. FINAL NORTH STAR

The entire product should answer:

> **“What should I buy, why should I buy it, what am I actually getting, what could go wrong, and what should I verify before I spend my money?”**

That is the HMO Blueprint.

The user should leave the platform more informed even if they do not buy any plan.

The platform should make it harder for:

- HMOs to hide behind vague marketing
- consumers to choose purely on price
- HR managers to compare plans superficially
- providers to be misrepresented
- AI to invent insurance facts

The goal is:

# BEAUTIFUL ENOUGH TO USE.
# RIGOROUS ENOUGH TO TRUST.
# SIMPLE ENOUGH TO UNDERSTAND.
# TRANSPARENT ENOUGH TO CHALLENGE.
# INTELLIGENT ENOUGH TO PERSONALIZE.

---

# 88. IMMEDIATE NEXT ACTION FOR CLAUDE

After receiving this specification, Claude must NOT immediately produce a giant HTML file.

First produce:

## DELIVERABLE 1
`MASTER_DATA_DICTIONARY.md`

Every field required.

## DELIVERABLE 2
`HMO_DATABASE_SCHEMA.json`

## DELIVERABLE 3
`PROVIDER_DATABASE_SCHEMA.json`

## DELIVERABLE 4
`BENEFIT_DATABASE_SCHEMA.json`

## DELIVERABLE 5
`PREMIUM_DATABASE_SCHEMA.json`

## DELIVERABLE 6
`EVIDENCE_LEDGER_SCHEMA.json`

## DELIVERABLE 7
`SCORING_ENGINE_SPEC.md`

## DELIVERABLE 8
`ASSESSMENT_ENGINE_SPEC.md`

## DELIVERABLE 9
`MLR_CALCULATOR_SPEC.md`

## DELIVERABLE 10
`COVERAGE_GAP_CALCULATOR_SPEC.md`

## DELIVERABLE 11
`ANTI_BIAS_PROTOCOL.md`

## DELIVERABLE 12
`RESEARCH_WORKFLOW.md`

## DELIVERABLE 13
`FRONTEND_INFORMATION_ARCHITECTURE.md`

## DELIVERABLE 14
`API_CONTRACT.md`

## DELIVERABLE 15
`TESTING_PLAN.md`

Only after these are complete should Claude begin implementing the HTML front end.

---

# 89. FINAL CLAUDE BUILD INSTRUCTION

Once the architecture and data model are approved, build the front end as a **single polished responsive HTML application** suitable for deployment on Netlify or a similar static host.

The first version should work with mock/sample data but be structured so the mock data can later be replaced by the secure backend.

The HTML must include:

- Premium visual design
- Responsive mobile layout
- Assessment wizard
- Progress indicator
- User profile summary
- Recommendation results
- Personalized explanation
- HMO comparison
- Benefit comparison
- Benefit-limit calculator
- Premium calculator
- MLR calculator
- Coverage-gap simulator
- Provider finder interface
- HMO explorer
- State scheme explorer
- NHIA education
- Farce detector
- Verification checklist
- Evidence/confidence display
- Methodology
- Disclaimer
- Error reporting
- Data freshness
- Clearline neutrality disclosure

Use clean component architecture even if delivered as one HTML file.

The UI should not expose technical database complexity to the user.

The user should feel:

> “This system understands what I am actually trying to protect.”

And the result should feel like:

> **A personal health-insurance intelligence report — not a sales pitch.**

---

# 90. SUCCESS CRITERIA

The project is successful when a user can:

1. Enter their real needs.
2. Complete the assessment quickly.
3. Receive personalized HMO matches.
4. Understand exactly why each match was recommended.
5. See benefit limits instead of vague checkmarks.
6. Compare premiums.
7. Compare provider networks.
8. Check hospitals near them.
9. Identify potential coverage gaps.
10. Calculate MLR using their own figures.
11. Understand capitation and fee-for-service.
12. See customer sentiment signals.
13. See evidence confidence.
14. See what information is missing.
15. Know what questions to ask the HMO.
16. Verify their hospital before purchase.
17. Compare state schemes and NHIA options.
18. Understand that “best” depends on their needs.
19. Trust the system because the methodology is visible.
20. Receive an answer that does not favor Clearline simply because the platform creator works there.

---

# 91. THE ULTIMATE USER EXPERIENCE

The platform should ultimately feel like this:

### USER

“I need health insurance for my wife and three children. I live in Benin City. I can spend about ₦500,000. I care about good hospitals, maternity, surgery and drugs. I don't want to discover later that I have to pay a huge amount myself.”

### HMO BLUEPRINT

“Got it.

You are a **family protection-first buyer**.

We will prioritize:

1. Hospitals near you
2. Maternity
3. Surgery
4. Drugs
5. Major-care limits
6. Low potential out-of-pocket exposure

We will give less weight to gym/spa benefits because you did not identify them as important.

Here are your strongest matches.

But before you choose, there are three things you absolutely need to verify…”

That is the experience we are building.

---

# 92. CLOSING PRODUCT PRINCIPLE

The platform must never become:

> “An AI that tells Nigerians which HMO to buy.”

It must become:

> **“An intelligent system that helps Nigerians understand the trade-offs before they choose.”**

That distinction is fundamental.

The recommendation is the output.

**The intelligence, transparency, evidence and education are the product.**


---

# PART II — CLAUDE PROJECT → CLAUDE CODE MASTER EXECUTION ROADMAP

# HMO BLUEPRINT NIGERIA
# MASTER EXECUTION ROADMAP
## Claude Project → Intelligence System → Claude Code → Production Platform

**Version:** 1.0  
**Purpose:** Step-by-step execution blueprint for building the HMO Intelligence Platform  
**Starting point:** Claude Project  
**Transition point:** Approved Intelligence Specification + validated prototype/data model  
**Final build environment:** Claude Code

---

# 0. THE MOST IMPORTANT INSTRUCTION

## DO NOT START BY BUILDING THE WEBSITE.

The project must be executed in two major environments.

### ENVIRONMENT A — CLAUDE PROJECT

Claude Project is the:

- Research headquarters
- Intelligence laboratory
- Methodology laboratory
- Product strategy room
- Knowledge-management environment
- Evidence-analysis environment
- Assessment-design environment
- Scoring-design environment
- Bias-audit environment

Claude Project must produce the **intelligence architecture and validated product blueprint**.

### ENVIRONMENT B — CLAUDE CODE

Claude Code is the:

- Software engineering environment
- Repository manager
- Front-end builder
- Backend builder
- Database builder
- API builder
- Testing environment
- Integration environment
- Deployment environment

Claude Code must turn the approved intelligence architecture into the actual application.

---

# 1. THE HAND-OFF RULE

Do not move to Claude Code because:

> “Claude Project has written a nice plan.”

Move to Claude Code only when Claude Project has produced and validated:

1. Product specification
2. Data dictionary
3. Database schema
4. HMO schema
5. Provider schema
6. Benefit schema
7. Premium schema
8. Evidence schema
9. State-scheme schema
10. Assessment model
11. Deterministic scoring model
12. Confidence model
13. Ranking methodology
14. MLR methodology
15. Premium calculator methodology
16. Coverage-gap methodology
17. Provider verification methodology
18. Anti-bias methodology
19. Research workflow
20. Front-end information architecture
21. API contract
22. Test plan
23. Initial sample dataset
24. Several deeply researched HMOs
25. Several state schemes
26. Demonstrated recommendation results
27. Demonstrated bias tests
28. Demonstrated contradiction handling
29. Demonstrated missing-data handling

Only then should Claude Code begin.

---

# 2. COMPLETE PIPELINE

```text
CLAUDE PROJECT
      ↓
PROJECT CONSTITUTION
      ↓
PRODUCT REQUIREMENTS
      ↓
DATA MODEL
      ↓
EVIDENCE MODEL
      ↓
RESEARCH METHODOLOGY
      ↓
HMO RESEARCH TEMPLATE
      ↓
REGULATORY FOUNDATION
      ↓
HMO MASTER REGISTRY
      ↓
PROVIDER MASTER REGISTRY
      ↓
BENEFIT NORMALIZATION
      ↓
PREMIUM INTELLIGENCE
      ↓
CUSTOMER/SENTIMENT INTELLIGENCE
      ↓
FINANCIAL/PAYMENT INTELLIGENCE
      ↓
DIGITAL/AI INTELLIGENCE
      ↓
SCORING ENGINE
      ↓
22-QUESTION ASSESSMENT
      ↓
RECOMMENDATION TESTING
      ↓
BIAS/QUALITY AUDIT
      ↓
HAND-OFF PACKAGE
      ↓
CLAUDE CODE
      ↓
DATABASE + API
      ↓
FRONT END
      ↓
CLAUDE RAG/EXPLANATION LAYER
      ↓
TESTING
      ↓
DEPLOYMENT
```

---

# 3. PHASE 0 — CREATE THE CLAUDE PROJECT

## Project name

# HMO BLUEPRINT — NIGERIA HEALTH INSURANCE INTELLIGENCE

## Project purpose

Configure Claude Project as the central intelligence workspace.

Initial project instruction:

> You are the Chief Research Architect and Intelligence Director for HMO Blueprint Nigeria.
>
> Your job is to design and validate the intelligence system that will eventually power a public health-insurance decision platform.
>
> Do not rush into website development.
>
> Do not invent information.
>
> Do not assume that one HMO is universally better than another.
>
> Treat ClearlineHMO exactly like every other HMO despite the project creator's professional relationship with ClearlineHMO.
>
> Your primary responsibility is to create a defensible, evidence-based system that can personalize recommendations according to user needs.
>
> Every important factual claim must have evidence.
>
> Every uncertain claim must be marked uncertain.
>
> Every missing data point must remain missing.
>
> Never convert an HMO marketing claim into an independent fact without verification.
>
> The final system must be capable of recommending a competitor over ClearlineHMO when the evidence and user's needs support that conclusion.
>
> Your first objective is not coding.
>
> Your first objective is to build the intelligence architecture.

---

# 4. PHASE 1 — LOAD THE KNOWLEDGE BASE

Load materials in controlled groups.

## Batch A — Project documents

Upload:

- HMO Blueprint book
- Current HMO Blueprint HTML
- Existing wellness/HMO website HTML
- Complete HMO Blueprint Claude execution specification
- Previous HMO research
- Existing assessment ideas
- Existing marketing material describing the consumer problem

Prompt:

> Read these documents without designing the final application.
>
> Extract:
> - existing intellectual property
> - existing concepts
> - useful terminology
> - assumptions
> - claims requiring verification
> - gaps
> - duplicated concepts
> - contradictions
> - ideas worth preserving
> - ideas that should be abandoned
>
> Produce a consolidated PROJECT KNOWLEDGE MAP.

---

# 5. PHASE 2 — CREATE THE PROJECT CONSTITUTION

Claude must create:

`PROJECT_CONSTITUTION.md`

It must define:

- Mission
- Scope
- User groups
- Non-goals
- Evidence rules
- Bias rules
- Privacy rules
- Legal-risk rules
- Data-quality rules
- Recommendation rules
- Ranking rules
- Source hierarchy
- Update rules
- Uncertainty rules
- Human-review rules

Claude must explicitly identify areas where it must say:

> Not publicly verified.

---

# 6. PHASE 3 — CREATE THE DATA DICTIONARY

Do this before researching hundreds of organizations.

Prompt:

> Design the complete data dictionary for the Nigeria HMO Intelligence Platform.
>
> Think like:
> - a health-insurance analyst
> - a data architect
> - an actuarial analyst
> - a consumer advocate
> - an HR procurement professional
> - a healthcare operations analyst
>
> Identify every field required to compare HMOs fairly.
>
> For every field specify:
> - field name
> - definition
> - type
> - allowed values
> - source requirement
> - evidence level
> - freshness requirement
> - whether mandatory
> - whether user-visible
> - whether it affects scoring
> - whether it affects recommendations
>
> Do not build the website.

---

# 7. PHASE 4 — DESIGN THE DATABASE

Create separate schemas for:

- HMO
- Plan
- Benefit
- Benefit limit
- Provider
- Provider-HMO relationship
- Provider-Plan relationship
- Premium
- Evidence
- Review
- Sentiment
- Leadership
- Ownership
- Financial signal
- Payment model
- State scheme
- NHIA programme
- User profile
- Assessment response
- Recommendation
- Score
- Verification event
- Data correction
- HMO response
- Methodology version

---

# 8. PHASE 5 — DESIGN THE EVIDENCE ENGINE

Create:

`EVIDENCE_POLICY.md`

Every claim needs:

```text
claim_id
entity_id
category
claim
value
source
source_url
source_type
publication_date
retrieval_date
evidence_level
confidence
verification_status
valid_from
valid_to
notes
contradiction_id
```

Evidence hierarchy:

### Tier A
Government/regulator/legal

### Tier B
Official company

### Tier C
Audited/public corporate

### Tier D
Credible independent

### Tier E
Public user-generated

### Tier F
Unverified

Never silently promote Tier E/F into Tier A/B.

---

# 9. PHASE 6 — CREATE THE SOURCE HIERARCHY

Create:

`SOURCE_HIERARCHY.md`

For every category define the best source.

Examples:

## Accreditation
Primary: NHIA

## Legal requirements
Primary: Government/NHIA legislation/regulation

## Benefit package
Primary: Current official plan document

## Premium
Primary: Current official quotation or published plan

## Provider participation
Primary: Current HMO/provider confirmation

## Customer sentiment
Primary: Public reviews and public discussion

## Financial information
Primary: Audited/public corporate/regulatory information

---

# 10. PHASE 7 — REGULATORY FOUNDATION

Collect and organize:

- NHIA HMO directory
- NHIA provider directory
- NHIA Act
- Current NHIA regulations
- HMO accreditation documents
- Provider accreditation material
- Benefit guidelines
- Drug lists
- Treatment guidelines
- Fee-for-service references
- NHIA programme information
- State scheme directory
- State scheme documents

Create:

`REGULATORY_FOUNDATION.md`

For every regulatory claim record:

- exact source
- source date
- effective date
- relevant section/page
- interpretation
- confidence

---

# 11. PHASE 8 — RESOLVE THE CAPITALIZATION QUESTION

Investigate claims around:

- ₦400 million
- ₦1 billion
- regulatory capital
- paid-up capital
- solvency
- shareholders' funds

Prompt:

> Investigate the exact current Nigerian regulatory requirements relating to HMO capitalization/capital/financial capacity.
>
> Determine:
> 1. What the law actually says
> 2. Which organizations the requirement applies to
> 3. Effective date
> 4. Whether the amount is paid-up capital, minimum capital, solvency requirement or something else
> 5. Whether later regulations changed it
> 6. Whether the requirement differs by category
> 7. Evidence
>
> Do not use the commonly repeated ₦400m figure unless the applicable source verifies it.

Then separately research any public evidence relating to ClearlineHMO's stated capital.

Never merge the two claims.

---

# 12. PHASE 9 — CREATE THE MASTER HMO REGISTRY

Normalize all HMOs.

For each organization:

- HMO ID
- Legal name
- Brand name
- NHIA ID
- Status
- Accreditation
- Location
- Website
- Phone
- Email
- Parent
- Ownership
- Leadership
- Founded
- Source

Deduplicate.

If the NHIA directory has duplicate names/entries, preserve the evidence and create a canonical organization record.

Do not assume row count = number of unique HMOs.

---

# 13. PHASE 10 — RESEARCH THE FIRST PILOT COHORT

Do not research all HMOs at once.

Start with approximately 10–15 organizations representing:

- major established HMOs
- insurance-group-backed HMOs
- independent HMOs
- corporate-focused HMOs
- digital-first HMOs
- regional players
- different plan structures

The objective is not the final Top 10.

The objective is to test the research system.

---

# 14. PHASE 11 — HMO RESEARCH ALGORITHM

For each HMO:

```text
1. Identify legal entity
2. Verify NHIA status
3. Build timeline
4. Identify ownership
5. Identify leadership
6. Identify products
7. Collect current benefit documents
8. Normalize benefits
9. Collect premium evidence
10. Map provider network
11. Verify selected providers
12. Research customer journey
13. Research digital footprint
14. Research AI/digital maturity
15. Research customer sentiment
16. Research employee sentiment
17. Research financial/public signals
18. Research payment-model evidence
19. Research corporate relationships
20. Research public partnerships
21. Research market positioning
22. Identify strengths
23. Identify weaknesses
24. Build SWOT
25. Identify data gaps
26. Assign confidence
27. Produce structured HMO record
```

---

# 15. PHASE 12 — BENEFIT NORMALIZATION

Convert plan documents into standardized records.

Example:

```text
Benefit:
Surgery

Covered:
Yes

Limit:
₦2,000,000

Limit type:
Annual

Preauthorization:
Yes

Referral:
Yes

Co-pay:
0%

Waiting period:
None

Provider restriction:
Network only

Source:
Official plan document

Verified:
2026-08-20
```

Repeat across every relevant benefit.

---

# 16. PHASE 13 — BENEFIT TAXONOMY

Create standard categories:

- GP
- Specialist
- Surgery
- Hospitalization
- ICU
- Emergency
- Maternity
- Caesarean
- Drugs
- Diagnostics
- MRI
- CT
- X-ray
- Ultrasound
- Dental
- Optical
- ENT
- Physiotherapy
- Mental health
- Chronic care
- Cancer
- Dialysis
- Wellness
- Gym
- Spa
- Telemedicine

Allow future categories.

---

# 17. PHASE 14 — BENEFIT DEPTH ALGORITHM

Do not score benefits as binary.

Conceptual model:

```text
Benefit Value =
Coverage Breadth
× Limit Adequacy
× Access Quality
× Restriction Factor
× User Relevance
× Evidence Confidence
```

Claude must refine and test the exact mathematical model.

A plan with a high limit but restrictive access should not automatically beat a slightly lower-limit plan with much better practical access.

---

# 18. PHASE 15 — UNLIMITED BENEFIT ANALYSIS

Whenever Claude sees:

- unlimited
- comprehensive
- no limit
- full coverage
- millions in coverage
- nationwide network

trigger verification.

Example:

```text
IF benefit_claim == "unlimited":
    inspect:
        service_scope
        annual_aggregate
        sublimits
        provider_restrictions
        authorization
        referral
        exclusions
        waiting_period
        plan_tier
    flag_for_review()
```

---

# 19. PHASE 16 — PROVIDER NETWORK ENGINE

Normalize:

```text
HMO
 ↓
Plan
 ↓
Provider
 ↓
Location
 ↓
Service
 ↓
Verification
```

The system must answer:

> Which plans give me access to this hospital?

and:

> Which hospitals near me accept this plan?

---

# 20. PHASE 17 — RELEVANT NETWORK ALGORITHM

Do not rank by provider count.

Conceptually:

```text
Relevant Network Score =
Local Provider Density
+
Preferred Hospital Availability
+
Emergency Access
+
Specialist Access
+
Maternity Access
+
Diagnostic Access
+
Pharmacy Access
+
Provider Quality Signals
+
Verification Freshness
```

Claude must determine normalization and weighting.

---

# 21. PHASE 18 — HOSPITAL VERIFICATION

Create a verification workflow.

User chooses hospital.

System shows:

- HMO
- Plan
- Provider
- Last verified
- Source

Then:

> Confirm before purchase.

Give the user a call script.

Eventually allow user-generated verification.

---

# 22. PHASE 19 — PREMIUM INTELLIGENCE

Create four separate price layers:

### Published
Official website/brochure.

### Quoted
Actual quote.

### Negotiated
Custom corporate deal.

### Estimated
Algorithmic estimate.

Never merge them.

Every price gets:

- date
- plan
- lives
- location
- source
- conditions

---

# 23. PHASE 20 — CUSTOM PRICING RESEARCH

Investigate:

- minimum lives
- discounts
- corporate negotiations
- plan customization
- benefit customization
- geographic pricing
- age pricing
- family pricing
- add-ons

Never present private quotations as public market prices.

---

# 24. PHASE 21 — CAPITATION AND FFS

Create:

`PAYMENT_MODEL_INTELLIGENCE.md`

Capture:

- capitation
- fee-for-service
- other payment structures
- public evidence
- regulatory framework
- provider-payment signals

Do not infer internal payment arrangements where they are not publicly documented.

---

# 25. PHASE 22 — MLR

Create:

`MLR_ENGINE_SPEC.md`

Basic analytical formula:

```text
MLR =
Medical / Healthcare Expenditure
÷
Applicable Premium / Contribution Revenue
× 100
```

First establish the applicable Nigerian methodology.

Allow:

- company annual figures
- year
- revenue
- medical expenditure

Return:

- MLR
- trend
- comparison
- explanation

Include a methodology warning.

---

# 26. PHASE 23 — CUSTOMER EXPERIENCE RESEARCH

Standardize mystery shopping.

Example tests:

- individual-plan enquiry
- maternity enquiry
- surgery enquiry
- named-hospital enquiry
- authorization enquiry

Record:

- response time
- accuracy
- clarity
- courtesy
- follow-up
- sales pressure
- contradictions

Label the result:

> Controlled observation.

Do not present it as universal customer experience.

---

# 27. PHASE 24 — CUSTOMER SENTIMENT ENGINE

Collect public discussion where appropriate.

Classify:

- praise
- complaint
- neutral
- issue
- resolution

Themes:

- hospitals
- drugs
- authorization
- service
- claims
- refunds
- app
- maternity
- diagnostics
- communication

Create:

- sentiment score
- theme distribution
- trend
- sample size
- confidence

---

# 28. PHASE 25 — EMPLOYEE EXPERIENCE

Research public employee reviews.

Capture:

- source
- date
- rating
- themes
- sample size
- confidence

Do not use employee sentiment as a dominant consumer score.

---

# 29. PHASE 26 — DIGITAL/AI MATURITY

Create:

`DIGITAL_AI_SCORE.md`

Score:

- website
- app
- online enrollment
- online payment
- provider search
- digital claims
- WhatsApp
- telemedicine
- portal
- authorization
- chatbot
- AI
- personalization
- integration

Focus on customer utility, not buzzwords.

---

# 30. PHASE 27 — CORPORATE MARKET INTELLIGENCE

Research:

- publicly disclosed corporate clients
- public contracts
- case studies
- public partnerships
- covered lives if disclosed
- sectors served
- geographic reach

Never publish confidential customer lists.

---

# 31. PHASE 28 — HISTORY AND STRATEGY

For each HMO identify:

- origin
- founders
- ownership changes
- acquisitions
- milestones
- market positioning
- strategic changes
- expansion
- partnerships
- major failures
- major successes

Then answer:

> Why is this HMO where it is today?

Evidence-based only.

---

# 32. PHASE 29 — POLITICAL/CULTURAL RESEARCH

Use only publicly documented information.

Do not speculate.

Do not infer political support.

Do not infer religious affiliation.

Do not use religion or politics as a ranking criterion.

Instead research:

- public government relationships
- public appointments
- public contracts
- public institutional partnerships
- regional presence
- language/cultural accessibility
- community programmes

---

# 33. PHASE 30 — SWOT ENGINE

For every HMO:

## Strengths
Evidence-backed advantages.

## Weaknesses
Evidence-backed disadvantages.

## Opportunities
Market opportunities.

## Threats
Regulatory, operational, technological, financial and competitive threats.

Then:

### Why this HMO wins

### Why this HMO loses

### What competitors do better

---

# 34. PHASE 31 — SCORING ENGINE

Create separate dimensions:

1. Benefit Value
2. Benefit Depth
3. Provider Network
4. Local Access
5. Major-Care Protection
6. Maternity
7. Family
8. Senior
9. Everyday Care
10. Customer Experience
11. Digital
12. Transparency
13. Financial/Organizational Strength
14. Customer Sentiment
15. Wellness
16. Innovation
17. Evidence Confidence

Do not collapse everything immediately.

---

# 35. PHASE 32 — PERSONALIZED WEIGHTS

User needs become weights.

Example:

```text
User:
Family
Benin City
₦500k
Maternity critical
Surgery critical
Hospital access critical
Gym low

Weights:
Maternity = 10
Surgery = 10
Local network = 10
Hospital choice = 9
Drugs = 9
Price = 8
Digital = 5
Gym = 2
```

The exact mathematical weighting must be designed and tested.

---

# 36. PHASE 33 — 22-QUESTION ASSESSMENT

The assessment collects:

1. Coverage type
2. Location
3. Number of people
4. Age profile
5. Budget
6. States needed
7. Preferred hospitals
8. Hospital-choice importance
9. Maternity
10. Children
11. Senior dependants
12. Chronic care
13. Specialist care
14. Surgery
15. Diagnostics
16. Dental/optical/ENT/wellness
17. Drugs
18. Digital
19. Customer service
20. Restriction tolerance
21. Top priorities
22. Biggest fear

---

# 37. PHASE 34 — NEEDS PROFILE

Classify the user's purchasing preference, not their medical condition.

Examples:

- Protection-first
- Value-first
- Convenience-first
- Premium-care
- Family-protection
- Corporate-procurement
- Digital-first
- Low-OOP-risk

---

# 38. PHASE 35 — RECOMMENDATION PIPELINE

```text
USER
 ↓
22 ANSWERS
 ↓
NORMALIZE ANSWERS
 ↓
CREATE USER PRIORITY VECTOR
 ↓
FILTER INELIGIBLE PLANS
 ↓
FILTER BY LOCATION
 ↓
FILTER BY BUDGET
 ↓
FILTER BY REQUIRED BENEFITS
 ↓
MATCH PROVIDERS
 ↓
CALCULATE BENEFIT ADEQUACY
 ↓
CALCULATE NETWORK RELEVANCE
 ↓
CALCULATE OUT-OF-POCKET RISK
 ↓
CALCULATE VALUE
 ↓
APPLY EVIDENCE CONFIDENCE
 ↓
CALCULATE PERSONALIZED SCORE
 ↓
RANK CANDIDATES
 ↓
RETRIEVE SUPPORTING EVIDENCE
 ↓
SEND TOP RESULTS TO CLAUDE
 ↓
GENERATE EXPLANATION
 ↓
SHOW USER
```

---

# 39. PHASE 36 — CLAUDE EXPLANATION ENGINE

Claude receives only relevant evidence:

```text
USER PROFILE
+
TOP CANDIDATE SCORES
+
BENEFIT DATA
+
PROVIDER DATA
+
PREMIUM DATA
+
EVIDENCE
+
KNOWN LIMITATIONS
```

Claude returns:

- Best match
- Alternatives
- Why
- Strengths
- Weaknesses
- Potential gaps
- Verification questions
- Confidence
- Evidence limitations

---

# 40. PHASE 37 — FALSE-ECONOMY TESTING

Example:

Plan A:
Premium ₦80k
Surgery ₦300k

Plan B:
Premium ₦110k
Surgery ₦2m

User says surgery is critical.

Expected:

Plan B may outrank Plan A despite higher premium.

---

# 41. PHASE 38 — UNLIMITED TESTING

Plan A:
Unlimited consultations

Plan B:
500 consultations

If Plan A has major specialist restrictions, the engine must not automatically rank A higher.

---

# 42. PHASE 39 — PROVIDER COUNT TEST

HMO A:
3,000 providers nationally

HMO B:
800 providers

User:
Benin City

HMO B:
much stronger local network.

Expected:

HMO B can rank higher.

---

# 43. PHASE 40 — CLEARLINE BIAS TEST

Run:

### Test A
Clearline included.

### Test B
Clearline anonymized.

### Test C
Clearline removed.

If the user's needs and evidence are identical, ranking logic should not materially change simply because the Clearline name appears.

---

# 44. PHASE 41 — MISSING DATA TEST

If premium is unavailable:

> Premium not publicly verified.

If provider status is old:

> Provider status may be stale.

If benefit document is old:

> Benefit information requires confirmation.

Never invent.

---

# 45. PHASE 42 — CONTRADICTION TEST

If two credible sources conflict:

Show:

> Conflicting evidence.

Then:

- source A
- source B
- dates
- possible reason
- recommendation to verify

Never silently resolve.

---

# 46. PHASE 43 — DATA COMPLETENESS

Every HMO receives:

### Data completeness
Example: 94%

### Evidence confidence
High

### Provider freshness
87%

### Premium freshness
64%

This is separate from HMO quality.

Low public data should lower ranking confidence, not automatically mean low HMO quality.

---

# 47. PHASE 44 — PUBLIC METHODOLOGY

Create:

`PUBLIC_METHODOLOGY.md`

Explain:

- data
- sources
- scoring
- weighting
- personalization
- provider verification
- premium verification
- sentiment
- confidence
- limitations
- bias controls
- sponsorship separation

Write it in plain language.

---

# 48. PHASE 45 — FRONT-END SPECIFICATION

Before coding, create:

`FRONTEND_SPEC.md`

Sections:

- Landing
- Assessment
- Results
- HMO explorer
- HMO profile
- Comparison
- Provider finder
- Premium calculator
- MLR calculator
- Coverage calculator
- NHIA
- State schemes
- Methodology
- Disclaimer
- Error reporting

---

# 49. PHASE 46 — API SPECIFICATION

Create:

`API_CONTRACT.md`

Endpoints:

```text
GET /hmos
GET /hmos/:id
GET /plans
GET /plans/:id
GET /providers
GET /providers/:id
GET /states
GET /schemes
POST /assessment
POST /recommend
POST /compare
POST /calculate/premium
POST /calculate/mlr
POST /calculate/coverage-gap
POST /verify-provider
POST /report-data-error
```

---

# 50. PHASE 47 — CREATE CLAUDE CODE HANDOFF

Create:

```text
CLAUDE_CODE_HANDOFF/
```

Inside:

```text
README.md
PROJECT_SPEC.md
DATA_DICTIONARY.md
DATABASE_SCHEMA.json
HMO_SCHEMA.json
PLAN_SCHEMA.json
BENEFIT_SCHEMA.json
PROVIDER_SCHEMA.json
PREMIUM_SCHEMA.json
EVIDENCE_SCHEMA.json
STATE_SCHEME_SCHEMA.json
SCORING_ENGINE.md
ASSESSMENT_ENGINE.md
MLR_ENGINE.md
COVERAGE_GAP_ENGINE.md
PROVIDER_ENGINE.md
RECOMMENDATION_ENGINE.md
CLAUDE_PROMPT.md
API_CONTRACT.md
FRONTEND_SPEC.md
PUBLIC_METHODOLOGY.md
ANTI_BIAS_PROTOCOL.md
TEST_PLAN.md
SAMPLE_DATA/
```

This is the bridge between Claude Project and Claude Code.

---

# 51. STOP CONDITION FOR CLAUDE PROJECT

Claude Project must stop and ask for approval when:

- schemas are complete
- scoring is complete
- assessment is complete
- methodology is complete
- research pilot is complete
- test personas pass
- bias tests pass
- missing-data handling passes
- contradiction handling passes
- sample recommendations make sense
- handoff package is complete

Do not let Claude Project continue endlessly researching without producing an implementation-ready package.

At this exact point:

# STOP CLAUDE PROJECT.
# MOVE TO CLAUDE CODE.

---

# 52. START CLAUDE CODE

Create a Git repository:

```text
hmo-blueprint-nigeria
```

Recommended structure:

```text
hmo-blueprint/
│
├── CLAUDE.md
├── docs/
├── data/
├── frontend/
├── backend/
├── scripts/
└── tests/
```

Copy the approved handoff package into `/docs`.

---

# 53. CLAUDE CODE INITIAL PROMPT

Give Claude Code:

> You are now the Chief Technology Officer and Lead Software Engineer for HMO Blueprint Nigeria.
>
> The `/docs` directory contains the approved intelligence architecture.
>
> Do not redesign the product without documenting why.
>
> Do not change the scoring methodology without versioning the change.
>
> Do not invent data.
>
> Treat the database as the source of truth.
>
> Treat Claude as the explanation/reasoning layer, not the factual database.
>
> First inspect the repository.
>
> Then produce:
> 1. Architecture review
> 2. Technical dependency plan
> 3. Database implementation plan
> 4. API implementation plan
> 5. Front-end component plan
> 6. Test plan
> 7. Deployment plan
>
> Do not build everything at once.
>
> Start with the smallest working vertical slice.

---

# 54. CLAUDE CODE BUILD ORDER

Build vertically.

## Sprint 1
Database + sample HMO data.

## Sprint 2
Assessment engine.

## Sprint 3
Scoring engine.

## Sprint 4
Recommendation API.

## Sprint 5
HTML assessment UI.

## Sprint 6
Results UI.

## Sprint 7
Comparison engine.

## Sprint 8
Provider finder.

## Sprint 9
Premium calculator.

## Sprint 10
MLR calculator.

## Sprint 11
Coverage-gap calculator.

## Sprint 12
HMO explorer.

## Sprint 13
State/NHIA explorer.

## Sprint 14
Claude explanation layer.

## Sprint 15
Admin/research dashboard.

## Sprint 16
Testing/security/deployment.

---

# 55. FIRST CLAUDE CODE VERTICAL SLICE

Do not begin with all HMOs.

Use:

- 5 HMOs
- 20–50 sample plans
- selected providers
- sample benefits
- sample premiums

Build the entire flow:

```text
Landing
 ↓
22 questions
 ↓
User profile
 ↓
Score
 ↓
Top 3
 ↓
Explain
 ↓
Compare
```

If this works, scale the data.

---

# 56. SECOND VERTICAL SLICE

Add:

- real provider data
- real benefits
- real premium evidence
- evidence citations
- confidence

Then test.

---

# 57. THIRD VERTICAL SLICE

Add:

- provider search
- local network
- hospital verification

---

# 58. FOURTH VERTICAL SLICE

Add:

- premium calculator
- benefit-limit calculator
- coverage-gap calculator
- MLR calculator

---

# 59. FIFTH VERTICAL SLICE

Add:

- all HMO profiles
- rankings
- state schemes
- NHIA

---

# 60. SIXTH VERTICAL SLICE

Add:

- Claude explanation
- natural-language questions
- personalized reasoning
- “what should I ask?”
- “why not this HMO?”

---

# 61. USER NATURAL-LANGUAGE MODE

Eventually allow:

> “I need an HMO for my wife and three children. I live in Benin. I have ₦500,000. I want good hospitals and strong maternity.”

The system converts this into structured variables.

But show:

> **Here is what we understood from you.**

Allow the user to edit before scoring.

---

# 62. ADMIN DASHBOARD

Eventually build:

# HMO INTELLIGENCE COMMAND CENTER

Display:

- HMOs researched
- HMOs verified
- HMOs needing review
- stale premiums
- stale provider lists
- missing benefit documents
- conflicting records
- evidence gaps
- ranking changes
- user feedback
- provider corrections

---

# 63. RESEARCH QUEUE

Example:

### HMO A

Premium:
Needs verification

Provider list:
Needs verification

Benefit document:
Current

Leadership:
Current

### HMO B

Provider network:
Conflicting evidence

This makes the database maintainable.

---

# 64. VERSION THE SCORING SYSTEM

Never silently change weights.

Create:

```text
METHODOLOGY_V1
METHODOLOGY_V2
METHODOLOGY_V3
```

Every recommendation should know which methodology generated it.

---

# 65. VERSION THE DATA

Every major dataset should have:

```text
dataset_version
retrieval_date
source_date
verification_date
```

This enables historical analysis.

---

# 66. HISTORICAL ANALYSIS

Eventually answer:

> How has HMO A changed since 2023?

Compare:

- premiums
- benefits
- network
- digital
- sentiment
- leadership
- market position

Do not rewrite historical records using current information.

Store historical snapshots.

---

# 67. TOP 10 RANKING

Do not publish the final Top 10 until:

- methodology is fixed
- data completeness is acceptable
- HMO comparisons are normalized
- provider data is comparable
- benefit data is normalized
- confidence is visible

Publish:

### Overall Top 10

and separate category rankings.

Do not claim:

> “Nobody can deny this ranking.”

Instead use:

> **“This ranking is reproducible, evidence-based and transparent about its assumptions.”**

---

# 68. CLAUDE PROJECT MUST NEVER

- build endless speculative research
- invent prices
- infer confidential customers
- infer political backing
- infer religion
- make medical diagnoses
- fabricate provider lists
- treat stale lists as current
- treat marketing as fact
- secretly favor Clearline
- create unsupported rankings

---

# 69. CLAUDE CODE MUST NEVER

- put API keys in the front end
- hard-code research facts into JavaScript
- embed rankings manually
- bypass the evidence layer
- let Claude hallucinate database facts
- calculate recommendations only in the UI
- store sensitive information unnecessarily
- silently alter scoring
- remove disclaimers
- remove evidence indicators
- hard-code old premiums

---

# 70. QUALITY GATES

Every phase has a gate.

## Gate 1 — Architecture
Can every important concept be represented?

## Gate 2 — Evidence
Can every important claim be traced?

## Gate 3 — Data
Can HMOs be compared consistently?

## Gate 4 — Scoring
Do different users receive different appropriate rankings?

## Gate 5 — Bias
Does Clearline receive no hidden advantage?

## Gate 6 — UX
Can a normal Nigerian complete the assessment easily?

## Gate 7 — Explanation
Can the user understand why?

## Gate 8 — Verification
Does the system tell the user what to confirm?

## Gate 9 — Security
Are keys/data protected?

## Gate 10 — Production
Can the system survive real users?

---

# 71. FINAL HANDOFF CHECKLIST

Before leaving Claude Project:

- [ ] Project constitution
- [ ] Product requirements
- [ ] Data dictionary
- [ ] Database schemas
- [ ] Evidence model
- [ ] Source hierarchy
- [ ] Regulatory foundation
- [ ] HMO master registry
- [ ] Provider schema
- [ ] Benefit taxonomy
- [ ] Premium methodology
- [ ] Capitation/FFS methodology
- [ ] MLR methodology
- [ ] Coverage-gap methodology
- [ ] Customer experience methodology
- [ ] Sentiment methodology
- [ ] Digital/AI methodology
- [ ] SWOT methodology
- [ ] Scoring methodology
- [ ] 22-question assessment
- [ ] Recommendation algorithm
- [ ] Confidence algorithm
- [ ] Anti-bias protocol
- [ ] Public methodology
- [ ] Front-end specification
- [ ] API specification
- [ ] Test suite
- [ ] Pilot HMO research
- [ ] Pilot recommendations
- [ ] Bias test
- [ ] Contradiction test
- [ ] Missing-data test
- [ ] Claude Code handoff package

---

# 72. FINAL HANDOFF MESSAGE TO CLAUDE PROJECT

Use this when the project is ready:

> The intelligence architecture is now complete.
>
> Review the entire project one final time.
>
> Do not add new features.
>
> Do not begin website coding.
>
> Perform a final audit against the master specification.
>
> Identify:
> 1. Missing data structures
> 2. Missing evidence
> 3. Weak scoring assumptions
> 4. Bias risks
> 5. Regulatory uncertainty
> 6. Privacy risks
> 7. Recommendation risks
> 8. Technical handoff issues
>
> Then create the final `CLAUDE_CODE_HANDOFF` directory.
>
> The handoff must be implementation-ready.
>
> Clearly state:
>
> **STOP HERE — MOVE TO CLAUDE CODE**
>
> Do not continue into application development.

---

# 73. FIRST MESSAGE TO CLAUDE CODE

Once the handoff exists:

> Read `/docs/CLAUDE_CODE_HANDOFF/`.
>
> Do not code immediately.
>
> First audit the specification and tell me:
> 1. What is complete
> 2. What is ambiguous
> 3. What technical dependency is required
> 4. What should be built first
> 5. What can be mocked
> 6. What must use real data
> 7. What must never be hard-coded
>
> Then propose the first vertical slice.
>
> Wait for approval before implementing major architecture changes.

---

# 74. FIRST VERTICAL-SLICE PROMPT FOR CLAUDE CODE

After the audit:

> Build only the first working vertical slice.
>
> Scope:
> - Landing page
> - 22-question assessment
> - Structured user profile
> - Sample HMO database
> - Deterministic scoring
> - Top 3 recommendations
> - Explanation page
> - Comparison
> - Evidence indicators
> - Disclaimer
>
> Do not build:
> - full provider database
> - full HMO universe
> - admin dashboard
> - production authentication
> - advanced analytics
> - unnecessary features
>
> The purpose is to prove the core user journey.

---

# 75. MOST IMPORTANT DEVELOPMENT PRINCIPLE

Build:

> **one complete journey**

before building:

> **one hundred incomplete features.**

A user should be able to go:

```text
I need health insurance
        ↓
Answer questions
        ↓
Tell us what matters
        ↓
Get personalized matches
        ↓
Understand why
        ↓
See gaps
        ↓
Compare
        ↓
Know what to verify
```

That is the first milestone.

---

# 76. FIRST PRODUCTION-READY MILESTONE

The first real launch does not need every HMO to be perfect.

It needs:

- excellent assessment
- trustworthy methodology
- strong pilot HMO dataset
- accurate benefits
- useful provider data
- transparent evidence
- reliable recommendations
- clear limitations
- beautiful UX

Then expand.

---

# 77. SCALE STRATEGY

### Wave 1
10–15 deeply researched HMOs.

### Wave 2
30–40 HMOs.

### Wave 3
Full HMO universe.

### Wave 4
All state schemes.

### Wave 5
Provider expansion.

### Wave 6
Continuous verification.

---

# 78. FINAL SYSTEM

```text
                         HMO BLUEPRINT
                              |
              +---------------+---------------+
              |                               |
          EXPLORE                         FIND MY HMO
              |                               |
       HMO DIRECTORY                    22 QUESTIONS
              |                               |
       HMO PROFILES                     USER PROFILE
              |                               |
       BENEFITS / LIMITS                MATCH ENGINE
              |                               |
       PROVIDER FINDER                  TOP MATCHES
              |                               |
       PREMIUMS / PRICES                EXPLANATION
              |                               |
       NHIA / STATE                      GAPS
              |                               |
       RANKINGS                          VERIFY
              |                               |
              +---------------+---------------+
                              |
                        DECISION REPORT
```

---

# 79. DECISION REPORT

Eventually users can download:

# YOUR HMO DECISION REPORT

Containing:

- Needs profile
- Budget
- Top 3 matches
- Why each matches
- Benefits
- Limits
- Provider access
- Premium
- Potential gaps
- OOP risk
- Red flags
- Questions to ask
- Evidence confidence
- Last verified date
- Disclaimer

---

# 80. LONG-TERM INTELLIGENCE LOOP

```text
USER QUESTIONS
      ↓
USER BEHAVIOUR
      ↓
COMMON CONFUSIONS
      ↓
DATA GAPS
      ↓
RESEARCH QUEUE
      ↓
HMO VERIFICATION
      ↓
DATABASE UPDATE
      ↓
BETTER RECOMMENDATIONS
      ↓
BETTER USER EXPERIENCE
```

The platform gets smarter because the **data and methodology improve**, not because Claude is allowed to hallucinate more confidently.

---

# 81. FINAL NORTH STAR

The platform should answer:

> **What should I choose?**
>
> **Why?**
>
> **What exactly am I getting?**
>
> **What could go wrong?**
>
> **How much could I still have to pay?**
>
> **Which hospitals can I actually use?**
>
> **What should I verify before paying?**
>
> **How confident are you in this recommendation?**

If it can answer these questions clearly, it has achieved its purpose.

---

# 82. EXECUTION ORDER — ONE-LINE VERSION

```text
1. Create Claude Project
2. Load project knowledge
3. Create project constitution
4. Create data dictionary
5. Create schemas
6. Create evidence system
7. Establish regulatory foundation
8. Build HMO registry
9. Build provider registry
10. Build benefit taxonomy
11. Research pilot HMOs
12. Normalize benefits
13. Normalize premiums
14. Research payment models
15. Research customer experience
16. Research sentiment
17. Research digital/AI
18. Research financial/public signals
19. Build SWOT
20. Build scoring
21. Build 22-question assessment
22. Build recommendation algorithm
23. Test personas
24. Test bias
25. Test missing data
26. Test contradictions
27. Create public methodology
28. Create front-end spec
29. Create API spec
30. Create Claude Code handoff
31. STOP CLAUDE PROJECT
32. Start Claude Code
33. Audit handoff
34. Build database
35. Build assessment
36. Build scoring
37. Build recommendation API
38. Build front end
39. Build comparison
40. Build provider finder
41. Build calculators
42. Add Claude explanation
43. Add admin dashboard
44. Test
45. Secure
46. Deploy
47. Expand HMO coverage
48. Expand state schemes
49. Continuously verify
```

---

# 83. FINAL INSTRUCTION TO THE PROJECT OWNER

Your role in Claude Project:

### Product Owner + Domain Expert + Final Judge

Claude Project's role:

### Research Architect + Analyst + Methodology Designer

Claude Code's role:

### CTO + Software Engineer

Database role:

### Source of Truth

Scoring engine role:

### Deterministic Decision Layer

Claude API role:

### Natural-Language Intelligence + Explanation

Public website role:

### Simple Consumer Experience

This separation is what makes the HMO Blueprint platform scalable, trustworthy and maintainable.

---

# 84. START HERE

Open the Claude Project.

Upload:

1. This roadmap
2. The complete HMO Blueprint master specification
3. Your existing HMO Blueprint book
4. Your existing HTML
5. Existing HMO research/materials
6. Relevant NHIA/state documents as collected

Then give Claude the **Project Constitution prompt from Phase 3**.

Do NOT tell it to build the website.

Tell it:

> **“Start Phase 0. We are building the intelligence architecture first. You are not allowed to move to Claude Code until the explicit STOP CONDITION in this roadmap has been satisfied.”**

Claude must then work phase-by-phase.

At every phase:

1. Produce the requested artifact.
2. Validate it.
3. Identify gaps.
4. Correct it.
5. Freeze the approved version.
6. Move to the next phase.

When the handoff package is complete:

> **STOP CLAUDE PROJECT.**

Only then:

> **OPEN CLAUDE CODE.**

