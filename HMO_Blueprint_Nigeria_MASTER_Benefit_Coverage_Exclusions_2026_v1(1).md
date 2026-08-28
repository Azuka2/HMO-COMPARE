# HMO BLUEPRINT NIGERIA
# MASTER BENEFIT / COVERAGE / EXCLUSION CORPUS — 2026
## Current publicly accessible plan benefits, limits, exclusions, waiting periods and comparison evidence

**Research date:** 26 August 2026  
**Scope:** Current publicly accessible benefit information for the HMO pilot cohort, NHIA national programmes and available State Social Health Insurance sources.  
**Purpose:** Provide Claude Project with a structured benefit corpus for normalization and later comparison.

---

# 0. VERY IMPORTANT DATA WARNING

This document is intentionally evidence-led.

It does **not** claim that every plan document of every Nigerian HMO has been successfully extracted from the public web.

Some HMOs publish:

- complete benefit tables,
- partial summaries,
- downloadable PDFs,
- dynamic tables,
- plan calculators,
- provider-specific schedules,
- documents that are indexed but not fully rendered,
- or benefits only after a quote/enrollment interaction.

Some state schemes publish broad programme descriptions without a complete public benefit schedule.

Therefore:

> **Do not invent a missing benefit.**

Use:

**NOT PUBLICLY VERIFIED**

when the complete benefit is not available.

Also distinguish:

- `COVERED`
- `COVERED WITH LIMIT`
- `COVERED AFTER WAITING PERIOD`
- `EMERGENCY ONLY`
- `DESIGNATED CENTRES ONLY`
- `PLAN/TIER DEPENDENT`
- `SUBJECT TO OVERALL LIMIT`
- `ADDITIONAL COST`
- `NOT COVERED`
- `UNKNOWN`

---

# 1. REQUIRED BENEFIT DATA MODEL

Every benefit should be normalized into:

```text
hmo_id
plan_id
plan_name
benefit_category
benefit_name
covered_status
monetary_limit
limit_type
frequency_limit
waiting_period
copay
deductible
referral_required
preauthorization_required
provider_restriction
geographic_restriction
age_restriction
exclusions
conditions
source_url
source_title
source_date
retrieved_date
verification_status
evidence_level
confidence
```

---

# 2. STANDARD BENEFIT TAXONOMY

Use these common categories across every HMO.

## PRIMARY / OUTPATIENT

- GP consultation
- GP review
- specialist consultation
- specialist review
- rare specialist
- telemedicine
- prescribed medicines
- laboratory
- basic radiology
- advanced diagnostics
- CT
- MRI
- ultrasound
- ECG
- echocardiography
- ENT
- chronic-care consultation
- chronic-care medicines

## INPATIENT

- admission
- ward type
- feeding
- nursing
- medical consumables
- surgical consumables
- IV drugs
- inpatient diagnostics
- room category
- admission days

## SURGERY

- minor
- intermediate
- major
- ENT surgery
- ophthalmic surgery
- orthopaedic
- obstetric
- neurosurgery
- cardiac
- other specialist surgery

## MATERNITY

- antenatal
- normal delivery
- assisted delivery
- Caesarean
- postnatal
- neonatal
- incubator
- phototherapy
- preterm delivery
- pregnancy complications

## EMERGENCY

- accident
- emergency stabilization
- ambulance
- roadside evacuation
- hospital-to-hospital transfer
- emergency diagnostics
- ICU

## DENTAL

- examination
- scaling/polishing
- simple extraction
- surgical extraction
- amalgam
- composite
- root canal
- dentures
- crowns
- implants
- bridges
- orthodontics

## OPTICAL

- examination
- refraction
- eye medications
- frames
- lenses
- contact lenses
- ophthalmic surgery

## WELLNESS

- health screening
- gym
- spa
- body massage
- nutrition
- wellness coaching
- fitness
- preventive health education

## HIGH-COST CARE

- cancer
- dialysis
- organ transplant
- prosthesis
- ICU
- major trauma
- burns

## MENTAL HEALTH

- outpatient
- inpatient
- psychotherapy
- psychiatry

## CHRONIC CARE

- diabetes
- hypertension
- asthma
- sickle cell
- other chronic illnesses

---

# 3. CLEARLINE HMO — CURRENT PUBLIC BENEFIT DATA

## Primary sources

https://clearlinehmo.com/retail

https://www.clearlinehmo.com/newcorporateplanSeptember.pdf

### CURRENT RETAIL PRICES

| Plan | Price |
|---|---:|
| Kia Kia | ₦3,000 |
| Clear Value | ₦80,000 |
| Clear Advantage | ₦250,000 |
| Clear Elite | ₦600,000 |

Source:
https://clearlinehmo.com/retail

### Retail provider categories

| Plan | Publicly shown access |
|---|---|
| Kia Kia | Telemedicine only; not hospital |
| Clear Value | C–D providers |
| Clear Advantage | B–D providers |
| Clear Elite | Public page displays plan; exact category needs normalization from current full schedule |

The site explicitly states Kia Kia is accessible via telemedicine and not in hospital.

---

## CURRENT CORPORATE PREMIUMS

Source:
https://www.clearlinehmo.com/newcorporateplanSeptember.pdf

| Plan | Individual | Family | Global limit |
|---|---:|---:|---:|
| Bronze | ₦61,525 | ₦307,625 | ₦1,000,000 |
| Silver | ₦81,880 | ₦409,400 | ₦2,000,000 |
| Gold | ₦117,245 | ₦586,225 | ₦3,000,000 |
| Gold+ | ₦180,775 | ₦903,875 | ₦3,500,000 |
| Platinum | ₦345,000 | ₦1,725,000 | ₦4,000,000 |
| Platinum+ | ₦678,500 | ₦3,392,500 | ₦5,000,000 |

**Status:** current publicly discoverable company PDF; effective date should be separately confirmed.

---

## CURRENT CORPORATE BENEFIT SIGNALS

The corporate document contains plan-by-plan specialist and service schedules.

Publicly surfaced examples:

### Specialist services

The document shows all six tiers with access to specialist categories including:

- cardiology
- cardiothoracic surgery
- dermatology
- dietician/nutritionist
- endocrinology
- ENT surgery
- family medicine
- gastroenterology
- general surgery
- gynaecology
- haematology
- neonatology
- nephrology
- neurology
- neurosurgery
- obstetrics
- oncology
- oral/maxillofacial
- orthopaedics
- pathology
- paediatrics
- psychiatry
- pulmonology
- urology

### Kidney dialysis

| Plan | Sessions shown |
|---|---:|
| Bronze | 2 |
| Silver | 3 |
| Gold | 3 |
| Gold+ | 4 |
| Platinum | 5 |
| Platinum+ | 10 |

### Cancer care

| Plan | Limit |
|---|---:|
| Bronze | ₦150,000 |
| Silver | ₦250,000 |
| Gold | ₦300,000 |
| Gold+ | ₦350,000 |
| Platinum | ₦500,000 |
| Platinum+ | ₦1,000,000 |

### Gym

| Plan | Frequency |
|---|---|
| Bronze | Not included |
| Silver | 1/week |
| Gold | 2/week |
| Gold+ | 2/week |
| Platinum | 3/week |
| Platinum+ | 3/week |

### Roaming within hospital band

| Plan | Roaming shown |
|---|---|
| Bronze | No |
| Silver | No |
| Gold | Yes |
| Gold+ | Yes |
| Platinum | Yes |
| Platinum+ | Yes |

### Abroad admission/treatment

| Plan | Amount |
|---|---:|
| Gold+ | ₦200,000 |
| Platinum | ₦300,000 |
| Platinum+ | ₦400,000 |

### Delivery abroad

| Plan | Normal | CS |
|---|---:|---:|
| Gold | ₦100,000 | ₦150,000 |
| Gold+ | ₦150,000 | ₦200,000 |
| Platinum | ₦200,000 | ₦250,000 |
| Platinum+ | ₦200,000 | ₦250,000 |

### Congenital anomaly

| Plan | Limit/status |
|---|---|
| Bronze | Excluded |
| Silver | ₦100,000 |
| Gold | ₦150,000 |
| Gold+ | ₦200,000 |
| Platinum | ₦300,000 |
| Platinum+ | ₦400,000 |

### EAP

All six corporate tiers show Employee Assistance Programme access.

### Telemedicine

All six corporate tiers show telemedicine.

### App

All six corporate tiers show app access.

---

## CLEARLINE BENEFIT DATA LIMITATION

The full corporate PDF is approximately 21 pages and contains a much larger table than the rows that can be safely reproduced from the publicly indexed extraction.

Therefore:

> **Do not reconstruct missing rows from memory or older documents.**

Use the current PDF as the source-of-truth document and have Claude Code parse the full file into the normalized schema.

---

# 4. RELIANCE HMO — CURRENT PUBLIC BENEFIT TABLE

## Official current source

https://getreliancehealth.com/nigeria/benefits/

### Personal plans

| Feature | Red Beryl | Alexandrite | Diamond |
|---|---|---|---|
| Current premium/person/year | ₦92,340 | ₦117,420 | ₦172,140 |
| Total benefit limit | ₦1,200,000 | ₦1,800,000 | ₦3,000,000 |
| Hospital tier | Tier 4 | Tier 3 | Tier 2 |
| Limit transferable? | No | No | No |

---

## QUARTER 1 — ACCESS FROM START

The current page lists:

- consultations
- patient transfer, roadside to hospital
- patient transfer, hospital to hospital

Status:

**Covered from commencement under plan rules shown on official site.**

---

## QUARTER 2 — AFTER 3 MONTHS

### Admissions/accommodation

| Benefit | Red Beryl | Alexandrite | Diamond |
|---|---|---|---|
| Feeding for enrolled patient | Covered | Covered | Covered |
| Ward | General | Semi-private | Semi-private |
| Accommodation | 20 days/year | 30 days/year | 45 days/year |
| Skilled medical/paramedical services | Covered | Covered | Covered |
| IV/IM/oral/topical drugs | Covered | Covered | Covered |
| Medical/surgical consumables | Covered | Covered | Covered |

### Minor surgery examples

- wound dressing
- incision & drainage of acute/chronic abscesses
- suturing of minor wounds
- suturing of lacerations
- ear piercing
- male circumcision

---

## QUARTER 3 — AFTER 6 MONTHS

### Dental

| Benefit | Red Beryl | Alexandrite | Diamond |
|---|---|---|---|
| Specialist consultation | Covered | Covered | Covered |
| Routine dental examination | Covered | Covered | Covered |
| Preventive dental care | Covered | Covered | Covered |
| Pain therapy | Covered | Covered | Covered |
| Acute/chronic dental infection drugs | Covered | Covered | Covered |
| Scaling/polishing | ₦5,000 | ₦7,500 | ₦10,500 |

### Physiotherapy

| Benefit | Red Beryl | Alexandrite | Diamond |
|---|---:|---:|---:|
| Sessions | 3 | 5 | 10 |

### Psychiatry

| Plan | Outpatient mental-health limit |
|---|---|
| Red Beryl | Up to 4 weeks |
| Alexandrite | Up to 6 weeks |
| Diamond | Up to 10 weeks |

---

## QUARTER 4 — AFTER 9 MONTHS

### Eye care

| Benefit | Red Beryl | Alexandrite | Diamond |
|---|---:|---:|---:|
| Annual eye-care global limit | ₦15,000 | ₦25,000 | ₦40,000 |

### Lenses/frames

The official page shows:
- once every 2 years
- plan-specific annual global limits
- approximately ₦5,000 / ₦10,000 levels in the displayed schedule

The exact mapping should be extracted from the source document before production.

---

## QUARTER 5 — AFTER 12 MONTHS

### Intermediate surgery

| Plan | Limit |
|---|---:|
| Red Beryl | ₦150,000 |
| Alexandrite | ₦300,000 |
| Diamond | ₦500,000 |

The page explicitly states that once the limit is exceeded there is no further surgical cover for the individual in that policy year until renewal.

---

## QUARTER 6 — AFTER 15 MONTHS

### Major surgery

| Plan | Limit |
|---|---:|
| Red Beryl | ₦150,000 |
| Alexandrite | ₦300,000 |
| Diamond | ₦500,000 |

### Wellness

| Plan | Gym | Massage |
|---|---|---|
| Red Beryl | 1 session/week | 1/year |
| Alexandrite | 2 sessions/week | 2/year |
| Diamond | 3 sessions/week | Public table should be re-extracted |

**Important:** These waiting periods materially affect value. A plan can have a benefit but not make it immediately available.

---

# 5. RELIANCE SMALL-BUSINESS PLANS

Official:
https://getreliancehealth.com/nigeria/small-business-benefits/

Current plan names:

- Red Beryl
- Alexandrite
- Diamond
- Red Diamond

### Plan size

All require:

**3–19 principals**

### Hospital tiers

| Plan | Hospital tiers |
|---|---|
| Red Beryl | Tier 4 |
| Alexandrite | Tier 3 & 4 |
| Diamond | Tier 2–4 |
| Red Diamond | Tier 1–4 |

### Total benefit limits

| Plan | Total benefit limit/enrollee |
|---|---:|
| Red Beryl | ₦2,000,000 |
| Alexandrite | ₦3,500,000 |
| Diamond | ₦5,000,000 |
| Red Diamond | ₦7,000,000 |

### Payment examples

The current page shows:

#### Annual payment

- Red Beryl: ₦68,400 individual
- Alexandrite: ₦108,300 individual
- Diamond: current indexed table contains a formatting anomaly in the value displayed
- Red Diamond: ₦268,850 individual

**Do not hard-code the anomalous Diamond value until reverified.**

### Inpatient

All plans display:
- accident/emergency
- emergency stabilization
- unlimited admissions/accommodation
- skilled medical/paramedical services
- prescribed medications
- medical/surgical consumables
- blood grouping/cross-match/transfusion
- accommodation/feeding

Ward type increases by plan.

This is another strong example of:
**“Unlimited admissions” ≠ unlimited everything.**

---

# 6. AVON HEALTHCARE — CURRENT PUBLIC BENEFIT TABLE

Official:
https://www.avonhealthcare.com/individual-plan/

Current public plans:

| Plan | Person/year | Family of 6/year | Overall annual limit |
|---|---:|---:|---:|
| Life Plus | ₦65,429 | ₦307,516 | ₦1,500,000 |
| Premium Life | ₦103,332 | ₦485,660 | ₦2,000,000 |
| Boss Life | ₦208,142 | ₦978,267 | ₦5,000,000 |
| Couple | ₦130,858 | — | — |

---

## LIFE PLUS

### Outpatient

- General consultation — Covered
- Specialist consultation — Covered
- Lab investigations — subject to inpatient/outpatient limit
- prescribed drugs — up to ₦15,000
- chronic condition management — not covered
- nutritionist/dietician — not covered
- special investigations such as CT/MRI — emergency only
- emergency care — ₦100,000
- ambulance — hospital-to-hospital
- minor surgery — ₦250,000 after 12 months
- intermediate surgery — ₦250,000 after 12 months
- major surgery — ₦250,000 after 12 months
- ENT — part of surgery limit
- optical — ₦10,000 after 6 months
- eye surgery — part of surgery limit
- primary dental — ₦10,000/year after 6 months
- secondary dental — ₦10,000/year after 6 months
- HIV/AIDS — after 12 months
- mental health outpatient — maximum 30 days after 12 months
- wellness check — basic after 9 months
- infertility investigation — basic, including USS/SFA
- renal dialysis — 1 emergency session
- telemedicine — 24/7 chat with doctor
- network gym — not covered
- enrollee app — covered

---

## PREMIUM LIFE

The current page displays:

- annual limit ₦2,000,000
- outpatient ₦250,000
- prescribed drugs up to ₦35,000
- chronic condition management up to ₦481,500
- nutritionist/dietician — quarterly
- physiotherapy — 10 sessions/year
- inpatient ₦400,000
- semi-private ward
- 30 admission days/year
- parent accommodation 2 days
- ICU/neonatal/special baby unit up to 3 days
- maternity benefit ₦250,000
- surgery limits shown at ₦350,000 for the relevant classes
- optical up to ₦12,000
- dental up to ₦20,000
- renal dialysis — 2 emergency sessions
- telemedicine
- app
- network gym not covered

---

## BOSS LIFE

Current page/PDF shows:

### Outpatient

- annual outpatient limit ₦300,000
- GP — covered
- specialist — covered
- lab — subject to relevant limit
- prescribed drugs — ₦50,000
- chronic-condition management — ₦866,700
- nutrition/dietician — quarterly
- physiotherapy — 10 sessions/year

### Inpatient

- ₦450,000
- private ward
- 35 days/year
- parent accommodation — 3 days
- feeding — covered
- drugs/infusions — covered
- ICU/neonatal/special baby unit — 7 days

### Maternity

- ₦400,000

### Surgery

- up to ₦750,000/person

### Optical

- ₦25,000/person
- available after 6 months

### Dental

- ₦60,000/person
- after 6 months
- examination
- scaling/polishing once/year
- amalgam/composite filling
- non-surgical extraction
- root canal
- orthodontics

### Mental health

- outpatient only
- max 30 days after 12 months

### Wellness

Comprehensive wellness check including:
- physical exam
- BP
- blood sugar
- PCV/HB
- urinalysis
- stool microscopy
- cholesterol
- chest X-ray
- women 40+: cervical smear + mammogram every 2 years
- men 40+: PSA every 2 years

### Infertility

Basic investigation:
- USS
- SFA
- hormone profile
- HSG

### Dialysis

- 3 emergency sessions

### Telemedicine

- 24/7 doctor chat

### Gym

- 2 sessions/month

---

# 7. AVON — PUBLICLY DOCUMENTED EXCLUSIONS

Official:
https://avonhealthcare.com/terms-and-conditions/

Important exclusions include:

- psychiatric institutionalisation
- fertility treatment such as IVF/ICSI/GIFT beyond listed investigation
- organ surgery and transplant
- cosmetic/plastic treatment
- drug/alcohol abuse and rehabilitation
- embalmment/autopsy/mortuary services
- cancer investigation/treatment such as chemotherapy/radiotherapy
- dietary/nutrition supplements
- prosthesis/artificial limbs/dental prosthesis
- hormonal replacement therapy
- obesity treatment
- overseas treatment
- home/domiciliary care
- herbal/non-prescription drugs
- dental care unless specifically covered by plan
- optical services unless specifically covered by plan
- hearing tests/hearing aids
- speech disorders
- learning difficulties
- congenital abnormalities/conditions such as sickle-cell anaemia
- burns greater than 9%
- elective Caesarean
- treatments related to excluded services
- non-standard treatment protocols
- any service not listed in the benefit table

### Interpretation

This is exactly why the platform must show:

> **Plan-specific exclusions**

rather than an HMO-wide exclusion list.

---

# 8. AIICO MULTISHIELD — CURRENT COMPARISON TABLE

Official:
https://www.aiicomultishield.com/index.php/retail/compare-plans

Current retail plans:

| Plan | Price/year | Limit of liability |
|---|---:|---:|
| Standard | ₦64,680 | ₦350,000 |
| Executive | ₦109,610 | ₦500,000 |
| Super Executive | ₦153,667 | ₦1,000,000 |
| Magnum | ₦420,000 | ₦10,000,000 |
| Magnum Concierge | ₦1,024,800 | ₦50,000,000 |

---

## OUTPATIENT

All plan comparison rows cover, subject to plan details:

- GP consultation
- GP review
- specialist consultation
- specialist review
- prescribed medicine
- direct primary-care access
- enhanced medical care
- telemedicine
- wellness coaching
- house calls
- longer appointment times/review support
- laboratory
- basic laboratory
- comprehensive laboratory
- basic radiology
- comprehensive radiology

The degree of access increases by plan.

---

## DENTAL

| Benefit | Standard | Executive | Super Executive | Magnum | Concierge |
|---|---|---|---|---|---|
| Amalgam filling | 3 max | 3 max | 3 max | —/plan dependent | —/plan dependent |
| Simple extraction | 3 max | 3 max | 3 max | —/plan dependent | —/plan dependent |
| Surgical extraction | — | 1 max | 2 max | plan-dependent | plan-dependent |
| Composite filling | — | — | 1 max | plan-dependent | plan-dependent |
| Scaling/polishing | — | Once/year | Once/year | Once/year | Once/year |
| Pain therapy | — | — | — | available at higher tier | available |
| Root canal | — | — | — | higher tier | higher tier |
| Dentures | — | — | — | higher tier | higher tier |
| Crowns/implants/bridges | — | — | — | higher tier | higher tier |

---

## CHRONIC CARE

| Plan | Chronic medicines limit |
|---|---:|
| Standard | — |
| Executive | ₦25,000 |
| Super Executive | ₦45,000 |
| Magnum | ₦100,000 |
| Concierge | ₦100,000 |

---

## EMERGENCY

| Plan | Emergency medical services |
|---|---:|
| Standard | ₦100,000 |
| Executive | ₦100,000 |
| Super Executive | ₦500,000 |
| Magnum | ₦1,000,000 |
| Concierge | ₦2,000,000 |

---

## SURGERY

| Plan | Minor | Intermediate | Major |
|---|---:|---:|---:|
| Standard | ₦50,000 | ₦100,000 | — |
| Executive | ₦50,000 | ₦100,000 | — |
| Super Executive | ₦75,000 | ₦100,000 | ₦400,000 |
| Magnum | ₦100,000 | ₦200,000 | ₦500,000 |
| Concierge | ₦100,000 | ₦200,000 | ₦750,000 |

---

## DIALYSIS

| Plan | Sessions |
|---|---:|
| Standard | — |
| Executive | 1 |
| Super Executive | 1 |
| Magnum | 3 |
| Concierge | 10 |

---

## BURNS

| Plan | 2nd degree | 3rd degree |
|---|---:|---:|
| Standard | — | — |
| Executive | — | — |
| Super Executive | ₦100,000 | — |
| Magnum | ₦100,000 | ₦300,000 |
| Concierge | ₦100,000 | ₦500,000 |

---

## CANCER

| Plan | Cancer treatment |
|---|---:|
| Standard | — |
| Executive | — |
| Super Executive | — |
| Magnum | ₦2,000,000 |
| Concierge | ₦2,000,000 |

---

## TRANSPLANT

| Plan | Organ/tissue transplant |
|---|---:|
| Standard | — |
| Executive | — |
| Super Executive | — |
| Magnum | ₦2,000,000 |
| Concierge | ₦2,000,000 |

---

## OPTICAL

| Plan | Frames/lenses | Ophthalmic surgery |
|---|---:|---:|
| Standard | — | — |
| Executive | ₦10,000 | — |
| Super Executive | ₦15,000 | ₦100,000 |
| Magnum | ₦35,000 | ₦200,000 |
| Concierge | ₦35,000 | ₦200,000 |

Frames/lenses have a 24-month limit.

---

## INPATIENT ROOM

| Plan | Accommodation |
|---|---|
| Standard | General ward |
| Executive | Semi-private |
| Super Executive | Private |
| Magnum | Private |
| Concierge | Private |

---

## MATERNITY

| Plan | Neonatal | Maternity |
|---|---:|---:|
| Standard | — | — |
| Executive | ₦50,000 | ₦250,000 |
| Super Executive | ₦70,000 | ₦250,000 |
| Magnum | ₦100,000 | ₦400,000 |
| Concierge | ₦200,000 | ₦400,000 |

Post-natal care is shown up to 6 weeks at applicable levels.

---

# 9. AIICO — CURRENT STANDARD PLAN

https://aiicomultishield.com/index.php/retail/standard-plan

Covered services include:

- GP
- specialist
- prescribed drugs
- laboratory
- radiology
- dental
- admission
- general ward
- child immunization
- emergency up to ₦100,000
- hospital-to-hospital emergency stabilization
- preventive health education
- minor surgery
- intermediate surgery
- chronic-care consultation

Annual limit:
**₦350,000**

Price:
**₦64,680/year**

---

# 10. AIICO — EXECUTIVE PLAN

https://aiicomultishield.com/index.php/retail/executive-plan

Price:
**₦109,610/year**

Annual limit:
**₦500,000**

Visible benefits:

- GP
- specialist
- prescribed medicine
- laboratory
- radiology
- dental
- optical
- routine immunization
- emergency stabilization
- minor surgery
- intermediate surgery
- chronic consultation
- chronic medicine up to ₦25,000

Dental:
- amalgam — 3/year
- simple extraction — 3/year
- surgical extraction — 1/year

Optical:
- lenses/frames up to ₦10,000
- 24-month limit

Surgery:
- minor up to ₦50,000
- intermediate up to ₦70,000

Dialysis:
- 1 session

---

# 11. AIICO — EXCLUSIONS

Official executive-plan page:

https://www.aiicomultishield.com/index.php/executive-plan

Current general exclusions include:

- cosmetic surgery
- infertility investigation/treatment
- specific HIV/AIDS treatment where excluded
- expensive dental fillings
- orthodontics
- advanced investigations
- medical appliances
- cardiac pacemakers
- orthopaedic implants
- chronic renal failure requiring dialysis
- induced abortion
- special optical lenses
- advanced/complex investigations
- laser treatment
- transplants
- heart/great-vessel surgery
- neurological surgery
- oncological treatment
- overseas treatment
- embalmment/autopsy
- weight modification programmes
- some obstetric care for dependants

Waiting periods shown include:

- optical/ophthalmic/dental — 12 months
- elective surgery — 12 months
- maternity — 18 months
- newly diagnosed chronic illness — 24 months
- pre-existing medical/surgical conditions — not covered

**Important:** These rules are plan-specific and must not be generalized to every AIICO plan without checking the applicable wording.

---

# 12. AXA MANSARD — CURRENT RETAIL BENEFIT TABLE

Official:
https://www.axamansard.com/health/plans-details/

| Plan | Price/year | Hospitals | Surgery | Dental | Optical | Physio |
|---|---:|---:|---:|---:|---:|---:|
| Bronze | ₦89,500 | 1,295 | ₦250,000 | ₦10,000 | ₦7,500 | 5 |
| Silver | ₦132,250 | 1,643 | ₦300,000 | ₦20,000 | ₦10,500 | 10 |
| Gold | ₦259,225 | 1,888 | ₦500,000 | ₦60,000 | ₦15,000 | 15 |
| Platinum | ₦418,515 | 1,972 | ₦1,000,000 | ₦80,000 | ₦25,000 | 20 |
| Platinum+ | ₦700,375 | 2,004 | ₦1,000,000 | ₦80,000 | ₦25,000 | Subject to inpatient limit |
| Rhodium | ₦1,969,780 | 2,004 | ₦1,000,000 | ₦150,000 | ₦40,000 | Subject to inpatient limit |

Public current page also exposes:

- routine child immunization
- evacuation
- inpatient care
- general/specialist consultations
- laboratory
- radiology
- primary eye care
- ENT
- prescribed drugs
- CT/MRI in applicable tiers
- maternity
- dental
- optical
- emergency
- family planning
- fertility investigation
- HIV/AIDS treatment within stated constraints
- outpatient psychiatry
- surgery

### Important

Maternity shows:

> 12-month moratorium

The exact individual benefit limits must be extracted from the plan's comprehensive schedule rather than inferred from the high-level plan card.

---

# 13. AXA PLAN ACCESS

Current plan page states hospital network expands:

- Bronze — 1,295
- Silver — 1,643
- Gold — 1,888
- Platinum — 1,972
- Platinum+ — 2,004
- Rhodium — 2,004

This should be treated as a **company-published network count**.

Actual provider participation should still be verified by plan and facility.

---

# 14. LEADWAY HEALTH — CURRENT PRICING/BENEFIT SOURCE

Official:
https://leadwayhealth.com/retail/

Current publicly indexed pricing:

| Plan | Price/year | Region | Provider tier |
|---|---:|---|---|
| Strawberry | ₦104,997.75 | Nigeria | Category D |
| Cranberry | ₦147,790.50 | Nigeria | Category D |
| Blueberry | ₦254,826 | Nigeria + India | Category C+D |
| Blackberry | ₦585,975 | Nigeria + India + Africa | Category B+C+D |
| Raspberry | ₦954,720 | Nigeria + India + Africa | Category A+B+C+D |

General waiting period shown:
**7 days**

The detailed current benefit table is dynamically rendered / protected in some web contexts, so the full row-level schedule should be retrieved directly from the current Leadway site before production use.

An older Leadway page provides additional structure but must not be confused with current pricing.

Historical source:
https://leadwayhealth.com/retail-old/

The old page contains older premiums such as:
- ₦69,998.50
- ₦98,527
- ₦169,884
- ₦390,650
- ₦636,480

These must be classified:

**HISTORICAL / STALE**

---

# 15. NEM HEALTH — CURRENT RETAIL BENEFIT TABLE

Official:
https://www.nem-health.com/plans/retail

| Plan | Price/year | Provider tier |
|---|---:|---|
| Lotus | ₦88,300 | Tier 1 |
| Tulip | ₦123,400 | Tier 1–2 |
| Hazel | ₦263,800 | Tier 1–3 |
| Ivy | ₦439,400 | Tier 1–4 |
| Marigold | ₦790,500 | Tier 1–4 |

### Headline benefit progression

**Lotus**
- outpatient/inpatient
- emergency
- wellness check
- basic lab/diagnostics
- GP

**Tulip**
- Lotus benefits
- maternity
- extended diagnostics
- basic dental
- mental health consultation

**Hazel**
- Tulip
- private room
- neonatal support
- physiotherapy
- mental-health support

**Ivy**
- Hazel
- specialist
- fertility/family planning
- full dental/optical
- prescription delivery

**Marigold**
- Ivy
- executive health checks
- organ transplant support
- international travel insurance
- extended mental-health therapy

---

## NEM DETAILED LIMITS CURRENTLY EXPOSED

| Benefit | Lotus | Tulip | Hazel | Ivy | Marigold |
|---|---:|---:|---:|---:|---:|
| Outpatient | ₦200,000 | ₦250,000 | ₦360,000 | ₦600,000 | ₦800,000 |
| Inpatient | ₦360,000 | ₦600,000 | ₦1,200,000 | ₦2,000,000 | ₦2,500,000 |
| Room | Standard | Semi-private | Private | Private | Private |
| Child-parent accommodation | 24h | 2d | 3d | 5d | 7d |
| Provider tier | 1 | 1–2 | 1–3 | 1–4 | 1–4 |

The current detailed page also lists:
- GP
- specialist
- rare specialist
- telemedicine
- prescribed medications
- basic lab/X-ray/ultrasound
- emergency medical transportation
- emergency services
- antenatal care
- other benefits

The full five-page benefit interface should be parsed directly before production publication.

---

# 16. NEM CORPORATE

Official:
https://www.nem-health.com/plans/corporate

The current corporate plan page exposes:

- multiple plan tiers
- Nigeria/Africa/India/UAE coverage options
- Tier 1 through Tier 5+ provider access
- unlimited annual benefit limit on displayed corporate plans

### IMPORTANT

“Unlimited annual benefit limit” does not mean:

> every service is unlimited.

The corporate table must be parsed at row level before ranking.

This should trigger the platform's:

**UNLIMITED CLAIM VERIFICATION**

---

# 17. GREENBAY — CURRENT PUBLISHED BENEFIT TABLE

Official:
https://greenbayhmo.com/individual-plans.html

## ACCESS

- outpatient/inpatient consultations
- accidents/emergency including admission
- NPI immunization
- full outpatient
- drugs
- basic X-rays/scans
- routine lab
- maternity ANC + delivery
- CS NOT included
- primary ophthalmology + surgery
- primary dental
- specialist
- minor/intermediate general surgery
- general ward
- chronic illness treatment
- emergency dialysis — 3 sessions
- HIV/AIDS treatment
- Band 1 hospitals
- “No Financial Limit to Cover”

## BASIC

Adds:
- ICU max 14 days
- CT/MRI
- maternity including CS
- eye lenses ₦5,000
- Band 1

## STANDARD

Adds:
- semi-private ward
- eye lenses ₦10,000
- minor–major surgery
- Band 1 & 2

## COMPREHENSIVE

Adds:
- root canal
- private ward
- minor–major surgery
- Band 1 & 2

## ULTIMATE

Adds:
- comprehensive immunization
- eye lenses ₦25,000
- Band 1–3

### IMPORTANT

Greenbay's phrase:

> “No Financial Limit to Cover”

must not be interpreted as unlimited every benefit.

The plan still contains:
- hospital band restrictions
- explicit ICU duration
- dialysis session limits
- eye limits
- named surgery categories
- other conditions

---

# 18. GREENBAY CORPORATE

https://greenbayhmo.com/corporate-plans.html

Corporate structures:

### Greencare Capitation
- Basic
- Standard
- Comprehensive
- Ultimate

### Greencare Freedom
- roaming across selected partner hospitals
- no single registration hospital requirement
- suitable for mobile people/businesses
- ID-card access

### TPA
Employers can choose a higher-risk structure where Greenbay develops a prequalified network for the client.

This is strategically important but should be evaluated separately from retail benefits.

---

# 19. MEDIPLAN — CURRENT PUBLIC BENEFIT DATA

Official:
https://mediplanhealthcare.com/benefits/

Company currently claims:

- prepaid healthcare
- no hidden charges
- no co-payments
- no restriction on attendances/admission days where relevant service premium is paid
- quality assurance
- savings claim of 20–40%

These are company claims.

### Current Terms & Conditions

https://mediplanhealthcare.com/terms/

The current terms state services may include:

- outpatient
- inpatient
- specialist consultation
- diagnostics
- emergency
- surgery
- chronic illness management
- dialysis
- oncology
- dental
- ophthalmic
- psychiatric
- mortuary
- physiotherapy

Coverage is plan-dependent and subject to limits, exclusions and conditions.

### Explicit exclusions/limitations in current terms

- services outside accredited network
- treatments/procedures listed in exclusions
- undisclosed/pre-existing conditions not covered
- other plan-specific limitations

### Refund

Current terms state no refunds under the listed contract terms, including death of beneficiary.

### Payment

Plans are annual service contracts, with monthly/quarterly payment options while the full annual commitment remains binding according to the terms.

---

# 20. MEDIPLAN — DIASPORA HEALTH BASIC

https://mediplanhealthcare.com/diaspora-health-package-basic/

Current schedule:

| Benefit | Basic | Bronze | Silver | Gold |
|---|---:|---:|---:|---:|
| Accident/emergency | ₦100k | ₦150k | ₦250k | ₦300k |
| Stabilization drugs/imaging/lab | Covered | Covered | Covered | Covered |
| Ambulance hospital-hospital | Covered | Covered | Covered | Covered |
| Site-to-hospital evacuation | Covered | Covered | Covered | Covered |
| ICU | Covered | Covered | Covered | Covered |
| General review | Covered | Covered | Covered | Covered |
| Specialist review | Covered | Covered | Covered | Covered |
| Subspecialist review | Covered | Covered | Covered | Covered |
| Admission | 30 days/year | 30 days/year | 30 days/year | 30 days/year |
| Ward | General Cat A | Semi-private A&B | Semi-private A&B | Semi-private A-C |

Other publicly visible benefits:

### Other services

| Benefit | Bronze | Silver | Gold |
|---|---:|---:|---:|
| Emergency dialysis | 2 | 4 | 6 sessions |
| HIV/AIDS definitive treatment | Covered | Covered | Covered |
| HIV antiviral therapy | Not covered | Not covered | Not covered |
| HIV counselling/testing | Covered | Covered | Covered |
| Chronic drugs | ₦120k/yr | ₦180k/yr | ₦240k/yr |
| Cancer chemotherapy/radiotherapy | ₦150k | ₦250k | ₦400k |
| Mortuary | ₦50k | ₦75k | ₦100k |
| Home/domiciliary nurse | Covered, additional cost | Covered, additional cost | Covered, additional cost |

Overall limits:
- Bronze — ₦1.2m
- Silver — ₦2.4m
- Gold — ₦3.6m

This is a powerful example of a benefit table that can support detailed comparison.

---

# 21. MEDIPLAN — DIASPORA HEALTH PLUS

https://mediplanhealthcare.com/diaspora-health-package-plus/

Current emergency limits:

- Bronze — ₦750,000
- Silver — ₦1,000,000
- Gold — ₦1,250,000
- Platinum — ₦3,000,000

Visible:
- stabilization
- emergency drugs/lab/imaging
- ambulance
- evacuation
- ICU
- general/specialist/subspecialist review
- admission 30 days/year
- private wards

This should be further parsed into the complete benefit table.

---

# 22. IHMS

Official:
https://ihmsnigeria.com/purchase-plan/

Publicly visible plan categories:

- Geriatric
- SME
- Retail
- Corporate

Current displayed examples:

- Individual Supreme Retail — ₦488,150.75
- Individual Regular Retail — ₦295,409.51
- Individual Custom Retail — ₦155,501.94
- Family of 2 Custom — ₦301,674.55
- Standard Corporate — ₦62,184.60
- Standard Plus Corporate — ₦87,297.22
- SME Purple — ₦44,910
- SME Purple Max — ₦59,939.76
- Geriatric Custom — ₦179,000

The site explicitly allows:

> Request for a custom plan.

The complete benefit table is not exposed reliably in the current indexed crawl.

Status:

**FULL BENEFIT SCHEDULE — NOT PUBLICLY VERIFIED**

---

# 23. NOVO HEALTH AFRICA

Official:
https://novohealthafrica.org/programs/

Current programme categories include:

- Retail
- Geriatric
- Corporate
- Transnational
- T-SHIP
- Joli Health
- LOAF

Provider page:
https://novohealthafrica.org/healthcare-providers/

The provider directory distinguishes:
- SIP
- DIP
- VIP
- minimum plan accessing the provider

This supports plan-level benefit/network modeling.

LOAF:
https://novohealthafrica.org/plans/loaf-plan/

Current product is designed for diaspora members purchasing cover for relatives/loved ones in Nigeria.

### Full current benefit table

**Not publicly fully extracted in this pass.**

Do not invent limits.

---

# 24. SUNU HEALTH

Official:
https://sunuhealthnigeria.com/

Current public product categories include:
- individual
- couple
- family
- corporate
- student

Current public positioning includes:
- telemedicine
- 24/7 customer support
- nationwide network
- digital ID
- overseas referral
- managed care

### Full current benefit tables

**Not publicly exposed in sufficiently structured form in this research pass.**

Status:

**NOT PUBLICLY VERIFIED**

Next action:
- crawl plan pages
- PDF assets
- registration forms
- benefit brochure
- terms/exclusions
- plan comparison pages

---

# 25. DOT HMO

Official provider/current product site:
https://www.dothmo.co/

Current provider platform exposes:
- Coral
- Emerald
- Beryl
- general
- optical
- dental
- gym
- paediatrics

### Full benefit table

**Not publicly exposed sufficiently for safe reconstruction in this pass.**

Do not infer benefits from provider categories.

---

# 26. TOTAL HEALTH TRUST / TANGERINE

Official:
https://tht.tangerine.africa/

Current site supports:
- individual
- corporate
- SME
- wellness
- provider network
- customization

### Current provider network

Company states:
- 1,700+ providers

### Current benefit tables

A complete public row-level benefit schedule was not reliably exposed in this pass.

Status:

**CURRENT FULL PLAN TABLE — NOT PUBLICLY VERIFIED**

---

# 27. HYGEIA

Official:
https://hygeiahmo.com/

Current plan page:
https://hygeiahmo.com/plan-list/

Current visible prices include:

- HyStarter — ₦50,796
- HyStarter Premium — ₦280,296
- HyBasic Family — ₦230,112
- HyPrime Family — ₦667,590
- Senior Mini — ₦203,796
- Senior Midi — ₦428,094
- Senior Premium — ₦865,266

Older FAQ:
https://hygeiahmo.com/frequently-asked-questions/

contains older prices and should be marked stale/historical.

### Full current benefit schedule

The current detailed plan table was not sufficiently exposed in the indexed crawl.

Status:

**CURRENT FULL BENEFIT TABLE — NOT PUBLICLY VERIFIED**

Provider categories A-D are confirmed.

---

# 28. HMO BENEFIT MATRIX — CURRENTLY EXTRACTABLE PILOT DATA

| HMO | Detailed current table available? | Price current? | Limits current? | Exclusions current? |
|---|---|---|---|---|
| Clearline | Partial/current PDF | Yes | Partial/current | Partial |
| Reliance | Yes, strong current table | Yes | Yes | Partial |
| Avon | Yes | Yes | Yes | Yes |
| AIICO | Yes, strong | Yes | Yes | Yes |
| AXA Mansard | Yes, strong | Yes | Partial/full headline | Partial |
| Leadway | Partial/current web index | Yes | Partial | Not fully |
| NEM | Yes, strong current table | Yes | Yes | Partial |
| Greenbay | Yes, strong summary | Price not included in exposed table | Partial | Partial |
| Mediplan | Partial, strong for Diaspora | Current package | Yes | Yes |
| IHMS | Pricing yes | Yes | Not fully | Not fully |
| Novo | Plan catalogue yes | Partial | Not fully | Not fully |
| SUNU | Product catalogue | Not verified | Not fully | Not fully |
| DOT | Provider/tier data | Not verified | Not fully | Not fully |
| THT | Product/network data | Not verified | Not fully | Not fully |
| Hygeia | Current plan names/prices | Yes | Not fully | Not fully |

---

# 29. NHIA — OFFICIAL BENEFIT / COVERAGE LAYER

Primary source:

https://www.nhia.gov.ng/nhia-benefit-package/

The NHIA website currently hosts a dedicated:

> Benefit Package

page.

However, the web text renderer does not expose the image/table contents sufficiently to safely reconstruct every row as plain text.

Therefore:

**Do not invent a row-by-row NHIA benefit schedule from the page heading.**

Use the official NHIA benefit package asset directly when constructing the structured database.

NHIA also states broadly on its current site that its programmes cover employees, spouses and up to four biological children, with additional dependants able to enroll, subject to programme rules.

Source:
https://www.nhia.gov.ng/

---

# 30. NHIA PROGRAMME COVERAGE

## Formal sector

NHIA FAQ:
https://www.nhia.gov.ng/faq/

Current FAQ discusses formal-sector contributions and enrollee relationships.

## Organised Private Sector

https://www.nhia.gov.ng/requirement-for-organized-private-sector/

Current NHIA page describes:
- employee/spouse/four biological children structure
- contribution framework
- registration requirements

Verify the current contribution formula against the latest regulation before building a live calculator.

## GIFSHIP

https://www.nhia.gov.ng/gifship-enrollees/

Current official programme page.

## Vulnerable Group Fund

https://www.nhia.gov.ng/vulnerable-group/

Covers vulnerable populations through the statutory funding mechanism.

## Basic Health Care Provision Fund

https://www.nhia.gov.ng/basic-health-care-provision-fund/

Current NHIA page says the benefit package includes a range of:

- preventive
- promotive
- curative
- rehabilitative

services.

It says services are provided through registered primary and secondary facilities and that eligibility/enrollment validation apply.

---

# 31. NHIA CURRENT CONSUMER PROPOSITION

NHIA's current homepage says beneficiaries generally do not need cash for treatment except a **10% drug co-payment** under its described programme proposition.

This is a current NHIA public statement and should be treated as programme-specific, not as a universal rule for every private HMO product.

Source:
https://www.nhia.gov.ng/

---

# 32. STATE SOCIAL HEALTH INSURANCE — NATIONAL STATUS

NHIA:
https://www.nhia.gov.ng/sshias/

NHIA currently lists State Social Health Insurance Agencies for all 36 states and FCT.

NHIA's state-scheme explainer says:

- state schemes are organized by the state SSHIA
- schemes partner with NHIA
- state equity funds are expected
- other state programmes/funds vary
- depending on the initiative, some services can be covered up to 100%
- users should contact their state agency to establish eligibility and enrollment

Source:
https://www.nhia.gov.ng/service/home-insurance/

This means there is **no single universal “state HMO benefit package.”**

Each state must be researched separately.

---

# 33. DELTA STATE — DETAILED STATE-SCHEME SOURCE

Official:
https://www.dschc.org.ng/Benefit%20Package.pdf

The Delta State Contributory Health Commission's benefit package document explains the scheme and its goals.

Current public health plans include:

## Equity Health Plan

Target:
- children under 5
- pregnant women
- elderly over 65
- physically challenged
- mentally challenged
- additional vulnerable categories as approved

Entry point:
designated primary healthcare facilities.

## Formal Health Plan

For:
- public-sector employees
- organized private-sector employees

Contribution determined by the board.

## Informal Health Plan

For residents not covered by other schemes.

Older public page states:
**₦7,000 premium contribution**

Because this figure comes from an older page, it must be verified before being shown as a 2026 price.

## Private Health Plan

A variety of packages with increased healthcare services in proportion to contribution.

Eligibility:
subscribers and persons approved by the commission.

---

# 34. DELTA STATE ACCESS / WAITING PERIOD

Official:
https://www.dschc.org.ng/index.html

The public page states:

- entry begins at public/private primary healthcare facilities
- higher-level care is accessed by referral
- providers are accredited by the Commission
- registered contributors receive an ID card
- access can begin 60–90 days after confirmation of full contribution payment

This is important:

> A state scheme can have a waiting/access activation period just as private plans can.

---

# 35. DELTA STATE BENEFIT PRINCIPLE

The public DSCHC material says the scheme's goal is:

- equitable access
- financial protection
- physical access
- quality care
- cost control

It states that public and private providers may be accredited and that primary healthcare is the initial entry point, with referral to secondary/tertiary services.

---

# 36. OTHER STATE SCHEMES — DATA STATUS

For the other states, the NHIA state directory provides agency identity and contact data, but a complete current benefit schedule was not uniformly exposed in a public, machine-readable source during this pass.

Therefore the platform must create a state-by-state research queue.

Priority states with strong public-facing schemes/sites should be researched next:

1. Lagos — LASHMA
2. Edo — EDHIC
3. Anambra — ASHIA
4. Ogun — OGSHIA
5. Delta — DSCHC
6. Oyo — OYSHIA
7. Kaduna — KADCHMA
8. Kano — KSCHMA
9. Rivers
10. Enugu
11. Ekiti
12. Osun
13. Kwara
14. Cross River
15. Akwa Ibom
16. Bauchi
17. Benue
18. Plateau
19. Gombe
20. others through FCT/remaining states

Do not fill these with assumptions.

---

# 37. BENEFIT COMPARISON RULES

The platform must distinguish:

### Covered

The service is part of the plan.

### Covered with limit

The service has a monetary/frequency limit.

### Covered after waiting period

It exists but is not immediately accessible.

### Emergency-only

The service is not general-purpose cover.

### Designated-centre only

Care is restricted to designated providers.

### Subject to overall limit

The benefit does not have an independent high limit.

### Plan-dependent

Available only at specific tiers.

### Additional cost

Service exists but requires extra payment.

### Not covered

Explicit exclusion.

### Unknown

Evidence not found.

---

# 38. “EXCLUDED” IS NOT THE SAME AS “NOT FOUND”

Do not write:

> MRI excluded

because no MRI row was found.

Instead:

> MRI — Not publicly verified.

“Excluded” requires actual evidence of exclusion.

Likewise:

> Covered

requires positive evidence.

---

# 39. WAITING-PERIOD MODEL

Create:

```text
benefit
waiting_period
start_of_coverage
end_of_coverage
waiting_reason
```

Examples from current public evidence:

### Reliance

- inpatient — quarter 2
- dental — quarter 3
- eye — quarter 4
- intermediate surgery — quarter 5
- major surgery — quarter 6

### AIICO Executive

- optical/dental — 12 months
- elective surgery — 12 months
- maternity — 18 months
- newly diagnosed chronic illness — 24 months

### Avon

- maternity/surgery etc. plan-specific waiting periods

### AXA

- maternity shows 12-month moratorium on current retail page

This is one of the most important consumer-value variables.

---

# 40. “TOTAL ANNUAL LIMIT” MUST NOT BE USED AS EVERY-BENEFIT LIMIT

Example:

AIICO Magnum:
- overall limit = ₦10m
- cancer = ₦2m
- transplant = ₦2m
- major surgery = ₦500k
- dialysis = 3 sessions

Therefore:

> ₦10m total liability does not mean ₦10m surgery.

The interface must explicitly show this.

---

# 41. “UNLIMITED” MUST BE ANALYZED

Example:

NEM corporate plans display:

> Unlimited annual benefit limit

Reliance displays:

> Unlimited admissions/accommodation

Greenbay says:

> No Financial Limit to Cover

Avon Boss Life says:

> Unlimited admission days

These statements mean different things.

The platform must ask:

- unlimited what?
- subject to what?
- within what provider tier?
- within what benefit category?
- what sublimits still exist?
- what exclusions still exist?

---

# 42. EXACT FEATURE COLUMNS FOR THE FINAL HMO COMPARATOR

The production database should eventually expose at least:

| Category | Fields |
|---|---|
| Price | annual/monthly, per person, family, corporate |
| Overall | annual limit, overall liability |
| Network | provider count, local count, tier |
| GP | included, sessions/limit |
| Specialist | included, sessions |
| Drugs | included, limit, formulary |
| Lab | included, limit |
| CT | included, sessions/limit |
| MRI | included, sessions/limit |
| X-ray | included |
| Ultrasound | included |
| Surgery | minor/intermediate/major |
| ICU | days/limit |
| Maternity | ANC/delivery/CS |
| Neonatal | days/limit |
| Dental | service-level limits |
| Optical | exam/lens/frame/surgery |
| ENT | treatment/surgery |
| Mental health | outpatient/inpatient |
| Chronic care | consultation/drugs |
| Dialysis | sessions |
| Cancer | amount |
| Transplant | amount |
| Emergency | limit |
| Ambulance | covered |
| Wellness | screening/gym/spa |
| Telemedicine | covered |
| App | covered |
| Waiting | benefit-specific |
| Exclusions | exact |
| Authorization | requirement |
| Referral | requirement |
| Provider restriction | exact |

---

# 43. CONSUMER-VALUE TEST

After extracting the benefit table, ask:

> **What happens when the user actually needs the benefit?**

For every high-priority service calculate:

```text
User Need
vs
Plan Benefit
vs
Plan Limit
vs
Waiting Period
vs
Provider Access
vs
Authorization
```

Then:

> Potential coverage gap.

---

# 44. BENEFIT QUALITY SCORE

Do not score based on number of checkmarks.

Potential conceptual model:

```text
Benefit Quality =
Breadth
×
Limit Adequacy
×
Access
×
Timeliness
×
Low Restriction
×
User Relevance
×
Evidence Confidence
```

Claude must validate and refine the eventual formula.

---

# 45. EXCLUSION INTELLIGENCE

Create a separate exclusion database.

Every exclusion should have:

```text
hmo
plan
excluded_service
reason
source
date
confidence
```

Common categories to compare include:

- pre-existing conditions
- infertility treatment
- IVF
- cosmetic surgery
- organ transplant
- cancer
- dialysis
- prosthesis
- orthodontics
- elective C-section
- congenital conditions
- overseas treatment
- non-prescription drugs
- supplements
- obesity/weight management
- home care
- hearing aids
- psychiatric hospitalization
- experimental treatment

Do not assume an exclusion exists for every HMO.

---

# 46. FINAL DATA-INTEGRITY RULE

The HMO Blueprint engine must be able to tell the difference between:

> **“We found evidence that it is covered.”**

and:

> **“We did not find evidence that it is covered.”**

These are not the same thing.

The first is:

**Covered**

The second is:

**Unknown / Not publicly verified**

---

# 47. SOURCES — CORE CURRENT BENEFIT PAGES

## Clearline
https://clearlinehmo.com/retail
https://www.clearlinehmo.com/newcorporateplanSeptember.pdf

## Reliance
https://getreliancehealth.com/nigeria/benefits/
https://getreliancehealth.com/nigeria/small-business-benefits/

## Avon
https://www.avonhealthcare.com/individual-plan/
https://avonhealthcare.com/terms-and-conditions/
https://static.avonhealthcare.com/resources/plans/TheBossLife.pdf

## AIICO Multishield
https://www.aiicomultishield.com/index.php/retail/standard-plan
https://www.aiicomultishield.com/index.php/retail/executive-plan
https://www.aiicomultishield.com/index.php/retail/super-executive-plan
https://www.aiicomultishield.com/index.php/retail/compare-plans
https://www.aiicomultishield.com/index.php/executive-plan

## AXA Mansard
https://www.axamansard.com/health/plans-details/

## Leadway
https://leadwayhealth.com/retail/
https://leadwayhealth.com/retail-old/

## NEM
https://www.nem-health.com/plans/retail
https://www.nem-health.com/plans/corporate

## Greenbay
https://greenbayhmo.com/individual-plans.html
https://greenbayhmo.com/corporate-plans.html

## Mediplan
https://mediplanhealthcare.com/benefits/
https://mediplanhealthcare.com/terms/
https://mediplanhealthcare.com/diaspora-health-package-basic/
https://mediplanhealthcare.com/diaspora-health-package-plus/

## IHMS
https://ihmsnigeria.com/purchase-plan/

## Novo
https://novohealthafrica.org/programs/
https://novohealthafrica.org/healthcare-providers/
https://novohealthafrica.org/plans/loaf-plan/

## SUNU
https://sunuhealthnigeria.com/

## DOT
https://www.dothmo.co/

## THT
https://tht.tangerine.africa/

## Hygeia
https://hygeiahmo.com/plan-list/
https://hygeiahmo.com/

## NHIA
https://www.nhia.gov.ng/nhia-benefit-package/
https://www.nhia.gov.ng/service/health-insurance/
https://www.nhia.gov.ng/basic-health-care-provision-fund/
https://www.nhia.gov.ng/requirement-for-organized-private-sector/
https://www.nhia.gov.ng/gifship-enrollees/
https://www.nhia.gov.ng/vulnerable-group/
https://www.nhia.gov.ng/faq/

## State schemes
https://www.nhia.gov.ng/sshias/
https://www.nhia.gov.ng/service/home-insurance/

## Delta State
https://www.dschc.org.ng/Benefit%20Package.pdf
https://www.dschc.org.ng/index.html

---

# 48. NEXT NORMALIZATION TASK FOR CLAUDE PROJECT

Load this corpus and convert it into:

```text
HMO
PLAN
BENEFIT
BENEFIT_LIMIT
EXCLUSION
WAITING_PERIOD
PROVIDER_ACCESS
EVIDENCE
```

Then create a machine-readable matrix.

Do not use blank cells as “No”.

Use:

- YES
- NO
- LIMIT
- WAITING
- CONDITIONAL
- EMERGENCY_ONLY
- UNKNOWN

---

# 49. FINAL PRODUCT RULE

The consumer should eventually be able to ask:

> “I want maternity, surgery, MRI, good hospitals and strong drugs. I have ₦300,000. Which plan gives me the best protection?”

And the system should answer from structured evidence:

> **Plan X gives you stronger surgery coverage but has a 12-month waiting period for maternity.**
>
> **Plan Y is more expensive but gives a higher provider tier and stronger maternity benefit.**
>
> **Plan Z is cheaper but has a much lower surgery limit.**
>
> **Here is the potential gap.**
>
> **Here are the things you must verify before buying.**

That is the purpose of this benefit corpus.

---

# 50. HANDOFF STATUS

This file should be treated as:

**HMO BLUEPRINT NIGERIA — BENEFIT CORPUS V1**

It contains the strongest publicly accessible current benefit evidence found in this research pass.

It should **supersede older price/benefit summaries only where current official evidence exists**.

Historical documents remain useful for historical analysis but must not be silently presented as current.

