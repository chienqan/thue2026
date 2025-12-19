// VND formatting utilities
export const VND = {
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
