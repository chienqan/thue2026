import { BASE_SALARY, CAP_MULT } from './constants.js';

/**
 * Calculate progressive tax based on income and brackets
 */
export function calcTax(income, brackets) {
  if (income <= 0) return 0;
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (income > b.upper) {
      tax += (b.upper - prev) * b.rate;
      prev = b.upper;
    } else {
      tax += (income - prev) * b.rate;
      break;
    }
  }
  return Math.round(tax);
}

/**
 * Calculate insurance contributions (SI + HI + UI) with breakdown
 * @param {number} gross - Gross salary
 * @param {string} region - Region key (I, II, III, IV)
 * @param {object} regions - Region config with min wages (REGIONS_OLD or REGIONS_NEW)
 * @returns {{ si: number, hi: number, ui: number, total: number }}
 */
export function calcInsurance(gross, region, regions) {
  const nationalCap = BASE_SALARY * CAP_MULT;
  const regionalCap = regions[region].min * CAP_MULT;
  const si = Math.round(Math.min(gross * 0.08, nationalCap * 0.08));
  const hi = Math.round(Math.min(gross * 0.015, nationalCap * 0.015));
  const ui = Math.round(Math.min(gross * 0.01, regionalCap * 0.01));
  return { si, hi, ui, total: si + hi + ui };
}

/**
 * Calculate net salary from gross with all deductions
 * @param {number} gross - Gross salary
 * @param {number} deps - Number of dependents
 * @param {string} region - Region key (I, II, III, IV)
 * @param {object} tax - Tax config (TAX_OLD or TAX_NEW)
 * @param {object} regions - Region config (REGIONS_OLD or REGIONS_NEW)
 */
export function grossToNet(gross, deps, region, tax, regions) {
  const ins = calcInsurance(gross, region, regions);
  const deduct = tax.PERSONAL + tax.DEPENDENT * deps;
  const taxable = Math.max(0, gross - ins.total - deduct);
  const taxAmt = calcTax(taxable, tax.BRACKETS);
  return {
    gross,
    ins,
    deduct,
    taxable,
    tax: taxAmt,
    net: Math.round(gross - ins.total - taxAmt)
  };
}

/**
 * Get detailed breakdown of tax by bracket
 */
export function getTaxBreakdown(income, brackets) {
  if (income <= 0) return [];
  const result = [];
  let prev = 0;
  for (let i = 0; i < brackets.length; i++) {
    const b = brackets[i];
    if (income > prev) {
      const amt = Math.min(income - prev, b.upper - prev);
      result.push({ rate: `${b.rate * 100}%`, tax: Math.round(amt * b.rate) });
      prev = b.upper;
      if (income <= b.upper) break;
    }
  }
  return result;
}
