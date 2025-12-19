# Documentation Index

Welcome to the Vietnamese Tax Calculator 2026 documentation suite. This folder contains comprehensive guides for understanding, developing, and maintaining the project.

## Quick Navigation

### 📋 For Project Overview
Start here to understand what the project does, why it exists, and what it aims to accomplish.
- **[project-overview-pdr.md](./project-overview-pdr.md)** - Project vision, features, requirements, and roadmap

### 🏗️ For Architecture & Design
Understand how the project is structured, how data flows, and how components interact.
- **[system-architecture.md](./system-architecture.md)** - Data flow diagrams, module dependencies, performance characteristics
- **[codebase-summary.md](./codebase-summary.md)** - Directory structure, module descriptions, algorithms

### 💻 For Development
Learn the standards and conventions to follow when writing code for this project.
- **[code-standards.md](./code-standards.md)** - JavaScript, HTML, CSS conventions, security, testing, accessibility

### 🚀 For Getting Started
Quick setup and deployment instructions are in the main README at project root.
- **[../README.md](../README.md)** - Quick start, tech stack, features, deployment

---

## By Role

### New Developer
1. Read **README.md** (project root) - 10 min
2. Read **project-overview-pdr.md** - 15 min
3. Read **codebase-summary.md** - 15 min
4. Review **code-standards.md** - reference as needed

### UI/Frontend Developer
1. **code-standards.md** (HTML/CSS section)
2. **system-architecture.md** (state management, data flow)
3. **codebase-summary.md** (main.js module)

### Tax Calculation Developer
1. **codebase-summary.md** (module architecture)
2. **system-architecture.md** (calculation engine internals)
3. **code-standards.md** (function style, testing)

### DevOps/Deployment
1. **README.md** (deployment section)
2. **system-architecture.md** (deployment architecture)
3. **project-overview-pdr.md** (deployment requirements)

### Product Manager/QA
1. **project-overview-pdr.md** (features, acceptance criteria, success metrics)
2. **README.md** (quick overview)

---

## Documentation Structure

```
docs/
├── README.md (this file)
│   └─ Documentation navigation index
│
├── project-overview-pdr.md (2,100 words)
│   ├─ Project vision & goals
│   ├─ Feature specifications
│   ├─ Requirements (functional + non-functional)
│   ├─ Tax rules (old 2025 vs new 2026)
│   ├─ Phase breakdown & roadmap
│   ├─ Success criteria & acceptance tests
│   └─ Risk assessment & maintenance plan
│
├── codebase-summary.md (2,000 words)
│   ├─ Directory structure overview
│   ├─ Module architecture (4 modules)
│   ├─ Function descriptions & algorithms
│   ├─ Dependencies & build pipeline
│   ├─ SEO implementation
│   ├─ Performance metrics
│   └─ Development patterns
│
├── code-standards.md (2,300 words)
│   ├─ JavaScript style guide (naming, functions, comments)
│   ├─ HTML standards (semantic markup, accessibility)
│   ├─ CSS standards (BEM, custom properties, responsive)
│   ├─ Performance budgets & optimization
│   ├─ File organization & module patterns
│   ├─ Security standards (input validation, XSS)
│   ├─ Testing structure (unit & integration tests)
│   ├─ Version control conventions
│   └─ WCAG 2.1 AA accessibility checklist
│
└── system-architecture.md (2,500 words)
    ├─ High-level system diagram
    ├─ Data flow architecture (unidirectional)
    ├─ Module dependency graph
    ├─ State management shape & mutations
    ├─ Calculation engine internals (algorithms, examples)
    ├─ Performance characteristics (latency, memory, bundle)
    ├─ Browser compatibility matrix
    ├─ Security model (input validation, privacy)
    └─ Deployment architecture (build → hosting → caching)
```

---

## Key Information Quick Reference

### Tax Rules
- **2026 New**: 5-bracket (5%-35%), personal 15.5M, dependent 6.2M
- **2025 Old**: 7-bracket (5%-35%), personal 11M, dependent 4.4M
- See **project-overview-pdr.md** for complete rules

### Performance Targets
- Bundle: <100KB gzipped
- Calculation: <100ms gross-to-net
- TTI: <2 seconds on 4G
- Lighthouse: >90 score
- See **README.md** for detailed metrics

### Technology Stack
- Frontend: Vanilla JS + HTML5 + CSS3
- Build: Vite 7.3.0 + Bun
- Icons: Lucide v0.562.0
- Deployment: Cloudflare Pages
- See **README.md** for full stack

### Project Status
- **Phase 01**: Complete ✓
- **Phase 02**: Complete ✓
- **Phase 03**: In Progress 🔄 (UI Integration)
- **Phase 04**: Pending ⏳ (SEO & Deployment)
- **Phase 05**: Pending ⏳ (Enhancement & Optimization)

---

## Common Questions

### Q: Where do I start if I'm new to the project?
A: Read the main **README.md** first (5 min), then **project-overview-pdr.md** (15 min), then review the codebase with **codebase-summary.md** (15 min).

### Q: Where are the tax calculation rules documented?
A: **project-overview-pdr.md** has complete tax rules (2025 old vs 2026 new) with examples. **codebase-summary.md** has algorithm walkthroughs.

### Q: What are the code conventions I should follow?
A: See **code-standards.md** for JavaScript, HTML, CSS, security, testing, and accessibility standards.

### Q: How is the application structured?
A: **codebase-summary.md** shows directory structure. **system-architecture.md** explains module dependencies and data flow.

### Q: What are the performance requirements?
A: See **README.md** (performance table) and **project-overview-pdr.md** (non-functional requirements).

### Q: How do I deploy this?
A: **README.md** has deployment section for Cloudflare Pages. See **system-architecture.md** for deployment architecture details.

### Q: Is there a checklist for code review?
A: Yes, use **code-standards.md** as a checklist for JS/HTML/CSS standards, security, and accessibility.

### Q: What are the success criteria for deployment?
A: **project-overview-pdr.md** has acceptance criteria verification section with test cases and checklist.

---

## Document Maintenance

These documents are maintained alongside code changes:

- **Update Frequency**:
  - Monthly: Review tax rule constants (in case regulations change)
  - Per Phase: Update phase breakdown & roadmap
  - Per Release: Update changelog in README.md
  - Quarterly: Update A11Y & performance audits

- **Version Control**: All docs in Git, changes tracked with commits

- **Ownership**: TBD (assign documentation owner)

---

## Feedback & Improvements

If you find:
- **Inaccuracies**: Report immediately, document is source of truth
- **Gaps**: Add to docs/TODO or create issue
- **Outdated Info**: Flag for review, update accordingly
- **Unclear Sections**: Rephrase for clarity

Documentation is a living artifact—keep it current!

---

**Last Updated**: 2025-12-19
**Status**: Complete (Phases 01-02 documented, Phase 03 in progress)
**Maintainer**: TBD
**Next Review**: 2026-01-10 (before Phase 04)
