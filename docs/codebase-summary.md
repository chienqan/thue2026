# Codebase Summary - Vietnamese Tax Calculator 2026

## Overview

**Project**: taxcalc-vn-2026
**Domain**: https://thue2026.com
**Purpose**: Real-time tax calculator comparing 2026 Vietnamese salary tax regulations (old vs new)
**Stack**: Vite 7.3.0 + Bun + Vanilla JavaScript + CSS3
**Target Size**: <100KB bundle | <100ms calculations

## Directory Structure

```
src/
├── index.html              # Main HTML with SEO & schema
├── scripts/
│   ├── main.js            # UI orchestration & state management
│   ├── calculator.js      # Tax calculation engine
│   ├── constants.js       # Tax brackets & regional data
│   └── format.js          # VND currency utilities
├── styles/
│   ├── main.css           # Design system (Slate/Emerald palette)
│   └── fonts.css          # Self-hosted font declarations
└── fonts/
    ├── plus-jakarta-sans-*.woff2      # UI font (4 weights)
    └── jetbrains-mono-*.woff2         # Code font (3 weights)

public/
├── robots.txt             # SEO: crawler directives
├── sitemap.xml            # SEO: site structure
├── favicon.ico            # Favicon (ICO format)
├── favicon.svg            # Favicon (SVG format)
├── site.webmanifest       # PWA manifest
└── og-image.png           # Social sharing preview

dist/                       # Production build output
.claude/                    # Claude Code workflow config
plans/                      # Development plans & reports
```

## Module Architecture

### `src/scripts/calculator.js`
**Core Calculation Engine**

Exports 4 primary functions for tax computation:

- `calcTax(income, brackets)` - Progressive tax calculation across brackets
- `calcInsurance(gross, region)` - Insurance deductions with regional caps
- `grossToNet(gross, deps, region, tax)` - Complete gross-to-net conversion
- `getTaxBreakdown(income, brackets)` - Detailed bracket-by-bracket breakdown

**Key Algorithm**: Progressive tax applied across bracket thresholds with no income carryover.

```js
// Example: Income 30M VND, Old Tax Rules
// Bracket 1: 0-5M @ 5% = 250K
// Bracket 2: 5-10M @ 10% = 500K
// Bracket 3: 10-18M @ 15% = 1.2M
// Bracket 4: 18-30M @ 20% = 2.4M
// Total tax = 4.35M
```

### `src/scripts/constants.js`
**Tax & Region Configuration**

```js
TAX_OLD = {
  BRACKETS: 7-band (5%-35%), personal deduction 11M, dependent 4.4M
}

TAX_NEW = {
  BRACKETS: 5-band (5%-35%), personal deduction 15.5M, dependent 6.2M
}

REGIONS = {
  I: 5,310,000 VND/month
  II: 4,730,000 VND/month
  III: 4,140,000 VND/month
  IV: 3,700,000 VND/month
}

BASE_WAGE = 5,310,000 (national reference)
CAP_MULT = 20 (insurance cap multiplier)
```

**Insurance Rates** (calculated on gross, capped at 20x regional minimum):
- Social Insurance (SI): 8%
- Health Insurance (HI): 1.5%
- Unemployment Insurance (UI): 1%
- **Total**: 10.5% of gross

### `src/scripts/format.js`
**Currency Formatting Utility**

```js
VND.format(30000000)        // "30.000.000"
VND.formatUnit(30000000)    // "30.000.000 đ"
VND.formatShort(30000000)   // "30.0M"
VND.parse("30.000.000")     // 30000000
```

Uses Vietnamese locale for separator formatting (space as thousand separator).

### `src/scripts/main.js`
**UI Orchestration & State Management**

**State Shape**:
```js
{ salary: number, deps: 0-10, region: 'I'|'II'|'III'|'IV' }
```

**Key Responsibilities**:
1. Input handlers: salary input, dependent counter, region selection
2. Real-time calculation trigger on state change
3. DOM updates: result cards, chart visualization, detail tables
4. Icon initialization (Lucide icons for UI elements)
5. Comparison rendering: old vs new tax rules side-by-side

**Events Handled**:
- Salary input (validates positive numbers)
- Dependent counter (+/- buttons)
- Region radio buttons
- Component mount/unmount

### `src/index.html`
**Single-Page Application Structure**

**Meta Tags**:
- Open Graph (og:title, og:description, og:image)
- JSON-LD schemas: WebApplication + FAQPage
- Canonical URL & language directives
- Vietnamese-specific keywords

**Layout Sections**:
1. **Header**: Logo + "Hiệu lực từ 1/7/2026" badge
2. **Input Section**: Salary field, dependent counter, region selector
3. **Results Section**:
   - Side-by-side tax comparison cards
   - Bar chart (tax vs net comparison)
   - Detailed breakdown tables
4. **FAQ Section**: 4 FAQs for SEO rich snippets
5. **Footer**: Copyright statement

**Styling System**:
- CSS custom properties for theme (--color-emerald, --color-slate, etc.)
- Mobile-first responsive grid
- Accessible form controls
- Semantic HTML

## Dependencies

**Runtime**:
- `lucide` v0.562.0 - Icon library (Users, Minus, Plus, Sparkles, TrendingUp)

**Build-Time**:
- `vite` v7.3.0 - Module bundler
- `terser` v5.44.1 - JavaScript minifier

## Build Pipeline

**Dev Server**: `bun run dev` → http://localhost:3000
- Hot module replacement
- Auto-opens browser

**Production Build**: `bun run build`
- Output: `dist/` directory
- Minification: Terser (console.log dropped, mangle enabled)
- CSS minification: inline
- Asset hashing: `[name]-[hash].[ext]`
- No source maps

**Deployment**: Bunny CDN
- Single-file HTML output (CSS + JS inlined)
- Fonts cached via CDN edge
- Global distribution via Bunny Edge network

## SEO Implementation

**Structured Data**:
- WebApplication schema (for search engine recognition)
- FAQPage schema (rich snippets in search results)

**Meta Optimization**:
- Target keywords: "thuế 2026", "thue TNCN", "giảm trừ gia cảnh 2026"
- Language: Vietnamese (vi_VN)
- Social media: Open Graph, Twitter Card

**Content Strategy**:
- Embedded FAQ section for SEO
- Semantic HTML structure
- Fast page load (inlined CSS, preloaded JavaScript)

## Performance Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Bundle Size | <100KB | ✓ On track |
| Calculation Speed | <100ms | ✓ <1ms (synchronous) |
| Fonts | Self-hosted WOFF2 | ✓ Subset for Vietnamese |
| CSS | Minified, inlined for critical | ✓ Implemented |

## Development Patterns

**No External API Calls**: All calculations performed client-side

**State Management**: Simple object-based (no frameworks)

**DOM Manipulation**: Direct element access via `getElementById`, no virtual DOM

**Icon System**: Lucide icons initialized on component mount

**Responsive Design**: CSS Grid + Flexbox

## Testing Strategy

**Manual**:
- Visual regression testing in multiple regions
- Tax calculation verification against official rates
- Browser compatibility (Chrome, Safari, Firefox)

**Integration**:
- Compare old vs new tax rules on multiple salary inputs
- Verify dependent deduction stacking (0-10)
- Region selection impacts insurance caps

## Deployment Checklist

- [ ] Build succeeds (`bun run build`)
- [ ] dist/ files minified & hashed
- [ ] SEO meta tags correct
- [ ] OG image displays correctly
- [ ] Fonts load from public/fonts/
- [ ] Calculator results accurate
- [ ] Mobile responsive (test at 375px, 768px, 1440px)
- [ ] CDN routing works correctly
