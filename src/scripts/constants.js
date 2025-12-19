// Tax bracket configurations
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
  PERSONAL: 11_000_000,
  DEPENDENT: 4_400_000
};

export const TAX_NEW = {
  BRACKETS: [
    { upper: 10_000_000, rate: 0.05 },
    { upper: 30_000_000, rate: 0.10 },
    { upper: 60_000_000, rate: 0.20 },
    { upper: 100_000_000, rate: 0.30 },
    { upper: Infinity, rate: 0.35 }
  ],
  PERSONAL: 15_500_000,
  DEPENDENT: 6_200_000
};

// Regional minimum wages (2026)
export const REGIONS = {
  I: { min: 5_310_000, label: 'I' },
  II: { min: 4_730_000, label: 'II' },
  III: { min: 4_140_000, label: 'III' },
  IV: { min: 3_700_000, label: 'IV' }
};

// Insurance calculation constants
export const BASE_WAGE = 5_310_000;
export const CAP_MULT = 20;
