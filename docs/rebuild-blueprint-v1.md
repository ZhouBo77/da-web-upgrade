# DaCare Site Rebuild Blueprint v1

## Project Goal
Complete rebuild of www.dacare-group.com (content optimization + full mobile-first modernization), then publish once complete.

## Completed
- Legacy site snapshot archived into repo:
  - `legacy-site-snapshot/2026-02-23/`
  - 391 files (HTML/CSS/images/assets)
  - Commit: `a831966`

## Legacy Information Architecture (from snapshot)
- Language roots:
  - `/en/*`
  - `/cn/*`
- Main sections (both languages):
  - Home
  - About
  - Employers
  - Candidates
  - Library
  - Contact

## Rebuild Target Architecture
- `/en`
  - `/en` (home)
  - `/en/about`
  - `/en/services`
    - `/en/services/executive-search`
    - `/en/services/staffing`
    - `/en/services/hr-training`
  - `/en/industries`
  - `/en/insights`
  - `/en/contact`
- `/zh`
  - `/zh` (home)
  - `/zh/about`
  - `/zh/services`
  - `/zh/industries`
  - `/zh/insights`
  - `/zh/contact`

## Delivery Phases
1. **Foundation**
   - New IA + URL mapping + 301 redirect map
   - Design tokens + responsive layout system
2. **Core Pages**
   - Home/About/Services/Contact (EN + ZH)
3. **Content Migration**
   - Employers/Candidates/Library old content restructuring
4. **Quality Gate**
   - Mobile UX checks, SEO structure checks, link integrity, performance baseline
5. **Publish**
   - One-time cutover after full pass, with rollback plan

## Immediate Next Build Tasks (in progress)
- Scaffold new fullstack app structure for bilingual routes and shared layout
- Build responsive global header/footer/nav
- Implement first production-grade pages:
  - `/en`
  - `/zh`
  - `/en/services`
  - `/zh/services`
