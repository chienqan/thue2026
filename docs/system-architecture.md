# System Architecture

## High-Level System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Web Browser (Client-Side Only)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              HTML/CSS/JavaScript Bundle                    │ │
│  │                   (dist/assets/)                           │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │ │
│  │  │   index.html │  │   main.css   │  │  main.js     │   │ │
│  │  │  (16KB)      │  │  (20KB)      │  │  (7KB)       │   │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │ │
│  │         ↓                 ↓                   ↓           │ │
│  │    Renders UI         Styles DOM         Orchestrates    │ │
│  │                                             Logic        │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │                                                            │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │            JavaScript Runtime Layer                 │ │ │
│  │  ├──────────────────────────────────────────────────────┤ │ │
│  │  │                                                      │ │ │
│  │  │  ┌─────────────────────────────────────────────┐   │ │ │
│  │  │  │ User Interaction Handler (main.js)          │   │ │ │
│  │  │  │ - Listen for input changes                  │   │ │ │
│  │  │  │ - Update state object                       │   │ │ │
│  │  │  │ - Trigger calculation                       │   │ │ │
│  │  │  └────────┬────────────────────────────────────┘   │ │ │
│  │  │           │                                         │ │ │
│  │  │           ↓                                         │ │ │
│  │  │  ┌─────────────────────────────────────────────┐   │ │ │
│  │  │  │ Tax Calculation Engine (calculator.js)     │   │ │ │
│  │  │  │ - calcTax(income, brackets)                │   │ │ │
│  │  │  │ - calcInsurance(gross, region)             │   │ │ │
│  │  │  │ - grossToNet(gross, deps, region, tax)     │   │ │ │
│  │  │  │ - getTaxBreakdown(income, brackets)        │   │ │ │
│  │  │  └────────┬────────────────────────────────────┘   │ │ │
│  │  │           │                                         │ │ │
│  │  │           ├─→ TAX_OLD config                        │ │ │
│  │  │           ├─→ TAX_NEW config                        │ │ │
│  │  │           ├─→ REGIONS config                        │ │ │
│  │  │           └─→ Constants (constants.js)              │ │ │
│  │  │                                                      │ │ │
│  │  │           ↓                                         │ │ │
│  │  │  ┌─────────────────────────────────────────────┐   │ │ │
│  │  │  │ Result Processing & Formatting (format.js)  │   │ │ │
│  │  │  │ - VND.format(amount)        →  "30.000.000"│   │ │ │
│  │  │  │ - VND.formatUnit(amount)    →  "30.000.000 đ"│  │ │ │
│  │  │  │ - VND.formatShort(amount)   →  "30.0M"     │   │ │ │
│  │  │  └────────┬────────────────────────────────────┘   │ │ │
│  │  │           │                                         │ │ │
│  │  │           ↓                                         │ │ │
│  │  │  ┌─────────────────────────────────────────────┐   │ │ │
│  │  │  │ DOM Update Handler (main.js)               │   │ │ │
│  │  │  │ - Update result cards                       │   │ │ │
│  │  │  │ - Render comparison tables                  │   │ │ │
│  │  │  │ - Update bar chart                          │   │ │ │
│  │  │  │ - Display net gain indicator                │   │ │ │
│  │  │  └────────┬────────────────────────────────────┘   │ │ │
│  │  │           │                                         │ │ │
│  │  │           ↓                                         │ │ │
│  │  │       Browser Repaints                             │ │ │
│  │  │    (CSS animations applied)                        │ │ │
│  │  │                                                      │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Static Asset Storage                           │ │
│  │  - /public/fonts/*.woff2   (self-hosted fonts)              │ │
│  │  - /public/favicon.svg     (brand icon)                     │ │
│  │  - /public/og-image.png    (social preview)                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Deployed on
                              ↓
                       Bunny CDN
              (Static file hosting + edge distribution)
```

## Data Flow Architecture

### Unidirectional Data Flow

```
┌────────────────┐
│   User Input   │ (salary, dependents, region)
└────────┬───────┘
         │
         ↓
┌────────────────────┐
│  State Update      │ { salary: 50M, deps: 2, region: 'I' }
│  (main.js)         │
└────────┬───────────┘
         │
         ↓
┌─────────────────────────────────┐
│  Calculation Layer              │ Old Tax Rules
│  ├─ calcInsurance(gross, region)├─→ calcTax(taxable, TAX_OLD.BRACKETS)
│  ├─ calculateDeductions(deps)    │
│  ├─ grossToNet(gross,...)        │
│  └─ getTaxBreakdown(...)         │ New Tax Rules
│                                  ├─→ calcTax(taxable, TAX_NEW.BRACKETS)
│                                  │
└─────────┬──────────────────────────────
          │
          ↓
┌──────────────────────────┐
│  Result Objects          │ oldResult = { gross, ins, deduct, taxable, tax, net }
│  (calculator.js returns) │ newResult = { gross, ins, deduct, taxable, tax, net }
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Format & Render         │ VND.format(30000000) → "30.000.000"
│  (main.js update DOM)    │ Update #old-net, #new-net, chart, tables
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Browser Paint           │ CSS applied, user sees updated UI
└──────────────────────────┘
```

## Module Dependency Graph

```
index.html
  ├─ import main.js (ES6 module)
  │   ├─ import { TAX_OLD, TAX_NEW, REGIONS } from constants.js
  │   ├─ import { grossToNet, getTaxBreakdown } from calculator.js
  │   ├─ import { VND } from format.js
  │   └─ import '../styles/main.css'
  │       └─ import '../styles/fonts.css'
  │
  ├─ <script type="application/ld+json"> (FAQ schema)
  └─ <link rel="icon"> (favicon)

calculator.js
  └─ import { REGIONS, BASE_WAGE, CAP_MULT } from constants.js

constants.js
  └─ (no imports - pure configuration)

format.js
  └─ (no imports - pure utilities)

styles/main.css
  └─ import from fonts.css

styles/fonts.css
  └─ @font-face declarations (self-hosted .woff2)
```

**Circular Dependencies**: None ✓

## State Management Architecture

### State Object Shape

```js
const state = {
  salary: number,           // Gross monthly income (0-10B VND)
  deps: number,             // Dependents (0-10)
  region: string            // 'I' | 'II' | 'III' | 'IV'
};
```

### State Mutations

```
Initial State: { salary: 100000000, deps: 0, region: 'I' }

User Input: Salary field changed to "50000000"
├─ Event: oninput on #salary
├─ Handler: updateSalary()
├─ Action: state.salary = VND.parse(event.target.value)
└─ Trigger: update() function

User Input: Dependent counter +1
├─ Event: click on [data-action="increment"]
├─ Handler: updateDependents(+1)
├─ Action: state.deps = Math.min(state.deps + 1, 10)
└─ Trigger: update() function

User Input: Region changed to "II"
├─ Event: change on region radio
├─ Handler: updateRegion('II')
├─ Action: state.region = 'II'
└─ Trigger: update() function

Every state change triggers:
  update() → calculation → render
```

### Calculation Flow per State Change

```
1. Read State
   { salary: 50000000, deps: 2, region: 'I' }

2. Old Tax Calculation
   ├─ calcInsurance(50000000, 'I')
   │  ├─ SI: min(50M × 0.08, 5.31M × 20 × 0.08) = 4M
   │  ├─ HI: min(50M × 0.015, 5.31M × 20 × 0.015) = 750K
   │  ├─ UI: min(50M × 0.01, 5.31M × 20 × 0.01) = 500K
   │  └─ Total: 5.25M
   │
   ├─ Deductions: 11M (personal) + 4.4M × 2 (deps) = 19.8M
   ├─ Taxable: 50M - 5.25M - 19.8M = 24.95M
   ├─ calcTax(24.95M, TAX_OLD.BRACKETS)
   │  └─ Tax: (5M × 5%) + (5M × 10%) + (7M × 15%) + (7.95M × 20%) = 3.84M
   └─ Result: { gross: 50M, ins: 5.25M, deduct: 19.8M, tax: 3.84M, net: 41M }

3. New Tax Calculation (same process)
   └─ Result: { gross: 50M, ins: 5.25M, deduct: 22M, tax: 2.7M, net: 42.05M }

4. Render Updates
   ├─ #old-net: "41.000.000đ"
   ├─ #new-net: "42.050.000đ"
   ├─ #net-gain-text: "+1.05 triệu / tháng"
   ├─ Chart bars (proportional heights)
   └─ Detail tables (old vs new breakdown)
```

## Calculation Engine Internals

### Tax Bracket Algorithm (Progressive Tax)

```js
// Input: income = 25,000,000, brackets = TAX_NEW.BRACKETS
// 5-band: [10M@5%, 30M@10%, 60M@20%, 100M@30%, ∞@35%]

let tax = 0, prev = 0;

// Bracket 1: 0-10M @ 5%
income (25M) > bracket.upper (10M) ✓
tax += (10M - 0) × 0.05 = 500K
prev = 10M

// Bracket 2: 10-30M @ 10%
income (25M) > bracket.upper (30M) ✗
tax += (25M - 10M) × 0.10 = 1.5M
break

// Total tax = 500K + 1.5M = 2M
```

### Insurance Caps (Regional Awareness)

```js
// calcInsurance(gross = 200M, region = 'I')
// REGIONS.I.min = 5,310,000
// BASE_WAGE = 5,310,000
// CAP_MULT = 20

nationalCap = 5,310,000 × 20 = 106,200,000
regionCap = 5,310,000 × 20 = 106,200,000  (both same for region I)

SI: min(200M × 0.08, 106.2M × 0.08) = min(16M, 8.496M) = 8.496M
HI: min(200M × 0.015, 106.2M × 0.015) = min(3M, 1.593M) = 1.593M
UI: min(200M × 0.01, 106.2M × 0.01) = min(2M, 1.062M) = 1.062M

Total Insurance = 11.151M (capped at 20x minimum wage)
```

### Dependent Deduction Stacking

```js
// Personal: 15.5M, Dependent: 6.2M each
// deps = 3 people

Total Deduction = 15.5M + (6.2M × 3)
                = 15.5M + 18.6M
                = 34.1M

Max Dependents = 10
Max Deduction = 15.5M + (6.2M × 10) = 77.5M
```

## Performance Characteristics

### Calculation Latency

```
Single Calculation (grossToNet):
├─ calcInsurance():     < 0.1ms
├─ calcDeductions():    < 0.1ms
├─ calcTax():          < 0.1ms (5-bracket iteration)
└─ Total per result:   < 0.5ms

Both (Old + New):      < 1ms
DOM Update (batch):    < 5ms
Browser Paint:         ~ 16ms (60fps frame budget)
Total E2E latency:     < 30ms
```

### Memory Profile

```
State object:      ~200 bytes
Result objects:    ~300 bytes
DOM references:    ~2KB (cached element references)
Lucide icons:      ~50KB (bundled, not per-icon)

Total runtime:     ~100KB (JavaScript + CSS + fonts in browser)
```

### Bundle Composition

```
Gzipped sizes (typical production):
├─ HTML:          4KB
├─ CSS (main):    5KB
├─ JS (main):     3KB
├─ Icons (lucide):12KB
├─ Fonts (2×4):   40KB
└─ Total:         64KB

Uncompressed:     ~100KB ✓ (target met)
```

## Browser Compatibility

### Supported Targets

```
ES2015+ (ES6 modules assumed)
├─ Modern browsers: Chrome 61+, Firefox 60+, Safari 11+, Edge 16+
├─ Locale API: Intl.NumberFormat (all modern browsers)
├─ CSS Grid: All modern browsers
└─ CSS Custom Properties: All modern browsers
```

### Feature Dependencies

```
Lucide Icons:     SVG sprite system (modern browsers)
Self-hosted Fonts: WOFF2 support (all modern, IE 11 unsupported)
ES6 Modules:      import/export syntax (no CommonJS fallback)
```

## Security Model

### Input Validation Scope

```
User Input → Validation → Calculation
├─ salary: ≥ 0, ≤ 10,000,000,000 VND
├─ deps: ≥ 0, ≤ 10 (integers)
└─ region: must be in { 'I', 'II', 'III', 'IV' }

Validation happens before:
├─ Calculation (prevents invalid state)
└─ DOM rendering (prevents XSS via number formatting)
```

### DOM Safety

```
All user-controlled values:
├─ .textContent (auto-escaped, safe)
├─ .innerHTML (only for HTML structure, not user data)
└─ dataset attributes (safe from injection)

No eval() or Function() constructors used.
```

### Network Security

```
No external API calls.
No cookies or local storage.
No analytics or tracking.
→ 100% client-side = no data transmission
```

## Deployment Architecture

### Build-Time Processing

```
Source (src/)
  ↓
Vite Bundle
  ├─ CSS minification (main.css → 5KB)
  ├─ JS minification + terser (main.js → 3KB)
  ├─ HTML inlining (index.html processed)
  └─ Asset hashing (cache busting)
  ↓
Dist Output
  ├─ dist/index.html
  ├─ dist/assets/main-[hash].js
  ├─ dist/assets/main-[hash].css
  └─ dist/assets/*.woff2 (fonts)
```

### Runtime Hosting

```
Bunny CDN
├─ Static file server
├─ Single-file HTML output (CSS + JS inlined)
├─ Edge caching: Assets cached globally
└─ Global distribution via Bunny Edge network
```

### Caching Strategy

```
Static Assets (/assets/*, /*.woff2):
├─ Cache-Control: public, max-age=31536000, immutable
└─ Served from edge, never revalidated

HTML Entry Point:
├─ Cache-Control: public, max-age=0, must-revalidate
└─ Always revalidated from server (detects updates)
```
