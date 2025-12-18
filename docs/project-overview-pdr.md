# Vietnam Salary Tax Calculator 2026

## Project Overview

Vietnamese salary tax calculator web app for instant Gross↔Net income conversion with accurate tax and insurance deductions.

## Tech Stack

- **Frontend**: Vanilla JavaScript + HTML + CSS (single file)
- **Bundle Size Target**: <100KB
- **Calculation Target**: <100ms per operation

## Key Features

- **Progressive Tax**: 5 tax brackets (5% to 35%) per Vietnamese tax law 2026
- **Insurance Deductions**:
  - Health insurance: 4.5%
  - Unemployment insurance: 1%
  - Social insurance: 8%
- **Bidirectional Conversion**: Calculate Gross from Net or Net from Gross
- **VND Formatting**: Proper Vietnamese Dong number formatting with separators

## Project Structure

- `index.html` - Single file app with embedded HTML, CSS, and JavaScript
- Phase 01 complete: HTML structure, CSS custom properties, VND formatting utility
- Phase 02 complete: Core calculation engine with 8 tax/insurance functions

## Success Criteria

- Fast calculations (<100ms)
- Lightweight bundle (<100KB)
- Accurate tax and insurance deductions per 2026 Vietnamese standards
- Seamless Gross↔Net bidirectional conversion

## Phase 02: Core Calculation Engine

### Completed Components

**TAX Constants** (Vietnam 2026 Law)
- 5 progressive tax brackets: 5%, 10%, 20%, 30%, 35%
- Personal deduction: 15,500,000 VND/month
- Dependent deduction: 6,200,000 VND each
- Insurance rates: Social 8%, Health 1.5%, Unemployment 1%
- Regional minimum wages (4 zones) with 20x cap multiplier

**Core Functions (8 total)**

1. `calculateTax(taxableIncome)` - Progressive tax computation
2. `calculateInsurance(grossIncome, regionKey)` - Insurance with regional caps
3. `calculateDeductions(numDependents)` - Total personal + dependent deductions
4. `grossToNet(grossIncome, numDependents, regionKey)` - Gross to Net conversion
5. `netToGross(targetNet, numDependents, regionKey)` - Net to Gross via binary search
6. `validateInputs(salary, numDependents, regionKey)` - Input validation
7. `getTaxBreakdown(taxableIncome)` - Detailed bracket breakdown for UI
8. `VND.format() / VND.parse()` - Currency formatting utility

### Implementation Details

- Binary search algorithm for net-to-gross conversion (50 iterations, 100 VND precision)
- Progressive tax calculation across 5 brackets
- Regional-aware insurance caps (national vs regional minimum wages)
- Input validation: salary (0-10B VND), dependents (0-10), region validation
- Effective tax rate calculation (tax/gross percentage)
- All functions exported to window object for Phase 03 integration

### Performance

- All calculations synchronous, <1ms per operation
- No external dependencies
- Ready for UI integration in Phase 03
