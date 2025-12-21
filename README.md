# Thuế 2026 - Vietnamese Tax Calculator

Real-time tax calculator comparing 2026 new Vietnamese salary tax regulations against 2025 old regulations. Calculate your net income instantly with accurate deductions and visual comparison.

**Live**: https://thue2026.com | **Domain**: thue2026.com

## Features

- **Dual Tax Rules**: Side-by-side comparison of old 7-bracket vs new 5-bracket tax system
- **Instant Calculation**: <100ms gross-to-net conversion with real-time updates
- **4 Regional Zones**: Support for all Vietnamese regional minimum wage zones (I-IV)
- **Dependent Support**: 0-10 dependents with automatic deduction calculation
- **Visual Comparison**: Bar charts showing tax and net income differences
- **Detailed Breakdown**: Progressive tax bracket calculations and itemized deductions
- **SEO Optimized**: Structured data, Open Graph tags, FAQ schema for search ranking
- **Mobile First**: Responsive design tested at 375px, 768px, 1440px widths
- **Privacy First**: 100% client-side calculations, no data transmission

## Tech Stack

- **Frontend**: Vanilla JavaScript ES6+ | HTML5 | CSS3
- **Build Tool**: Vite 7.3.0
- **Package Manager**: Bun
- **Icons**: Lucide v0.562.0
- **Fonts**: Self-hosted WOFF2 (Plus Jakarta Sans, JetBrains Mono)
- **Deployment**: Bunny CDN

## Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone repository
git clone <repo-url> && cd my-project

# Install dependencies (using Bun)
bun install

# Or using npm
npm install
```

### Development

```bash
# Start dev server (auto-opens http://localhost:3000)
bun run dev

# Or with npm
npm run dev
```

The server watches for changes and hot-reloads automatically.

### Production Build

```bash
# Build for production
bun run build

# Output: dist/ (ready for deployment)
```

Minified, hashed assets with <100KB gzipped bundle size.

## Project Structure

```
src/
├── index.html              # Main SPA with SEO meta tags
├── scripts/
│   ├── main.js            # UI orchestration & state management
│   ├── calculator.js      # Tax calculation engine (8 functions)
│   ├── constants.js       # Tax brackets, regions, deductions
│   └── format.js          # VND currency formatting
├── styles/
│   ├── main.css           # Design system (Slate/Emerald palette)
│   └── fonts.css          # @font-face declarations
└── fonts/
    ├── plus-jakarta-sans-*.woff2  # UI font
    └── jetbrains-mono-*.woff2     # Code font

public/
├── robots.txt             # SEO crawling rules
├── sitemap.xml            # SEO site structure
├── favicon.ico            # Favicon (ICO format)
├── favicon.svg            # Favicon (SVG format)
├── site.webmanifest       # PWA manifest
└── og-image.png           # Social media preview

docs/
├── project-overview-pdr.md         # Requirements & features
├── codebase-summary.md             # Architecture & modules
├── code-standards.md               # Development conventions
└── system-architecture.md          # Technical diagrams
```

## Key Functions

### Tax Calculator (`src/scripts/calculator.js`)

```javascript
import { calcTax, calcInsurance, grossToNet, getTaxBreakdown } from './calculator.js';

// Calculate net salary from gross
const result = grossToNet(50_000_000, 2, 'I', TAX_NEW);
// result = { gross, ins, deduct, taxable, tax, net }

// Get tax by bracket
const breakdown = getTaxBreakdown(30_000_000, TAX_NEW.BRACKETS);
// breakdown = [{ rate, tax }, ...]
```

### Format Currency (`src/scripts/format.js`)

```javascript
import { VND } from './format.js';

VND.format(30_000_000)        // "30.000.000"
VND.formatUnit(30_000_000)    // "30.000.000 đ"
VND.formatShort(30_000_000)   // "30.0M"
VND.parse("30.000.000")       // 30000000
```

## Tax Rules

### 2026 New Rules (Effective 1/7/2026)

| Component | Old (2025) | New (2026) | Change |
|-----------|-----------|-----------|--------|
| Personal Deduction | 11M | 15.5M | +4.5M |
| Dependent Deduction | 4.4M | 6.2M | +1.8M |
| Brackets | 7-band | 5-band | Consolidated |
| Insurance Cap | 20x min wage | 20x min wage | Same |

**Tax Brackets (2026 New)**:
```
0-10M:     5%
10-30M:    10%
30-60M:    20%
60-100M:   30%
100M+:     35%
```

**Insurance Deductions**:
- Social: 8% (capped at 20x national minimum)
- Health: 1.5% (capped at 20x national minimum)
- Unemployment: 1% (capped at 20x regional minimum)
- **Total**: 10.5% of gross

**Regional Minimum Wages (2026)**:
```
Zone I (HCM):     5,310,000 VND
Zone II (Hanoi):  4,730,000 VND
Zone III (Cities):4,140,000 VND
Zone IV (Other):  3,700,000 VND
```

## Performance

| Metric | Target | Status |
|--------|--------|--------|
| Bundle Size | <100KB | ✓ ~70KB gzipped |
| Calculation Speed | <100ms | ✓ <1ms |
| Time to Interactive | <2s | ✓ ~1.5s on 4G |
| Lighthouse Score | >90 | 🔄 In progress |

## Documentation

- **[Project Overview & Requirements](./docs/project-overview-pdr.md)** - Features, requirements, acceptance criteria
- **[Codebase Summary](./docs/codebase-summary.md)** - Architecture, modules, algorithms
- **[Code Standards](./docs/code-standards.md)** - JavaScript, HTML, CSS conventions
- **[System Architecture](./docs/system-architecture.md)** - Data flow, dependencies, performance

## Deployment

### Bunny CDN (Current)

```bash
# Build for production
bun run build
# Upload dist/ folder to Bunny CDN storage
```

Configuration:
- **Build command**: `bun run build`
- **Build output**: `dist/`
- **Single-file output**: HTML with inlined CSS + JS

### Environment

- **Host**: Bunny CDN (global edge network)
- **HTTPS**: Automatic with SSL/TLS
- **CDN**: Global distribution via Bunny Edge

## Browser Support

- Chrome/Edge 61+
- Firefox 60+
- Safari 11+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Modern JavaScript (ES2015+ modules)

## Accessibility

WCAG 2.1 AA compliance in progress:
- Semantic HTML (forms, labels, landmarks)
- Keyboard navigation (Tab, Enter, Arrows)
- Color contrast ≥4.5:1 for text
- Screen reader support
- Mobile touch targets 44px+

## Security

- **100% Client-Side**: No server, no API, no data transmission
- **Input Validation**: Strict ranges for salary (0-10B), deps (0-10), region whitelist
- **No Tracking**: No analytics, cookies, or external requests
- **HTTPS Only**: Enforced via Bunny CDN
- **Security Headers**: X-Frame-Options, X-Content-Type-Options configured

## Development Workflow

### Commit Convention

```
feat(scope):   New feature
fix(scope):    Bug fix
docs(scope):   Documentation
style(scope):  CSS/formatting
refactor:      Code restructuring
chore:         Dependencies, config
```

Examples:
```
feat(calculator): add grossToNet function
fix(ui): correct dependent counter range
docs(readme): update quick start guide
```

### Testing

Currently manual testing via:
1. Dev server (`bun run dev`)
2. Browser DevTools console for calculation verification
3. Lighthouse audits for performance

Automated tests coming in Phase 05.

## Known Issues & TODO

- [ ] Accessibility audit (WCAG 2.1 AA not yet verified)
- [ ] Lighthouse optimization (target >90 score)
- [ ] Browser compatibility testing (IE 11 not supported)
- [ ] Analytics integration (privacy-respecting)
- [ ] Multi-language support (Phase 04+)

See [project-overview-pdr.md](./docs/project-overview-pdr.md) for full roadmap.

## Contributing

1. Read [code-standards.md](./docs/code-standards.md) for conventions
2. Create feature branch: `feat/feature-name`
3. Make changes following standards
4. Test locally with `bun run dev`
5. Build for production: `bun run build`
6. Create pull request with clear description

## License

TBD

## Support

For issues, questions, or feedback:
- Create a GitHub issue
- Email: TBD

## Changelog

### v1.0.0 (2026-01-20)
- Initial release
- Phase 01-03 completion
- Tax calculation engine
- UI with comparison view
- SEO optimization

---

**Last Updated**: 2025-12-21 | **Status**: Active Development | **Deployment**: Bunny CDN
