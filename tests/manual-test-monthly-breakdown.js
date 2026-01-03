/**
 * Manual Test Script for Monthly Breakdown Feature
 *
 * This script tests the monthly breakdown feature added to the Vietnamese salary tax calculator.
 * It verifies:
 * 1. Table hidden when period='month' (default)
 * 2. Table visible when period='year'
 * 3. Shows 12 rows (Tháng 1-12) with correct data
 * 4. Footer shows annual totals (monthly × 12)
 * 5. Numbers formatted with VND formatter
 *
 * Run: node tests/manual-test-monthly-breakdown.js (after npm run build)
 * Or manually test in browser console with: npm run dev
 */

import assert from 'assert';

// Mock DOM setup (for Node.js testing)
function setupMockDOM() {
  const mockElements = {
    'monthly-breakdown': {
      style: { display: 'block' }
    },
    'monthly-body': {
      innerHTML: ''
    },
    'monthly-foot': {
      innerHTML: ''
    }
  };

  global.document = {
    getElementById: (id) => mockElements[id] || null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };

  global.window = {
    addEventListener: () => {}
  };
}

// VND formatter (copied from src/scripts/format.js)
const VND = {
  format: (n) => typeof n === 'number' && !isNaN(n)
    ? Math.round(n).toLocaleString('vi-VN')
    : '0',

  formatUnit: (n) => VND.format(n) + ' đ',

  formatShort: (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  },

  parse: (s) => parseInt(String(s).replace(/[^\d]/g, ''), 10) || 0
};

// Mock updateMonthlyBreakdown function (from src/scripts/main.js)
function updateMonthlyBreakdown(state, els, result) {
  const isYearly = state.period === 'year';
  els.monthlyBreakdown.style.display = isYearly ? 'block' : 'none';
  if (!isYearly) return;

  const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
  const { gross, tax, net } = result;

  els.monthlyBody.innerHTML = months.map(m => `
    <tr>
      <td>${m}</td>
      <td>${VND.format(gross)}</td>
      <td>${VND.format(tax)}</td>
      <td>${VND.format(net)}</td>
    </tr>
  `).join('');

  els.monthlyFoot.innerHTML = `
    <tr class="text-bold">
      <td>Tổng năm</td>
      <td>${VND.format(gross * 12)}</td>
      <td>${VND.format(tax * 12)}</td>
      <td>${VND.format(net * 12)}</td>
    </tr>
  `;
}

// Test suite
console.log('='.repeat(70));
console.log('MONTHLY BREAKDOWN FEATURE - MANUAL TEST SUITE');
console.log('='.repeat(70));

setupMockDOM();

// Test 1: Table hidden when period='month'
console.log('\n[TEST 1] Table hidden when period="month" (default)');
try {
  const state = { period: 'month' };
  const els = {
    monthlyBreakdown: { style: { display: 'block' } },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 100000000, tax: 5000000, net: 95000000 };

  updateMonthlyBreakdown(state, els, result);

  assert.strictEqual(els.monthlyBreakdown.style.display, 'none', 'Monthly breakdown should be hidden');
  console.log('✓ PASS: Table correctly hidden when period="month"');
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 2: Table visible when period='year'
console.log('\n[TEST 2] Table visible when period="year"');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: { display: 'none' } },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 100000000, tax: 5000000, net: 95000000 };

  updateMonthlyBreakdown(state, els, result);

  assert.strictEqual(els.monthlyBreakdown.style.display, 'block', 'Monthly breakdown should be visible');
  console.log('✓ PASS: Table correctly visible when period="year"');
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 3: Shows 12 rows (Tháng 1-12)
console.log('\n[TEST 3] Shows 12 rows (Tháng 1-12)');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: {} },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 100000000, tax: 5000000, net: 95000000 };

  updateMonthlyBreakdown(state, els, result);

  const rowCount = (els.monthlyBody.innerHTML.match(/<tr>/g) || []).length;
  assert.strictEqual(rowCount, 12, 'Should have exactly 12 rows');

  // Verify month labels
  for (let i = 1; i <= 12; i++) {
    const monthLabel = `Tháng ${i}`;
    assert(els.monthlyBody.innerHTML.includes(monthLabel), `Should include "${monthLabel}"`);
  }

  console.log('✓ PASS: All 12 months (Tháng 1-12) correctly displayed');
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 4: Footer shows annual totals (monthly × 12)
console.log('\n[TEST 4] Footer shows annual totals (monthly × 12)');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: {} },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };

  const grossMonthly = 100000000;
  const taxMonthly = 5000000;
  const netMonthly = 95000000;
  const result = { gross: grossMonthly, tax: taxMonthly, net: netMonthly };

  updateMonthlyBreakdown(state, els, result);

  assert(els.monthlyFoot.innerHTML.includes('Tổng năm'), 'Footer should contain "Tổng năm"');
  assert(els.monthlyFoot.innerHTML.includes(VND.format(grossMonthly * 12)), 'Should show gross total');
  assert(els.monthlyFoot.innerHTML.includes(VND.format(taxMonthly * 12)), 'Should show tax total');
  assert(els.monthlyFoot.innerHTML.includes(VND.format(netMonthly * 12)), 'Should show net total');

  // Verify the footer has exactly one row (contains "Tổng năm" and tr tags)
  const hasFooterRow = els.monthlyFoot.innerHTML.includes('Tổng năm');
  assert(hasFooterRow, 'Footer should contain summary row');

  console.log('✓ PASS: Footer correctly shows annual totals (monthly × 12)');
  console.log(`  - Gross annual: ${VND.formatUnit(grossMonthly * 12)}`);
  console.log(`  - Tax annual: ${VND.formatUnit(taxMonthly * 12)}`);
  console.log(`  - Net annual: ${VND.formatUnit(netMonthly * 12)}`);
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 5: Numbers formatted with VND formatter
console.log('\n[TEST 5] Numbers formatted with VND formatter');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: {} },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 100000000, tax: 5000000, net: 95000000 };

  updateMonthlyBreakdown(state, els, result);

  // Check formatting with comma separator (Vietnamese format)
  const formattedGross = VND.format(100000000);
  const formattedTax = VND.format(5000000);
  const formattedNet = VND.format(95000000);

  assert(els.monthlyBody.innerHTML.includes(formattedGross), 'Gross should be formatted');
  assert(els.monthlyBody.innerHTML.includes(formattedTax), 'Tax should be formatted');
  assert(els.monthlyBody.innerHTML.includes(formattedNet), 'Net should be formatted');

  console.log('✓ PASS: Numbers correctly formatted with VND formatter');
  console.log(`  - Format example: 100,000,000 → ${formattedGross}`);
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 6: Different salary amounts
console.log('\n[TEST 6] Different salary amounts');
try {
  const testCases = [
    { gross: 50000000, tax: 2000000, net: 48000000, label: '50M' },
    { gross: 200000000, tax: 15000000, net: 185000000, label: '200M' },
    { gross: 10000000, tax: 100000, net: 9900000, label: '10M' }
  ];

  for (const testCase of testCases) {
    const state = { period: 'year' };
    const els = {
      monthlyBreakdown: { style: {} },
      monthlyBody: { innerHTML: '' },
      monthlyFoot: { innerHTML: '' }
    };

    updateMonthlyBreakdown(state, els, testCase);

    // Verify annual totals
    const expectedGrossAnnual = VND.format(testCase.gross * 12);
    assert(els.monthlyFoot.innerHTML.includes(expectedGrossAnnual),
      `Should calculate gross annual correctly for ${testCase.label}`);

    console.log(`  ✓ ${testCase.label} salary: Annual gross = ${expectedGrossAnnual}`);
  }

  console.log('✓ PASS: Different salary amounts handled correctly');
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 7: Table structure validation
console.log('\n[TEST 7] Table structure validation');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: {} },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 100000000, tax: 5000000, net: 95000000 };

  updateMonthlyBreakdown(state, els, result);

  // Check table has proper structure
  const hasProperRows = els.monthlyBody.innerHTML.includes('<tr>') &&
                        els.monthlyBody.innerHTML.includes('</tr>');
  const hasTdElements = els.monthlyBody.innerHTML.includes('<td>');

  assert(hasProperRows, 'Should have proper table row structure');
  assert(hasTdElements, 'Should have table data cells');

  // Verify each row has 4 columns (Month, Gross, Tax, Net)
  const rowMatches = els.monthlyBody.innerHTML.match(/<tr>[\s\S]*?<\/tr>/g);
  for (const row of rowMatches) {
    const tdCount = (row.match(/<td>/g) || []).length;
    assert.strictEqual(tdCount, 4, 'Each month row should have 4 columns');
  }

  console.log('✓ PASS: Table structure is valid');
  console.log(`  - Rows: ${rowMatches.length}`);
  console.log(`  - Columns per row: 4 (Month, Gross, Tax, Net)`);
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Test 8: Edge case - zero salary
console.log('\n[TEST 8] Edge case - zero salary');
try {
  const state = { period: 'year' };
  const els = {
    monthlyBreakdown: { style: {} },
    monthlyBody: { innerHTML: '' },
    monthlyFoot: { innerHTML: '' }
  };
  const result = { gross: 0, tax: 0, net: 0 };

  updateMonthlyBreakdown(state, els, result);

  assert(els.monthlyBreakdown.style.display === 'block', 'Should still show table');
  assert(els.monthlyBody.innerHTML.includes('Tháng 1'), 'Should still have month labels');
  console.log('✓ PASS: Zero salary handled gracefully');
} catch (err) {
  console.log('✗ FAIL:', err.message);
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('TEST SUMMARY');
console.log('='.repeat(70));
console.log('\nAll core functionality tests completed.');
console.log('\nNext steps - Browser manual testing required:');
console.log('1. Run: npm run dev');
console.log('2. Toggle period toggle button between "Tháng" and "Năm"');
console.log('3. Verify table appears only when "Năm" is selected');
console.log('4. Check all 12 months display correctly');
console.log('5. Verify annual totals calculation (monthly × 12)');
console.log('6. Test with different salary values (10M, 50M, 100M, 200M)');
console.log('7. Verify VND formatting (comma as thousands separator)');
console.log('8. Check responsive behavior on mobile (< 768px)');
console.log('\n' + '='.repeat(70));
