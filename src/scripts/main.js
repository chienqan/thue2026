import { createIcons, Users, Minus, Plus, Sparkles, TrendingUp } from 'lucide';
import { TAX_OLD, TAX_NEW, REGIONS } from './constants.js';
import { grossToNet, getTaxBreakdown } from './calculator.js';
import { VND } from './format.js';

// Self-hosted fonts - Vietnamese + Latin subsets
import '../styles/fonts.css';
import '../styles/main.css';

// Initialize Lucide icons
createIcons({
  icons: { Users, Minus, Plus, Sparkles, TrendingUp }
});

// State
const state = { salary: 100000000, deps: 0, region: 'I' };

// DOM references
const $ = (id) => document.getElementById(id);
const els = {
  salary: $('salary'),
  deps: $('dependents'),
  regionGrid: $('region-grid'),
  regionInfo: $('region-info'),
  oldNet: $('old-net'),
  oldTax: $('old-tax'),
  oldDeduct: $('old-deduction'),
  newNet: $('new-net'),
  newTax: $('new-tax'),
  newDeduct: $('new-deduction'),
  netGain: $('net-gain'),
  netGainText: $('net-gain-text'),
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
  const oldR = grossToNet(state.salary, state.deps, state.region, TAX_OLD);
  const newR = grossToNet(state.salary, state.deps, state.region, TAX_NEW);
  const hasSalary = state.salary > 0;

  els.oldNet.innerHTML = `${VND.format(oldR.net)}<span class="currency">đ</span>`;
  els.oldTax.textContent = VND.formatUnit(oldR.tax);
  els.oldDeduct.textContent = hasSalary ? VND.formatUnit(oldR.deduct) : '0 đ';

  els.newNet.innerHTML = `${VND.format(newR.net)}<span class="currency">đ</span>`;
  els.newTax.textContent = VND.formatUnit(newR.tax);
  els.newDeduct.textContent = hasSalary ? VND.formatUnit(newR.deduct) : '0 đ';

  // Net gain indicator
  const netGain = newR.net - oldR.net;
  if (netGain > 0 && hasSalary) {
    const netGainFormatted = netGain >= 1000000
      ? `+${(netGain / 1000000).toFixed(2).replace('.00', '')} triệu`
      : `+${VND.format(netGain)}`;
    els.netGainText.textContent = `${netGainFormatted} / tháng`;
    els.netGain.style.display = 'inline-flex';
  } else {
    els.netGain.style.display = 'none';
  }

  // Refresh icons for dynamically inserted content
  createIcons({
    icons: { Users, Minus, Plus, Sparkles, TrendingUp }
  });

  // Region info
  els.regionInfo.textContent = `Áp dụng vùng ${state.region} - Mức lương tối thiểu ${VND.format(REGIONS[state.region].min)} đ`;

  // Chart
  updateChart(oldR, newR);

  // Details table
  const rows = [
    ['Lương Gross', oldR.gross, newR.gross],
    ['Bảo hiểm (10.5%)', -oldR.ins, -newR.ins],
    ['Giảm trừ bản thân', hasSalary ? -TAX_OLD.PERSONAL : 0, hasSalary ? -TAX_NEW.PERSONAL : 0],
    [`Giảm trừ NPT (×${state.deps})`, hasSalary ? -TAX_OLD.DEPENDENT * state.deps : 0, hasSalary ? -TAX_NEW.DEPENDENT * state.deps : 0],
    ['Thu nhập chịu thuế', oldR.taxable, newR.taxable],
    ['Thuế TNCN (*)', -oldR.tax, -newR.tax, 'negative'],
    ['Thực lĩnh (Net)', oldR.net, newR.net, 'bold']
  ];

  els.details.innerHTML = rows.map(([label, old, newVal, type]) => `
    <tr>
      <td class="${type === 'bold' ? 'text-bold' : ''}">${label}</td>
      <td class="${type === 'negative' ? 'text-red' : ''}">${VND.format(old)}</td>
      <td class="text-green ${type === 'bold' ? 'text-bold' : ''}">${VND.format(newVal)}</td>
    </tr>
  `).join('');

  // Brackets table
  const oldBr = getTaxBreakdown(oldR.taxable, TAX_OLD.BRACKETS);
  const newBr = getTaxBreakdown(newR.taxable, TAX_NEW.BRACKETS);
  const rates = ['5%', '10%', '20%', '30%', '35%'];

  if (oldBr.length === 0 && newBr.length === 0) {
    els.brackets.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:20px">Không có thuế</td></tr>';
  } else {
    els.brackets.innerHTML = rates.map((r, i) => {
      const o = oldBr.find(x => x.rate === r);
      const n = newBr.find(x => x.rate === r);
      return `
        <tr>
          <td>Bậc ${i + 1}</td>
          <td>${r}</td>
          <td>${o ? VND.format(o.tax) : '—'}</td>
          <td class="text-green">${n ? VND.format(n.tax) : '—'}</td>
        </tr>
      `;
    }).join('');
  }
}

// Event listeners
let timeout;
els.salary.addEventListener('input', (e) => {
  const val = e.target.value.replace(/[^\d]/g, '');
  const num = parseInt(val, 10) || 0;
  e.target.value = num > 0 ? num.toLocaleString('vi-VN') : '';
  state.salary = num;
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

// Initialize salary input with default value
els.salary.value = state.salary.toLocaleString('vi-VN');
update();

// Export for testing (dev only)
if (import.meta.env.DEV) {
  window.VND = VND;
  window.grossToNet = grossToNet;
}
