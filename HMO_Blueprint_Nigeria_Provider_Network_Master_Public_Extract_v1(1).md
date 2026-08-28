# HMO BLUEPRINT NIGERIA
# PROVIDER / HOSPITAL NETWORK MASTER
## Publicly Accessible 2026 Provider Extract + Tier/Band Map + Full-Directory Acquisition Sources

**Research date:** 26 August 2026  
**Purpose:** Build the provider-network intelligence layer for the HMO Blueprint Nigeria platform.

---

# IMPORTANT — DATA STATUS

This file deliberately does **NOT** pretend to contain a complete 100% dump of every provider record for every HMO.

Many Nigerian HMO provider directories are:

- dynamic
- paginated
- loaded through JavaScript
- filtered by plan
- exposed through search widgets
- partially crawlable
- available only through request forms
- available through app/API workflows
- published as PDFs that are not indexed consistently

The research environment can inspect publicly exposed content but cannot legitimately bypass:

- authentication
- private portals
- access controls
- anti-bot controls
- confidential provider databases

Therefore this file contains:

1. current provider-network counts visible on official websites,
2. provider bands/tiers/categories that can be verified,
3. individual provider records exposed directly by the public crawl,
4. exact official directory URLs,
5. downloadable/public document links where identified,
6. provider-data acquisition instructions for the Claude Project,
7. clear labels showing where a complete public directory still needs a separate extraction process.

**Do not call a directory “fully scraped” unless the total provider record set has actually been captured and reconciled.**

---

# 1. CANONICAL PROVIDER DATA MODEL

Each provider must ultimately become:

```json
{
  "provider_id": "",
  "provider_name": "",
  "hmo_id": "",
  "hmo_name": "",
  "plan_id": "",
  "plan_name": "",
  "provider_tier": "",
  "provider_band": "",
  "provider_category": "",
  "provider_type": "",
  "specialty": "",
  "state": "",
  "lga": "",
  "city": "",
  "address": "",
  "phone": "",
  "email": "",
  "emergency": false,
  "maternity": false,
  "dental": false,
  "optical": false,
  "diagnostics": false,
  "pharmacy": false,
  "gym": false,
  "spa": false,
  "mental_health": false,
  "telemedicine": false,
  "source_url": "",
  "source_type": "",
  "source_date": "",
  "retrieved_date": "2026-08-26",
  "last_verified": "",
  "verification_method": "",
  "confidence": ""
}
```

---

# 2. CRITICAL PRINCIPLE — PROVIDER COUNT IS NOT ENOUGH

Do NOT score an HMO only by:

> Number of providers.

Instead map:

```text
HMO
 ↓
PLAN
 ↓
TIER / BAND
 ↓
PROVIDER
 ↓
LOCATION
 ↓
SERVICE TYPE
 ↓
VERIFICATION
```

This is necessary because current public HMO sites demonstrate that plan level can materially determine provider access.

Examples:

- Clearline — C-D vs B-D provider categories visible by retail tier
- Hygeia — Category A-D provider classes
- Reliance — plan-linked provider network
- AXA Mansard — separate provider pages by plan
- NEM Health — Tier 1–4 provider access
- Greenbay — Band 1–3 provider access
- DOT — Coral/Emerald/Beryl provider labels
- AIICO Multishield — separate Standard/Executive/Super Executive/Magnum access pages

---

# 3. CLEARLINE HMO

## Official provider directory

https://clearlinehmo.com/providers

Current page:

- Select state
- Select LGA
- Search provider

The public crawler exposes the search interface but does not expose the entire provider dataset in one static page.

### Older/current provider-directory route

The current site navigation also exposes:

> Hospital Directory old

This should be researched as a separate source.

### Retail plan-tier evidence

https://clearlinehmo.com/retail

Current visible:

- Clear Value — C-D Providers
- Clear Advantage — B-D Providers
- Clear Elite — tier information displayed on the site

### User-reported/provider taxonomy to verify

The project owner has indicated Clearline uses:

- Band A
- Band B
- Band C
- Band D
- Special

**Status:** USER/DOMAIN-PROVIDED TAXONOMY — current official public source still needs to be captured showing exact band definitions.

Do NOT publish the “Special” band as a verified official category until the current Clearline provider documentation is obtained.

### Current company network claim

Clearline currently states approximately **1,400+ partner hospitals nationwide**.

Source:
https://clearlinehmo.com/

**Classification:** Company claim.

### Provider acquisition requirement

Claude should investigate:

```text
https://clearlinehmo.com/providers
https://clearlinehmo.com/retail
current provider PDF if publicly discoverable
old hospital directory route
public app provider lookup
public source code/API endpoints if exposed without authentication
```

Do not bypass access controls.

---

# 4. RELIANCE HMO

## Official current provider network

https://getreliancehealth.com/nigeria/providers/

Current public page:

> **Showing 450 Providers for All states / All providers**

Source:
https://getreliancehealth.com/nigeria/providers/

The current page is materially different from an older indexed crawl that previously displayed 2,916 providers. Therefore:

### Current source takes priority.

Record:

```text
current_public_provider_count = 450
older_indexed_provider_count = 2916
status = CONFLICTING/HISTORICAL
```

The older figure should NOT be used as the current provider count.

### Current state coverage filters

Visible states include:

- Lagos
- Ogun
- Kwara
- Oyo
- Anambra
- Abuja/FCT
- Niger
- Nasarawa
- Plateau
- Borno
- Kogi
- Delta
- Kano
- Rivers
- Edo
- Kaduna
- Osun
- Ekiti
- Ondo
- Bayelsa
- Katsina
- Akwa Ibom
- Cross River
- Benue
- Bauchi
- Taraba
- Imo
- Enugu
- Ebonyi
- Abia
- Yobe
- Jigawa
- Gombe
- Sokoto
- Adamawa
- Zamfara
- Kebbi

### Provider categories

Visible current categories include:

- Hospital
- Optical Center
- Dermatological Center
- Dental Clinic
- Physiotherapy Clinic
- Gym
- Spa
- Clinic
- Orthopedic Center
- Psychotherapy Center
- Tertiary Care Center
- ENT
- Psychiatry Center

### Current Lagos provider examples

The current page exposes providers including:

- Lagoon Hospital — Ikoyi
- Ultimate Eye Clinic — Ikoyi
- Afrimed Specialist Hospital
- Healing Stripes Hospital
- First City Hospital
- Pediatric Partners Hospital
- R-Jolad Plus
- Avon Medical Services
- Bernice Clinic — Ikorodu
- Bernice Clinic — Mile 12
- Budo Specialist Hospital
- Doren Specialist Hospital
- Emel Hospital
- Golden Cross Infirmary
- Lifeline Children Hospital — Lekki
- Lifeline Children Hospital — Surulere
- Outreach Women & Children's Hospital
- Paelon Memorial Clinic — VI
- Renaissance Medical Services Ltd.
- Vedic Lifecare

Sources:
https://getreliancehealth.com/nigeria/providers/
https://getreliancehealth.com/nigeria/providers/hospitals-in-lagos/

### Full-list status

**Not fully extracted in this environment.**

Current official public directory count is available, but the full 450-row dataset is rendered through a dynamic/paginated interface.

---

# 5. HYGEIA HMO

## Official provider directory

https://hygeiahmo.com/provider-directory/

### Provider categories

Hygeia currently exposes:

- Category A
- Category B
- Category C
- Category D

Hygeia explicitly describes Category A as high-premium providers.

### Provider examples previously exposed

- Iwosan Lagoon Hospital — Ikeja — Category A
- Iwosan Lagoon Hospital — Ikoyi — Category A
- Iwosan Lagoon Clinic — Victoria Island — Category A
- Babcock University Teaching Hospital — Category A
- AXA One Health Limited — Category A

### Full-list status

The public directory is searchable but is not exposed as one static page in the crawl.

**Not fully extracted.**

---

# 6. AVON HEALTHCARE

## Official provider finder

https://app.avonhealthcare.com/find-my-provider

Current interface includes:

- state filter
- LGA/location filter
- provider filter
- hospital-name/address search
- “Find hospitals near me”

The current public page is operational but the crawl returned 0 hospitals when no filters were supplied.

This is likely a dynamic query interface.

**Do NOT interpret 0 hospitals as zero providers.**

### Full-list status

**Not fully extracted.**

Recommended next process:

- identify public API calls from page/application behavior
- use ordinary public search/filter endpoints
- capture returned provider records
- record plan if the API exposes it

No access-control bypass.

---

# 7. LEADWAY HEALTH

## Official provider finder

https://leadwayhealth.com/find-a-provider-list/

The page exposes:

- Category
- Location
- Hospital name
- address
- city/state

Current page footer:
© 2026 Leadway Health.

### Older provider finder

https://leadwayhealth.com/findaprovider/

It explicitly asks users to select:

- Plan
- Service
- Location

and states:

> Enjoy access to quality care from any network provider covered under your chosen plan.

This is important evidence that **provider access is plan-specific**.

### Public provider API documentation

https://api-enrollee.leadwayhealth.com/Help/Api/GET-v1-api-provider-listProviders_scheme_id_descpline_lng_lat_state_city

Visible parameters include:

- scheme_id
- discipline
- longitude
- latitude
- state
- city

This should be a high-priority technical research source for the HMO Blueprint provider engine.

### Provider types

https://leadwayhealth.com/choose-provider-type/

Visible:

- Hospital
- Diagnostics
- Pharmacy
- Dental

It also states provider onboarding involves registration documentation and credentials.

### Full-list status

The public finder is dynamic.

**Not fully extracted.**

However, the existence of a public documented provider API makes Leadway a strong candidate for automated public-data ingestion if the endpoint is accessible without authentication and terms permit it.

---

# 8. AIICO MULTISHIELD

## Official provider network pages

### Standard

https://www.aiicomultishield.com/index.php/hospital-access/standard-hospital-access

### Executive

https://www.aiicomultishield.com/index.php/hospital-access/executive-hospital-access

### Super Executive

https://www.aiicomultishield.com/index.php/hospital-access/super-executive-hospital-access

### Magnum / Concierge

https://www.aiicomultishield.com/index.php/hospital-access/magnum-concierge-hospital-access

### Dental

https://www.aiicomultishield.com/index.php/hospital-access/dental-clinic

### Eye clinics

https://www.aiicomultishield.com/index.php/hospital-access/eye-clinc

### Provider classification

AIICO's “Who is a Provider?” page states providers are classified as:

1. Primary
2. Secondary
3. Tertiary/Specialist

It specifically identifies specialist-provider types including:

- radiological/laboratory facilities
- dental surgeries
- ophthalmic surgeries
- physiotherapy clinics
- ENT surgeries

Source:
https://www.aiicomultishield.com/index.php/support/who-is-a-provider

### Current provider examples from Standard access

Abia:
- Living Word Mission
- Life Care Clinics Ltd.
- New Era Hospital, Aba
- New Era Hospital, Umuahia
- J-Medicare Hospital
- Obioma Hospital & Mat.

Abuja:
- Alliance Clinics & Services Ltd. / Prolfa Hospital
- Limi Hospital & Maternity Ltd
- Rouz Hospital & Maternity
- Adonai Hospital
- Jereb Hospital
- Kingsclere Hospital, Mararaba
- Sauki Private Hospital
- King's Care Hospital, Wuse
- King's Care Hospital, Kubwa
- Living Stream Specialist Medical Centre
- Sisters of Nativity Hospital
- LifePoint Medical Centre

Adamawa:
- New Life Hospital
- Peace Hospital

Akwa Ibom:
- Ubong Abasi Specialist Clinics
- Mt. Olive Hospital
- Lifecare Clinics
- St. Athanasius Hospital

Anambra:
- Harmony Hospital
- Madonna Hospital
- Toronto Hospital
- R.N. Afunugo Memorial Hospital
- Mercy Specialist Hospital, Onitsha
- St. Charles Borromeo Hospital

Bauchi:
- Shifa'a Medical Centre
- Rimi Clinics & Maternity

Bayelsa:
- St. Peter Hospital
- Asuefai/New Life Clinic

Benue:
- Pampers Hospital
- Madonna Health Services

Borno:
- Nakowa Hospital
- Kanem Hospital & Maternity
- State Specialist Hospital
- Borno Medical Clinics

Cross River:
- Ikpeme Medical Centre
- County Specialist Hospital
- Bakor Medical Centre

Delta:
- Icon Clinic & Maternity Home
- St. Joseph Catholic Hospital
- Dayspring Specialist Clinic
- Dayspring Hospital
- Capitol Hill Clinic/Hospital
- Obule Medical Centre
- Queen of Apostle Catholic Hospital

Ebonyi:
- Christ The King Hospital

Edo:
- Time Hospital
- Irrua Specialist Hospital
- Hope Clinics & Maternity
- St. Margaret Hospital & Maternity
- Mt. Gilead Hospital
- Christ Medical Centre, Benin

Ekiti:
- Olumorin Specialist Hospital
- Gilead Specialist Hospital
- Adetade Hospital

Enugu:
- Eastern Nigeria Medical Centre
- Imperial Specialist Hospital
- St. Leo Hospital
- Ristella Hospital & Maternity

Kaduna:
- Jowako Hospital
- Ladiya Clinic
- Alba Clinic & Medical Centre
- Ishaku Hospital
- St. Gerrard Catholic Hospital
- Salama Infirmary
- Belmont Hospital

Kano:
- International Clinic Kano
- Premier Clinic
- Barewa Clinic & Maternity
- Alheri Hospital (listed under Katsina in the table)

Kebbi:
- Godiya Hospital

Kogi:
- Fisayo Clinic & Maternity
- Niger Hospital, Lokoja

Kwara:
- Ola Olu Hospital
- Olanrewaju Hospital
- Wale Clinic & Maternity

Lagos:
- Mucas Hospital
- All Souls Infirmary
- Olaniba Hospital
- The Royal Infirmary
- Bee Hees Hospital
- Light Hospital
- Krown Hospital
- Gloria Hospital
- Abbey Medical Centre
- Christ Medical Centre
- Dako Medical Centre
- Kiladejo Hospital
- Mt. Sinai Hospital
- St. Anne's Infirmary
- Crystal Hospital
- Prince & Princess Hospital
- Talent Specialist Hospital
- Golden Cross Infirmary
- Aniyun Hospital
- R-Jolad Hospital
- Longing Medical Centre
- Mercy Thomas Oredugba Hospital
- Liberty Specialist Hospital
- Goodseed Specialist Clinics
- First City Hospital
- A.K. Oyekan Clinics
- Royal Cross Medical Centre
- De-Balm Hospital
- Blue Cross Hospital
- Total Health Clinic & Maternity
- Newgate Medical Services Ojodu
- Ameso Specialist Hospital
- P&G Medical Center
- Peterhoff Specialist Hospital
- Betta Hospital
- Folabi Medical Centre
- Ultima Hospital
- A.B. Specialist Hospital
- Maranatha Hospital
- Jon Ken Hospital
- Capes Clinics & Hospital
- Royal Specialist Hospital
- Zolace Clinic
- Lobel Hospital Clinic & Maternity
- Vones Hospital
- Araba Medical Centre
- Agape Medical Centre
- Hillstar Clinics
- Life Hope Multiconsult Medical Centre

Nasarawa:
- Sauki Hospital, Lafia
- Kowa Hospital

Niger:
- Al-Azeez Medical Centre
- Top Medical Clinic
- Liberty Hospital

Ogun:
- Mercy Group Hospital
- Rubee Medical Centre
- Shirish Clinic
- Alpha Clinic
- El-Bethe Medical Centre
- Ojugbele Specialist Hospital
- Owokoniran Memorial Hospital
- Glory Medical Centre
- Olabanji Clinic
- Overcomers Specialist Hospital

Ondo:
- Joe-Jane Medical Centre
- Oludare Hospital
- Sijuade Specialist Hospital
- St. John & Mary Hospital
- Oke Royal Hospital
- Fujah Specialist Hospital
- Babalola Medical Centre
- Inland Medical Centre
- Sckye Hospitals
- Hopeland Hospital Akure

Osun:
- Olunife Hospital
- Oba Adenle Memorial Specialist Hospital
- KLM Hospital
- Adebare Specialist Hospital
- Biket Medical Centre
- Onward Hospital
- Oroki Hospital

Oyo:
- Alafia Hospital
- Lafia Group of Hospitals
- J-Rapha Hospital
- Continental Hospital
- Unity Medical Centre
- Idi-Ape Medical Centre
- Molly Hospital
- Jericho Nursing Home
- Samron Specialist Hospital
- Medical Practitioner Services Limited
- Ayokemi Hospital & Ultrasound Centre
- Toun Hospital
- Olayonu Medical Centre Hospital & Maternity Services
- Shalom Medical Centre
- St. Lucia Hospital

Plateau:
- Sauki Clinic & Hospital
- Tadam Medical Centre
- Solat Women Hospital
- New Crescent Hospital
- Jama'a Clinic
- Chillas Specialist Hospital
- Our Lady of Apostle Catholic Hospital

Rivers:
- Ofure Specialist Clinic
- Pamo Clinic & Hospital
- Military Hospital
- Delta Specialist Hospital, Bonny Island
- Princess Medical Centre
- Garrison Hospital
- St. Martins Hospital
- The Shield Clinic
- Foundation Clinic, Omoku
- New Heights Consultants
- Teme Hospital

Sokoto:
- Sokoto Clinic
- Sahel Hospital

Taraba:
- Courage Hospital
- Bethel Specialist Hospital

Yobe:
- Ajiko Hospital
- Borno Medical Centre
- Unik Clinic & Maternity

Zamfara:
- Daula Hospital & Maternity Home

### IMPORTANT

The list above is the publicly exposed Standard network from the current official page, but this is not necessarily the universe of all AIICO providers because AIICO has separate access pages for:
- Standard
- Executive
- Super Executive
- Magnum/Concierge
- Dental
- Eye

Therefore the database must keep separate network records by access class.

---

# 9. AXA MANSARD

## Official retail provider directory

https://www.axamansard.com/health/retail-hospitals

The current page explicitly requires plan selection:

- Bronze
- Silver
- Gold
- Platinum
- Platinum Plus
- Rhodium
- IMED-Standard
- IMED-Classic
- IMED-Prime

The current page exposes actual provider records with:

- hospital name
- address
- city/state

Example current records in the publicly exposed crawl:

- Christiana Dental Clinic — Umuahia
- Chukwuebuka Hospital — Umuahia
- Ekeoma Memorial Hospital — Aba
- Excel Global Eye Clinic — Aba
- Federal Medical Centre Umuahia
- Global Eye Clinic — Aba
- Horstman Hospital — Aba
- Life Care Clinics Ltd — Aba
- Living Word Mission Eye Clinic — Aba

### Silver

https://www.axamansard.com/health/retail-hospitals/silver/

### Provider structure

Plan-by-plan directories are separate URLs.

This is extremely important.

The platform should not model:

> AXA provider list

but:

> AXA Bronze provider list  
> AXA Silver provider list  
> AXA Gold provider list  
> etc.

### Historical/alternate provider pages

A pilot.axamansard.com provider page also exists in the public index.

Do not automatically merge it with current data.

Classify:
- current production domain
- legacy/pilot domain
- current status unknown

---

# 10. TOTAL HEALTH TRUST / TANGERINE

## Official network

https://tht.tangerine.africa/provider-network

Current company statement:

> **1700+ providers**

The network includes:

- primary care clinics
- secondary/specialist care
- pharmacies
- gyms
- ancillary services including laboratories/X-ray

Specialist areas displayed:

- cardiology
- general surgery
- neurology
- paediatrics
- orthopaedics
- endocrinology
- haematology
- anaesthetics
- dermatology
- oncology
- gastroenterology
- ENT
- obstetrics/gynaecology
- urology
- chiropractors

### Public provider finder

https://tht.tangerine.africa/find-provider

Publicly exposed records include:

- BT Health and Diagnostics Centre ASUTH-Lagos
- 68NARHY
- 82 Division Hospital
- A.B. 10 Medicare Hospital Limited-Lagos
- AS Radiance Specialist Hospital-Lagos
- AB Specialist Hospital-Lagos
- Abake Medical Centre-Osun
- Abbey Medical Centre-Lagos
- A Saint M Hospital Port Harcourt
- Abelo Eye Clinic, Warri-Delta
- Abi Clinics and Hospital-Kaduna
- Access Medical-Ogun
- Access Oral Health Care Services-Ogun
- Acron Medical Consultants-Rivers
- Adanta Children Hospital-Rivers
- Ade-Tade Hospital-Ekiti
- Adenle Memorial Specialist Hospital-Osun
- Adetula Optical Services Nig. Ltd-Lagos
- Afikpo Medical Centre-Ebonyi
- Afriglobal Medicare Limited-Lagos
- Afrimed OGP Specialist-Lagos
- Aggrey Clinic-Rivers
- Aggrey Clinic Annexe-Rivers
- Ajiko Medical Centre-Yobe
- AK Oyekan Hospital-Lagos
- Akemekhai Medical Centre-Edo
- Akulue Memorial Hospital-Enugu
- Al-Azeez Medical Centre-Niger
- Alba Clinics & Medical Centre-Kaduna
- Alfa Clinic-Bayelsa
- Alfol Cardiology Clinic-FCT
- Alheri Clinic-Katsina
- Alheri Hospital-Lagos
- All Smiles Dental Clinic-Lagos
- All Soul's Clinics-Lagos
- All Souls Infirmary-Lagos
- Alliance Clinics and Services-FCT
- Allure Eyecare-Kwara
- Alma Clinic & Surgery-Akwa Ibom
- Alma Hospital-Rivers
- Alpha Clinic-Ogun
- Alpha Hospital-Benue
- Alpha Zone Eye Clinic-FCT
- Amara Medicare Limited-Lagos
- Amazing Grace Hospital-Ogun
- Ameso Clinic-Lagos
- Anchor Hospital-Rivers
- Anchormed Hospital-Kwara
- Andchristie Dental Clinic-Lagos
- Angel & Eagle Specialist Hospital-Ogun

### Wellness network

https://tht.tangerine.africa/wellness-providers

Current public examples:

- Clinix Healthcare Limited — multiple Lagos locations
- Crestview Radiology — Ikeja
- Crestview Radiology — Igbobi
- Crestview Radiology — Victoria Island

### Full-list status

The current finder is dynamic.

**Not fully extracted.**

---

# 11. MEDIPLAN

Official website:

https://mediplanhealthcare.com/

The public site references provider/network operations but a complete current provider directory was not exposed in the crawl.

### Full-list status

**Not fully extracted.**

Research next:

- provider page
- member app provider finder
- provider enrollment materials
- provider PDF
- search-indexed documents
- public API endpoints if any

Do not infer a provider count from marketing language.

---

# 12. IHMS

## Official provider page

https://ihmsnigeria.com/find-a-provider/

Current page states:

- nationwide presence
- **1k+ healthcare providers**
- **300+ providers in Lagos**
- 4+ weekly provider onboarding
- utilization reviews for appropriateness/necessity/efficiency

It asks users to request the full provider list.

### Older provider app

https://app.ihmsnigeria.com/p/find-a-provider/

Publicly searchable application page exists but did not expose provider records in the crawl.

### Full-list status

**Not fully extracted.**

The “Request for full providers list” mechanism indicates that IHMS may not publish the entire current network openly.

---

# 13. NOVO HEALTH AFRICA

## Official provider directory

https://novohealthafrica.org/healthcare-providers/

Current page says:

> Find a healthcare provider

Provider types:
- Hospitals
- Laboratories
- Specialists

It exposes plan access columns:

- SIP — Standard Individual Plan
- DIP — Discover Individual Plan
- VIP — Value Individual Plan
- Plan — Minimum Plan that can access care

This is strong evidence that provider access is **plan-specific**.

### Current site

https://novohealthafrica.org/

The current site says retail plans and displays the Novo Companion App.

### Full-list status

The provider page is dynamic and current crawl did not expose all provider rows.

**Not fully extracted.**

---

# 14. NEM HEALTH

## Official network landing page

https://www.nem-health.com/providers

Current company statements:

- over 2,000 NHIS-accredited primary healthcare providers, hospitals and clinics
- over 500 accredited optical centres

The site explicitly says network access depends on:

- Individual
- SME
- Corporate
- Golden Care

and premium hospitals/specialist services may be restricted to higher-tier plans.

### Primary-care directory

https://www.nem-health.com/providers/primary-care-providers

The public page currently shows:

**Page 1 of 72**

Current exposed providers include:

- Amara Medicare Ltd — Sangotedo — ENT
- Arubah Family Medical Centre — Agungi
- Budo Specialist Hospital — Ajah
- Cedarcare Hospital
- Dove Hospital and Healthcare Services Ltd
- Lennox Hospital
- The Royal Infirmary
- Utmost Care Hospital
- Caremax Hospital
- St Edward Specialist and Cardiac Centre
- JLT Specialist Clinic and Skin Centre
- Queensway Hospital
- Amara Medicare Ltd — Ikoyi — ENT
- Best Care Hospital
- Citizen Medical Center — Ikoyi
- Divine Medical Center
- Lagoon Hospitals Ikoyi
- St Ives Specialist Hospital — Ikoyi
- Amara Medicare Ltd — Lekki — ENT
- Choice of Kings Specialist Hospital

### Dental/optical

The NEM site provides separate navigation for dental and optical care.

### FAQ verification

NEM explicitly tells users to:
- use website/app
- request updated provider list
- filter dental and optical
- call the hospital directly with enrollee number to verify

This supports the HMO Blueprint's **Call Before You Buy** principle.

### Full-list status

**Not fully extracted.**

The network is at least 72 pages for primary care alone in the current crawl.

---

# 15. GREENBAY HEALTHCARE

## Official provider page

https://greenbayhmo.com/Providers/

The current public page states:

> Download a list of our providers

This is especially important.

### Current status

A provider-download asset exists on the page, but the public search result did not expose the exact downloadable file URL.

### Provider data source

https://greenbayhmo.com/Providers/

### Plan bands

Greenbay's public individual plan page uses provider bands:

- Band 1
- Band 2
- Band 3

Source:
https://greenbayhmo.com/individual-plans.html

### Corporate model

Greenbay also describes:

**Greencare Freedom**

- roaming among selected partner hospitals
- no single hospital registration required
- useful for mobile individuals/businesses
- ID-card access

And:

**Third Party Administration**

with custom/prequalified hospital-network capability.

This is an important corporate provider-network feature.

### Full-list status

**Not fully extracted.**

Next action should be to discover the actual public provider-download URL and normalize it.

---

# 16. SUNU HEALTH

Official:

https://sunuhealthnigeria.com/

The current public site strongly emphasizes:
- nationwide network
- registration
- provider portal
- real-time information
- digital ID
- mobile app
- provider services

However, the current crawl did not expose a complete provider directory.

### Full-list status

**Not fully extracted.**

Next:
- search site for provider PDF
- search public provider portal documentation
- inspect public provider locator
- search PDF assets
- search state/provider terms

---

# 17. PROVIDER NETWORK STATUS TABLE

| HMO | Current public provider count/claim | Tier/Band | Public individual records exposed | Full current list extracted? |
|---|---:|---|---:|---|
| Clearline | 1,400+ company claim | C-D / B-D retail; Band A-D + Special requires verification | No | No |
| Reliance | 450 current public page | Plan-dependent; category filters | Yes | No |
| Hygeia | Count not directly exposed in crawl | A-D | Some | No |
| Avon | Count not exposed | Plan-dependent suspected | No usable rows | No |
| Leadway | 1,000+ company claim on older provider page; current count not exposed | Plan/service/location | No usable rows | No |
| AIICO Multishield | Directory pages; full Standard table | Primary / Secondary / Tertiary; multiple plan-access pages | Many | Standard substantially exposed; not all network classes |
| AXA Mansard | Plan-specific directory | Bronze/Silver/Gold/Platinum/Platinum Plus/Rhodium | Yes | No |
| THT | 1,700+ company claim | Primary/secondary/specialist; wellness | Yes | No |
| Mediplan | Not exposed | Unknown/current status | No | No |
| IHMS | 1k+ company claim; 300+ Lagos | Plan-dependent | No | No |
| Novo | Count not exposed | SIP/DIP/VIP minimum-plan access | No usable rows | No |
| NEM | 2,000+ primary + 500+ optical claims | Tier 1-4 | Yes | No |
| Greenbay | Count not exposed | Band 1-3 | No | No |
| SUNU | Count not exposed | Current taxonomy not exposed | No | No |
| DOT | 1,902 current public directory | Coral/Emerald/Beryl + provider type | Yes | No |

---

# 18. MOST IMPORTANT DATA-DIFFERENCE DISCOVERIES

## 18.1 Provider count changes

Reliance currently shows:

> 450 providers

while an older indexed page showed:

> 2,916 providers.

This is a critical freshness example.

Do not use 2,916 as current.

---

## 18.2 Plan-specific access is widespread

Confirmed/strong public evidence from:

- Clearline
- Hygeia
- Reliance
- Leadway
- AIICO
- AXA
- NEM
- Novo
- Greenbay
- DOT

Therefore provider-network scoring must be plan-specific.

---

## 18.3 Specialties can be separate networks

AIICO publicly separates:
- dental
- eye
- physiotherapy
- ENT
- radiology/lab

THT separately exposes:
- wellness
- specialist

NEM separately exposes:
- optical
- dental
- primary care

Therefore:

**Provider Network ≠ Hospital Network only.**

---

# 19. PROVIDER TYPES TO NORMALIZE

Every provider must map into one or more:

- General Hospital
- Primary Clinic
- Secondary Hospital
- Tertiary Hospital
- Specialist Clinic
- Diagnostic Laboratory
- Imaging Centre
- Dental
- Optical
- Pharmacy
- Physiotherapy
- ENT
- Psychiatry
- Psychotherapy
- Orthopaedic
- Paediatrics
- Maternity
- Emergency
- ICU
- Gym
- Spa
- Wellness
- Other Ancillary

---

# 20. PLAN ACCESS FIELD

Every provider record must capture:

```text
plan_access:
    minimum_plan
    maximum_tier
    specific_plans
    band
    category
```

Example:

```text
HMO: NEM
Provider: Lagoon Hospitals Ikoyi
Access:
  Tier 1
  Tier 2
  Tier 3
  Tier 4
```

Or:

```text
HMO: Clearline
Provider:
  Band C
  Band D
```

Do not assume access from HMO membership alone.

---

# 21. PROVIDER STATUS

Every provider relationship should have:

- Active
- Suspended
- Temporarily unavailable
- Removed
- Unknown
- Needs verification

and:

- last verified date
- evidence source
- method of verification

---

# 22. “FULL LIST” DEFINITION FOR HMO BLUEPRINT

A provider list should only be labeled:

# FULL VERIFIED PROVIDER LIST

when:

1. all pages have been extracted,
2. duplicate facilities have been normalized,
3. provider counts reconcile,
4. plans/bands are mapped,
5. state/LGA is mapped,
6. the source date is known,
7. provider status is not assumed,
8. the current source is preserved.

Otherwise label:

> Public directory extract.

---

# 23. HOW TO BUILD THE ACTUAL FULL LIST

For dynamic directories, the Claude Code stage should use only **publicly accessible** endpoints/assets.

Workflow:

```text
PUBLIC DIRECTORY
      ↓
INSPECT ORDINARY FILTER/PAGINATION
      ↓
IDENTIFY PUBLIC DATA ENDPOINT
      ↓
REQUEST EACH PAGE / STATE / CATEGORY
      ↓
NORMALIZE JSON/HTML
      ↓
DEDUPLICATE
      ↓
MAP PLAN/TIER
      ↓
VALIDATE COUNT
      ↓
STORE SOURCE
      ↓
CREATE SNAPSHOT
```

Do not bypass:
- login
- CAPTCHA
- authentication
- private provider portals
- access controls

---

# 24. RECOMMENDED FULL-EXTRACTION ORDER

## Priority 1

- Clearline
- AIICO
- AXA
- DOT
- NEM
- THT

because their public provider pages expose substantial structured data.

## Priority 2

- Reliance
- Leadway
- Hygeia
- Avon
- Novo

because their public directories are dynamic.

## Priority 3

- Greenbay
- IHMS
- Mediplan
- SUNU

because the complete network may require a public download request/API/provider asset discovery.

---

# 25. FINAL PROVIDER ENGINE PRINCIPLE

Do not tell users:

> “HMO A has 2,000 hospitals.”

Tell them:

> “Your selected plan gives you access to 137 verified providers within your chosen location, including 4 hospitals, 3 dental providers, 2 optical centres and 1 emergency facility.”

That is the real value of the HMO Blueprint platform.

---

# 26. FINAL DISCLAIMER FOR PROVIDER DATA

> Provider-network information can change without notice. A facility appearing on an HMO directory does not guarantee that your exact plan, service or tier will be accepted at the time of care. Always confirm directly with the HMO and healthcare facility before purchasing or receiving major care. Provider counts are not equivalent to provider quality.

---

# 27. PRIMARY PROVIDER SOURCE LINKS

### Clearline
https://clearlinehmo.com/providers

### Reliance
https://getreliancehealth.com/nigeria/providers/

### Reliance Lagos
https://getreliancehealth.com/nigeria/providers/hospitals-in-lagos/

### Hygeia
https://hygeiahmo.com/provider-directory/

### Avon
https://app.avonhealthcare.com/find-my-provider

### Leadway
https://leadwayhealth.com/find-a-provider-list/

https://leadwayhealth.com/findaprovider/

https://api-enrollee.leadwayhealth.com/Help/Api/GET-v1-api-provider-listProviders_scheme_id_descpline_lng_lat_state_city

### AIICO
https://www.aiicomultishield.com/index.php/hospital-access/standard-hospital-access

https://www.aiicomultishield.com/index.php/hospital-access/executive-hospital-access

https://www.aiicomultishield.com/index.php/hospital-access/super-executive-hospital-access

https://www.aiicomultishield.com/index.php/hospital-access/magnum-concierge-hospital-access

https://www.aiicomultishield.com/index.php/hospital-access/dental-clinic

https://www.aiicomultishield.com/index.php/hospital-access/eye-clinc

https://www.aiicomultishield.com/index.php/support/who-is-a-provider

### AXA Mansard
https://www.axamansard.com/health/retail-hospitals

https://www.axamansard.com/health/retail-hospitals/silver/

### THT
https://tht.tangerine.africa/provider-network

https://tht.tangerine.africa/find-provider

https://tht.tangerine.africa/wellness-providers

### Mediplan
https://mediplanhealthcare.com/

### IHMS
https://ihmsnigeria.com/find-a-provider/

https://app.ihmsnigeria.com/p/find-a-provider/

### Novo
https://novohealthafrica.org/healthcare-providers/

### NEM
https://www.nem-health.com/providers

https://www.nem-health.com/providers/primary-care-providers

### Greenbay
https://greenbayhmo.com/Providers/

### SUNU
https://sunuhealthnigeria.com/

### DOT
https://www.dothmo.co/providers

---

# 28. HANDOFF TO CLAUDE PROJECT

Load this file into the HMO Blueprint Project and instruct Claude:

> Treat this as the 26 August 2026 provider-network research snapshot.
>
> Do not label any section as a full verified provider list unless the complete underlying dataset has actually been extracted and reconciled.
>
> Convert every exposed provider into the normalized PROVIDER schema.
>
> Preserve all provider counts as dated company claims unless independently verified.
>
> Keep plan-specific/tier-specific access separate.
>
> For dynamic directories, create a provider-extraction research task rather than inventing missing rows.
>
> Prioritize complete extraction from publicly accessible pages, public downloadable files and public APIs where allowed.
>
> Never bypass authentication or access controls.
>
> Preserve historical/older provider counts separately from current counts.
>
> Every provider relationship must have source, date, plan/tier/band where available, and verification status.

---

# 29. FINAL PRINCIPLE

A provider list is not simply a list.

It is:

**HMO + PLAN + BAND/TIER + PROVIDER + LOCATION + SERVICE + STATUS + DATE + EVIDENCE**

That is the provider intelligence model required for the HMO Blueprint Nigeria decision engine.
