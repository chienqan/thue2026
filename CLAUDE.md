# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vietnamese salary tax calculator comparing 2026 new regulations vs 2025 old regulations. Client-side SPA with real-time gross-to-net conversion.

**Live**: https://thue2026.com | **Stack**: Vanilla JS + Vite + Cloudflare Pages

## Commands

```bash
# Development
bun run dev          # Start dev server at http://localhost:3000
npm run dev          # Alternative with npm

# Production
bun run build        # Build to dist/ (~70KB gzipped)
bun run preview      # Preview production build

# Deployment (auto-deploys on push to main)
git push origin main
```

## Architecture

```
src/
├── scripts/
│   ├── main.js         # UI orchestration, event handlers, state management
│   ├── calculator.js   # Tax engine: calcTax(), calcInsurance(), grossToNet()
│   ├── constants.js    # Tax brackets (TAX_OLD, TAX_NEW), REGIONS, rates
│   └── format.js       # VND formatter: format(), formatUnit(), formatShort(), parse()
├── styles/
│   ├── main.css        # Design system (Slate/Emerald palette)
│   └── fonts.css       # @font-face declarations
└── index.html          # SPA with SEO meta tags

public/                 # Static assets (robots.txt, sitemap.xml, _headers, _redirects)
docs/                   # Project documentation (PDR, architecture, code standards)
```

### Key Module Relationships
- `main.js` imports from `calculator.js`, `constants.js`, `format.js`
- `calculator.js` imports `REGIONS`, `BASE_WAGE`, `CAP_MULT` from `constants.js`
- State object: `{ salary, deps, region }` drives all calculations

### Tax Calculation Flow
1. User input → state update → `grossToNet(salary, deps, region, TAX_OLD|TAX_NEW)`
2. `grossToNet` calls `calcInsurance()` then `calcTax()` with progressive brackets
3. Returns `{ gross, ins, deduct, taxable, tax, net }`

## Tax Rules Reference

**2026 NEW** (5-bracket): 0-10M→5%, 10-30M→10%, 30-60M→20%, 60-100M→30%, 100M+→35%
**2025 OLD** (7-bracket): 0-5M→5%, 5-10M→10%, 10-18M→15%, 18-32M→20%, 32-52M→25%, 52-80M→30%, 80M+→35%

**Deductions**: Personal (NEW: 15.5M, OLD: 11M) | Dependent (NEW: 6.2M, OLD: 4.4M)
**Insurance**: SI 8% + HI 1.5% + UI 1% = 10.5% (capped at 20x min wage)

## Workflows

- Development rules: `./.claude/workflows/development-rules.md`
- Primary workflow: `./.claude/workflows/primary-workflow.md`
- Other workflows: `./.claude/workflows/*`

**IMPORTANT:** Follow development rules in `./.claude/workflows/development-rules.md`
**IMPORTANT:** Read `./README.md` before planning implementation
**IMPORTANT:** Date format from `$CK_PLAN_DATE_FORMAT` env var for plan/report naming

## Documentation

Docs in `./docs/`: project-overview-pdr.md, code-standards.md, codebase-summary.md, system-architecture.md