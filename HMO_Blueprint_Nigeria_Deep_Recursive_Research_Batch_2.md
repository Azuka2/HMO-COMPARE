# HMO BLUEPRINT NIGERIA
# DEEP HMO-BY-HMO RESEARCH CORPUS — BATCH 2
## Recursive Official-Site + Documents + Plans + Providers + Digital + Sentiment + Corporate Evidence

**Research cut-off:** 26 August 2026  
**Prepared for:** HMO Blueprint Nigeria — Health Insurance Intelligence Engine  
**Scope of this batch:** Deep public-web research for a priority cohort plus the national/state regulatory source layer.

---

# 0. HOW TO USE THIS FILE

This is an evidence corpus for the HMO Blueprint Claude Project.

It is **not** the final HMO ranking.

It is **not** a complete scrape of every private/internal document.

It is **not** a claim that every public page, social post or review has been exhaustively indexed.

It is a structured research snapshot of what could be verified from publicly accessible, indexed sources during this research pass.

For each item, distinguish:

- **PRIMARY / OFFICIAL** — regulator or company source
- **CORPORATE / AUDITED** — annual report or public corporate disclosure
- **INDEPENDENT** — credible third-party source
- **PUBLIC SENTIMENT** — user-generated reviews/discussion
- **OBSERVED** — visible digital/website behavior
- **INFERRED** — analytical conclusion; do not treat as fact
- **NOT PUBLICLY VERIFIED** — no adequate public evidence found
- **CONFLICTING** — credible sources differ
- **STALE / HISTORICAL** — source exists but may not describe current terms

Every current price, provider, benefit, leadership or accreditation claim must be rechecked before production publication.

---

# 1. NATIONAL REGULATORY FOUNDATION

## NHIA HMO directory

**Primary source:** https://www.nhia.gov.ng/hmo/

NHIA describes the page as:

> NHIA Accredited Health Maintenance Organizations

The current page exposes HMO name, NHIA ID, website, address, email and call-centre information.

The live directory currently reaches 94 numbered entries.

### Important anomaly

Health Assur appears twice:

- Health Assur Limited — NHIA ID 87
- Health Assur Limited — NHIA ID 128

Therefore:

**94 directory rows != automatically 94 unique active HMOs.**

The application must create a canonical HMO entity and separately preserve directory rows/status records.

---

## NHIA HCP directory

**Primary source:** https://www.nhia.gov.ng/hcps/

Use for:

- provider master registry
- provider name
- location
- provider type
- accreditation evidence

NHIA's public About page currently displays:

> 15,458 accredited healthcare providers

but the date/context must be stored alongside the figure.

Source:
https://www.nhia.gov.ng/about-us/

---

## NHIA State Social Health Insurance Agencies

**Primary source:** https://www.nhia.gov.ng/sshias/

The current page lists agencies in the 36 states and FCT.

Do not treat all state schemes as identical.

Research each independently.

---

## NHIA state scheme explainer

https://www.nhia.gov.ng/service/home-insurance/

NHIA states that State Social Health Insurance schemes are organized by state agencies in partnership with NHIA.

NHIA states:
- there is a SSHIA in each of the 36 states
- state equity funds are expected
- some initiatives may cover doctors' consultations, hospital stays and emergencies up to 100% depending on the initiative
- eligibility and scheme operation vary by state

This is useful for the **state scheme comparison engine**, but current state-specific conditions must be sourced from each state authority.

---

## NHIA Other Resources

https://www.nhia.gov.ng/other-resources/

This is a major source hub containing multiple downloadable resources, including:

- HMO accreditation procedures
- HCF accreditation procedures
- NHIA Strategic Plan
- NHIA medicines price list
- NHIA professional FFS list
- NHIA research agenda
- insurer/underwriter list
- intervention form
- other guidelines

---

## NHIA Act 2022

https://www.nhia.gov.ng/nhia-act/

Gazetted PDF:
https://www.nhia.gov.ng/wp-content/uploads/2024/03/NHIA-Act-2022-Gazetted-Copy.pdf

Use as primary source for statutory definitions and regulatory architecture.

---

## NHIA Operational Guidelines 2023

https://www.nhia.gov.ng/download/nhia-operational-guidelines-2023/

Publicly listed:
- 4.83 MB
- created 28 March 2024

Use for operating rules and programme interpretation.

---

## NHIA Medicines Price List

https://www.nhia.gov.ng/download/nhis-medicines-price-list/

Publicly listed:
- 686.80 KB
- created 28 March 2024

Use as a benchmark source, not as proof of every provider's retail price.

---

## NHIA professional fee-for-service material

https://www.nhia.gov.ng/download/professional-fee-for-service-price-list/

Live table:
https://www.nhia.gov.ng/professional-ffs-price-list/

Use for the FFS reference layer.

---

## NHIA Standard Treatment Guidelines

https://www.nhia.gov.ng/download/nhia-book-3/

Publicly listed:
- 124.67 MB
- created 30 January 2026
- updated 23 February 2026

Use as a clinical/managed-care reference, not for diagnosis.

---

## NHIA CEmONC facilities

https://www.nhia.gov.ng/download/full-list-nhia-cemonc-facilities/

Publicly listed:
- 58.34 MB
- created 25 February 2026

Use for emergency/maternity provider mapping.

---

## CEmONC source hub

https://www.nhia.gov.ng/cemonc/

Visible resources include:

- CEmONC empanelment criteria
- Claims Submission, Review and Payment SOP
- Program Scope of Coverage
- facility assessment framework
- achievements brochure

---

## NHIA Q4 2025 health-insurance coverage

https://www.nhia.gov.ng/download/hi-coverage-as-of-q4-2025-presentation/

Publicly listed:
- 1.16 MB
- created 30 January 2026

Use for national coverage analysis.

---

# 2. CLEARLINE INTERNATIONAL LIMITED

## NHIA identity

**NHIA ID:** 3  
**Source:** https://www.nhia.gov.ng/hmo/

### Official website

https://clearlinehmo.com/

### Hospital directory

https://clearlinehmo.com/providers

Current site provides:
- location selection
- LGA selection
- provider search
- app links
- contact details

The site currently displays:

Clearline House:
290 Ikorodu Road, Anthony, Lagos

Telephone:
0700245245245
09087792965

Email:
hello@clearlinehmo.com

### Retail plans

https://clearlinehmo.com/retail

Current visible pricing:

- Kia Kia — ₦3,000
- Clear Value — ₦80,000
- Clear Advantage — ₦250,000
- Clear Elite — ₦600,000

Important current statement:

> Kia Kia is only accessible via telemedicine and not in the hospital.

Visible retail table also indicates:

- Clear Value: C–D providers
- Clear Advantage: B–D providers
- Clear Elite: provider scope displayed separately on site
- Clear Value outpatient limit up to ₦150,000
- Clear Advantage outpatient limit up to ₦250,000
- Clear Elite outpatient limit up to ₦500,000

Source:
https://clearlinehmo.com/retail

### Corporate benefit PDF

https://www.clearlinehmo.com/corporateplan.pdf

The PDF is 21 pages.

Visible plan structure:

- Bronze
- Silver
- Gold
- Gold+
- Platinum
- Platinum+
- Platinum Evercare

Current PDF indexed values:

| Plan | Individual premium | Family premium | Outpatient limit |
|---|---:|---:|---:|
| Bronze | ₦48,000 | ₦240,000 | ₦162,000 |
| Silver | ₦60,000 | ₦288,000 | ₦219,000 |
| Gold | ₦79,000 | ₦396,000 | ₦270,000 |
| Gold+ | ₦120,000 | ₦600,000 | ₦426,000 |
| Platinum | ₦300,000 | ₦1,500,000 | ₦564,000 |
| Platinum+ | ₦720,000 | ₦4,140,000 | ₦840,000 |
| Platinum Evercare | ₦1,200,000 | ₦6,900,000 | ₦1,200,000 |

The PDF also lists a wide range of specialist areas, including:

- cardiology
- cardiothoracic surgery
- dermatology
- dietetics
- endocrinology
- ENT
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

It includes detailed diagnostics and benefit-tier differences, including CT/MRI frequency by tier.

The document shows, for example:
- CT: once/year in lower tiers, increasing to twice/thrice annually in higher tiers
- MRI: similar progressive tiering
- several advanced diagnostics excluded in lower tiers but included in higher tiers

This is a major example of why **benefit-depth scoring** is essential.

### Corporate quote flow

https://clearlinehmo.com/request-a-quote

Current form asks:
- company
- email
- country
- phone
- estimated budget
- message

This is evidence of a customizable/corporate quote pathway.

### About / board

https://clearline.netlify.app/about

A public page currently lists directors including:

- Dr. Chukwuma Obiora
- Ebere Nwosu
- Pastor Ituah Ighodalo
- Pharm. Ahmed I. Yakasai
- Shailesh Kumar
- Dr. Mrs. Uche Ejiofor
- Chukwuka Ebuka
- Chukwudalu Nwosu
- Barr. Amaka Lilea Nwosisi

The page also states nearly three decades of operation and contains a statement referencing “capital requirement of 400 Million Naira.”

**IMPORTANT:** This is a company-site claim and not proof of the current regulatory requirement. The regulator's applicable current rule must be researched independently.

### Public testimonials

https://clearlinehmo.com/

The homepage contains favorable customer testimonials including an architect/client describing a long relationship and a positive Caesarean-delivery experience.

Classification:
**COMPANY-PUBLISHED TESTIMONIALS**

Do not score as independent survey evidence.

### Recommended research flags

- Verify current plan document date.
- Verify current provider list.
- Map plan-specific hospital categories.
- Research independent reviews separately.
- Independently verify the capitalization claim.
- Investigate corporate customization.
- Determine whether quoted plans differ materially from published retail.
- Analyze app reviews.
- Analyze public sentiment.

---

# 3. HYGEIA HMO

## Official

https://hygeiahmo.com/

### Provider directory

https://hygeiahmo.com/provider-directory/

Hygeia explicitly divides providers into Categories A–D.

It says Category A contains high-premium providers.

Examples indexed include:

- Iwosan Lagoon Hospital, Ikeja — A
- Iwosan Lagoon Hospital, Ikoyi — A
- Iwosan Lagoon Clinic, Victoria Island — A
- Babcock University Teaching Hospital — A
- AXA One Health Limited — A

This is excellent evidence that plan/hospital tiering can materially affect actual value.

### Plan list

https://hygeiahmo.com/plan-list/

Current visible:

**HyEssential**
- ₦26,515
- inpatient ₦150,000
- outpatient ₦100,000
- medication ₦50,000

**HyBasic**
- ₦66,070
- inpatient ₦350,000
- outpatient ₦250,000
- medication ₦80,000

### Historical/current conflict

Older FAQ content:
https://hygeiahmo.com/frequently-asked-questions/

previously indexed prices:
- HyBasic ₦29,000
- HyPrime ₦69,180
- HyPrime Plus ₦385,500

This is not a typo to “correct” silently.

It represents:

**CURRENT VS HISTORICAL/STALE PRICE CONFLICT**

The database must store both with dates and status.

### PDF

https://hygeiahmo.com/wp-content/uploads/2023/10/INDIVIDUAL-PLAN-REGISTRATION.pdf

### Plan operation PDF

https://hygeiahmo.com/wp-content/uploads/2023/10/How-your-plan-works-General-19052022.pdf

### Customer reviews

https://liners.com/hygeia-hmo/reviews

Small public sample, generally positive in visible 2026 reviews.

### Employee reviews

https://www.glassdoor.com/Reviews/Hygeia-HMO-Reviews-E3388242.htm

Visible:
- 3.4/5
- 41 reviews
- 70% recommend
- 65% positive business outlook

Reported themes vary:
- positive hybrid work
- professional development
- concerns around pay
- leadership
- welfare/growth

### HMO sentiment discussion

Nairaland:
https://www.nairaland.com/6744366/which-best-hmo-nigeria/6

Contains strong contradictory opinions about Hygeia.

Do not treat forum arguments as factual performance evidence.

---

# 4. RELIANCE HMO

## Official

https://reliancehmo.com/

### Retail benefit PDF

https://cdn.reliancehmo.com/files/reliance_hmo_retail_benefits_plan.pdf

Current indexed plans:

**Red Beryl**
- ₦3,500/month individual
- ₦10,500/month family
- annual individual limit ₦1.2m
- Tier 4 hospitals

**Alexandrite**
- ₦6,000/month individual
- ₦18,000/month family
- annual individual limit ₦1.8m
- Tier 3 hospitals

The document includes:
- specialist visit limits
- ward type
- inpatient days
- drugs
- maternity
- neonatal care
- optical
- other benefits

### Key architectural lesson

Reliance proves that:

**Premium + total limit + provider tier + specialist-session limits**

must all be compared together.

### Google Play

https://play.google.com/store/apps/details?id=com.reliancehmo.app

Visible:
- approximately 3.7 stars
- more than 1,500 reviews
- 100K+ downloads

Public reviews include:
Positive:
- booking
- doctor interaction
- support
- app convenience

Negative:
- medication delivery delays
- service frustration
- prescription-delivery timing

### Apple App Store

https://apps.apple.com/ng/app/reliance-care/id1538245836

Visible:
- about 3.4/5
- 214 ratings

Public review themes include:
- prescription-delivery complaints
- dependent management suggestions
- usability/accessibility feedback

### Glassdoor

https://www.glassdoor.com/Reviews/Reliance-Health-Reviews-E3850086.htm

Visible:
- 153 reviews

Public employee themes:
- flexible/remote work
- performance pressure
- job-security concerns in some reviews

### Reddit

https://www.reddit.com/r/Nigeria/comments/1mez3yr

Reliance appears as a known HMO recommendation in a Nigeria thread.

Another relevant discussion:
https://www.reddit.com/r/Nigeria/comments/1q49q6w/health_insurance_in_nigeria/

---

# 5. AVON HEALTHCARE

## Official

https://www.avonhealthcare.com/

### Company history

https://www.avonhealthcare.com/our-story/

Company states:
- registered October 2012
- commenced operations in 2013
- subsidiary of Heirs Holdings
- serves individuals, families, associations and corporations

Also describes:
- on-site health-risk assessment
- occupational health management
- employee wellbeing

### Individual plan

https://avonhealthcare.com/individual-plan/

Current visible:

**Life Plus**
- ₦65,429/person/year
- ₦307,516/family of 6
- annual limit ₦1.5m
- outpatient limit ₦150,000
- drugs up to ₦15,000
- chronic disease management not covered in displayed plan

### Boss Life

https://www.avonhealthcare.com/individual-plan/bosslife/

Visible benefits include:
- specialist consultations
- private ward
- ICU/HDU
- advanced laboratory
- major surgeries
- physiotherapy
- nutritionist/dietician
- travel immunization
- antenatal/delivery
- family planning
- ambulance
- optical/dental
- HIV/AIDS treatment
- mental health
- wellness checks

This provides useful evidence for benefit breadth.

### Corporate

https://www.avonhealthcare.com/business-plan/

Company says:
- business plans for companies, associations and large groups
- plans designed around 30+ people
- customized plans available
- essential benefits include consultation, diagnostics, drugs, physiotherapy, hospital admission/feeding, minor/intermediate surgery, basic optical

### CEO announcement

https://www.avonhealthcare.com/avon-hmo-appoints-osakpamwan-imasogie-as-new-ceo/

Osakpamwan Imasogie was announced as CEO effective 1 October 2024.

### Google Play

https://play.google.com/store/apps/details?id=com.avonhealthcare.avon

Visible reviews include recent complaints about:
- app usability
- TeleDoc
- approval delays
- update friction

Classify as public customer sentiment.

### Glassdoor

https://www.glassdoor.com/Reviews/Avon-Healthcare-Reviews-E2282245.htm

Visible:
- 4.0/5
- 27 reviews
- 86% recommend
- 97% positive business outlook

### Indeed

https://ng.indeed.com/cmp/Avon-Healthcare-Limited

Visible:
- 4.5/5
- workplace/learning positives

---

# 6. LEADWAY HEALTH

## Official

https://leadwayhealth.com/

### About

https://leadwayhealth.com/about-us/

Company currently says:
- 2,500+ healthcare centres
- nationwide coverage
- hospitals, consultation, lab, medication, vaccination and emergency services
- 24/7 contact centre
- app/website provider search
- part of Leadway Holdings

Treat 2,500+ as a company claim until independently reconciled against the provider dataset.

### Retail pricing

https://leadwayhealth.com/retail/

Current visible:

- Strawberry — ₦104,997.75
- Cranberry — ₦147,790.50
- Blueberry — ₦254,826.00
- Blackberry — ₦585,975.00
- Raspberry — ₦954,720

Visible terms:
- 7-day waiting period
- some tiers reference Nigeria
- higher tiers reference Nigeria + India
- highest visible tier references Nigeria + India + Africa

### Corporate

https://leadwayhealth.com/corporate/

Visible:
- Plus from ₦106,081/year
- Pro from ₦151,087/year
- Max with broader leading-provider access across Nigeria/UAE/India

### Provider directory

https://leadwayhealth.com/find-a-provider-list/

Search fields:
- category
- location
- hospital name

### Public guide

https://leadwayhealth.com/your-guide-to-finding-the-best-healthcare-providers-and-hmo-in-lagos/

Company claims:
- more than 1,000 providers
- hospitals, clinics, labs, pharmacies, dental, eye
- provider search
- telemedicine
- delay reporting
- chronic drug delivery
- preferred-brand drug pickup
- gym/nutrition/counselling/wellness
- wellness reward in described programme

The 1,000+ figure differs from the 2,500+ figure elsewhere and should be stored as source-specific claims until normalized.

### Public provider API documentation

https://api-enrollee.leadwayhealth.com/Help/Api/GET-v1-api-provider-listProviders_scheme_id_descpline_lng_lat_state_city

Visible parameters:
- scheme_id
- discipline
- longitude
- latitude
- state
- city

This is significant for future provider-finder architecture.

### Google Play

https://play.google.com/store/apps/details?id=com.leadway.health

Visible:
- ~3.3 stars
- ~350 reviews
- 100K+ downloads

Public review themes:
- login
- password
- WhatsApp/customer service
- profile-update friction

### Indeed

https://ng.indeed.com/cmp/Leadway-Assurance-Company-Limited/reviews

Visible:
- 4.1/5
- ~41 reviews

Themes:
- inclusive environment
- learning
- management
- target/commission pressure in some roles

---

# 7. AIICO MULTISHIELD

## Official

https://www.aiicomultishield.com/

### Product categories

Public site displays:
- Standard
- Executive
- Super Executive
- Magnum
- Standard Corporate
- Executive Corporate
- Super Executive Corporate
- Magnum Corporate

### Standard

https://www.aiicomultishield.com/index.php/retail/standard-plan

Current visible:

- ₦64,680/year
- total liability ₦350,000

Benefits include:
- GP
- specialist consultation
- prescribed medicines
- lab
- radiology
- dental
- admission
- general ward
- child immunizations
- emergency up to ₦100,000
- chronic care consultation
- minor/intermediate/major surgery categories

### Magnum

https://aiicomultishield.com/index.php/retail/magnum-plan

Current visible premium:
- ₦420,000/year

Broad benefits include:
- GP
- specialists
- medicines
- lab
- radiology
- dental
- optical
- private ward
- maternity
- screening
- family planning
- prosthesis
- dialysis
- cancer treatment
- organ/tissue transplant
- chronic care
- child immunization
- psychiatric hospitalization
- emergency
- surgery

### Corporate Executive

https://www.aiicomultishield.com/index.php/corporate/executive-corporate-plan

Visible:
- GP
- specialists
- drugs
- basic/comprehensive lab
- radiology
- dental
- optical
- semi-private admission
- maternity up to ₦250,000

### Standard Corporate

https://www.aiicomultishield.com/index.php/corporate/standard-corporate-plan

Current page says the plan serves:
- small companies
- associations
- large groups

Visible dental benefits include:
- amalgam filling
- simple extraction
- surgical extraction
- composite filling
- scaling
- pain therapy
- root canal
- dentures
- crowns/implants/bridges

Treat exact limits as plan-document fields, not as generic HMO properties.

### Hospital access

Standard:
https://aiicomultishield.com/index.php/hospital-access/standard-hospital-access

Magnum/Concierge:
https://www.aiicomultishield.com/index.php/hospital-access/magnum-concierge-hospital-access

These are separate provider-access datasets.

### Ownership

AIICO 2024 annual report:
https://www.aiicoplc.com/images/financialreports/Annual/2024_AIICO%20_ANNUAL%20_REPORT.pdf

The report states:
- AIICO Insurance Plc owns 76.10% of AIICO Multishield Limited
- 23.9% is non-controlling interest

This is strong corporate evidence.

---

# 8. AXA MANSARD HEALTH

## Group/health profile

https://corporate.axamansard.com/subsidiaries/axa-health/

The company page states:
- AXA Mansard Health is the HMO arm of AXA Mansard
- public page says share capital was increased to ₦700m
- public page also describes it as above a stated ₦400m minimum capital figure associated with its previous regulatory statement

**Important:** preserve the source date and do not treat the ₦400m statement as the current regulatory rule without independent current verification.

The page also lists:
- 24-hour call centre
- Lagos, Abuja, Port Harcourt, Enugu offices
- management
- board

### Board/management on company page

Publicly listed:
- Tope Adeniyi — CEO
- Yetunde Ilori — Chairman
- Kunle Ahmed
- Jumoke Odunlami
- Omowunmi Mabel Adewusi
- Ekundayo Ajayi-Obe
- Adeola Adebanjo
- Kemi Andu-Alausa

Management:
- Tope Adeniyi
- Adeola Adebanjo
- Adesayo Osisanya
- Jadesola Idowu
- Aanuoluwapo Soyoye
- Morenike Hassan
- Olamide Lawal
- Ayodele Akeeb

### Current individual plans

https://www.axamansard.com/health/plans-details/

Current visible:

**Bronze**
- ₦89,500/year
- 1,295 hospitals
- surgery up to ₦250,000
- dental ₦10,000
- optical up to ₦7,500
- physiotherapy 5 sessions

**Silver**
- ₦132,250/year
- 1,643 hospitals
- surgery up to ₦300,000
- dental ₦20,000
- optical ₦10,500
- physiotherapy 10 sessions

**Gold**
- ₦259,225/year
- 1,888 hospitals
- surgery up to ₦500,000
- dental ₦60,000
- optical ₦15,000
- physiotherapy 15 sessions

The same page also describes plan-specific limits and benefits such as:
- ENT
- CT/MRI
- maternity
- dental
- optical
- evacuation
- immunization
- emergency
- psychiatric care

This is extremely useful for comparing:
**network size + surgery + dental + optical + physiotherapy + other benefits**.

### Individual/family proposition

https://corporate.axamansard.com/individual-health-plans/

Company claims:
- more than 400 health providers
- self-service app/online dashboard
- customized corporate plans
- 24/7 support

The discrepancy between “400+” on group/individual pages and “1,295/1,643/1,888 hospitals” in the plan page should be investigated as a definition/data-version issue.

### Group plans

https://corporate.axamansard.com/group-health-plans/

Company describes:
- local/international plans
- pre-existing and chronic condition coverage from day one
- bespoke benefit extensions
- wellness
- alternative/complementary treatment
- maternity
- dental
- optical
- psychiatric treatment
- TPA
- 24/7 customer care
- emergency ambulance
- pre-negotiated provider rates

### FAQ / access process

https://corporate.axamansard.com/faqs/

Company states:
- provider list depends on selected plan
- customers can book visits through website/app
- customers can change selected hospital online/app
- care can be accessed without physical ID card with identification + enrollee number
- complaints can be sent to customer care
- international treatment requires preauthorization

### Digital Health

https://www.axamansard.com/digital-health/

Visible process:
1. purchase through accredited channel
2. redirected to WhatsApp
3. provide details
4. select pharmacy
5. consult doctor digitally
6. obtain prescription
7. pick up medication

This is a strong digital-channel example.

### Provider PDF

https://www.axamansard.com/myaxa-downloads/health/EC_providers.pdf

The PDF lists provider names, addresses and states.

### Historical corporate filing

2019 annual report:
https://www.axamansard.com/downloads/axa-mansard-annual-report-2019

The report states AXA Mansard Insurance Plc acquired 99.9% of AXA Mansard Health Limited in 2013 for ₦12m.

This is useful historical ownership evidence, not current valuation.

---

# 9. TOTAL HEALTH TRUST / TANGERINE

## Official

https://tht.tangerine.africa/

### About/history

https://tht.tangerine.africa/about

Current company information states:
- 26 years experience
- commenced operations in 1998
- pioneer positioning
- Liberty Holdings acquired THT fully in 2015
- Tangerine acquired 100% in January 2023 after approvals
- 240,000+ enrollees
- 186+ staff
- 9 locations
- four HMO of the Year awards

These are company claims unless independently reconciled.

### Leadership

https://tht.tangerine.africa/leadership-team

Visible:
- Rotimi Okpaise — Ag. Board Chair
- Wale Odusanya — Non-Executive Director
- Ademayowa Adeduro — Non-Executive Director
- Tonye Ukpong — Managing Director
- Adeolu Adeosun — CFO
- Joy Gonji — Head, Commercial
- Isoken Olagunju — Head, ERM

### Provider network

https://tht.tangerine.africa/provider-network

Company currently claims:
- 1,700+ providers in Nigeria
- 7,000+ provider networks across Africa and India

Specialties/categories include:
- primary care clinics
- secondary/specialist
- pharmacies
- gyms
- ancillary services such as labs/X-ray

### Provider finder

https://tht.tangerine.africa/find-provider

Current live provider search displays real provider records including:
- hospitals
- eye providers
- diagnostics
- clinics
- pharmacies

This is excellent source material for provider normalization.

### Wellness network

https://tht.tangerine.africa/wellness-providers

Visible providers include:
- Clinix Healthcare
- Crestview Radiology
- others

This is important because the platform should separately score **wellness network** from medical provider network.

### Current commercial positioning

Homepage says THT offers:
- corporate/MSME plans
- individual plans
- wellness
- partnerships
- customization

---

# 10. MEDIPLAN HEALTHCARE

## Official

https://mediplanhealthcare.com/

### About

https://mediplanhealthcare.com/about-us

Company positions itself as:
- licensed HMO
- nationwide coverage
- individuals
- families
- businesses
- diaspora

### Benefits

https://mediplanhealthcare.com/benefits/

Company states:
- prepaid premium
- 20–40% yearly medical-bill savings claim
- quality assurance
- no hidden charges
- no co-payments
- no restriction on attendances/admission days where the relevant service premium has been paid

These are **company claims**, not independently validated.

### Management

https://mediplanhealthcare.com/management-team

Visible:
- Adeyinka Adeniran
- Adeyemi Ibrahim
- Adekanmbi Joan
- Dr. Adewale Crosby
- Akpude Daniel
- Mayen Ekong
- Dr. Zonal medical managers
- HR/admin
- IT/DPO
- business development

Company says incorporated May 2000.

### Group portfolio

https://mediplanholdings.com/subsidiaries/

Visible portfolio includes:
- Mediplan Healthcare
- Prepaid Medicare Services
- Paramount Healthcare
- Royal Exchange Prudential Life
- Mediplan Microinsurance

The holding-company page also contains historical acquisition claims and performance claims. Treat them as company/holding-company claims until independently verified.

### Employee sentiment

https://ng.indeed.com/cmp/Mediplan-Healthcare-Limited/reviews

Visible:
- 3.5/5
- 4 reviews

Very small sample.

---

# 11. IHMS — INTERNATIONAL HEALTH MANAGEMENT SERVICES

## Official plan purchase

https://ihmsnigeria.com/purchase-plan/

Publicly visible product categories:

- Geriatric
- SME
- Retail
- Corporate

Visible prices include examples such as:

- Individual Supreme Retail ~₦488,150.75
- Individual Regular Retail ~₦295,409.51
- Family of 2 Custom Retail ~₦301,674.55
- Individual Custom Retail ~₦155,501.94
- Individual Standard Corporate ~₦62,184.60
- Standard Plus Corporate ~₦87,297.22
- SME Purple ~₦44,910
- SME Purple Max ~₦59,939.76
- Geriatric Custom — ₦179,000

The page explicitly displays:

> Request for a custom plan!

This is strong public evidence that customized plan/pricing pathways exist.

Important:
“sale”/strikethrough pricing must be stored separately from standard pricing.

### Employee sentiment

https://www.glassdoor.com/Reviews/International-Health-Management-Services-Reviews-E6172880.htm

Visible:
- 3 reviews
- 3.2/5
- one recent review describes claims/hospital payment reputation positively
- another negative review exists

Very small sample.

---

# 12. NOVO HEALTH AFRICA

## Official

https://novohealthafrica.org/

### Positioning

Current site says:
- technology/data-driven HMO
- nationwide operation
- mental-health work
- Novo Apoyo
- Novo Companion App
- multiple plan categories

### Services/programmes

https://novohealthafrica.org/programs/

Products include:

- Retail
- Geriatric
- Corporate
- Transnational
- T-SHIP
- Joli Health
- Loaf

Current homepage states affordable health plans from around ₦53,550/year, while another indexed programmes page states from ₦31,500/year. This is a **current content discrepancy requiring verification**.

### Provider directory

https://novohealthafrica.org/healthcare-providers/

Visible filters:
- hospitals
- laboratories
- specialists
- SIP
- DIP
- VIP
- minimum plan that can access care

This is strong evidence of **plan-dependent provider access**.

### Customer testimonials

Visible site testimonials include:
- C-section experience in Port Harcourt
- serious illness support
- telemedicine convenience

Classification:
**company-published testimonials**

### Provider portal

https://novohealthafrica.org/faqs/provider-portal/

Publicly documented provider portal functionality includes:
- provider login
- messages
- appointments
- billing
- submitted bills
- payment advice
- download payment advice

Do not use the publicly exposed documentation as evidence of unauthorized internal access. It is public product documentation.

### Enrollee portal

https://ijele.novohealthafrica.org/Enrollee

Public dashboard currently displays:
- visit verification
- dependants
- refunds
- appointments
- complaints
- policy information
- digital ID
- health vitals
- bookings
- benefit utilization

This is powerful digital-product evidence.

### Transnational

https://novohealthafrica.org/plans/transnational-plan/

Publicly describes:
- international healthcare access
- Platinum, Gold, Silver, Bronze
- complex-case management beyond local capacity

### Loaf

https://novohealthafrica.org/plans/loaf-plan/

Designed for people in diaspora to buy cover for family/loved ones in Nigeria.

This is a differentiated customer-acquisition/product concept.

---

# 13. NEM HEALTH

## Official

https://www.nem-health.com/

### Plans

https://www.nem-health.com/plans

Visible categories:
- Corporate
- SME
- Individual/Family
- HomeReach
- Golden Care

Current FAQ states:
- prices can start from ₦3,600/month billed annually
- coverage starts after payment/application processing
- plan pages contain side-by-side benefit information

### HomeReach

https://www.nem-health.com/plans/homereach

Current visible:

Ages 0–65:

**Tulip**
- $180/year

**Hazel**
- $240/year

**Ivy**
- $360/year

Ages 66–75:

**Tulip**
- $420/year

**Hazel**
- $600/year

**Ivy**
- $960/year

The benefit table includes:

**Annual benefit limits**
- Tulip ₦3m
- Hazel ₦4m
- Ivy ₦6m

**Hospital access**
- Tulip Tier 1–2
- Hazel Tier 1–3
- Ivy Tier 1–4

**ICU**
- ₦1m
- ₦1.5m
- ₦2m

**Minor surgery**
- ₦500k
- ₦1m
- ₦2.5m

Other visible benefits:
- GP
- specialists
- rare specialists
- drugs
- diagnostics
- teleconsultation
- drug pickup
- emergency transport
- free Uber/Bolt emergency hospital trip
- second opinion
- nursing/consumables
- private/semi-private room

This is one of the strongest publicly visible examples for the platform's **benefit-depth and network-tier algorithm**.

### Golden Care

https://www.nem-health.com/plans/goldencare

Current visible:

66–70:
- ₦1m/year

71–75:
- ₦1.5m/year

Benefit table:
- annual benefit limit ₦3m
- outpatient ₦1m
- provider tier 1–3
- private room
- ICU up to ₦1m
- minor surgery ₦1.5m
- intermediate surgery ₦1.5m

This suggests potential inconsistency between “premium” and “annual benefit limit” fields; the database must distinguish these carefully.

### SME

https://www.nem-health.com/plans/sme

Current public information:
- small businesses 5–19 employees
- added chronic-condition coverage can be purchased
- employee records can be changed through app/email
- team can move to corporate plan once it grows beyond 19

### FAQs

https://www.nem-health.com/faqs

Current public information includes:
- claims via app/email within 24 hours of service
- claim appeals
- 24/7 support
- emergency treatment
- digital confirmation
- hospital changes
- maternity depending on tier
- dependent age conditions

### Terms

https://www.nem-health.com/terms

Last updated:
January 2025

The platform publicly identifies compliance with Nigeria Data Protection Act 2023.

### Checkout flow

https://www.nem-health.com/checkout?period=annually&plan=retail&subplan=tulip-plan

Current observed purchase flow asks:
- who is coverage for?
  - myself
  - someone else
  - family/group

This is useful UX/process evidence.

---

# 14. GREENBAY HEALTHCARE

## Official

https://greenbayhmo.com/

### Individual plans

https://greenbayhmo.com/individual-plans.html

Visible products:

### Access
- outpatient/inpatient consultations
- emergency
- NPI immunization
- drugs
- basic X-rays/scans
- routine laboratory
- maternity; CS not included
- primary ophthalmology
- dental primary
- specialist consultation
- minor/intermediate general surgery
- general ward
- chronic illnesses
- emergency dialysis 3 sessions
- HIV/AIDS treatment
- Band 1 hospitals
- “No Financial Limit to Cover”

### Basic
Adds:
- ICU up to 14 days
- CT/MRI
- maternity including CS
- optical lens ₦5,000
- Band 1

### Standard
Adds:
- semi-private ward
- optical ₦10,000
- minor–major surgery
- Band 1 & 2

### Comprehensive
Adds:
- root canal
- private ward
- Band 1 & 2

### Ultimate
Adds:
- comprehensive immunization
- optical ₦25,000
- Band 1, 2 & 3

This is extremely important to the HMO Blueprint because “No Financial Limit to Cover” appears alongside explicit benefit/plan restrictions elsewhere.

The platform should flag this kind of language for **scope/conditions investigation**, not simply score it as unlimited.

### Corporate

https://greenbayhmo.com/corporate-plans.html

The corporate page describes:

**Greencare Capitation Based Plan**

with:
- Basic
- Standard
- Comprehensive
- Ultimate

Also:

**Greencare Freedom**

Features:
- roaming among selected partner hospitals across Nigeria
- no registration at one hospital required
- useful for mobile individuals/businesses
- access using ID cards

Also:

**Third Party Administration plan**

For employer groups willing to bear relative financial risk.

Company says Greenbay can create a prequalified hospital network specifically for such a client.

This is highly relevant to:
- customized corporate benefits
- TPA
- employer risk transfer
- provider-network customization

### Providers

https://greenbayhmo.com/Providers/

Page allows provider access and a downloadable provider list.

---

# 15. SUNU HEALTH NIGERIA

## Official

https://sunuhealthnigeria.com/

### Company overview

https://www.sunuhealthnigeria.com/about-us/company-overview

Company states:

- formerly Managed Healthcare Services Limited
- incorporated 1997
- started operations 1998
- member of SUNU Group
- presence in more than 17 African countries
- accreditation number NHIA 016
- technology-driven
- nationwide/geopolitical-zone presence
- serves multinationals, SMEs, ministries, parastatals, schools and tertiary institutions

### Registration/enrollment

Company publicly states:
- online portal registration
- enrollee information is entered into software
- provider portal updates in real time
- enrollee education/sensitization
- dedicated account management
- digital ID/mobile app access immediately after registration

This is valuable evidence for **onboarding design**.

### Official positioning

Company claims:
- 24/7 customer support
- wide network
- managed care
- telemedicine
- overseas referral for cases not manageable in Nigeria
- technology-driven operations

These are company claims and should be scored only after structured verification.

---

# 16. DOT HMO

## Official

https://www.dothmo.co/

DOT positions itself around:
- affordable coverage
- innovation
- 24-hour access
- clear benefits
- friendly support
- nationwide coverage
- telemedicine
- wellness/prevention
- 24/7 support
- claims

### Provider network

https://www.dothmo.co/providers

Current live directory says:

**Showing 16 of 1,902 providers**

Provider categories include:
- gym
- dental
- general
- optical

Visible examples include:
- 02 Fitness Centre — gym — Bauchi
- 3J Dental Clinic — dental — Port Harcourt
- 563 NAF Hospital Jos
- A Harmony Hospital — Lagos
- AB Specialist Hospital
- Ab-Rehoboth Eye Clinic
- Abbey Medical Centre
- Abbott Clinics

The directory uses color/plan categories such as Coral and Emerald.

This is valuable evidence for:
- large live provider database
- plan/provider-tier mapping
- wellness inclusion

### FAQ/process

Homepage includes questions covering:
- who can buy
- what is covered
- exclusions
- pre-existing conditions
- plan upgrade/downgrade
- enrollment
- coverage start
- hospital change
- dependant handling
- approval
- referral
- emergency
- hospital payment
- corporate cover
- employee plan choice
- telemedicine
- complaints

This makes DOT a good candidate for detailed customer-journey testing.

---

# 17. NEM / DOT / GREENBAY / CLEARLINE: IMPORTANT COMPARISON INSIGHT

The research already reveals that provider networks are structured differently.

Examples:

### Hygeia
Provider categories A–D.

### Reliance
Tiered hospitals by plan.

### AXA
Plan-specific hospital access.

### Clearline
Plan-specific provider categories.

### NEM
Tier 1–4 access varies by plan.

### Greenbay
Band 1, 2, 3 depending on plan.

### DOT
Provider directory exposes plan/category identifiers.

Therefore the HMO Blueprint scoring engine should model:

```text
HMO
  → PLAN
      → PROVIDER TIER
          → FACILITY
              → LOCATION
                  → SERVICES
                      → VERIFICATION
```

This is far more important than national provider count.

---

# 18. BENEFIT COMPARISON INSIGHT

A plan can be:

### Broad but shallow

Many services, low limits.

### Narrow but deep

Fewer services, strong high-cost protection.

### Broad and deep

More expensive but potentially stronger.

### Cheap but high-gap

Low premium, high potential OOP.

The platform should calculate all four dimensions.

---

# 19. PREMIUM COMPARISON INSIGHT

The research shows:

- published retail prices
- plan-specific premiums
- family prices
- corporate prices
- sale prices
- custom plans
- custom corporate quotation pathways

Therefore store:

```text
price_type
published_price
sale_price
quoted_price
negotiated_price
estimated_price
historical_price
```

Do not collapse them.

---

# 20. DIGITAL EXPERIENCE INSIGHT

Public digital evidence currently exists for:

### Clearline
App and mobile policy/claims access.

### Reliance
App for care/service.

### Avon
Mobile app/TeleDoc.

### Leadway
App + provider API + digital services.

### AXA Mansard
MyAXA + WhatsApp + digital health flow.

### Novo
Apoyo + Novo Companion + enrollee portal + provider portal.

### NEM
App + digital ID + bookings + reimbursement + change requests + usage reports.

### SUNU
Online registration + real-time provider information + digital ID/mobile app.

### THT
Provider search and other digital offerings.

This means **digital maturity can be objectively modeled** rather than based only on marketing claims.

---

# 21. CUSTOMER-SENTIMENT INSIGHT

The public evidence is often contradictory.

Examples:

- Reliance has positive and negative app reviews.
- Avon has app/approval complaints despite positive employee sentiment.
- Hygeia has both positive and negative forum discussions.
- AXA has positive corporate/digital claims but some negative public reviews.
- Leadway has strong corporate propositions but app/login complaints.

Therefore:

> Never produce a single sentiment score without displaying sample size, source, date range and theme distribution.

---

# 22. EMPLOYEE-SENTIMENT INSIGHT

Employee sites should remain a separate dataset.

Do not assume:

> Happy employees = happy customers.

Do not assume:

> Unhappy employees = poor healthcare service.

Use it to understand:

- leadership
- culture
- workload
- career development
- staff welfare
- employer reputation

---

# 23. CAPITATION / FFS / MLR RESEARCH STATUS

The regulatory foundation is sufficient to build the initial methodology, but organization-specific quantitative MLR and capitation comparisons require more public financial data than is currently available for every HMO.

Therefore:

### Do NOT publish an HMO MLR ranking yet.

First build:

- annual premium/contribution revenue
- medical/claims expenditure
- applicable denominator
- applicable numerator
- methodology
- source
- year

Then calculate.

Similarly, do not assume internal capitation rates merely because the HMO has a provider network.

---

# 24. CURRENT TOP RESEARCH FLAGS

The following deserve priority in the next crawl:

1. Current capitalization requirement for HMOs.
2. Exact regulatory status of the commonly repeated ₦400m requirement.
3. Clearline's public capital claim and exact evidence.
4. Current provider list for every HMO.
5. Current benefit PDFs for all HMOs.
6. Exact hospital-tier rules.
7. Surgery limits.
8. Maternity limits/waiting periods.
9. CT/MRI limits.
10. Dental limits.
11. Optical limits.
12. ENT limits.
13. Drug limits/formularies.
14. ICU.
15. Cancer/dialysis.
16. Chronic care.
17. Mental health.
18. Gym/spa/wellness.
19. Custom plan architecture.
20. Corporate pricing.
21. Claims/refund processes.
22. Provider authorization processes.
23. Customer support response.
24. Current apps.
25. Public complaints.
26. Public employee sentiment.
27. Ownership.
28. Board.
29. Financials.
30. Historical changes.

---

# 25. NATIONAL HMO RESEARCH QUEUE

After the pilot, expand to the remaining NHIA registry.

Priority remaining organizations from the live NHIA list include:

- A&M Healthcare Trust
- Alleanza Health Management
- Ally Healthcare
- Aman HMO
- Anchor HMO
- Ashmed
- Bastion
- Bonitas
- Century Medicaid
- Delog Medical
- Doheec
- Fountain
- GNI Healthcare
- Gorah
- Grooming
- Hallmark
- Health Assur
- Health Partners
- Healthspring
- Infinite X2
- International Health Management Services
- IVES Medicare
- Kennedia
- Life Worth Medicare
- Lifesaver
- Maayoit
- Marina Medical
- Markfema
- Masslife
- MB&O
- Medexia
- Medicare Alliance
- Metrohealth
- NEM
- NNPC HMO
- Nonsuch
- Noor
- Novo
- Oceanic
- Peramare
- Phillips
- Police HMO
- Precious
- Prepaid Medicare
- Princeton
- ProHealth
- Redcare
- Regenix
- Reliance
- Roding
- Ronsberger
- Rothauge
- Royal Health
- Salus Trust
- Seraph
- Skyda
- Songhai
- Springtide
- Sterling
- SUNU
- Synergy
- THT
- Ultimate
- United Comprehensive
- United Healthcare International
- Venus Medicare
- Veritas
- Well Health Network
- Wellness HMO
- Zuma
- Healthnomics
- Hyssop
- Hopewell
- Crown Jewel
- Smathealth
- Quest Medicare
- Life Action Plus
- Zenor
- Aspire
- Mitera

This list is a research queue, not a ranking.

---

# 26. REQUIRED RESEARCH RECORD FOR EACH REMAINING HMO

Claude should create one folder/record per HMO:

```text
/HMO_ID/
    identity.md
    official_sources.md
    history.md
    ownership.md
    board_management.md
    plans.md
    benefits.json
    premiums.json
    providers.json
    customer_journey.md
    digital.md
    sentiment.md
    employee_experience.md
    financials.md
    payment_models.md
    corporate_relationships.md
    SWOT.md
    evidence.json
    contradictions.md
    unknowns.md
    score.md
```

---

# 27. REQUIRED PROVIDER RECORD

```text
provider_id
provider_name
hmo
plan
tier
provider_type
specialty
state
lga
city
address
phone
emergency
maternity
diagnostics
dental
optical
gym
last_verified
verification_method
source
confidence
```

---

# 28. REQUIRED PLAN RECORD

```text
plan_id
hmo_id
plan_name
customer_type
premium
price_type
payment_frequency
geography
provider_tier
annual_limit
benefits
limits
waiting_period
copay
deductible
authorization
referral
exclusions
source
publication_date
retrieval_date
verification_status
```

---

# 29. REQUIRED EVIDENCE RECORD

```text
claim_id
entity_id
category
claim
value
source_title
source_url
source_type
publication_date
retrieval_date
effective_date
evidence_level
confidence
verification_status
contradiction_id
notes
```

---

# 30. RECOMMENDED PRODUCT LOGIC FROM THIS RESEARCH

The public site should eventually let a user ask:

> “I live in Benin City. Which plans under ₦600k give my family strong maternity, surgery and good hospitals?”

The system should:

1. identify family size
2. identify location
3. filter plans
4. match local providers
5. compare maternity
6. compare surgery limits
7. compare drugs
8. compare diagnostics
9. compare hospital tier
10. compare provider freshness
11. calculate potential gaps
12. calculate value
13. produce Top 3
14. explain the choice
15. show verification questions

---

# 31. FINAL RESEARCH PRINCIPLE

The platform should never ask:

> “Who has the biggest marketing budget?”

It should ask:

> **“Who provides the strongest evidence-backed fit for this user's actual requirements?”**

That requires:

**Data**
+
**Evidence**
+
**Normalization**
+
**Scoring**
+
**Personalization**
+
**Human-readable explanation**
+
**Verification**

---

# 32. PRIMARY SOURCE INDEX

## NHIA

https://www.nhia.gov.ng/

https://www.nhia.gov.ng/hmo/

https://www.nhia.gov.ng/hcps/

https://www.nhia.gov.ng/sshias/

https://www.nhia.gov.ng/other-resources/

https://www.nhia.gov.ng/nhia-act/

https://www.nhia.gov.ng/wp-content/uploads/2024/03/NHIA-Act-2022-Gazetted-Copy.pdf

https://www.nhia.gov.ng/download/nhia-operational-guidelines-2023/

https://www.nhia.gov.ng/download/nhis-medicines-price-list/

https://www.nhia.gov.ng/download/professional-fee-for-service-price-list/

https://www.nhia.gov.ng/professional-ffs-price-list/

https://www.nhia.gov.ng/download/nhia-book-3/

https://www.nhia.gov.ng/download/full-list-nhia-cemonc-facilities/

https://www.nhia.gov.ng/cemonc/

https://www.nhia.gov.ng/download/hi-coverage-as-of-q4-2025-presentation/

https://www.nhia.gov.ng/download/nhia-research-agenda-final-2/

https://www.nhia.gov.ng/service/health-insurance/

https://www.nhia.gov.ng/requirement-for-organized-private-sector/

https://www.nhia.gov.ng/gifship-enrollees/

https://www.nhia.gov.ng/vulnerable-group/

---

# 33. OFFICIAL HMO SOURCE INDEX

## Clearline

https://clearlinehmo.com/

https://clearlinehmo.com/providers

https://clearlinehmo.com/retail

https://clearlinehmo.com/request-a-quote

https://www.clearlinehmo.com/corporateplan.pdf

https://clearline.netlify.app/about

## Hygeia

https://hygeiahmo.com/

https://hygeiahmo.com/provider-directory/

https://hygeiahmo.com/plan-list/

https://hygeiahmo.com/frequently-asked-questions/

https://hygeiahmo.com/wp-content/uploads/2023/10/INDIVIDUAL-PLAN-REGISTRATION.pdf

https://hygeiahmo.com/wp-content/uploads/2023/10/How-your-plan-works-General-19052022.pdf

## Reliance

https://reliancehmo.com/

https://cdn.reliancehmo.com/files/reliance_hmo_retail_benefits_plan.pdf

https://play.google.com/store/apps/details?id=com.reliancehmo.app

https://apps.apple.com/ng/app/reliance-care/id1538245836

## Avon

https://www.avonhealthcare.com/

https://www.avonhealthcare.com/our-story/

https://avonhealthcare.com/individual-plan/

https://www.avonhealthcare.com/individual-plan/bosslife/

https://www.avonhealthcare.com/business-plan/

https://www.avonhealthcare.com/avon-hmo-appoints-osakpamwan-imasogie-as-new-ceo/

## Leadway

https://leadwayhealth.com/

https://leadwayhealth.com/about-us/

https://leadwayhealth.com/retail/

https://leadwayhealth.com/corporate/

https://leadwayhealth.com/find-a-provider-list/

https://leadwayhealth.com/faqs/

https://leadwayhealth.com/your-guide-to-finding-the-best-healthcare-providers-and-hmo-in-lagos/

https://api-enrollee.leadwayhealth.com/Help/Api/GET-v1-api-provider-listProviders_scheme_id_descpline_lng_lat_state_city

## AIICO Multishield

https://www.aiicomultishield.com/

https://www.aiicomultishield.com/index.php/retail/standard-plan

https://aiicomultishield.com/index.php/retail/magnum-plan

https://www.aiicomultishield.com/index.php/corporate/executive-corporate-plan

https://www.aiicomultishield.com/index.php/corporate/standard-corporate-plan

https://aiicomultishield.com/index.php/hospital-access/standard-hospital-access

https://www.aiicomultishield.com/index.php/hospital-access/magnum-concierge-hospital-access

https://www.aiicoplc.com/images/financialreports/Annual/2024_AIICO%20_ANNUAL%20_REPORT.pdf

## AXA Mansard

https://www.axamansard.com/health/plans-details/

https://corporate.axamansard.com/subsidiaries/axa-health/

https://corporate.axamansard.com/individual-health-plans/

https://corporate.axamansard.com/group-health-plans/

https://corporate.axamansard.com/faqs/

https://www.axamansard.com/digital-health/

https://www.axamansard.com/myaxa-downloads/health/EC_providers.pdf

https://www.axamansard.com/downloads/axa-mansard-annual-report-2019

## Total Health Trust

https://tht.tangerine.africa/

https://tht.tangerine.africa/about

https://tht.tangerine.africa/leadership-team

https://tht.tangerine.africa/provider-network

https://tht.tangerine.africa/find-provider

https://tht.tangerine.africa/wellness-providers

## Mediplan

https://mediplanhealthcare.com/

https://mediplanhealthcare.com/about-us

https://mediplanhealthcare.com/benefits/

https://mediplanhealthcare.com/management-team

https://mediplanholdings.com/subsidiaries/

## IHMS

https://ihmsnigeria.com/purchase-plan/

## Novo

https://novohealthafrica.org/

https://novohealthafrica.org/programs/

https://novohealthafrica.org/healthcare-providers/

https://novohealthafrica.org/faqs/provider-portal/

https://ijele.novohealthafrica.org/Enrollee

https://novohealthafrica.org/plans/transnational-plan/

https://novohealthafrica.org/plans/loaf-plan/

## NEM

https://www.nem-health.com/

https://www.nem-health.com/plans

https://www.nem-health.com/plans/homereach

https://www.nem-health.com/plans/goldencare

https://www.nem-health.com/plans/sme

https://www.nem-health.com/faqs

https://www.nem-health.com/terms

https://www.nem-health.com/checkout?period=annually&plan=retail&subplan=tulip-plan

## Greenbay

https://greenbayhmo.com/

https://greenbayhmo.com/individual-plans.html

https://greenbayhmo.com/corporate-plans.html

https://greenbayhmo.com/Providers/

## SUNU

https://sunuhealthnigeria.com/

https://www.sunuhealthnigeria.com/about-us/company-overview

## DOT

https://www.dothmo.co/

https://www.dothmo.co/providers

---

# 34. FINAL STATUS OF THIS RESEARCH BATCH

### Deeply researched in this pass

- Clearline
- Hygeia
- Reliance
- Avon
- Leadway
- AIICO Multishield
- AXA Mansard
- Total Health Trust
- Mediplan
- IHMS
- Novo Health Africa
- NEM Health
- Greenbay
- SUNU Health
- DOT HMO

### Broad registry/source layer

- Full NHIA HMO registry
- Full NHIA SSHIA directory
- NHIA HCP source
- NHIA regulatory/document source catalogue

### Not yet exhaustively crawled

- Remaining ~79 HMO records
- Every individual HMO social profile
- Every HMO PDF
- Every HMO provider list
- Every HMO corporate filing
- Every HMO app review
- Every relevant Nairaland thread
- Every Reddit thread
- Every Facebook/X/TikTok/LinkedIn discussion
- Every state scheme's own website/document corpus
- Full 15,458-provider normalization
- Full plan-level provider mapping across all HMOs

Those are the next crawl waves.

---

# 35. HANDOFF INSTRUCTION FOR CLAUDE PROJECT

Load this corpus into the HMO Blueprint Nigeria Claude Project.

Then instruct Claude:

> Treat this document as a public-web evidence corpus.
>
> Do not assume that a company claim is independently verified.
>
> Convert each HMO section into the normalized HMO/Plan/Benefit/Provider/Premium/Evidence schema.
>
> Preserve all source URLs and dates.
>
> Preserve contradictions.
>
> Mark stale information.
>
> Do not infer missing values.
>
> Use this corpus to improve the research methodology before expanding to the remaining HMO universe.
>
> The next research objective is to recursively crawl the remaining NHIA-registered HMOs using exactly the same structure.
>
> After each HMO, produce a structured evidence record and identify the next missing information.
