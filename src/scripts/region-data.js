/**
 * Region data parsed from Nghị định 128/2025/NĐ-CP
 * Effective: 01/7/2025
 *
 * Structure: Province → { default: region, areas: { region: [wards] } }
 * Only stores non-default areas to minimize size
 */

// Region mappings for 34 provinces with explicit rules
export const REGION_DATA = {
  'Lào Cai': {
    default: 'IV',
    areas: {
      'II': ['Cam Đường', 'Lào Cai', 'Cốc San', 'Hợp Thành', 'Gia Phú'],
      'III': ['Văn Phú', 'Yên Bái', 'Nam Cường', 'Âu Lâu', 'Sa Pa', 'Phong Hải', 'Xuân Quang', 'Bảo Thắng', 'Tằng Loỏng', 'Mường Bo', 'Bản Hồ', 'Tả Phìn', 'Tả Van', 'Ngũ Chỉ Sơn']
    }
  },
  'Cao Bằng': {
    default: 'IV',
    areas: {
      'III': ['Thục Phán', 'Nùng Trí Cao', 'Tân Giang']
    }
  },
  'Điện Biên': {
    default: 'IV',
    areas: {
      'III': ['Điện Biên Phủ', 'Mường Thanh', 'Mường Phăng', 'Nà Tấu']
    }
  },
  'Lai Châu': {
    default: 'IV',
    areas: {
      'III': ['Tân Phong', 'Đoàn Kết']
    }
  },
  'Sơn La': {
    default: 'IV',
    areas: {
      'III': ['Tô Hiệu', 'Chiềng An', 'Chiềng Cơi', 'Chiềng Sinh']
    }
  },
  'Tuyên Quang': {
    default: 'IV',
    areas: {
      'III': ['Mỹ Lâm', 'Minh Xuân', 'Nông Tiến', 'An Tường', 'Bình Thuận', 'Hà Giang 1', 'Hà Giang 2', 'Ngọc Đường']
    }
  },
  'Lạng Sơn': {
    default: 'IV',
    areas: {
      'III': ['Tam Thanh', 'Lương Văn Tri', 'Hoàng Văn Thụ', 'Đông Kinh']
    }
  },
  'Phú Thọ': {
    default: 'IV',
    areas: {
      'II': ['Việt Trì', 'Nông Trang', 'Thanh Miếu', 'Vân Phú', 'Vĩnh Phúc', 'Vĩnh Yên', 'Phúc Yên', 'Xuân Hòa', 'Hòa Bình', 'Kỳ Sơn', 'Tân Hòa', 'Thống Nhất', 'Hy Cương', 'Yên Lạc', 'Tề Lỗ', 'Liên Châu', 'Tam Hông', 'Nguyệt Đức', 'Bình Nguyên', 'Xuân Lãng', 'Bình Xuyên', 'Bình Tuyền', 'Lương Sơn', 'Cao Dương', 'Liên Sơn', 'Thịnh Minh'],
      'III': ['Phong Châu', 'Phú Thọ', 'Âu Cơ', 'Lâm Thao', 'Xuân Lũng', 'Phùng Nguyên', 'Bản Nguyên', 'Phù Ninh', 'Dân Chủ', 'Phú Mỹ', 'Trạm Thản', 'Bình Phú', 'Thanh Ba', 'Quảng Yên', 'Hoàng Cương', 'Đông Thành', 'Chí Tiên', 'Liên Minh', 'Tam Nông', 'Thọ Văn', 'Vạn Xuân', 'Hiền Quan', 'Tam Sơn', 'Sông Lô', 'Hải Lựu', 'Yên Lãng', 'Lập Thạch', 'Tiên Lữ', 'Thái Hòa', 'Liên Hòa', 'Hợp Lý', 'Sơn Đông', 'Tam Đảo', 'Đại Đình', 'Đạo Trù', 'Tam Dương', 'Hội Thịnh', 'Hoàng An', 'Tam Dương Bắc', 'Vĩnh Tường', 'Thổ Tang', 'Vĩnh Hưng', 'Vĩnh An', 'Vĩnh Phú', 'Vĩnh Thành']
    }
  },
  'Quảng Ninh': {
    default: 'I',
    areas: {
      'II': ['Mông Dương', 'Quang Hanh', 'Cẩm Phả', 'Cửa Ông', 'Hải Hòa'],
      'III': ['Tiên Yên', 'Điền Xá', 'Đông Ngũ', 'Hải Lạng', 'Quảng Tân', 'Đầm Hà', 'Quảng Hà', 'Đường Hoa', 'Quảng Đức', 'Cái Chiên', 'Vân Đồn'],
      'IV': ['Ba Chẽ', 'Hoành Mô', 'Lục Hồn', 'Bình Liêu', 'Cô Tô']
    }
  },
  'Hải Phòng': {
    default: 'I',
    areas: {
      'II': ['Chu Văn An', 'Chí Linh', 'Trần Hưng Đạo', 'Nguyễn Trãi', 'Trần Nhân Tông', 'Lê Đại Hành', 'Kinh Môn', 'Nguyễn Đại Năng', 'Trần Liễu', 'Bắc An Phụ', 'Phạm Sư Mạnh', 'Nhị Chiểu', 'Nam An Phụ', 'Nam Sách', 'Thái Tân', 'Hợp Tiến', 'Trần Phú', 'An Phú', 'Cẩm Giang', 'Cẩm Giàng', 'Tuệ Tĩnh', 'Mao Điền', 'Kẻ Sặt', 'Bình Giang', 'Đường An', 'Thượng Hồng', 'Gia Lộc', 'Yết Kiêu', 'Gia Phúc', 'Trường Tân', 'Tứ Kỳ', 'Tân Kỳ', 'Đại Sơn', 'Chí Minh', 'Lạc Phượng', 'Nguyên Giáp', 'Nguyễn Lương Bằng', 'Phú Thái', 'Lai Khê', 'An Thành', 'Kim Thành', 'Bạch Long Vĩ'],
      'III': ['Thanh Hà', 'Hà Tây', 'Hà Bắc', 'Hà Đông', 'Ninh Giang', 'Vĩnh Lại', 'Khúc Thừa Dụ', 'Tân An', 'Hồng Châu', 'Thanh Miện', 'Bắc Thanh Miện', 'Hải Hưng', 'Nam Thanh Miện', 'Hà Nam']
    }
  },
  'Hưng Yên': {
    default: 'IV',
    areas: {
      'II': ['Phố Hiến', 'Sơn Nam', 'Hồng Châu', 'Mỹ Hào', 'Đường Hào', 'Thượng Hồng', 'Thái Bình', 'Trần Lãm', 'Trần Hưng Đạo', 'Trà Lý', 'Vũ Phúc', 'Tân Hưng', 'Yên Mỹ', 'Việt Yên', 'Hoàn Long', 'Nguyễn Văn Linh', 'Như Quỳnh', 'Lạc Đạo', 'Đại Đồng', 'Nghĩa Trụ', 'Phụng Công', 'Văn Giang', 'Mễ Sở'],
      'III': ['Hoàng Hoa Thám', 'Tiên Lữ', 'Tiên Hoa', 'Quang Hưng', 'Đoàn Đào', 'Tiên Tiến', 'Tống Trân', 'Lương Bằng', 'Nghĩa Dân', 'Hiệp Cường', 'Đức Hợp', 'Ân Thi', 'Xuân Trúc', 'Phạm Ngũ Lão', 'Nguyễn Trãi', 'Hồng Quang', 'Khoái Châu', 'Triệu Việt Vương', 'Việt Tiến', 'Chí Minh', 'Châu Ninh', 'Thái Thụy', 'Đông Thụy Anh', 'Bắc Thụy Anh', 'Thụy Anh', 'Nam Thụy Anh', 'Bắc Thái Ninh', 'Thái Ninh', 'Đông Thái Ninh', 'Nam Thái Ninh', 'Tây Thái Ninh', 'Tây Thụy Anh', 'Tiền Hải', 'Tây Tiền Hải', 'Ái Quốc', 'Đồng Châu', 'Đông Tiền Hải', 'Nam Cường', 'Hưng Phú', 'Nam Tiền Hải']
    }
  },
  'Thái Nguyên': {
    default: 'IV',
    areas: {
      'II': ['Phan Đình Phùng', 'Linh Sơn', 'Tích Lương', 'Gia Sàng', 'Quyết Thắng', 'Quan Triều', 'Phổ Yên', 'Vạn Xuân', 'Trung Thành', 'Phúc Thuận', 'Sông Công', 'Bá Xuyên', 'Bách Quang', 'Tân Cương', 'Đại Phúc', 'Thành Công'],
      'III': ['Đức Xuân', 'Bắc Kạn', 'Đại Từ', 'Đức Lương', 'Phú Thịnh', 'La Bằng', 'Phú Lạc', 'An Khánh', 'Quân Chu', 'Vạn Phú', 'Phú Xuyên', 'Phú Bình', 'Tân Thành', 'Điềm Thụy', 'Kha Sơn', 'Tân Khánh', 'Đồng Hỷ', 'Quang Sơn', 'Trại Cau', 'Nam Hòa', 'Văn Hán', 'Văn Lăng', 'Phú Lương', 'Vô Tranh', 'Yên Trạch', 'Hợp Thành', 'Phong Quang']
    }
  },
  'Bắc Ninh': {
    default: 'II',
    areas: {
      'III': ['Lạng Giang', 'Mỹ Thái', 'Kép', 'Tân Dĩnh', 'Tiên Lục', 'Tân Yên', 'Ngọc Thiện', 'Nhã Nam', 'Phúc Hòa', 'Quang Trung', 'Hợp Thịnh', 'Hiệp Hòa', 'Hoàng Vân', 'Xuân Cẩm'],
      'IV': ['Chũ', 'Phượng Sơn', 'Đại Sơn', 'Sơn Động', 'Tây Yên Tử', 'Dương Hưu', 'Yên Định', 'An Lạc', 'Vân Sơn', 'Biển Động', 'Lục Ngạn', 'Đèo Gia', 'Sơn Hải', 'Tân Sơn', 'Biên Sơn', 'Sa Lý', 'Nam Dương', 'Kiên Lao', 'Lục Sơn', 'Trường Sơn', 'Cẩm Lý', 'Đông Phú', 'Nghĩa Phương', 'Lục Nam', 'Bắc Lũng', 'Bảo Đài', 'Yên Thế', 'Bố Hạ', 'Đồng Kỳ', 'Xuân Lương', 'Tam Tiến', 'Tuấn Đạo']
    }
  },
  'Hà Nội': {
    default: 'I',
    areas: {
      'II': ['Phượng Dực', 'Chuyên Mỹ', 'Đại Xuyên', 'Vân Đình', 'Ứng Thiên', 'Hòa Xá', 'Ứng Hòa', 'Mỹ Đức', 'Hồng Sơn', 'Phúc Sơn', 'Hương Sơn', 'Minh Châu', 'Quảng Oai', 'Vật Lại', 'Cổ Đô', 'Bất Bạt', 'Suối Hai', 'Ba Vì', 'Phúc Thọ', 'Phúc Lộc', 'Hát Môn', 'Đan Phượng']
    }
  },
  'Ninh Bình': {
    default: 'IV',
    areas: {
      'II': ['Tây Hoa Lư', 'Hoa Lư', 'Nam Hoa Lư', 'Đông Hoa Lư', 'Nam Định', 'Thiên Trường', 'Đông A', 'Vị Khê', 'Thành Nam', 'Trường Thi', 'Hồng Quang', 'Mỹ Lộc'],
      'III': ['Tam Điệp', 'Yên Sơn', 'Trung Sơn', 'Yên Thắng', 'Hà Nam', 'Phủ Lý', 'Phù Vân', 'Châu Sơn', 'Liêm Tuyền', 'Duy Tiên', 'Duy Tân', 'Đồng Văn', 'Duy Hà', 'Tiên Sơn', 'Lê Hồ', 'Nguyễn Úy', 'Lý Thường Kiệt', 'Kim Thanh', 'Tam Chúc', 'Kim Bảng', 'Gia Viễn', 'Đại Hoàng', 'Gia Hưng', 'Gia Phong', 'Gia Vân', 'Gia Trấn', 'Yên Khánh', 'Khánh Nhạc', 'Khánh Thiện', 'Khánh Hội', 'Khánh Trung', 'Nam Trực', 'Nam Minh', 'Nam Đồng', 'Nam Ninh', 'Nam Hồng', 'Minh Tân', 'Hiển Khánh', 'Vụ Bản', 'Liên Minh', 'Ý Yên', 'Yên Đồng', 'Yên Cường', 'Vạn Thắng', 'Vũ Dương', 'Tân Minh', 'Phong Doanh', 'Cổ Lễ', 'Ninh Giang', 'Cát Thành', 'Trực Ninh', 'Quang Hưng', 'Minh Thái', 'Ninh Cường', 'Xuân Trường', 'Xuân Hưng', 'Xuân Giang', 'Xuân Hồng', 'Hải Hậu', 'Hải Anh', 'Hải Tiến', 'Hải Hưng', 'Hải An', 'Hải Quang', 'Hải Xuân', 'Hải Thịnh', 'Giao Minh', 'Giao Hòa', 'Giao Thủy', 'Giao Phúc', 'Giao Hưng', 'Giao Bình', 'Giao Ninh', 'Đồng Thịnh', 'Nghĩa Hưng', 'Nghĩa Sơn', 'Hồng Phong', 'Quỹ Nhất', 'Nghĩa Lâm', 'Rạng Đông']
    }
  },
  'Thanh Hóa': {
    default: 'IV',
    areas: {
      'II': ['Hạc Thành', 'Quảng Phú', 'Đông Quang', 'Đông Sơn', 'Đông Tiến', 'Hàm Rồng', 'Nguyệt Viên', 'Sầm Sơn', 'Nam Sầm Sơn', 'Bỉm Sơn', 'Quang Trung', 'Ngọc Sơn', 'Tân Dân', 'Hải Lĩnh', 'Tĩnh Gia', 'Đào Duy Từ', 'Hải Bình', 'Trúc Lâm', 'Nghi Sơn', 'Trường Lâm', 'Các Sơn'],
      'III': ['Hà Trung', 'Tống Sơn', 'Hà Long', 'Hoạt Giang', 'Lĩnh Toại', 'Triệu Lộc', 'Đông Thành', 'Hậu Lộc', 'Hoa Lộc', 'Vạn Lộc', 'Nga Sơn', 'Nga Thắng', 'Hồ Vương', 'Tân Tiến', 'Nga An', 'Ba Đình', 'Hoằng Hóa', 'Hoằng Tiến', 'Hoằng Thanh', 'Hoằng Lộc', 'Hoằng Châu', 'Hoằng Sơn', 'Hoằng Phú', 'Hoằng Giang', 'Lưu Vệ', 'Quảng Yên', 'Quảng Ngọc', 'Quảng Ninh', 'Quảng Bình', 'Tiên Trang', 'Quảng Chính', 'Nông Cống', 'Thắng Lợi', 'Trung Chính', 'Trường Văn', 'Thăng Bình', 'Tượng Lĩnh', 'Công Chính', 'Thiệu Hóa', 'Thiệu Quang', 'Thiệu Tiến', 'Thiệu Toán', 'Thiệu Trung', 'Yên Định', 'Yên Trường', 'Yên Phú', 'Quý Lộc', 'Yên Ninh', 'Định Tân', 'Định Hòa', 'Thọ Xuân', 'Thọ Long', 'Xuân Hòa', 'Sao Vàng', 'Lam Sơn', 'Thọ Lập', 'Xuân Tín', 'Xuân Lập', 'Vĩnh Lộc', 'Tây Đô', 'Biện Thượng', 'Triệu Sơn', 'Thọ Bình', 'Thọ Ngọc', 'Thọ Phú', 'Hợp Tiến', 'An Nông', 'Tân Ninh', 'Đồng Tiến']
    }
  },
  'Nghệ An': {
    default: 'IV',
    areas: {
      'II': ['Trường Vinh', 'Thành Vinh', 'Vinh Hưng', 'Vinh Phú', 'Vinh Lộc', 'Cửa Lò', 'Hưng Nguyên', 'Yên Trung', 'Hưng Nguyên Nam', 'Lam Thành', 'Nghi Lộc', 'Phúc Lộc', 'Đông Lộc', 'Trung Lộc', 'Thần Lĩnh', 'Hải Lộc', 'Văn Kiều'],
      'III': ['Hoàng Mai', 'Tân Mai', 'Quỳnh Mai', 'Thái Hòa', 'Tây Hiếu', 'Diễn Châu', 'Đức Châu', 'Quảng Châu', 'Hải Châu', 'Tân Châu', 'An Châu', 'Minh Châu', 'Hùng Châu', 'Đô Lương', 'Bạch Ngọc', 'Văn Hiến', 'Bạch Hà', 'Thuần Trung', 'Lương Sơn', 'Vạn An', 'Nam Đàn', 'Đại Huệ', 'Thiên Nhẫn', 'Kim Liên', 'Nghĩa Đàn', 'Nghĩa Thọ', 'Nghĩa Lâm', 'Nghĩa Mai', 'Nghĩa Hưng', 'Nghĩa Khánh', 'Nghĩa Lộc', 'Quỳnh Lưu', 'Quỳnh Văn', 'Quỳnh Anh', 'Quỳnh Tam', 'Quỳnh Phú', 'Quỳnh Sơn', 'Quỳnh Thắng', 'Đông Hiếu', 'Yên Thành', 'Quan Thành', 'Hợp Minh', 'Vân Tụ', 'Vân Du', 'Quang Đồng', 'Giai Lạc', 'Bình Minh', 'Đông Thành']
    }
  },
  'Hà Tĩnh': {
    default: 'IV',
    areas: {
      'III': ['Sông Trí', 'Hải Ninh', 'Hoành Sơn', 'Vũng Áng', 'Thành Sen', 'Trần Phú', 'Hà Huy Tập', 'Thạch Lạc', 'Đồng Tiến', 'Thạch Khê', 'Cẩm Bình', 'Kỳ Hoa']
    }
  },
  'Quảng Trị': {
    default: 'IV',
    areas: {
      'II': ['Đồng Hới', 'Đồng Thuận', 'Đông Sơn'],
      'III': ['Đông Hà', 'Nam Đông Hà', 'Ba Đồn', 'Bắc Gianh', 'Nam Gianh', 'Nam Ba Đồn', 'Tân Gianh', 'Trung Thuần', 'Quảng Trạch', 'Hòa Trạch', 'Phú Trạch', 'Thượng Trạch', 'Phong Nha', 'Bắc Trạch', 'Đông Trạch', 'Hoàn Lão', 'Bố Trạch', 'Nam Trạch', 'Quảng Ninh', 'Ninh Châu', 'Trường Ninh', 'Trường Sơn', 'Lệ Thủy', 'Cam Hồng', 'Sen Ngư', 'Tân Mỹ', 'Trường Phú', 'Lệ Ninh', 'Kim Ngân']
    }
  },
  'Huế': {
    default: 'III',
    areas: {
      'II': ['Thuận An', 'Hóa Châu', 'Mỹ Thượng', 'Vỹ Dạ', 'Thuận Hóa', 'An Cựu', 'Thủy Xuân', 'Kim Long', 'Hương An', 'Phú Xuân', 'Dương Nỗ'],
      'IV': ['A Lưới 1', 'A Lưới 2', 'A Lưới 3', 'A Lưới 4', 'A Lưới 5']
    }
  },
  'Đà Nẵng': {
    default: 'IV',
    areas: {
      'II': ['Hải Châu', 'Hòa Cường', 'Thanh Khê', 'An Khê', 'An Hải', 'Sơn Trà', 'Ngũ Hành Sơn', 'Hòa Khánh', 'Hải Vân', 'Liên Chiểu', 'Cẩm Lệ', 'Hòa Xuân', 'Tam Kỳ', 'Quảng Phú', 'Hương Trà', 'Bàn Thạch', 'Hội An', 'Hội An Đông', 'Hội An Tây', 'Hòa Vang', 'Hòa Tiến', 'Bà Nà', 'Tân Hiệp', 'Hoàng Sa'],
      'III': ['Điện Bàn', 'Điện Bàn Đông', 'An Thắng', 'Điện Bàn Bắc', 'Núi Thành', 'Tam Mỹ', 'Tam Anh', 'Đức Phú', 'Tam Xuân', 'Tam Hải', 'Tây Hồ', 'Chiên Đàn', 'Phú Ninh', 'Thăng Bình', 'Thăng An', 'Thăng Trường', 'Thăng Điền', 'Thăng Phú', 'Đồng Dương', 'Quế Sơn Trung', 'Quế Sơn', 'Xuân Phú', 'Nông Sơn', 'Quế Phước', 'Duy Nghĩa', 'Nam Phước', 'Duy Xuyên', 'Thu Bồn', 'Điện Bàn Tây', 'Gò Nổi', 'Đại Lộc', 'Hà Nha', 'Thượng Đức', 'Vu Gia', 'Phú Thuận']
    }
  },
  'Quảng Ngãi': {
    default: 'IV',
    areas: {
      'III': ['Trương Quang Trọng', 'Cẩm Thành', 'Nghĩa Lộ', 'Kon Tum', 'Đăk Cấm', 'Đăk Bla', 'Tịnh Khê', 'An Phú', 'Bình Minh', 'Bình Chương', 'Bình Sơn', 'Vạn Tường', 'Đông Sơn', 'Trường Giang', 'Ba Gia', 'Sơn Tịnh', 'Thọ Phong', 'Ngọk Bay', 'Ia Chim', 'Đăk Rơ Wa', 'Đăk Pxi', 'Đăk Mar', 'Đăk Ui', 'Đăk Hà', 'Ngọk Réo']
    }
  },
  'Đắk Lắk': {
    default: 'IV',
    areas: {
      'III': ['Buôn Ma Thuột', 'Tân An', 'Tân Lập', 'Xuân Đài', 'Sông Cầu', 'Thành Nhất', 'Ea Kao', 'Tuy Hòa', 'Phú Yên', 'Bình Kiến', 'Đông Hòa', 'Hòa Hiệp', 'Hòa Phú', 'Xuân Thọ', 'Xuân Cảnh', 'Xuân Lộc', 'Hòa Xuân']
    }
  },
  'Khánh Hòa': {
    default: 'IV',
    areas: {
      'II': ['Nha Trang', 'Bắc Nha Trang', 'Tây Nha Trang', 'Nam Nha Trang', 'Bắc Cam Ranh', 'Cam Ranh', 'Cam Linh', 'Ba Ngòi', 'Ninh Hòa', 'Đông Ninh Hòa', 'Hòa Thắng', 'Nam Cam Ranh', 'Bắc Ninh Hòa', 'Tân Định', 'Nam Ninh Hòa', 'Tây Ninh Hòa', 'Hòa Trí'],
      'III': ['Phan Rang', 'Đông Hải', 'Ninh Chử', 'Bảo An', 'Đô Vinh', 'Đại Lãnh', 'Tu Bông', 'Vạn Thắng', 'Vạn Ninh', 'Vạn Hưng', 'Diên Khánh', 'Diên Lạc', 'Diên Điền', 'Suối Hiệp', 'Diên Thọ', 'Diên Lâm', 'Cam Lâm', 'Suối Dầu', 'Cam Hiệp', 'Cam An', 'Ninh Phước', 'Phước Hữu', 'Phước Hậu', 'Phước Dinh', 'Ninh Hải', 'Xuân Hải', 'Vĩnh Hải', 'Thuận Bắc', 'Công Hải']
    }
  },
  'Gia Lai': {
    default: 'IV',
    areas: {
      'III': ['Quy Nhơn', 'Quy Nhơn Đông', 'Quy Nhơn Tây', 'Quy Nhơn Nam', 'Quy Nhơn Bắc', 'Pleiku', 'Hội Phú', 'Thống Nhất', 'Diên Hồng', 'An Phú', 'Biển Hồ', 'Gào']
    }
  },
  'Lâm Đồng': {
    default: 'IV',
    areas: {
      'II': ['Xuân Hương - Đà Lạt', 'Cam Ly - Đà Lạt', 'Lâm Viên - Đà Lạt', 'Xuân Trường - Đà Lạt', 'Lang Biang - Đà Lạt', '1 Bảo Lộc', '2 Bảo Lộc', '3 Bảo Lộc', "B' Lao", 'Hàm Thắng', 'Bình Thuận', 'Mũi Né', 'Phú Thủy', 'Phan Thiết', 'Tiến Thành', 'Tuyên Quang'],
      'III': ['La Gi', 'Phước Hội', 'Bắc Gia Nghĩa', 'Nam Gia Nghĩa', 'Đông Gia Nghĩa', 'Hiệp Thạnh', 'Đức Trọng', 'Tân Hội', 'Tà Hine', 'Tà Năng', 'Đinh Văn Lâm Hà', 'Di Linh', 'Hòa Ninh', 'Hòa Bắc', 'Đinh Trang Thượng', 'Bảo Thuận', 'Sơn Điền', 'Gia Hiệp', 'Tân Hải', 'Đông Giang', 'La Dạ', 'Hàm Thuận Bắc', 'Hàm Thuận', 'Hồng Sơn', 'Hàm Liêm', 'Hàm Thạnh', 'Hàm Kiệm', 'Tân Thành', 'Hàm Thuận Nam', 'Tân Lập', 'Ninh Gia']
    }
  },
  'Hồ Chí Minh': {
    default: 'I',
    areas: {
      'II': ['Bà Rịa', 'Long Hương', 'Tam Long', 'Bình Khánh', 'An Thới Đông', 'Cần Giờ', 'Thạnh An'],
      'III': ['Ngãi Giao', 'Bình Giã', 'Kim Long', 'Châu Đức', 'Xuân Sơn', 'Nghĩa Thành', 'Hòa Hiệp', 'Bình Châu', 'Hồ Tràm', 'Xuyên Mộc', 'Hòa Hội', 'Bàu Lâm', 'Phước Hải', 'Long Hải', 'Đất Đỏ', 'Long Điền', 'Côn Đảo']
    }
  },
  'Đồng Nai': {
    default: 'III',
    areas: {
      'I': ['Biên Hòa', 'Trấn Biên', 'Tam Hiệp', 'Long Bình', 'Trảng Dài', 'Hố Nai', 'Long Hưng', 'Bình Lộc', 'Bảo Vinh', 'Xuân Lập', 'Long Khánh', 'Hàng Gòn', 'Tân Triều', 'Phước Tân', 'Tam Phước', 'Phú Lý', 'Đại Phước', 'Nhơn Trạch', 'Phước An', 'Phước Thái', 'Long Phước', 'Bình An', 'Long Thành', 'An Phước', 'An Viễn', 'Bình Minh', 'Trảng Bom', 'Bàu Hàm', 'Hưng Thịnh', 'Dầu Giây', 'Gia Kiệm', 'Thống Nhất', 'Xuân Đường', 'Xuân Đông', 'Xuân Định', 'Xuân Phú', 'Xuân Lộc', 'Xuân Hòa', 'Xuân Thành', 'Xuân Bắc', 'Trị An', 'Tân An'],
      'II': ['Minh Hưng', 'Chơn Thành', 'Đồng Xoài', 'Bình Phước', 'Xuân Quế', 'Cẩm Mỹ', 'Sông Ray', 'La Ngà', 'Định Quán', 'Phú Vinh', 'Phú Hòa', 'Tà Lài', 'Nam Cát Tiên', 'Tân Phú', 'Phú Lâm', 'Nha Bích', 'Tân Quan', 'Thuận Lợi', 'Đồng Tâm', 'Tân Lợi', 'Đồng Phú', 'Đak Lua', 'Thanh Sơn'],
      'IV': ['Thiện Hưng', 'Hưng Phước', 'Phú Nghĩa', 'Đa Kia', 'Phước Sơn', 'Nghĩa Trung', 'Bù Đăng', 'Thọ Sơn', 'Đak Nhau', 'Bom Bo', 'Bù Gia Mập', 'Đăk Ơ']
    }
  },
  'Tây Ninh': {
    default: 'III',
    areas: {
      'I': ['Long An', 'Tân An', 'Khánh Hậu', 'An Ninh', 'Hiệp Hòa', 'Hậu Nghĩa', 'Hòa Khánh', 'Đức Lập', 'Mỹ Hạnh', 'Đức Hòa', 'Thạnh Lợi', 'Bình Đức', 'Lương Hòa', 'Bến Lức', 'Mỹ Yên', 'Phước Lý', 'Mỹ Lộc', 'Cần Giuộc', 'Phước Vĩnh Tây', 'Tân Tập'],
      'II': ['Kiến Tường', 'Tân Ninh', 'Bình Minh', 'Ninh Thạnh', 'Long Hoa', 'Hòa Thành', 'Thanh Điền', 'Trảng Bàng', 'An Tịnh', 'Gò Dầu', 'Gia Lộc', 'Tuyên Thạnh', 'Bình Hiệp', 'Thủ Thừa', 'Mỹ An', 'Mỹ Thạnh', 'Tân Long', 'Long Cang', 'Rạch Kiến', 'Mỹ Lệ', 'Tân Lân', 'Cần Đước', 'Long Hựu', 'Hưng Thuận', 'Phước Chỉ', 'Thạnh Đức', 'Phước Thạnh', 'Truông Mít', 'Nhựt Tảo'],
      'IV': ['Hưng Điền', 'Vĩnh Thạnh', 'Tân Hưng', 'Vĩnh Châu', 'Tuyên Bình', 'Vĩnh Hưng', 'Khánh Hưng', 'Bình Hòa', 'Mộc Hóa', 'Hậu Thạnh', 'Nhơn Hòa Lập', 'Nhơn Ninh', 'Tân Thạnh']
    }
  },
  'An Giang': {
    default: 'IV',
    areas: {
      'II': ['Long Xuyên', 'Bình Đức', 'Mỹ Thới', 'Châu Đốc', 'Vĩnh Tế', 'Vĩnh Thông', 'Rạch Giá', 'Hà Tiên', 'Tô Châu', 'Mỹ Hòa Hưng', 'Tiên Hải', 'Phú Quốc', 'Thổ Châu'],
      'III': ['Tân Châu', 'Long Phú', 'Tân An', 'Châu Phong', 'Vĩnh Xương', 'Châu Phú', 'Mỹ Đức', 'Vĩnh Thạnh Trung', 'Bình Mỹ', 'Thạnh Mỹ Tây', 'An Châu', 'Bình Hòa', 'Cần Đăng', 'Vĩnh Hanh', 'Vĩnh An', 'Thoại Sơn', 'Óc Eo', 'Định Mỹ', 'Phú Hòa', 'Vĩnh Trạch', 'Tây Phú', 'Thạnh Lộc', 'Châu Thành', 'Bình An', 'Hòa Điền', 'Kiên Lương', 'Sơn Hải', 'Hòn Nghệ', 'Kiên Hải']
    }
  },
  'Đồng Tháp': {
    default: 'IV',
    areas: {
      'II': ['Mỹ Tho', 'Đạo Thạnh', 'Mỹ Phong', 'Thới Sơn', 'Trung An', 'Tân Hương', 'Châu Thành', 'Long Hưng', 'Long Định', 'Vĩnh Kim', 'Kim Sơn', 'Bình Trưng'],
      'III': ['Gò Công', 'Long Thuận', 'Sơn Qui', 'Bình Xuân', 'Mỹ Phước Tây', 'Thanh Hòa', 'Cai Lậy', 'Nhị Quý', 'An Bình', 'Hồng Ngự', 'Thường Lạc', 'Cao Lãnh', 'Mỹ Ngãi', 'Mỹ Trà', 'Sa Đéc', 'Tân Phú', 'Tân Phước 1', 'Tân Phước 2', 'Tân Phước 3', 'Hưng Thạnh', 'Mỹ Tịnh An', 'Lương Hòa Lạc', 'Tân Thuận Bình', 'Chợ Gạo', 'An Thạnh Thủy', 'Bình Ninh', 'Tân Dương']
    }
  },
  'Vĩnh Long': {
    default: 'IV',
    areas: {
      'II': ['Thanh Đức', 'Long Châu', 'Phước Hậu', 'Tân Hạnh', 'Tân Ngãi', 'Bình Minh', 'Cái Vồn', 'Đông Thành', 'An Hội', 'Phú Khương', 'Bến Tre', 'Sơn Đông', 'Phú Tân', 'Long Đức', 'Trà Vinh', 'Nguyệt Hóa', 'Hòa Thuận', 'Phú Túc', 'Giao Long', 'Tiên Thủy', 'Tân Phú'],
      'III': ['Duyên Hải', 'Trường Long Hòa', 'Cái Nhum', 'Tân Long Hội', 'Nhơn Phú', 'Bình Phước', 'An Bình', 'Long Hồ', 'Phú Quới', 'Đồng Khởi', 'Mỏ Cày', 'Thành Thới', 'An Định', 'Hương Mỹ', 'Tân Thủy', 'Bảo Thạnh', 'Ba Tri', 'Tân Xuân', 'Mỹ Chánh Hòa', 'An Ngãi Trung', 'An Hiệp', 'Thới Thuận', 'Thạnh Phước', 'Bình Đại', 'Thạnh Trị', 'Lộc Thuận', 'Châu Hưng', 'Phú Thuận', 'Long Hữu', 'Hưng Nhượng']
    }
  },
  'Cần Thơ': {
    default: 'IV',
    areas: {
      'II': ['Phú Lợi', 'Mỹ Xuyên', 'Ninh Kiều', 'Cái Khế', 'Tân An', 'An Bình', 'Thới An Đông', 'Bình Thủy', 'Long Tuyền', 'Cái Răng', 'Hưng Phú', 'Ô Môn', 'Thới Long', 'Phước Thới', 'Trung Nhứt', 'Thốt Nốt', 'Thuận Hưng', 'Tân Lộc', 'Sóc Trăng'],
      'III': ['Vị Thanh', 'Vị Tân', 'Đại Thành', 'Ngã Bảy', 'Vĩnh Phước', 'Vĩnh Châu', 'Khánh Hòa', 'Ngã Năm', 'Mỹ Quới', 'Tân Long', 'Phong Điền', 'Nhơn Ái', 'Trường Long', 'Thới Lai', 'Đông Thuận', 'Trường Xuân', 'Trường Thành', 'Cờ Đỏ', 'Đông Hiệp', 'Thạnh Phú', 'Thới Hưng', 'Trung Hưng', 'Vĩnh Thạnh', 'Vĩnh Trinh', 'Thạnh An', 'Thạnh Quới', 'Hỏa Lựu', 'Thạnh Xuân', 'Tân Hòa', 'Trường Long Tây', 'Châu Thành', 'Đông Phước', 'Phú Hữu', 'Vĩnh Hải', 'Lai Hòa']
    }
  },
  'Cà Mau': {
    default: 'IV',
    areas: {
      'II': ['An Xuyên', 'Lý Văn Lâm', 'Tân Thành', 'Hòa Thành', 'Bạc Liêu', 'Vĩnh Trạch', 'Hiệp Thành'],
      'III': ['Giá Rai', 'Láng Tròn', 'U Minh', 'Nguyễn Phích', 'Khánh Lâm', 'Khánh An', 'Khánh Bình', 'Đá Bạc', 'Khánh Hưng', 'Sông Đốc', 'Trần Văn Thời', 'Đất Mới', 'Năm Căn', 'Tam Giang', 'Lương Thế Trân', 'Hưng Mỹ', 'Cái Nước', 'Tân Hưng', 'Phú Mỹ', 'Phong Thạnh', 'Hòa Bình', 'Vĩnh Mỹ', 'Vĩnh Hậu']
    }
  }
};

// Full list of 63 provinces/cities for dropdown (sorted alphabetically)
export const PROVINCES = [
  'An Giang',
  'Bà Rịa - Vũng Tàu',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bắc Ninh',
  'Bến Tre',
  'Bình Định',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Cà Mau',
  'Cao Bằng',
  'Cần Thơ',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Điện Biên',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hồ Chí Minh',
  'Hưng Yên',
  'Huế',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Lạng Sơn',
  'Lào Cai',
  'Lâm Đồng',
  'Long An',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'Tây Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Thanh Hóa',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái'
];

// Default regions for provinces NOT in REGION_DATA
// Based on general classification (mostly Region IV for rural/mountainous)
const PROVINCE_DEFAULTS = {
  'Bà Rịa - Vũng Tàu': 'I',
  'Bạc Liêu': 'III',
  'Bắc Giang': 'II',
  'Bắc Kạn': 'IV',
  'Bến Tre': 'III',
  'Bình Định': 'III',
  'Bình Dương': 'I',
  'Bình Phước': 'II',
  'Bình Thuận': 'III',
  'Đắk Nông': 'IV',
  'Hà Giang': 'IV',
  'Hà Nam': 'III',
  'Hải Dương': 'II',
  'Hậu Giang': 'III',
  'Hòa Bình': 'III',
  'Kiên Giang': 'II',
  'Kon Tum': 'IV',
  'Long An': 'I',
  'Nam Định': 'II',
  'Ninh Thuận': 'III',
  'Phú Yên': 'III',
  'Quảng Bình': 'III',
  'Quảng Nam': 'III',
  'Sóc Trăng': 'III',
  'Thái Bình': 'II',
  'Tiền Giang': 'II',
  'Trà Vinh': 'III',
  'Vĩnh Phúc': 'II',
  'Yên Bái': 'IV'
};

/**
 * Normalize ward name for matching (remove diacritics, lowercase)
 * @param {string} name - Ward/commune name
 * @returns {string} Normalized name
 */
function normalizeWard(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Get region for a given province and optional ward
 * @param {string} province - Province name
 * @param {string} [ward=''] - Ward/commune name (optional)
 * @returns {string} Region code (I, II, III, or IV)
 */
export function getRegion(province, ward = '') {
  // No province → default to Region I (most common for new users)
  if (!province) return 'I';

  // Check if province has explicit data
  const data = REGION_DATA[province];

  if (!data) {
    // Province not in REGION_DATA, use defaults
    return PROVINCE_DEFAULTS[province] || 'IV';
  }

  // No ward specified → return province default
  if (!ward || ward.trim() === '') {
    return data.default;
  }

  // Search for ward in province areas
  const normalizedWard = normalizeWard(ward);

  // First pass: exact match only
  for (const [region, wards] of Object.entries(data.areas)) {
    if (wards.some(w => normalizeWard(w) === normalizedWard)) {
      return region;
    }
  }

  // Second pass: prefix match (ward starts with query or query starts with ward)
  for (const [region, wards] of Object.entries(data.areas)) {
    const found = wards.some(w => {
      const normalizedW = normalizeWard(w);
      return normalizedW.startsWith(normalizedWard) ||
             normalizedWard.startsWith(normalizedW);
    });
    if (found) return region;
  }

  // Ward not found in any region → use province default
  return data.default;
}

/**
 * Get ward suggestions for autocomplete
 * @param {string} province - Province name
 * @param {string} query - Search query
 * @param {number} [limit=10] - Max results
 * @returns {Array<{name: string, region: string}>} Matching wards with regions
 */
export function getWardSuggestions(province, query, limit = 10) {
  if (!province || !query || query.length < 2) return [];

  const data = REGION_DATA[province];
  if (!data) return [];

  const normalizedQuery = normalizeWard(query);
  const results = [];

  for (const [region, wards] of Object.entries(data.areas)) {
    for (const ward of wards) {
      const normalizedWard = normalizeWard(ward);
      if (normalizedWard.includes(normalizedQuery)) {
        results.push({ name: ward, region });
        if (results.length >= limit) return results;
      }
    }
  }

  return results;
}
