# Codebase Summary - Vietnamese Tax Calculator 2026

**Last Updated**: 2026-01-03 | **Generated from**: repomix v1.10.2

## Overview

**Project**: taxcalc-vn-2026
**Domain**: https://thue2026.com
**Purpose**: Real-time tax calculator comparing 2026 Vietnamese salary tax regulations (new 5-bracket system vs old 7-bracket system)
**Stack**: Vite 7.3.0 + Bun + Vanilla JavaScript ES6+ + CSS3
**Target**: <100KB bundle | <100ms calculations | WCAG 2.1 AA accessibility

## Directory Structure

```
src/
├── index.html                  # Main SPA with SEO & structured data
├── scripts/
│   ├── main.js                # UI orchestration & state management (373 lines)
│   ├── calculator.js          # Tax calculation engine (111 lines)
│   ├── constants.js           # Tax brackets & regional config (70 lines)
│   ├── format.js              # VND currency utilities (16 lines)
│   └── region-data.js         # Province-ward region detection (436 lines)
├── styles/
│   ├── main.css               # Design system: Slate/Emerald palette (3000+ lines)
│   └── fonts.css              # Self-hosted font declarations (40 lines)
└── fonts/
    ├── plus-jakarta-sans-*.woff2       # UI font (4 weights, Vietnamese subset)
    ├── jetbrains-mono-*.woff2          # Code font (3 weights, Vietnamese subset)

public/
├── robots.txt                 # SEO crawler directives
├── sitemap.xml                # SEO site structure
├── favicon.ico                # Browser tab icon
├── favicon.svg                # Modern SVG favicon
├── site.webmanifest           # PWA manifest
└── og-image.png               # Social media preview (1200x630px)

docs/
├── project-overview-pdr.md    # Full PDR with requirements & features
├── codebase-summary.md        # This file: architecture & modules
├── code-standards.md          # Development conventions & style guide
├── system-architecture.md     # Data flow & technical diagrams
├── QUICK-REFERENCE.md         # Quick lookup for devs
└── README.md                  # Getting started guide

Configuration Files:
├── vite.config.js             # Build config (Vite, minification, inlining)
├── package.json               # Dependencies (lucide, vite, terser)
├── .gitignore                 # Version control exclusions
├── .repomixignore             # Repomix pack exclusions
├── wrangler.json              # Cloudflare Workers config (if used)
├── CLAUDE.md                  # Claude Code guidance for this repo
```

**Total Size**: 22 files | 58,729 tokens | 195,907 chars

**Top 5 Largest Files**:
1. backup.html (11,250 tokens)
2. src/scripts/region-data.js (9,796 tokens)
3. src/styles/main.css (8,346 tokens)
4. region.txt (7,233 tokens - province mapping reference)
5. src/index.html (5,960 tokens)

---

## Core Modules

### 1. src/scripts/calculator.js
**Purpose**: Tax calculation engine - computes tax and net income

**Exports** (4 primary functions):

```javascript
// Progressive tax calculation across all brackets
export function calcTax(income, brackets) {
  // Returns: tax amount based on progressive rates
  // Example: calcTax(30M, TAX_NEW.BRACKETS) → 3,250,000
  // Algorithm: Applies each bracket threshold sequentially
}

// Insurance deductions with regional caps
export function calcInsurance(gross, region) {
  // Calc: SI (8%) + HI (1.5%) + UI (1%) = 10.5%
  // Cap: 20x regional minimum wage (region-dependent)
  // Example: calcInsurance(50M, 'I') → 5,250,000 (capped at 104.4M)
}

// Complete gross-to-net conversion
export function grossToNet(gross, deps, region, tax) {
  // Returns: { gross, ins, deduct, taxable, tax, net }
  // Flow: insurance → personal deduction → dependent deductions → tax
  // Example: grossToNet(50M, 2, 'I', TAX_NEW) → {net: 42.05M, ...}
}

// Bracket-by-bracket breakdown
export function getTaxBreakdown(income, brackets) {
  // Returns: [{ bracket, rate, amount }] for visualization
  // Used for detailed breakdown tables in UI
}
```

**Algorithm Note**: Progressive tax does NOT carry over. Each bracket applies only to income within its range:
```
Income: 30M VND (TAX_NEW)
├─ 0-10M @ 5% = 500K
├─ 10-30M @ 10% = 2,000K
└─ Total: 2,500K
```

**Validation**:
- Returns `null` if invalid inputs (e.g., salary > 10B VND)
- Input ranges: salary (0-10B), deps (0-10), region (I-IV)

---

### 2. src/scripts/constants.js
**Purpose**: Centralized tax & region configuration

**Exports**:

```javascript
// OLD tax rules (2025) - 7 progressive brackets
export const TAX_OLD = {
  BRACKETS: [
    { upper: 5_000_000, rate: 0.05 },
    { upper: 10_000_000, rate: 0.10 },
    { upper: 18_000_000, rate: 0.15 },
    { upper: 32_000_000, rate: 0.20 },
    { upper: 52_000_000, rate: 0.25 },
    { upper: 80_000_000, rate: 0.30 },
    { upper: Infinity, rate: 0.35 }
  ],
  PERSONAL: 11_000_000,    // Personal deduction
  DEPENDENT: 4_400_000     // Per dependent deduction
};

// NEW tax rules (2026) - 5 progressive brackets (effective 7/1/2026)
export const TAX_NEW = {
  BRACKETS: [
    { upper: 10_000_000, rate: 0.05 },
    { upper: 30_000_000, rate: 0.10 },
    { upper: 60_000_000, rate: 0.20 },
    { upper: 100_000_000, rate: 0.30 },
    { upper: Infinity, rate: 0.35 }
  ],
  PERSONAL: 15_500_000,    // +4.5M personal deduction
  DEPENDENT: 6_200_000     // +1.8M per dependent
};

// OLD regional minimum wages (2024-2025)
export const REGIONS_OLD = {
  I: { min: 4_960_000, label: 'I' },      // HCM metro
  II: { min: 4_410_000, label: 'II' },    // Hanoi metro
  III: { min: 3_860_000, label: 'III' },  // Major cities
  IV: { min: 3_450_000, label: 'IV' }     // Other areas
};

// NEW regional minimum wages (2026)
export const REGIONS_NEW = {
  I: { min: 5_310_000, label: 'I' },     // HCM metro
  II: { min: 4_730_000, label: 'II' },   // Hanoi metro
  III: { min: 4_140_000, label: 'III' }, // Major cities
  IV: { min: 3_700_000, label: 'IV' }    // Other areas
};

// Regional area descriptions per Nghị định 128/2025/NĐ-CP
export const REGION_INFO = {
  I: { desc: '...', areas: [...] },
  II: { desc: '...', areas: [...] },
  III: { desc: '...', areas: [...] },
  IV: { desc: '...', areas: [...] }
};

// Insurance calculation constants
export const BASE_SALARY = 2_340_000;  // Base salary for BHXH/BHYT cap
export const CAP_MULT = 20;             // Multiplier: 20x regional minimum wage
```

**Insurance Calculation**:
- Social Insurance (BHXH): 8% of gross (capped at 20x national BASE_SALARY)
- Health Insurance (BHYT): 1.5% of gross (capped at 20x national BASE_SALARY)
- Unemployment Insurance (BHTN): 1% of gross (capped at 20x regional minimum wage)
- **Total**: 10.5% of gross salary

---

### 3. src/scripts/format.js
**Purpose**: Currency formatting for VND (Vietnamese Đồng)

**Exports**:

```javascript
export const VND = {
  // Format number to Vietnamese locale (1.000.000 format)
  format: (n) => Math.round(n).toLocaleString('vi-VN')
  // Returns: "30.000.000" for input 30000000

  // Format with currency symbol
  formatUnit: (n) => `${VND.format(n)} đ`
  // Returns: "30.000.000 đ"

  // Format as abbreviated (M = million, K = thousand)
  formatShort: (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  }
  // Returns: "30.0M" for input 30000000

  // Parse formatted string back to number
  parse: (s) => Number(s.replace(/\./g, ''))
  // Returns: 30000000 for input "30.000.000"
}
```

**Locale**: Vietnamese (vi_VN) - uses dot (.) as thousands separator

---

### 4. src/scripts/region-data.js
**Purpose**: Province-to-region mapping with ward-level detection

**Exports** (436 lines):

```javascript
// Hierarchical province → region → ward mapping
export const REGION_DATA = {
  'Hà Nội': { region: 'I', wards: {...} },
  'TP. HCM': { region: 'I', wards: {...} },
  'Hải Phòng': { region: 'I', wards: {...} },
  // ... 60+ more provinces
}

// Alphabetically sorted list of 63 provinces/cities
export const PROVINCES = ['An Giang', 'Bà Rịa Vũng Tàu', 'Bắc Giang', ...]

// Get region from province and optional ward
export function getRegion(province, ward = null) {
  // Returns: 'I' | 'II' | 'III' | 'IV'
  // Algorithm:
  //   1. Lookup province in REGION_DATA
  //   2. If ward provided, search wards list (exact then prefix match)
  //   3. Return region (with fallback to province default)
  // Example: getRegion('TP. HCM', 'Quận 1') → 'I'
}

// Autocomplete suggestions for wards
export function getWardSuggestions(province, query, limit = 10) {
  // Returns: string[] of matching wards
  // Matching strategy: prefix + fuzzy matching
  // Example: getWardSuggestions('Hà Nội', 'ba', 10)
  //          → ['Ba Đình', 'Bắc Từ Liêm', ...]
}
```

**Bundle Size Optimization**: Only stores non-default areas to minimize bundle (~42KB). Nghị định 128/2025/NĐ-CP compliant.

**Not Yet Used in UI**: Region selection currently via radio buttons (I-IV) only. Ward detection code available for future enhancement.

---

### 5. src/scripts/main.js
**Purpose**: UI orchestration and state management

**State Shape**:
```javascript
{
  salary: number,        // 0 to 10,000,000,000
  deps: number,          // 0 to 10 dependents
  region: 'I'|'II'|'III'|'IV'  // Selected region
}
```

**Key Responsibilities**:

1. **Input Handling**
   - Salary input field: validates positive numbers, debounced calculation
   - Dependent counter: +/- buttons, range validation (0-10)
   - Region selection: radio buttons for Zones I-IV

2. **Real-time Calculation**
   - On state change: calls `grossToNet(salary, deps, region, TAX_OLD|TAX_NEW)`
   - Updates both old and new tax calculations in parallel
   - Performance: <1ms per calculation

3. **DOM Updates**
   - Result cards: displays gross, tax, net amounts for both rules
   - Chart visualization: bar chart comparing tax and net income
   - Detail tables: progressive bracket breakdown
   - Formatting: uses VND utilities for currency display

4. **Component Initialization**
   - Lucide icon rendering: Users, Minus, Plus, Sparkles, TrendingUp icons
   - Event listeners: input change, button clicks, radio selection
   - DOM queries: getElementById for fast access to elements

5. **Comparison Rendering**
   - Side-by-side display: 2025 OLD vs 2026 NEW
   - Tax savings calculation: visual highlight of net income difference
   - Responsive layout: mobile-first design

**Events Handled**:
```javascript
salaryInput.addEventListener('input', handleSalaryChange);
depsMinus.addEventListener('click', handleDecrementDeps);
depsPlus.addEventListener('click', handleIncrementDeps);
regionRadios.forEach(r => r.addEventListener('change', handleRegionChange));
```

---

### 6. src/index.html
**Purpose**: Single-page application markup with SEO optimization

**Structure** (469 lines):

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <!-- Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Tính thuế TNCN 2026 với quy định mới, so sánh với 2025">

  <!-- Open Graph (Social Media) -->
  <meta property="og:title" content="Thuế 2026 - Tính Thuế TNCN Mới">
  <meta property="og:description" content="...">
  <meta property="og:image" content="https://thue2026.com/og-image.png">

  <!-- SEO Schema (JSON-LD) -->
  <script type="application/ld+json">
    { "@context": "https://schema.org", "@type": "WebApplication", ... }
    { "@context": "https://schema.org", "@type": "FAQPage", ... }
  </script>

  <!-- Styles & Fonts -->
  <link rel="stylesheet" href="./styles/fonts.css">
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <!-- Header -->
  <header>Logo + "Hiệu lực từ 1/7/2026" badge</header>

  <!-- Input Section -->
  <main>
    <input id="salary" type="number" placeholder="Nhập lương" min="0">
    <div id="deps-control">
      <button id="deps-minus">−</button>
      <span id="deps-count">0</span>
      <button id="deps-plus">+</button>
    </div>
    <div id="region-selector">
      <label><input type="radio" name="region" value="I"> Zone I</label>
      <!-- ... 3 more zones -->
    </div>
  </main>

  <!-- Results Section -->
  <section id="results">
    <div id="old-card">2025 Tax Results</div>
    <div id="new-card">2026 Tax Results</div>
    <div id="chart-container">Bar chart visualization</div>
    <table id="breakdown">Progressive bracket breakdown</table>
  </section>

  <!-- FAQ -->
  <section id="faq">4 FAQs with accordion UI</section>

  <!-- Footer -->
  <footer>Copyright statement</footer>

  <script type="module" src="./scripts/main.js"></script>
</body>
</html>
```

**SEO Features**:
- Open Graph meta tags for social sharing
- JSON-LD WebApplication + FAQPage schemas
- Semantic HTML: `<main>`, `<section>`, `<nav>` landmarks
- Keywords: "thuế 2026", "TNCN", "giảm trừ gia cảnh"

**Accessibility**:
- Form labels associated with inputs (`for` attribute)
- ARIA labels for icon-only buttons
- Semantic buttons & interactive elements
- Color contrast ≥4.5:1

---

### 7. src/styles/main.css
**Purpose**: Design system and responsive layout

**Key Characteristics**:
- **Palette**: Slate (grayscale UI) + Emerald (accent color)
- **CSS Custom Properties**: `--color-slate-*`, `--color-emerald-*`, `--spacing-*`
- **Layout**: Flexbox + CSS Grid for responsive design
- **Mobile-first**: Base styles for mobile (375px), breakpoints for tablet (768px) and desktop (1440px)
- **Components**: Cards, input fields, buttons, charts, tables
- **Font Stack**: Plus Jakarta Sans (UI), JetBrains Mono (code/numbers)

**Performance**:
- Minified in production (~5-8KB gzipped)
- Inlined for critical CSS (LCP optimization)
- No animations on initial load (removed fade-in for faster perceived load)

---

### 8. src/styles/fonts.css
**Purpose**: Self-hosted font declarations

**Fonts Included**:
1. Plus Jakarta Sans (4 weights: 400, 500, 600, 700)
   - Latin subset + Vietnamese diacritical marks
   - Used for: headings, labels, buttons, general UI text

2. JetBrains Mono (3 weights: 400, 500, 600)
   - Latin + Vietnamese subsets
   - Used for: currency amounts, code examples, numbers

**File Format**: WOFF2 (modern, highly compressible)
**Total Size**: ~40KB (optimized with Vietnamese language subset)

---

## Dependencies

### Runtime Dependencies
- **lucide** (v0.562.0) - Icon library
  - Icons used: Users, Minus, Plus, Sparkles, TrendingUp
  - Tree-shaken in build (~10-15KB in final bundle)

### Build-Time Dependencies
- **vite** (v7.3.0) - Module bundler and dev server
  - Config: ES modules, CSS inlining, minification

- **terser** (v5.44.1) - JavaScript minifier
  - Mangle: enabled (variable name compression)
  - Compress: enabled (dead code elimination)
  - Drop console: enabled (console.log removed in production)

### Package Manager
- **Bun** (preferred) or **npm**
  - `bun run dev` - Start dev server
  - `bun run build` - Production build
  - `bun run preview` - Preview production locally

---

## Build Pipeline

### Development Server
```bash
bun run dev
# Starts at http://localhost:3000
# Hot Module Replacement enabled
# Auto-opens browser
```

**Features**:
- Fast refresh on file changes
- Full source maps for debugging
- ES modules in-memory compilation

### Production Build
```bash
bun run build
# Output: dist/ directory
```

**Process**:
1. Vite builds HTML + CSS + JS
2. Terser minifies JavaScript
3. CSS is minified and optionally inlined
4. Assets are hashed: `[name]-[hash].[ext]`
5. Source maps are disabled
6. Console.log statements are removed
7. Final output: single HTML file (CSS + JS inlined)

**Output Size**: ~70KB gzipped

**Bundle Breakdown**:
```
HTML:     4-5KB    (structure + inlined CSS)
CSS:      5-8KB    (minified design system)
JS:       3-5KB    (calculator + main.js minified)
Icons:   10-15KB   (Lucide icons)
Fonts:   40-50KB   (self-hosted WOFF2)
─────────────────
Total:   ~70KB    (gzipped)
```

### Deployment

**Platform**: Bunny CDN
- Build command: `bun run build`
- Build output: `dist/`
- Files: Single HTML file with inlined assets
- Delivery: Global edge network

**Configuration Files**:
- `wrangler.json` - Cloudflare Workers config (if alternate hosting)
- `vite.config.js` - Vite build configuration
- `package.json` - Dependency and script definitions

---

## Performance Metrics

| Metric | Target | Status | Notes |
|--------|--------|--------|-------|
| Bundle Size | <100KB | ✓ ~70KB gzipped | Minified with inlined CSS |
| Calculation Speed | <100ms | ✓ <1ms | Synchronous, pure functions |
| Time to Interactive | <2s | ✓ ~1.5s (4G) | No hydration, instant interactive |
| First Paint | <1.5s | ✓ Achieved | Critical CSS inlined |
| Fonts | Self-hosted | ✓ WOFF2 | Vietnamese subsets optimized |
| CSS | Minified | ✓ 5-8KB | BEM + custom properties |

---

## Development Patterns

### No External API Calls
- 100% client-side calculations
- No data transmission to servers
- Privacy-first approach

### State Management
- Simple object-based state (no Redux, Vuex, etc.)
- Direct DOM manipulation via `getElementById`
- Event listeners for input changes

### Module System
- ES6 `import`/`export` syntax
- Tree-shaking enabled in build
- No bundled libraries except Lucide (icons)

### Icon System
- Lucide icons initialized on component mount
- SVG icons, crisp at all sizes
- Icons used: Users, Minus, Plus, Sparkles, TrendingUp

### Responsive Design
- CSS Grid + Flexbox
- Mobile-first approach
- Breakpoints: 375px (mobile), 768px (tablet), 1440px (desktop)
- Touch targets: ≥44px for tap accessibility

### Testing Strategy

**Manual Testing** (current):
- Visual regression testing across browsers
- Tax calculation verification against official rates
- Mobile responsive testing at 375px, 768px, 1440px widths

**Integration Testing**:
- Compare old vs new tax rules on multiple salary inputs
- Verify dependent deduction stacking (0-10)
- Region selection impacts insurance caps

**Browser Compatibility**:
- Chrome/Chromium 61+
- Firefox 60+
- Safari 11+
- Mobile browsers (iOS Safari 11+, Chrome Mobile)
- Graceful degradation (no polyfills)

---

## SEO Implementation

### Meta Tags
- Title: Vietnamese keywords ("thuế 2026", "TNCN")
- Description: Feature overview in Vietnamese
- Language: `<html lang="vi">`
- Canonical URL: `https://thue2026.com/`

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Thuế 2026",
  "applicationCategory": "FinanceApplication",
  "offers": { "priceCurrency": "VND", "price": "0" }
}

{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": {...} }
  ]
}
```

### Open Graph
- Social preview image: 1200x630px (og-image.png)
- Title, description, image for Facebook/Twitter/Telegram sharing

### Robots & Sitemap
- `robots.txt`: Allows all crawlers, references sitemap
- `sitemap.xml`: Single URL (homepage with monthly change frequency)

---

## Known Limitations & TODOs

### Current Limitations
- Ward-level region detection implemented but not exposed in UI (uses Zones I-IV only)
- region-data.js not integrated into main UI (future enhancement)
- No batch calculation (one salary at a time)
- Manual browser testing only (no automated tests)

### Planned Enhancements (Phase 05+)
- [ ] Automated test suite (unit + integration tests)
- [ ] Batch salary import (CSV upload)
- [ ] English language support
- [ ] Multi-currency support (USD, EUR)
- [ ] PWA features (offline support)
- [ ] Analytics integration (privacy-respecting)
- [ ] Mobile app variant
- [ ] Additional calculators (pension, income, etc.)

### Accessibility Status
- WCAG 2.1 AA compliance in progress
- Keyboard navigation: tested
- Color contrast: verified ≥4.5:1
- Screen reader support: semantic HTML in place

---

## Deployment Checklist

- [x] Build succeeds: `bun run build`
- [x] dist/ files minified & hashed
- [x] SEO meta tags present
- [x] OG image correct (1200x630px)
- [x] Fonts load from public/fonts/
- [x] Calculator results accurate
- [x] Mobile responsive (375px, 768px, 1440px)
- [ ] Lighthouse audit (target >90)
- [ ] Browser compatibility testing
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] CDN deployment & DNS setup
- [ ] Google Search Console verification

---

## Quick Reference

**Start Development**:
```bash
bun run dev
```

**Build for Production**:
```bash
bun run build
```

**Key Files**:
- Tax calculations: `src/scripts/calculator.js`
- UI logic: `src/scripts/main.js`
- Configuration: `src/scripts/constants.js`
- Styles: `src/styles/main.css`

**Constants to Know**:
- BASE_SALARY: 2,340,000 (insurance cap base)
- CAP_MULT: 20 (multiplier for insurance cap)
- REGIONS_NEW: 4 zones with different minimum wages
- TAX_NEW: 5-bracket system (2026)
- TAX_OLD: 7-bracket system (2025)

---

**Generated**: 2026-01-03 | **Source**: repomix v1.10.2 (58,729 tokens)
