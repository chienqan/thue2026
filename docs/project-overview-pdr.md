# Project Overview & Product Development Requirements (PDR)

## Project Information

| Item | Value |
|------|-------|
| **Project Name** | taxcalc-vn-2026 |
| **Display Name** | Thuế 2026 - Tính Thuế TNCN Mới |
| **Domain** | https://thue2026.com |
| **Purpose** | Real-time Vietnamese salary tax calculator comparing 2026 new regulations against 2025 old regulations |
| **Status** | Active Development (Phase 03: UI Integration & Deployment) |
| **Owner** | TBD |
| **Repository** | /Users/chien/Downloads/my-project |

## Project Vision & Goals

### Vision
Empower Vietnamese employees with transparent, instant tax calculation tools to understand the impact of 2026 tax law changes on their take-home salary.

### Primary Goals
1. **Accuracy**: Calculate personal income tax (TNCN) per Vietnamese 2026 regulations with zero manual intervention
2. **Clarity**: Side-by-side comparison of old vs new tax rules showing concrete financial impact
3. **Accessibility**: Zero barriers to access (free, no signup, works offline)
4. **Performance**: Sub-100ms calculations, <100KB bundle, mobile-responsive
5. **Compliance**: Adheres to Vietnamese tax law specifications effective 1/7/2026

## Target Audience

### Primary Users
- **Vietnamese employees**: Need to calculate personal income tax
- **Age range**: 25-60 (working population)
- **Tech savvy**: Basic to intermediate (comfortable with web calculators)
- **Language**: Vietnamese speakers (monolingual interface)

### Secondary Users
- **HR departments**: Batch salary planning
- **Tax advisors**: Client education tools
- **Employees**: Financial planning & benefit comparison

### Geographic Focus
- **Primary**: Vietnam (high user density)
- **Secondary**: Vietnamese diaspora worldwide

## Feature Specification

### Core Features (MVP - Phase 01-02 Complete)

#### 1. Gross-to-Net Tax Calculation
**Requirements**:
- Input: Gross monthly salary (0-10 billion VND)
- Process: Apply 2026 tax brackets + insurance deductions + dependent deductions
- Output: Net take-home salary with tax breakdown
- Performance: <100ms per calculation

**Tax Rules - 2026 New**:
```
Brackets (5-band progressive):
├─ 0-10M VND: 5% tax rate
├─ 10-30M VND: 10% tax rate
├─ 30-60M VND: 20% tax rate
├─ 60-100M VND: 30% tax rate
└─ 100M+ VND: 35% tax rate

Personal Deduction: 15,500,000 VND/month (increased from 11M)
Dependent Deduction: 6,200,000 VND/dependent/month (increased from 4.4M)
Maximum Dependents: 10 people
```

**Insurance Deductions (2026)**:
```
All as percentage of gross income, capped at 20x regional minimum wage:
├─ Social Insurance (SI): 8%
├─ Health Insurance (HI): 1.5%
├─ Unemployment Insurance (UI): 1%
└─ Total: 10.5% (capped per region)
```

**Regional Minimum Wages (2026)**:
```
Zone I (HCM metro):        5,310,000 VND
Zone II (Hanoi metro):     4,730,000 VND
Zone III (Major cities):   4,140,000 VND
Zone IV (Other areas):     3,700,000 VND
```

#### 2. Old vs New Comparison
**Requirements**:
- Display side-by-side calculation results
- Highlight net income difference
- Show tax savings with new rules
- Visualize via bar chart

**Tax Rules - 2025 Old**:
```
Brackets (7-band progressive):
├─ 0-5M VND: 5% tax rate
├─ 5-10M VND: 10% tax rate
├─ 10-18M VND: 15% tax rate
├─ 18-32M VND: 20% tax rate
├─ 32-52M VND: 25% tax rate
├─ 52-80M VND: 30% tax rate
└─ 80M+ VND: 35% tax rate

Personal Deduction: 11,000,000 VND/month
Dependent Deduction: 4,400,000 VND/dependent/month
```

#### 3. Dependent Deduction Control
**Requirements**:
- Input: 0-10 dependents (counter UI)
- Impact: Each dependent adds 6.2M VND deduction (new) or 4.4M VND (old)
- Validation: Reject values outside 0-10 range

#### 4. Regional Wage Selection
**Requirements**:
- Input: 4-zone selector (radio buttons)
- Impact: Determines insurance cap ceiling
- Default: Zone I (highest minimum wage)

### Secondary Features

#### 5. Bar Chart Visualization
**Requirements**:
- Display: Tax amount comparison (old vs new)
- Display: Net income comparison (old vs new)
- Format: Proportional bar heights
- Labels: Formatted currency with M/K suffix
- Responsiveness: Mobile-friendly scaling

#### 6. Detailed Breakdown Tables
**Requirements**:
- Table 1: Item-by-item calculation comparison
  - Gross Income
  - Insurance Deductions
  - Personal Deductions
  - Taxable Income
  - Tax Amount
  - Net Income
- Table 2: Progressive tax bracket breakdown
  - Bracket number
  - Tax rate
  - Amount taxed in bracket (old)
  - Amount taxed in bracket (new)

#### 7. SEO & Shareability
**Requirements**:
- Open Graph meta tags (og:title, og:description, og:image)
- JSON-LD schema (WebApplication + FAQPage)
- Canonical URL
- Vietnamese keywords optimization
- FAQ structured data for rich snippets
- Social media preview image

#### 8. FAQ Section
**Requirements**:
- 4 questions covering common scenarios
- Expandable/collapsible UI
- Embedded in FAQ schema for SEO
- Vietnamese language with proper terminology

### Accessibility Requirements (WCAG 2.1 AA)

#### Color Contrast
- Text: 4.5:1 minimum (AA standard)
- Large text (18pt+): 3:1 minimum
- UI interactions: Avoid color-only differentiation

#### Keyboard Navigation
- All controls focusable via Tab key
- Focus visible (outline/highlight)
- No keyboard traps
- Logical tab order (left-to-right, top-to-bottom)

#### Screen Reader Support
- Semantic HTML (buttons, labels, forms)
- Form fields associated with labels via `<label for="...">`
- Input hints provided
- ARIA labels for icon-only buttons
- Region roles for major sections

#### Responsive Design
- Mobile-first (base styles for mobile, breakpoints for desktop)
- Tested at: 375px (mobile), 768px (tablet), 1440px (desktop)
- Touch targets: 44px minimum
- No horizontal scrolling on mobile

## Non-Functional Requirements

### Performance

| Metric | Target | Acceptance Criteria |
|--------|--------|-------------------|
| Bundle Size | <100KB | Gzipped production build |
| Calculation Speed | <100ms | Single gross-to-net conversion |
| Time to Interactive | <2s | Mobile 4G network |
| Paint Latency | <16ms | DOM update after input |
| Lighthouse Score | >90 | All categories on mobile |

### Security

#### Input Validation
- Salary: Accept only positive integers 0-10,000,000,000
- Dependents: Accept only integers 0-10
- Region: Validate against whitelist ['I', 'II', 'III', 'IV']
- No eval(), Function() constructors
- No innerHTML for user-controlled data

#### Data Privacy
- No data transmission (100% client-side)
- No cookies or local storage
- No analytics/tracking
- No third-party scripts (except Lucide icons)

#### Infrastructure Security
- HTTPS only (Cloudflare Pages)
- Security headers: X-Frame-Options, X-Content-Type-Options, etc.
- CORS not required (static hosting)
- No authentication needed

### Compatibility

#### Browser Support
- Chrome/Edge 61+
- Firefox 60+
- Safari 11+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers (no ES5 polyfills)

#### Device Support
- Desktop: 1440px, 1920px widths
- Tablet: 768px width
- Mobile: 375px (iPhone SE) to 480px width
- Tablet landscape: 1024px width

### Localization

#### Current
- Language: Vietnamese (vi_VN)
- Number format: 1.000.000 (dot as thousands separator)
- Currency: VND (Việt Nam Đồng)
- All UI text: Vietnamese

#### Future (Phase 04+)
- English support (en)
- Currency converter (USD, EUR)
- Other Asian locales

### Deployment

#### Hosting
- Platform: Cloudflare Pages
- Region: Global edge network
- Uptime: 99.95% SLA
- CDN: Automatic, no configuration

#### Build & Release
- Build tool: Vite 7.3.0
- Package manager: Bun
- Deployment: Git push (automated via GitHub Actions)
- Versioning: Semantic versioning (MAJOR.MINOR.PATCH)
- Release cycle: Continuous deployment from main branch

## Technical Constraints

### Technology Stack (Locked)
- **Frontend**: Vanilla JavaScript (ES2015+), HTML5, CSS3
- **Build**: Vite 7.3.0
- **Package Manager**: Bun
- **Icon Library**: Lucide v0.562.0 (50KB)
- **Fonts**: Self-hosted WOFF2 (40KB for 2 families × 4 weights)
- **No frameworks**: React, Vue, Angular, Svelte NOT allowed
- **No heavy libraries**: No jQuery, no Three.js, no D3.js

### Browser Runtime Constraints
- ES6 modules (import/export)
- No polyfills (modern browser only)
- No Web Workers (single-threaded)
- LocalStorage/SessionStorage: Not used
- Service Workers: Not used (no offline support planned)

### Bundle Size Budget
```
Total: <100KB (gzipped)
├─ HTML:     4-5KB
├─ CSS:      5-8KB
├─ JS:       3-5KB
├─ Icons:   10-15KB (Lucide)
└─ Fonts:   40-50KB (self-hosted)
```

### Calculation Performance Budget
```
Per Operation: <100ms
├─ Insurance calc:     <1ms
├─ Tax calculation:    <1ms
├─ Deduction calc:     <1ms
├─ Result formatting:  <1ms
└─ DOM update:         <5ms
```

## Success Criteria

### Functional Success
- [ ] Calculates tax accurately per Vietnamese 2026 regulations (verified against official examples)
- [ ] Old vs new comparison shows correct net income difference
- [ ] All 4 regions supported with correct minimum wages
- [ ] Dependent deductions (0-10) calculated correctly
- [ ] Insurance caps applied per regional thresholds
- [ ] UI renders within 16ms per frame (60fps)

### Performance Success
- [ ] Lighthouse score ≥90 (mobile)
- [ ] Time to Interactive <2 seconds (4G)
- [ ] Bundle size <100KB (gzipped)
- [ ] No layout shift (CLS <0.1)
- [ ] No Core Web Vitals failures

### User Experience Success
- [ ] 100% of forms work on touch devices
- [ ] Calculation results update instantly (< 100ms)
- [ ] Mobile layout tested at 375px width
- [ ] All text readable at 16px base font
- [ ] Color contrast ≥4.5:1 for text

### SEO Success
- [ ] Google Search Console verification
- [ ] FAQ schema appears in search results
- [ ] Organic traffic >100 users/month within 3 months
- [ ] Keyword rankings for top 10 target phrases

### Code Quality Success
- [ ] No JavaScript errors in console
- [ ] No unhandled promise rejections
- [ ] Code review approval (2+ reviewers)
- [ ] All functions documented with JSDoc
- [ ] <3 TODO comments in production code

## Phase Breakdown

### Phase 01: Project Setup (Completed ✓)
- [x] Vite 7.3.0 configuration
- [x] HTML structure with semantic markup
- [x] CSS design system (Slate/Emerald palette)
- [x] Self-hosted font setup (Plus Jakarta Sans, JetBrains Mono)
- [x] Public assets (favicon, og-image, robots.txt, sitemap.xml)
- [x] Build optimization (minify, hash assets, drop console)

### Phase 02: Calculation Engine (Completed ✓)
- [x] Tax bracket configuration (old 7-band vs new 5-band)
- [x] Progressive tax calculation function
- [x] Insurance deduction function with regional caps
- [x] Gross-to-Net conversion
- [x] Tax breakdown by bracket
- [x] VND currency formatting utilities
- [x] Input validation
- [x] Constants module (regions, rates, deductions)

### Phase 03: UI Integration & Interaction (Current)
- [ ] Input handlers (salary, dependents, region)
- [ ] Real-time calculation triggering
- [ ] DOM updates for result cards
- [ ] Chart visualization implementation
- [ ] Detail table generation
- [ ] State management wiring
- [ ] Lucide icon rendering
- [ ] Mobile responsive testing

### Phase 04: SEO & Deployment (Pending)
- [ ] Meta tag verification
- [ ] Schema markup validation
- [ ] Lighthouse audit & fixes
- [ ] Cloudflare Pages deployment
- [ ] DNS configuration
- [ ] Google Search Console setup
- [ ] Analytics integration (if approved)

### Phase 05: Enhancement & Optimization (Pending)
- [ ] Performance profiling & optimization
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Browser compatibility testing
- [ ] Mobile app variant (PWA or native)
- [ ] Multi-language support (Phase 06+)

## Acceptance Criteria Verification

### Before Deployment (Gate)
1. **Calculation Accuracy**
   ```
   Test Case 1: Gross 30M, 0 deps, Zone I
   ├─ Old Tax: Net should be ~24.5M
   └─ New Tax: Net should be ~26.2M (diff: +1.7M)

   Test Case 2: Gross 100M, 2 deps, Zone II
   ├─ Old Tax: Net should be ~55M
   └─ New Tax: Net should be ~61M (diff: +6M)
   ```

2. **UI Functionality**
   - Salary input accepts 0-10B VND
   - Dependent counter increments 0-10
   - Region selector changes insurance cap
   - Chart bars update proportionally
   - Tables show correct breakdown

3. **Performance**
   - First meaningful paint <1.5s (mobile 4G)
   - Time to interactive <2s
   - Input latency <100ms
   - No dropped frames during resize

4. **Accessibility**
   - All form controls keyboard accessible
   - Focus visible on all interactive elements
   - Color contrast ≥4.5:1
   - Screen reader announces values correctly

5. **SEO**
   - Sitemap.xml valid
   - robots.txt allows crawling
   - Open Graph tags correct
   - FAQ schema renders in Google Search

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Tax law changes before 7/1/2026 | Medium | High | Monthly review cycle, version control |
| Browser compatibility issues | Low | Medium | Test on 5+ browsers, use feature detection |
| Bundle size exceeds 100KB | Low | Medium | Audit dependencies, lazy load if needed |
| Mobile performance degradation | Medium | Medium | Regular Lighthouse audits, optimize images |
| Regional minimum wage updates | Medium | Low | Config-driven values, easy to update |
| SEO ranking not achieved | Medium | Low | Content marketing, backlink strategy |

## Maintenance & Support

### Monthly Tasks
- Review new tax law updates
- Check bundle size (regression detection)
- Verify calculation accuracy (sample audits)
- Monitor performance metrics

### Quarterly Tasks
- Browser compatibility re-test
- Accessibility audit (new WCAG guidelines)
- SEO keyword ranking check
- User feedback analysis

### Annually Tasks
- Comprehensive code review
- Dependency security audit
- Performance baseline reset
- Localization & expansion planning

## Key Milestones

| Milestone | Target Date | Status |
|-----------|------------|--------|
| Phase 01 Complete | 2025-01-15 | ✓ Done |
| Phase 02 Complete | 2025-01-20 | ✓ Done |
| Phase 03 Complete | 2025-12-24 | 🔄 In Progress |
| Phase 04 Complete | 2026-01-10 | ⏳ Pending |
| Live at thue2026.com | 2026-01-20 | ⏳ Pending |
| Tax law effective | 2026-07-01 | ⏳ Future |

## Next Steps

1. **Immediate** (this week):
   - Complete Phase 03 UI implementation
   - Verify calculation accuracy against official examples
   - Mobile responsive testing at 375px/768px

2. **Short-term** (next 2 weeks):
   - SEO meta tag audit
   - Lighthouse optimization
   - Accessibility audit & fixes

3. **Medium-term** (before 2026-01-20):
   - Deploy to Cloudflare Pages
   - Configure DNS (thue2026.com)
   - Google Search Console verification

4. **Long-term** (Phase 05+):
   - Analytics integration
   - Multi-language support
   - Mobile app variant
   - Additional calculators (income, pension, etc.)
