import { createIcons, Users, Minus, Plus, Sparkles, TrendingUp, Info, X } from 'lucide';
import { TAX_OLD, TAX_NEW, REGIONS_NEW, REGIONS_OLD, REGION_INFO } from './constants.js';
import { grossToNet, netToGross, getTaxBreakdown } from './calculator.js';
import { VND } from './format.js';

// CSS is loaded via HTML <link> tags for optimal preloading

// Initialize Lucide icons
createIcons({
  icons: { Users, Minus, Plus, Sparkles, TrendingUp, Info, X }
});

// State
const state = { salary: 100000000, deps: 0, region: 'I', period: 'month', mode: 'gross-to-net' };

// DOM references
const $ = (id) => document.getElementById(id);
const els = {
  salary: $('salary'),
  salaryLabel: $('salary-label'),
  periodToggle: $('period-toggle'),
  modeToggle: $('mode-toggle'),
  deps: $('dependents'),
  regionGrid: $('region-grid'),
  regionInfo: $('region-info'),
  regionInfoBtn: $('region-info-btn'),
  regionModal: $('region-modal'),
  modalTitle: $('modal-title'),
  modalBody: $('modal-body'),
  modalClose: $('modal-close'),
  oldNet: $('old-net'),
  oldTax: $('old-tax'),
  oldDeduct: $('old-deduction'),
  newNet: $('new-net'),
  newTax: $('new-tax'),
  newDeduct: $('new-deduction'),
  netGain: $('net-gain'),
  netGainText: $('net-gain-text'),
  stickyBar: $('sticky-input-bar'),
  stickySalary: $('sticky-salary'),
  stickyResult: $('sticky-result'),
  stickyResultText: $('sticky-result-text'),
  details: $('details-body'),
  brackets: $('bracket-body'),
  chartTaxOld: $('chart-tax-old'),
  chartTaxNew: $('chart-tax-new'),
  chartNetOld: $('chart-net-old'),
  chartNetNew: $('chart-net-new'),
  chartTaxOldVal: $('chart-tax-old-val'),
  chartTaxNewVal: $('chart-tax-new-val'),
  chartNetOldVal: $('chart-net-old-val'),
  chartNetNewVal: $('chart-net-new-val')
};

function updateChart(oldR, newR) {
  const maxTax = Math.max(oldR.tax, newR.tax, 1);
  const maxNet = Math.max(oldR.net, newR.net, 1);
  const maxHeight = 100;

  els.chartTaxOld.style.height = Math.max(4, (oldR.tax / maxTax) * maxHeight) + 'px';
  els.chartTaxNew.style.height = Math.max(4, (newR.tax / maxTax) * maxHeight) + 'px';
  els.chartNetOld.style.height = Math.max(4, (oldR.net / maxNet) * maxHeight) + 'px';
  els.chartNetNew.style.height = Math.max(4, (newR.net / maxNet) * maxHeight) + 'px';

  els.chartTaxOldVal.textContent = VND.formatShort(oldR.tax);
  els.chartTaxNewVal.textContent = VND.formatShort(newR.tax);
  els.chartNetOldVal.textContent = VND.formatShort(oldR.net);
  els.chartNetNewVal.textContent = VND.formatShort(newR.net);
}

function update() {
  // Convert yearly to monthly for calculation
  const monthlyInput = state.period === 'year' ? Math.round(state.salary / 12) : state.salary;
  const mult = state.period === 'year' ? 12 : 1;
  const periodSuffix = state.period === 'year' ? ' / năm' : ' / tháng';

  // Choose calculation function based on mode
  let oldR, newR;
  if (state.mode === 'gross-to-net') {
    oldR = grossToNet(monthlyInput, state.deps, state.region, TAX_OLD, REGIONS_OLD);
    newR = grossToNet(monthlyInput, state.deps, state.region, TAX_NEW, REGIONS_NEW);
  } else {
    oldR = netToGross(monthlyInput, state.deps, state.region, TAX_OLD, REGIONS_OLD);
    newR = netToGross(monthlyInput, state.deps, state.region, TAX_NEW, REGIONS_NEW);
  }
  const hasSalary = state.salary > 0;

  els.oldNet.innerHTML = `${VND.format(oldR.net * mult)}<span class="currency">đ</span>`;
  els.oldTax.textContent = VND.formatUnit(oldR.tax * mult);
  els.oldDeduct.textContent = hasSalary ? VND.formatUnit(oldR.deduct * mult) : '0 đ';

  els.newNet.innerHTML = `${VND.format(newR.net * mult)}<span class="currency">đ</span>`;
  els.newTax.textContent = VND.formatUnit(newR.tax * mult);
  els.newDeduct.textContent = hasSalary ? VND.formatUnit(newR.deduct * mult) : '0 đ';

  // Net gain indicator
  const netGain = (newR.net - oldR.net) * mult;
  if (netGain > 0 && hasSalary) {
    const netGainFormatted = netGain >= 1000000
      ? `+${(netGain / 1000000).toFixed(2).replace('.00', '')} triệu`
      : `+${VND.format(netGain)}`;
    els.netGainText.textContent = `${netGainFormatted}${periodSuffix}`;
    els.netGain.style.display = 'inline-flex';
    // Update sticky bar for mobile
    els.stickyResultText.textContent = `${netGainFormatted}`;
    els.stickyResult.classList.remove('no-gain');
  } else {
    els.netGain.style.display = 'none';
    els.stickyResultText.textContent = hasSalary ? '0 đ' : '+0';
    els.stickyResult.classList.toggle('no-gain', hasSalary);
  }

  // Low income state - show "not yet taxed" message
  const isLowIncome = newR.taxable <= 0 && hasSalary;
  if (isLowIncome) {
    els.newTax.innerHTML = '<span class="no-tax-state">Chưa đến mức chịu thuế</span>';
    els.oldTax.innerHTML = oldR.taxable <= 0
      ? '<span class="no-tax-state">Chưa đến mức chịu thuế</span>'
      : VND.formatUnit(oldR.tax);
  }

  // Refresh icons for dynamically inserted content
  createIcons({
    icons: { Users, Minus, Plus, Sparkles, TrendingUp, Info, X }
  });

  // Region info
  els.regionInfo.textContent = `Áp dụng vùng ${state.region} - Mức lương tối thiểu ${VND.format(REGIONS_NEW[state.region].min)} đ`;

  // Chart
  updateChart(oldR, newR);

  // Details table (multiply by mult for yearly display)
  const rows = [
    ['Lương Gross', oldR.gross * mult, newR.gross * mult],
    ['Bảo hiểm XH (8%)', -oldR.ins.si * mult, -newR.ins.si * mult],
    ['Bảo hiểm YT (1.5%)', -oldR.ins.hi * mult, -newR.ins.hi * mult],
    ['Bảo hiểm TN (1%)', -oldR.ins.ui * mult, -newR.ins.ui * mult],
    ['Giảm trừ bản thân', hasSalary ? -TAX_OLD.PERSONAL * mult : 0, hasSalary ? -TAX_NEW.PERSONAL * mult : 0],
    [`Giảm trừ NPT (×${state.deps})`, hasSalary ? -TAX_OLD.DEPENDENT * state.deps * mult : 0, hasSalary ? -TAX_NEW.DEPENDENT * state.deps * mult : 0],
    ['Thu nhập chịu thuế', oldR.taxable * mult, newR.taxable * mult],
    ['Thuế TNCN (*)', -oldR.tax * mult, -newR.tax * mult, 'negative'],
    ['Thực lĩnh (Net)', oldR.net * mult, newR.net * mult, 'bold']
  ];

  els.details.innerHTML = rows.map(([label, old, newVal, type]) => `
    <tr>
      <td class="${type === 'bold' ? 'text-bold' : ''}">${label}</td>
      <td class="${type === 'negative' ? 'text-red' : ''}">${VND.format(old)}</td>
      <td class="text-green ${type === 'bold' ? 'text-bold' : ''}">${VND.format(newVal)}</td>
    </tr>
  `).join('');

  // Brackets table - show all brackets from both systems
  const oldBr = getTaxBreakdown(oldR.taxable, TAX_OLD.BRACKETS);
  const newBr = getTaxBreakdown(newR.taxable, TAX_NEW.BRACKETS);
  // OLD has 7 brackets: 5%, 10%, 15%, 20%, 25%, 30%, 35%
  // NEW has 5 brackets: 5%, 10%, 20%, 30%, 35%
  const allRates = ['5%', '10%', '15%', '20%', '25%', '30%', '35%'];

  if (oldBr.length === 0 && newBr.length === 0) {
    els.brackets.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:20px">Không có thuế</td></tr>';
  } else {
    let bracketNum = 0;
    els.brackets.innerHTML = allRates.map((r) => {
      const o = oldBr.find(x => x.rate === r);
      const n = newBr.find(x => x.rate === r);
      // Only show row if at least one system uses this rate
      const oldHasRate = TAX_OLD.BRACKETS.some(b => `${b.rate * 100}%` === r);
      const newHasRate = TAX_NEW.BRACKETS.some(b => `${b.rate * 100}%` === r);
      if (!oldHasRate && !newHasRate) return '';
      bracketNum++;
      return `
        <tr>
          <td>Bậc ${bracketNum}</td>
          <td>${r}</td>
          <td>${o ? VND.format(o.tax) : (oldHasRate ? '—' : '<span class="text-muted">N/A</span>')}</td>
          <td class="text-green">${n ? VND.format(n.tax) : (newHasRate ? '—' : '<span class="text-muted">N/A</span>')}</td>
        </tr>
      `;
    }).join('');
  }
}

// Event listeners
let timeout;

// Format digit string with thousand separators (preserves leading zeros)
function formatDigits(str) {
  if (!str) return '';
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

els.salary.addEventListener('input', (e) => {
  // Count digits before cursor to restore position after formatting
  const cursorPos = e.target.selectionStart;
  const beforeCursor = e.target.value.slice(0, cursorPos).replace(/[^\d]/g, '');
  const digitsBefore = beforeCursor.length;

  const val = e.target.value.replace(/[^\d]/g, '');
  const num = parseInt(val, 10) || 0;
  const formatted = val ? formatDigits(val) : '';
  e.target.value = formatted;
  state.salary = num;

  // Restore cursor position (count digits to find new position)
  let digits = 0, newPos = 0;
  for (let i = 0; i < formatted.length && digits < digitsBefore; i++) {
    if (/\d/.test(formatted[i])) digits++;
    newPos = i + 1;
  }
  e.target.selectionStart = e.target.selectionEnd = newPos;

  clearTimeout(timeout);
  timeout = setTimeout(update, 100);
});

document.querySelectorAll('.counter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let v = parseInt(els.deps.value, 10) || 0;
    if (btn.dataset.action === 'increment' && v < 10) v++;
    if (btn.dataset.action === 'decrement' && v > 0) v--;
    els.deps.value = v;
    state.deps = v;
    update();
  });
});

els.deps.addEventListener('change', (e) => {
  state.deps = Math.max(0, Math.min(10, parseInt(e.target.value, 10) || 0));
  e.target.value = state.deps;
  update();
});

// Region selection
els.regionGrid.querySelectorAll('.region-option').forEach(opt => {
  opt.addEventListener('click', () => {
    els.regionGrid.querySelectorAll('.region-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    state.region = opt.dataset.region;
    update();
  });
});

// Mode toggle updates label
function updateSalaryLabel() {
  const modeText = state.mode === 'gross-to-net' ? 'Thu nhập Gross theo' : 'Thu nhập Net theo';
  els.salaryLabel.textContent = modeText;
}

// Update and show region modal
function showRegionModal() {
  const info = REGION_INFO[state.region];
  els.modalTitle.textContent = `Vùng ${state.region} gồm những địa bàn nào?`;
  els.modalBody.innerHTML = `
    <p class="modal-desc">${info.desc}</p>
    <p class="modal-provinces">${info.areas.join(', ')}</p>
    <p class="modal-note">Vùng xác định theo nơi hoạt động của công ty, không phải nơi cư trú. Xem chi tiết tại Nghị định 128/2025/NĐ-CP.</p>
  `;
  els.regionModal.showModal();
}

// Modal handlers
els.regionInfoBtn.addEventListener('click', showRegionModal);
els.modalClose.addEventListener('click', () => els.regionModal.close());
els.regionModal.addEventListener('click', (e) => {
  if (e.target === els.regionModal) els.regionModal.close();
});

els.periodToggle.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    els.periodToggle.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.period = btn.dataset.period;
    updateSalaryLabel();
    update();
  });
});

els.modeToggle.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    els.modeToggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.mode = btn.dataset.mode;
    updateSalaryLabel();
    update();
  });
});

// Initialize salary input with default value and cursor at beginning
els.salary.value = state.salary.toLocaleString('vi-VN');
els.stickySalary.value = state.salary.toLocaleString('vi-VN');
els.salary.focus();
els.salary.setSelectionRange(0, 0);
update();

// Sticky bar - show on mobile when scrolled past salary input field
const salaryInputGroup = els.salary.closest('.input-group');
let stickyBarVisible = false;

function checkStickyBar() {
  if (window.innerWidth > 768) {
    els.stickyBar.classList.remove('visible');
    document.body.classList.remove('sticky-bar-visible');
    return;
  }

  const rect = salaryInputGroup.getBoundingClientRect();
  // Show immediately when salary input scrolls out of view
  const shouldShow = rect.bottom < 0;

  if (shouldShow !== stickyBarVisible) {
    stickyBarVisible = shouldShow;
    els.stickyBar.classList.toggle('visible', shouldShow);
    document.body.classList.toggle('sticky-bar-visible', shouldShow);
  }
}

window.addEventListener('scroll', checkStickyBar, { passive: true });
window.addEventListener('resize', checkStickyBar, { passive: true });

// Sync sticky salary input with main input
els.stickySalary.addEventListener('input', (e) => {
  const cursorPos = e.target.selectionStart;
  const beforeCursor = e.target.value.slice(0, cursorPos).replace(/[^\d]/g, '');
  const digitsBefore = beforeCursor.length;

  const val = e.target.value.replace(/[^\d]/g, '');
  const num = parseInt(val, 10) || 0;
  const formatted = val ? formatDigits(val) : '';
  e.target.value = formatted;
  state.salary = num;
  els.salary.value = formatted;

  let digits = 0, newPos = 0;
  for (let i = 0; i < formatted.length && digits < digitsBefore; i++) {
    if (/\d/.test(formatted[i])) digits++;
    newPos = i + 1;
  }
  e.target.selectionStart = e.target.selectionEnd = newPos;

  clearTimeout(timeout);
  timeout = setTimeout(update, 100);
});

// Sync main input to sticky input
els.salary.addEventListener('input', () => {
  els.stickySalary.value = els.salary.value;
});

// Lazy load Google Analytics on first user interaction (performance optimization)
const loadGtag = () => {
  if (window.gtagLoaded) return;
  window.gtagLoaded = true;
  const s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-VQ1VX81WVR';
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-VQ1VX81WVR');
};
['scroll', 'click', 'touchstart', 'keydown'].forEach(e =>
  window.addEventListener(e, loadGtag, { once: true, passive: true })
);

// Export for testing (dev only)
if (import.meta.env.DEV) {
  window.VND = VND;
  window.grossToNet = grossToNet;
}
