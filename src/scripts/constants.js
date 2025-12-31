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

// Regional minimum wages - OLD (2024)
export const REGIONS_OLD = {
  I: { min: 4_180_000, label: 'I' },
  II: { min: 3_710_000, label: 'II' },
  III: { min: 3_250_000, label: 'III' },
  IV: { min: 2_900_000, label: 'IV' }
};

// Regional minimum wages - NEW (2025 from 1/7)
export const REGIONS_NEW = {
  I: { min: 4_960_000, label: 'I' },
  II: { min: 4_410_000, label: 'II' },
  III: { min: 3_860_000, label: 'III' },
  IV: { min: 3_450_000, label: 'IV' }
};

// Regional minimum wages (2026) - keep for backward compatibility
export const REGIONS = {
  I: { min: 5_310_000, label: 'I' },
  II: { min: 4_730_000, label: 'II' },
  III: { min: 4_140_000, label: 'III' },
  IV: { min: 3_700_000, label: 'IV' }
};

// Insurance calculation constants
// Lương cơ sở (base salary) - used for BHXH/BHYT cap
export const BASE_SALARY = 2_340_000;
export const CAP_MULT = 20;
