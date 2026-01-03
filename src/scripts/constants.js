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
  I: { min: 4_960_000, label: 'I' },
  II: { min: 4_410_000, label: 'II' },
  III: { min: 3_860_000, label: 'III' },
  IV: { min: 3_450_000, label: 'IV' }
};

// Regional minimum wages - NEW (2026)
export const REGIONS_NEW = {
  I: { min: 5_310_000, label: 'I' },
  II: { min: 4_730_000, label: 'II' },
  III: { min: 4_140_000, label: 'III' },
  IV: { min: 3_700_000, label: 'IV' }
};


// Region info (Nghị định 128/2025/NĐ-CP, có hiệu lực từ 01/7/2025)
// Vùng xác định theo nơi hoạt động của người sử dụng lao động
export const REGION_INFO = {
  I: {
    desc: 'Các quận nội thành thành phố trực thuộc TW, khu công nghiệp lớn',
    areas: ['Hà Nội (nội thành)', 'TP. HCM (nội thành)', 'Hải Phòng (nội thành)', 'Quảng Ninh (phần lớn)', 'Đồng Nai (Biên Hòa, Long Khánh...)', 'Long An (Tân An, Đức Hòa...)']
  },
  II: {
    desc: 'Thành phố trực thuộc tỉnh, khu công nghiệp phát triển',
    areas: ['Bắc Ninh (phần lớn)', 'Thái Nguyên (TP)', 'Thanh Hóa (TP, Nghi Sơn)', 'Nghệ An (Vinh)', 'Huế (nội thành)', 'Đà Nẵng (nội thành)', 'Khánh Hòa (Nha Trang, Cam Ranh)', 'Lâm Đồng (Đà Lạt, Bảo Lộc)', 'Cần Thơ (nội thành)', 'Bạc Liêu (TP)']
  },
  III: {
    desc: 'Thị xã, thị trấn huyện lỵ, khu vực đang phát triển',
    areas: ['Lào Cai (một số phường)', 'Điện Biên (TP)', 'Phú Thọ (một số huyện)', 'Thanh Hóa (các huyện)', 'Nghệ An (các huyện)', 'Hà Tĩnh (Kỳ Anh, TP)', 'Quảng Trị (Đông Hà)', 'Đắk Lắk (Buôn Ma Thuột)', 'Gia Lai (Pleiku)', 'Tiền Giang (Gò Công)']
  },
  IV: {
    desc: 'Vùng nông thôn, miền núi, hải đảo',
    areas: ['Cao Bằng (các xã)', 'Hà Giang (các xã)', 'Lai Châu (các xã)', 'Sơn La (các xã)', 'Điện Biên (các xã)', 'Bắc Kạn', 'Huế (A Lưới)', 'Đồng Nai (Bù Đăng)', 'Vùng sâu, vùng xa các tỉnh']
  }
};

// Insurance calculation constants
// Lương cơ sở (base salary) - used for BHXH/BHYT cap
export const BASE_SALARY = 2_340_000;
export const CAP_MULT = 20;
