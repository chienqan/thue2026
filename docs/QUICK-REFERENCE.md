# Quick Reference Card

## Tax Calculation at a Glance

### 2026 New Rules
```
Personal Deduction:    15,500,000 VND/month
Dependent Deduction:   6,200,000 VND/person/month (max 10)
Tax Brackets (5-band):
  0-10M:    5%
  10-30M:   10%
  30-60M:   20%
  60-100M:  30%
  100M+:    35%
Insurance:             10.5% total (SI 8% + HI 1.5% + UI 1%)
```

### 2025 Old Rules
```
Personal Deduction:    11,000,000 VND/month
Dependent Deduction:   4,400,000 VND/person/month
Tax Brackets (7-band):
  0-5M:     5%
  5-10M:    10%
  10-18M:   15%
  18-32M:   20%
  32-52M:   25%
  52-80M:   30%
  80M+:     35%
Insurance:             10.5% total (same rates)
```

### Regional Zones
```
Zone I (HCM):         5,310,000 VND min wage
Zone II (Hanoi):      4,730,000 VND min wage
Zone III (Cities):    4,140,000 VND min wage
Zone IV (Other):      3,700,000 VND min wage
Insurance cap:        20x regional minimum wage
```

---

## Module Functions

### `calculator.js`
```javascript
calcTax(income, brackets)
  → Returns: tax amount
  → Example: calcTax(25M, TAX_NEW.BRACKETS) → 2,000,000

calcInsurance(gross, region)
  → Returns: total insurance deduction
  → Example: calcInsurance(50M, 'I') → 5.25M

grossToNet(gross, deps, region, tax)
  → Returns: { gross, ins, deduct, taxable, tax, net }
  → Example: grossToNet(50M, 2, 'I', TAX_NEW) → { net: 42.05M, ... }

getTaxBreakdown(income, brackets)
  → Returns: [{ rate, tax }, ...]
  → Example: getTaxBreakdown(25M, TAX_NEW.BRACKETS) → [{rate:'5%', tax:500K}, ...]
```

### `format.js`
```javascript
VND.format(30000000)        → "30.000.000"
VND.formatUnit(30000000)    → "30.000.000 đ"
VND.formatShort(30000000)   → "30.0M"
VND.parse("30.000.000")     → 30000000
```

### `constants.js`
```javascript
TAX_OLD         → { BRACKETS: [...], PERSONAL: 11M, DEPENDENT: 4.4M }
TAX_NEW         → { BRACKETS: [...], PERSONAL: 15.5M, DEPENDENT: 6.2M }
REGIONS_OLD     → { I: {min: 4.96M}, II: {min: 4.41M}, III: {min: 3.86M}, IV: {min: 3.45M} }
REGIONS_NEW     → { I: {min: 5.31M}, II: {min: 4.73M}, III: {min: 4.14M}, IV: {min: 3.7M} }
BASE_SALARY     → 2,340,000
CAP_MULT        → 20
```

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Bundle | <100KB gzipped | ~70KB ✓ |
| Calculation | <100ms | <1ms ✓ |
| TTI | <2s (4G) | ~1.5s ✓ |
| Lighthouse | >90 | 🔄 in progress |

---

## Code Standards Quick Checklist

### JavaScript
- [ ] Use camelCase for variables
- [ ] Use SCREAMING_SNAKE_CASE for constants
- [ ] Write pure functions (no side effects)
- [ ] Early return for edge cases
- [ ] Comment the "why", not the "what"
- [ ] Import/export ES6 modules

### HTML
- [ ] Use semantic elements (`<main>`, `<section>`, `<button>`)
- [ ] Associate labels with inputs (`for` attribute)
- [ ] Use `inputmode` for mobile keyboards
- [ ] Use `aria-label` for icon-only buttons

### CSS
- [ ] Use BEM: `.block-element--modifier`
- [ ] Use custom properties for colors/spacing
- [ ] Classes only (no ID styling)
- [ ] Mobile-first approach
- [ ] No `!important`

### Security
- [ ] Validate all user input (ranges, types)
- [ ] Use `textContent` not `innerHTML` for user data
- [ ] No `eval()` or `Function()` constructors
- [ ] Whitelist allowed regions/values

### Accessibility
- [ ] All inputs have labels
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Color contrast ≥4.5:1
- [ ] Touch targets ≥44px

---

## Common Commands

### Development
```bash
bun run dev          # Start dev server (http://localhost:3000)
bun run build        # Production build (dist/)
```

### Git
```bash
git checkout -b feat/feature-name
git commit -m "feat(scope): description"
git push -u origin feat/feature-name
```

---

## Key Dates

| Event | Date | Status |
|-------|------|--------|
| Phase 03 Complete | 2025-12-24 | ✓ Done |
| Phase 04 Complete | 2026-01-15 | 🔄 in progress |
| Deploy Live | 2026-01-20 | ⏳ pending |
| Tax Law Effective | 2026-07-01 | 📅 future |

---

## File Locations

```
Calculation Engine:    src/scripts/calculator.js
Tax Configuration:     src/scripts/constants.js
Formatting Utils:      src/scripts/format.js
UI Logic:              src/scripts/main.js
Styling:               src/styles/main.css
HTML:                  src/index.html

Deployment Config:     public/_headers, public/_redirects
Project Config:        vite.config.js, package.json
Documentation:         docs/ folder
```

---

## Documentation Map

| Doc | Purpose | Read Time |
|-----|---------|-----------|
| README.md | Getting started | 10 min |
| project-overview-pdr.md | Features & requirements | 15 min |
| codebase-summary.md | Architecture & modules | 15 min |
| code-standards.md | Development conventions | 20 min (ref) |
| system-architecture.md | Data flow & design | 20 min (ref) |

---

## Contact & Support

- **Questions**: Check docs/ first
- **Issues**: Create GitHub issue
- **Code Review**: Reference code-standards.md
- **Tax Rules**: See project-overview-pdr.md

---

**Version**: 1.0 | **Updated**: 2026-01-03 | **Status**: Active Development
