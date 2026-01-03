# Code Standards & Conventions

## JavaScript Style Guide

### Module Organization

**File Structure**:
```js
// Imports first (ES6 modules)
import { TAX_OLD, TAX_NEW, REGIONS_OLD, REGIONS_NEW } from './constants.js';
import { grossToNet } from './calculator.js';

// Exports
export function calculateTax(income, brackets) { ... }
export const VND = { ... };
```

**Export Pattern**: Named exports preferred for utility modules, default export for state/class modules.

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Variables | camelCase | `grossIncome`, `regionKey` |
| Constants | SCREAMING_SNAKE_CASE | `BASE_SALARY`, `CAP_MULT` |
| Functions | camelCase, verb-first | `calculateTax()`, `calcInsurance()` |
| Classes | PascalCase | `TaxCalculator` (not used currently) |
| DOM IDs | kebab-case | `#salary`, `#new-net`, `#chart-tax-old` |
| CSS Classes | kebab-case + BEM | `.input-field`, `.card--highlight` |
| Private vars | leading underscore | `_tempValue` |

### Function Style

**Prefer Pure Functions**:
```js
// Good - pure, no side effects
function calcTax(income, brackets) {
  return tax; // purely computed
}

// Avoid - mutates input
function calcTax(income, brackets) {
  income -= deduction;
  return tax; // impure
}
```

**Explicit Parameters**: No implicit global state in calculations.
```js
// Good
export function grossToNet(gross, deps, region, tax) { ... }

// Avoid
export function grossToNet(gross, deps) { // unclear where region/tax come from
  // implicitly uses global TAX_OLD
}
```

**Early Returns**:
```js
// Good - early return for edge cases
function calcTax(income, brackets) {
  if (income <= 0) return 0;
  // main logic
}
```

### Error Handling

**Input Validation**:
```js
function grossToNet(gross, deps, region, tax) {
  // Validate ranges
  if (gross < 0 || gross > 10_000_000_000) return null;
  if (deps < 0 || deps > 10) return null;
  if (!REGIONS[region]) return null;
  // Process
}
```

**Return Null on Invalid Input** (not thrown errors for calculator functions).

### Comments

**When to Comment**:
- **Why**: Explain business logic or non-obvious algorithms
- **What**: Only if variable name doesn't clarify
- **Avoid**: Redundant comments that restate code

```js
// Good - explains the "why"
export function calcInsurance(gross, region) {
  // Social insurance capped at 20x national minimum wage per regulations
  const nationalCap = BASE_WAGE * CAP_MULT;
  const si = Math.min(gross * 0.08, nationalCap * 0.08);
  // ...
}

// Avoid - redundant
export function calcTax(income, brackets) {
  let tax = 0; // Set tax to 0
  for (const b of brackets) { // Loop through brackets
    // ...
  }
}
```

## HTML Standards

### Structure

**Semantic HTML**:
```html
<!-- Good -->
<header class="site-header">
  <h1>Page Title</h1>
</header>
<main>
  <section class="input-section">
    <form> (if needed)
</section>
<footer class="site-footer">
</footer>

<!-- Avoid -->
<div id="header">
  <span>Page Title</span>
</div>
<div id="main">
  <div id="input">
```

**Form Accessibility**:
```html
<!-- Good -->
<label class="input-label" for="salary">Thu nhập Gross / Tháng</label>
<input id="salary" type="text" inputmode="numeric" ... />

<!-- Avoid -->
<div>Thu nhập Gross / Tháng</div>
<input type="text" />
```

**Accessibility Features**:
- Every input has an associated `<label>`
- Use `inputmode` for touch keyboards
- Use `aria-label` or `aria-labelledby` for icon-only buttons
- Use `<button type="button">` (not `<div>` with click handlers)
- Use semantic elements: `<main>`, `<section>`, `<header>`, `<footer>`

### Attributes

**Data Attributes**: Use for state/configuration
```html
<button class="counter-btn" data-action="increment">+</button>
<label class="region-option active" data-region="I">
```

**ARIA Attributes**: Only when semantic HTML insufficient
```html
<div role="alert" aria-live="polite">
  Update notification
</div>
```

## CSS Standards

### Methodology: BEM (Block Element Modifier)

**Block**: Standalone component
```css
.card { }
.input-field { }
.chart-bar { }
```

**Element**: Part of a block
```css
.card-header { }
.result-card__title { } /* or .result-card-title */
```

**Modifier**: State variation
```css
.card--highlight { }
.card--disabled { }
.result-badge--success { }
```

**Naming Convention**: `block-element--modifier` (hyphen for block/element, double-dash for modifier).

### Custom Properties (CSS Variables)

**Color System**:
```css
/* Emerald/Slate palette */
--color-emerald-50:  #f0fdf4;
--color-emerald-500: #10b981;
--color-emerald-600: #059669;

--color-slate-50:    #f8fafc;
--color-slate-500:   #64748b;
--color-slate-600:   #475569;
```

**Spacing Scale**:
```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-8: 2rem;     /* 32px */
```

**Responsive Breakpoints**:
```css
/* Mobile-first */
.card { /* mobile styles */ }

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Specificity Rules

**Selector Specificity** (in order of preference):
1. ✓ Classes, attributes, pseudo-classes: `.card`, `.card:hover`, `[data-region]`
2. ✗ IDs: `#main` (only for JavaScript)
3. ✗ Element selectors: `div`, `p` (avoid styling elements globally)
4. ✗ `!important`: Use CSS inheritance instead

```css
/* Good - class-based */
.input-field:focus { outline: 2px solid var(--color-emerald-500); }

/* Avoid - ID styling */
#salary:focus { outline: 2px solid #10b981 !important; }
```

### Units

**Font Sizes**: Relative units (rem) for accessibility
```css
.text-base { font-size: 1rem; }    /* 16px */
.text-lg { font-size: 1.125rem; }  /* 18px */
.text-2xl { font-size: 1.5rem; }   /* 24px */
```

**Spacing**: Consistent scale using custom properties
```css
.card { padding: var(--spacing-4); /* 16px */ }
```

**Colors**: Custom properties + fallback
```css
.button {
  background-color: var(--color-emerald-600, #059669);
  color: white;
}
```

## Performance Standards

### JavaScript

**Bundle Size Targets**:
- JavaScript: <50KB (gzipped)
- CSS: <20KB (gzipped)
- Total: <100KB

**Minification Settings** (Terser):
```js
{
  compress: {
    drop_console: true,      // Remove console.* in production
    drop_debugger: true,     // Remove debugger statements
  },
  mangle: {
    toplevel: true,          // Mangle top-level variable names
  },
  format: {
    comments: false,         // Remove all comments
  }
}
```

### Rendering Performance

**Avoid Layout Thrashing**:
```js
// Good - batch DOM reads then writes
const height = element.offsetHeight;  // read
element.style.height = (height * 1.5) + 'px';  // write

// Avoid - interleaved reads/writes
element.style.height = (element.offsetHeight * 1.5) + 'px';  // thrashing
```

**CSS Performance**:
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid `width`/`height` animations
- Use `will-change` sparingly for expensive properties

## File Organization

### JavaScript Modules

```
src/scripts/
├── main.js         # Entry point, UI orchestration
├── calculator.js   # Pure calculation functions
├── constants.js    # Static configuration
└── format.js       # Utility functions
```

**Dependency Direction**: main.js → calculator.js, constants.js, format.js
**Circular Dependencies**: NOT allowed

### CSS Files

```
src/styles/
├── main.css        # All styling (currently monolithic)
└── fonts.css       # @font-face declarations
```

**Future Split** (when file size exceeds 20KB):
```
├── base.css        # Colors, typography, resets
├── components.css  # Button, card, form styles
└── layout.css      # Grid, header, footer
```

## Security Standards

### Input Validation

**Sanitize User Input**:
```js
// Good - validate before computation
if (!Number.isInteger(deps) || deps < 0 || deps > 10) {
  return null;
}

// Bad - assume input is valid
const net = grossToNet(salary, deps, region, tax);  // deps could be "hacked"
```

**VND Formatting**: Use regex to remove non-digits
```js
VND.parse: (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10) || 0
```

### XSS Prevention

**No innerHTML for Dynamic Content**:
```js
// Good - textContent (auto-escaped)
el.textContent = VND.format(amount);

// Avoid - innerHTML (XSS risk)
el.innerHTML = `<span>${VND.format(amount)}</span>`;  // if amount is user-controlled
```

### CSRF Prevention

**No form submissions** (SPA calculation only) - N/A for this project.

## Testing Standards

### Unit Test Structure

```js
// test/calculator.test.js
describe('calcTax', () => {
  test('should return 0 for zero income', () => {
    expect(calcTax(0, TAX_NEW.BRACKETS)).toBe(0);
  });

  test('should calculate progressive tax correctly', () => {
    const income = 30_000_000;
    const result = calcTax(income, TAX_NEW.BRACKETS);
    // Income 0-10M @ 5% = 500K
    // Income 10-30M @ 10% = 2M
    // Total = 2.5M
    expect(result).toBe(2_500_000);
  });

  test('should handle edge case: exact bracket boundary', () => {
    expect(calcTax(10_000_000, TAX_NEW.BRACKETS)).toBe(500_000);
  });
});
```

### Integration Test Structure

```js
// test/integration.test.js
describe('grossToNet workflow', () => {
  test('old vs new rules show positive impact', () => {
    const gross = 50_000_000;
    const oldResult = grossToNet(gross, 0, 'I', TAX_OLD);
    const newResult = grossToNet(gross, 0, 'I', TAX_NEW);

    expect(newResult.net).toBeGreaterThan(oldResult.net);
  });
});
```

## Version Control Standards

### Commit Messages

**Format**: `<type>(<scope>): <subject>`

```
feat(calculator): add grossToNet function
fix(ui): correct dependent counter increment
docs(readme): update setup instructions
style(css): align button spacing to 8px scale
chore(deps): upgrade vite to 7.3.0
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: CSS/formatting
- `refactor`: Code restructuring (no behavior change)
- `perf`: Performance improvement
- `chore`: Build, deps, config

**Scope**: (optional) area of change: `calculator`, `ui`, `css`, `build`

### Branch Naming

- Feature: `feat/tax-bracket-refactor`
- Bug fix: `fix/insurance-cap-calculation`
- Docs: `docs/setup-guide`

## Accessibility (A11Y) Standards

### WCAG 2.1 AA Compliance

**Color Contrast**:
- Text: 4.5:1 ratio (normal text)
- Large text (18pt+): 3:1 ratio
- Use WebAIM contrast checker

**Keyboard Navigation**:
- All interactive elements focusable (Tab order)
- Focus visible (outline not removed)
- No keyboard traps

**Screen Reader Support**:
- Semantic HTML (no `<div role="button">`)
- Image alt text (if present)
- Form labels associated via `for` attribute
- ARIA only when HTML insufficient

**Responsive Text**:
- Use `rem` units (scales with user font size)
- Minimum 16px base font size
- Line height ≥1.5 for readability
