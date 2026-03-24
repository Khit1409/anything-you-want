export const fakeCategory = [
  {
    name: "Fashion",
    slug: "fashion",
  },
  {
    name: "Shoes",
    slug: "shoes",
  },
  {
    name: "Electronics",
    slug: "electronics",
  },
  {
    name: "Beauty",
    slug: "beauty",
  },
  {
    name: "Home & Living",
    slug: "home-living",
  },
  {
    name: "Sports",
    slug: "sports",
  },
  {
    name: "Studies",
    slug: "studies",
  },
  {
    name: "Toys",
    slug: "toys",
  },
];
export const fakeOptions = [
  {
    slug: "fashion",
    values: [
      { value: "size", label: "Kích thước" },
      { value: "color", label: "Màu sắc" },
      { value: "style", label: "Phong cách" },
      { value: "material", label: "Chất liệu" },
      { value: "gender", label: "Giới tính" },
    ],
  },

  {
    slug: "shoes",
    values: [
      { value: "size", label: "Size giày" },
      { value: "color", label: "Màu sắc" },
      { value: "type", label: "Loại giày" },
      { value: "brand", label: "Thương hiệu" },
      { value: "sole_material", label: "Chất liệu đế" },
    ],
  },

  {
    slug: "electronics",
    values: [
      { value: "brand", label: "Hãng sản xuất" },
      { value: "model", label: "Dòng sản phẩm" },
      { value: "storage", label: "Bộ nhớ lưu trữ" },
      { value: "ram", label: "Dung lượng RAM" },
      { value: "warranty", label: "Bảo hành" },
    ],
  },

  {
    slug: "beauty",
    values: [
      { value: "skin_type", label: "Loại da phù hợp" },
      { value: "volume", label: "Dung tích" },
      { value: "ingredient", label: "Thành phần chính" },
      { value: "fragrance", label: "Mùi hương" },
      { value: "origin", label: "Xuất xứ" },
    ],
  },

  {
    slug: "home-living",
    values: [
      { value: "material", label: "Chất liệu" },
      { value: "color", label: "Màu sắc" },
      { value: "dimension", label: "Kích thước" },
      { value: "room_type", label: "Phòng sử dụng" },
      { value: "weight", label: "Trọng lượng" },
    ],
  },

  {
    slug: "sports",
    values: [
      { value: "size", label: "Kích thước" },
      { value: "sport_type", label: "Môn thể thao" },
      { value: "team", label: "Đội / CLB" },
      { value: "material", label: "Chất liệu" },
      { value: "gender", label: "Giới tính" },
    ],
  },

  {
    slug: "studies",
    values: [
      { value: "subject", label: "Môn học" },
      { value: "level", label: "Cấp độ" },
      { value: "language", label: "Ngôn ngữ" },
      { value: "format", label: "Định dạng" },
      { value: "publisher", label: "Nhà xuất bản" },
    ],
  },

  {
    slug: "toys",
    values: [
      { value: "age_group", label: "Độ tuổi phù hợp" },
      { value: "material", label: "Chất liệu" },
      { value: "type", label: "Loại đồ chơi" },
      { value: "brand", label: "Thương hiệu" },
      { value: "character", label: "Nhân vật / Chủ đề" },
    ],
  },
];

export const fakeOptionValues = [
  {
    value: "size",
    attributes: ["S", "M", "L", "XL", "XXL"],
  },

  {
    value: "color",
    attributes: ["Trắng", "Đen", "Đỏ", "Xanh", "Vàng"],
  },

  {
    value: "style",
    attributes: ["Basic", "Streetwear", "Vintage", "Luxury"],
  },

  {
    value: "material",
    attributes: ["Cotton", "Vải", "Da", "Jean", "Polyester"],
  },

  {
    value: "gender",
    attributes: ["Nam", "Nữ", "Unisex"],
  },

  // SHOES
  {
    value: "type",
    attributes: ["Sneaker", "Boot", "Sandal", "Giày thể thao"],
  },

  {
    value: "sole_material",
    attributes: ["Cao su", "Nhựa EVA", "Da tổng hợp"],
  },

  // ELECTRONICS
  {
    value: "brand",
    attributes: ["Apple", "Samsung", "Sony", "Xiaomi", "Dell"],
  },

  {
    value: "model",
    attributes: ["Pro", "Ultra", "Gen 2", "Series X"],
  },

  {
    value: "storage",
    attributes: ["64GB", "128GB", "256GB", "512GB", "1TB"],
  },

  {
    value: "ram",
    attributes: ["4GB", "8GB", "16GB", "32GB"],
  },

  {
    value: "warranty",
    attributes: ["6 tháng", "12 tháng", "24 tháng"],
  },

  // BEAUTY
  {
    value: "skin_type",
    attributes: ["Da dầu", "Da khô", "Da nhạy cảm", "Da hỗn hợp"],
  },

  {
    value: "volume",
    attributes: ["30ml", "50ml", "100ml", "200ml"],
  },

  {
    value: "ingredient",
    attributes: ["Vitamin C", "Niacinamide", "Retinol", "Hyaluronic Acid"],
  },

  {
    value: "fragrance",
    attributes: ["Không mùi", "Hương hoa", "Hương trái cây", "Hương gỗ"],
  },

  {
    value: "origin",
    attributes: ["Việt Nam", "Hàn Quốc", "Nhật Bản", "Mỹ", "Pháp"],
  },

  // HOME & LIVING
  {
    value: "dimension",
    attributes: ["Nhỏ", "Vừa", "Lớn", "2m x 1m", "3m x 2m"],
  },

  {
    value: "room_type",
    attributes: ["Phòng khách", "Phòng ngủ", "Nhà bếp", "Văn phòng"],
  },

  {
    value: "weight",
    attributes: ["500g", "1kg", "2kg", "5kg"],
  },

  // SPORTS
  {
    value: "sport_type",
    attributes: ["Bóng đá", "Bóng rổ", "Gym", "Tennis", "Cầu lông"],
  },

  {
    value: "team",
    attributes: ["Barcelona", "Real Madrid", "Manchester United", "PSG"],
  },

  // STUDIES
  {
    value: "subject",
    attributes: ["Toán", "Văn", "Tiếng Anh", "Lập trình", "Khoa học"],
  },

  {
    value: "level",
    attributes: ["Tiểu học", "THCS", "THPT", "Đại học"],
  },

  {
    value: "language",
    attributes: ["Tiếng Việt", "English", "日本語", "한국어"],
  },

  {
    value: "format",
    attributes: ["Sách giấy", "PDF", "Video", "Khoá học online"],
  },

  {
    value: "publisher",
    attributes: ["NXB Giáo Dục", "O'Reilly", "Pearson", "Kim Đồng"],
  },

  // TOYS
  {
    value: "age_group",
    attributes: ["0-3 tuổi", "3-6 tuổi", "6-12 tuổi", "12+ tuổi"],
  },

  {
    value: "character",
    attributes: ["Marvel", "Disney", "Pokemon", "Naruto", "Siêu nhân"],
  },
];
