export interface SeoProductItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "v-gas" | "petrolimex-tuankhang" | "cong-nghiep";
  weight: string;
  valveType: string;
  price: string;
  priceVal: number;
  newPrice?: string;
  newPriceVal?: number;
  image?: string;
  tag: string;
  desc: string;
}

export interface DistrictInfo {
  slug: string;             // e.g. "quan-7"
  urlSlug: string;          // e.g. "giao-gas-quan-7"
  name: string;             // e.g. "Quận 7"
  fullName: string;         // e.g. "Quận 7, TP. Hồ Chí Minh"
  slaMinutes: string;       // e.g. "15 - 20"
  hubName: string;          // e.g. "Kho Gas Phú Mỹ Hưng - Quận 7"
  hotline: string;
  popularWards: string[];   // Các phường / tuyến đường nổi bật (bao gồm phường mới và cũ)
  newWards?: string[];      // Các phường mới sáp nhập chính thức (theo Nghị quyết UBTVQH)
  neighboringSlugs: string[]; // Các quận lân cận để xây dựng Internal Linking SEO
  description: string;
  isInnerCity?: boolean;    // Đánh dấu quận nội thành TP.HCM (không tính huyện ngoại thành)
}

export const BRAND_NAME = "GAS NHÀ MÌNH";
export const BRAND_TAGLINE = "Hết gas, gọi Nhà Mình";
export const HOTLINE_DISPLAY = "0888 113 831";
export const HOTLINE_TEL = "tel:0888113831";
export const ZALO_URL = "https://zalo.me/0888113831";

/**
 * Danh mục sản phẩm Gas chuẩn hóa phục vụ SEO & Đặt hàng:
 * Khớp 100% dữ liệu thực tế từ CRM POSPlus & từ khóa sản phẩm yêu cầu:
 * 1. Gas V-Gas xám 12kg
 * 2. Gas V-Gas đỏ 12 kg
 * 3. Gas V-Gas vàng 12kg
 * 4. Gas V-Gas xanh đen 12kg
 * 5. Gas V-Gas-PE 12kg
 * 6. Gas V-Gas-Shell 12kg
 * 7. Gas Petrolimex đứng 12kg
 * 8. Gas Petrolimex shell 12kg
 * 9. Gas Tuấn Khang vàng 12kg
 * 10. Gas Tuấn Khang xanh 12kg
 * 11. Gas bò 45 kg
 */
export const SEO_PRODUCTS: SeoProductItem[] = [
  {
    id: "gas-v-gas-xam-12kg",
    slug: "gas-v-gas-xam-12kg",
    name: "Gas V-Gas xám 12kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/168/image_1024",
    tag: "Bán chạy nhất 🔥",
    desc: "Bình V-Gas xám 12kg ngọn lửa xanh tiết kiệm, vỏ bình chuẩn PCCC, cân đối chứng tại nhà khi giao.",
  },
  {
    id: "gas-v-gas-do-12kg",
    slug: "gas-v-gas-do-12kg",
    name: "Gas V-Gas đỏ 12 kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/172/image_1024",
    tag: "Chính hãng 100%",
    desc: "Bình V-Gas đỏ 12kg chịu áp lực cao, vỏ bình sơn tĩnh điện chống rỉ sét, bảo hiểm cháy nổ 10 tỷ.",
  },
  {
    id: "gas-v-gas-vang-12kg",
    slug: "gas-v-gas-vang-12kg",
    name: "Gas V-Gas vàng 12kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/174/image_1024",
    tag: "Khuyên dùng",
    desc: "Bình V-Gas vàng 12kg nước gas tinh khiết, nhiệt lượng cao, không đen đáy nồi, an toàn tuyệt đối.",
  },
  {
    id: "gas-v-gas-xanh-den-12kg",
    slug: "gas-v-gas-xanh-den-12kg",
    name: "Gas V-Gas xanh đen 12kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/173/image_1024",
    tag: "Thiết kế hiện đại",
    desc: "Bình V-Gas xanh đen 12kg công nghệ chiết nạp tự động khép kín, tem niêm phong chống giả nghiêm ngặt.",
  },
  {
    id: "gas-v-gas-pe-12kg",
    slug: "gas-v-gas-pe-12kg",
    name: "Gas V-Gas-PE 12kg",
    brand: "V-Gas (Vỏ Bọc PE)",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/178/image_1024",
    tag: "Công nghệ mới 🛡️",
    desc: "Bình V-Gas bọc nhựa PE cách điện, chống va đập, siêu an toàn cho căn hộ chung cư và gia đình hiện đại.",
  },
  {
    id: "gas-v-gas-shell-12kg",
    slug: "gas-v-gas-shell-12kg",
    name: "Gas V-Gas-Shell 12kg",
    brand: "V-Gas (Van Chụp Shell)",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Chụp Shell (Ngắt tự động)",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/177/image_1024",
    tag: "Van chụp Shell 🛡️",
    desc: "Bình V-Gas van chụp Shell 12kg cơ chế tự khóa khi có sự cố, tháo lắp cực kỳ tiện lợi và an toàn.",
  },
  {
    id: "gas-petrolimex-dung-12kg",
    slug: "gas-petrolimex-dung-12kg",
    name: "Gas Petrolimex đứng 12kg",
    brand: "Petrolimex",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Ren Ngoài",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/175/image_1024",
    tag: "Thương hiệu quốc gia 🇻🇳",
    desc: "Bình gas Petrolimex đứng 12kg chính hãng Tập đoàn Dầu khí, màng co chống giả và tem tích hợp QR Code.",
  },
  {
    id: "gas-petrolimex-shell-12kg",
    slug: "gas-petrolimex-shell-12kg",
    name: "Gas Petrolimex shell 12kg",
    brand: "Petrolimex",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Chụp Shell",
    price: "485.000đ",
    priceVal: 485000,
    newPrice: "735.000đ",
    newPriceVal: 735000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/176/image_1024",
    tag: "Petrolimex Van Chụp",
    desc: "Bình Petrolimex van chụp Shell 12kg cao cấp, kiểm định nghiêm ngặt theo tiêu chuẩn quốc tế.",
  },
  {
    id: "gas-tuan-khang-vang-12kg",
    slug: "gas-tuan-khang-vang-12kg",
    name: "Gas Tuấn Khang vàng 12kg",
    brand: "Tuấn Khang Gas",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn",
    price: "465.000đ",
    priceVal: 465000,
    newPrice: "715.000đ",
    newPriceVal: 715000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/169/image_1024",
    tag: "Giá tốt tiết kiệm",
    desc: "Bình gas Tuấn Khang vàng 12kg chất lượng ổn định, lửa xanh mạnh, lựa chọn kinh tế cho mọi gia đình.",
  },
  {
    id: "gas-tuan-khang-xanh-12kg",
    slug: "gas-tuan-khang-xanh-12kg",
    name: "Gas Tuấn Khang xanh 12kg",
    brand: "Tuấn Khang Gas",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn",
    price: "465.000đ",
    priceVal: 465000,
    newPrice: "715.000đ",
    newPriceVal: 715000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/171/image_1024",
    tag: "Chất lượng cao",
    desc: "Bình gas Tuấn Khang xanh 12kg chính hãng, van khóa an toàn, ngọn lửa xanh đều nhiệt lượng cao.",
  },
  {
    id: "gas-bo-45kg",
    slug: "gas-bo-45kg",
    name: "Gas bò 45 kg",
    brand: "PetroVietnam / Saigon Petro",
    category: "cong-nghiep",
    weight: "45kg",
    valveType: "Van Công Nghiệp POL / Reca",
    price: "1.730.000đ",
    priceVal: 1730000,
    newPrice: "2.730.000đ",
    newPriceVal: 2730000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/170/image_1024",
    tag: "Quán ăn - Nhà hàng 🏭",
    desc: "Bình gas bò 45kg chuyên dụng cho nhà hàng, quán ăn, xưởng chế biến. Giao xe tải tận nơi, xuất VAT đầy đủ.",
  },
];

export const DISTRICTS_DATA: DistrictInfo[] = [
  {
    slug: "quan-1",
    urlSlug: "giao-gas-quan-1",
    name: "Quận 1",
    fullName: "Quận 1, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Trung Tâm Quận 1 - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Bến Nghé", "Bến Thành", "Cô Giang", "Cầu Kho", "Cầu Ông Lãnh", "Đa Kao", "Nguyễn Cư Trinh", "Nguyễn Thái Bình", "Phạm Ngũ Lão", "Tân Định"],
    neighboringSlugs: ["quan-3", "quan-4", "binh-thanh", "phu-nhuan"],
    description: "Đại lý Gas Nhà Mình Quận 1 giao hàng hỏa tốc trong 15 phút. Bình gas chính hãng V-Gas, Petrolimex, Tuấn Khang, bình gas bò 45kg. Cân đối chứng đủ ký tại nhà, kiểm tra van dây an toàn miễn phí.",
  },
  {
    slug: "quan-2",
    urlSlug: "giao-gas-quan-2",
    name: "Quận 2",
    fullName: "Quận 2 (TP. Thủ Đức), TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Thảo Điền - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Thảo Điền", "An Phú", "An Khánh", "Bình An", "Bình Trưng Đông", "Bình Trưng Tây", "Cát Lái", "Thạnh Mỹ Lợi"],
    neighboringSlugs: ["binh-thanh", "quan-1", "quan-7", "quan-9", "thu-duc"],
    description: "Giao gas Quận 2 từ hệ thống Gas Nhà Mình tại Thảo Điền, An Phú, chung cư cao cấp. Bình gas chính hãng, bảo hiểm an toàn 10 tỷ, thợ kỹ thuật cân đủ ký tận nơi.",
  },
  {
    slug: "quan-3",
    urlSlug: "giao-gas-quan-3",
    name: "Quận 3",
    fullName: "Quận 3, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Giao Gas Nhanh Quận 3 - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Võ Thị Sáu", "Phường 9 (mới)", "Phường 12 (mới)", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 11", "Phường 14"],
    newWards: ["Phường Võ Thị Sáu", "Phường 9 (nhập P.10)", "Phường 12 (nhập P.13)"],
    neighboringSlugs: ["quan-1", "quan-10", "phu-nhuan", "tan-binh"],
    description: "Dịch vụ đổi gas, giao gas tận nhà Quận 3 của Gas Nhà Mình. Nhanh chóng 15-20 phút, cam kết bình gas đủ ký, tem niêm phong chuẩn, an toàn tuyệt đối.",
  },
  {
    slug: "quan-4",
    urlSlug: "giao-gas-quan-4",
    name: "Quận 4",
    fullName: "Quận 4, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Khánh Hội - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 8 (mới)", "Phường 9 (mới)", "Phường 15 (mới)", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 13", "Phường 16", "Phường 18"],
    newWards: ["Phường 8 (nhập P.10)", "Phường 9 (nhập P.6)", "Phường 15 (nhập P.14)"],
    neighboringSlugs: ["quan-1", "quan-7", "quan-8"],
    description: "Gas Nhà Mình Quận 4 giao nhanh 15 phút. Phục vụ căn hộ chung cư, quán ăn, nhà hàng khu vực Khánh Hội, Bến Vân Đồn, Tôn Đản. Kiểm tra an toàn tận tâm.",
  },
  {
    slug: "quan-5",
    urlSlug: "giao-gas-quan-5",
    name: "Quận 5",
    fullName: "Quận 5, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Chợ Lớn - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 2 (mới)", "Phường 5 (mới)", "Phường 7 (mới)", "Phường 11 (mới)", "Phường 1", "Phường 4", "Phường 9", "Phường 12", "Phường 14"],
    newWards: ["Phường 2 (nhập P.3)", "Phường 5 (nhập P.6)", "Phường 7 (nhập P.8)", "Phường 11 (nhập P.10)"],
    neighboringSlugs: ["quan-1", "quan-6", "quan-8", "quan-10"],
    description: "Đổi bình gas Quận 5 uy tín từ Gas Nhà Mình. Giá cả niêm yết rõ ràng, hỗ trợ nhiệt tình cho các gia đình và hộ kinh doanh ẩm thực Chợ Lớn.",
  },
  {
    slug: "quan-6",
    urlSlug: "giao-gas-quan-6",
    name: "Quận 6",
    fullName: "Quận 6, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Bình Phú - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 1 (mới)", "Phường 2 (mới)", "Phường 9 (mới)", "Phường 14 (mới)", "Phường 10", "Phường 11", "Phường 12", "Bình Phú", "Phú Lâm"],
    newWards: ["Phường 1 (nhập P.3, P.4)", "Phường 2 (nhập P.6)", "Phường 9 (nhập P.5)", "Phường 14 (nhập P.13)"],
    neighboringSlugs: ["quan-5", "quan-8", "binh-tan"],
    description: "Giao gas Quận 6 siêu tốc từ Gas Nhà Mình. Kỹ thuật viên lành nghề, kiểm tra dây van tỉ mỉ, cam kết bình gas cân đủ ký 100%.",
  },
  {
    slug: "quan-7",
    urlSlug: "giao-gas-quan-7",
    name: "Quận 7",
    fullName: "Quận 7, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Phú Mỹ Hưng - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Tân Phong", "Tân Phú", "Phú Mỹ", "Tân Quy", "Tân Kiểng", "Bình Thuận", "Tân Thuận Đông", "Tân Thuận Tây", "Phú Thuận"],
    neighboringSlugs: ["quan-4", "quan-8", "nha-be", "binh-chanh", "quan-2"],
    description: "Gas Nhà Mình Quận 7 phục vụ khu Phú Mỹ Hưng, Sky Garden, Him Lam... Giao gas trong 15 phút, thợ mang cân điện tử đến tận cửa nhà.",
  },
  {
    slug: "quan-8",
    urlSlug: "giao-gas-quan-8",
    name: "Quận 8",
    fullName: "Quận 8, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Phạm Thế Hiển - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Rạch Ông (mới)", "Phường Hưng Phú (mới)", "Phường Xóm Củi (mới)", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 14", "Phường 15", "Phường 16"],
    newWards: ["Phường Rạch Ông (P.1, P.2, P.3 mới)", "Phường Hưng Phú (P.8, P.9, P.10 mới)", "Phường Xóm Củi (P.11, P.12, P.13 mới)"],
    neighboringSlugs: ["quan-5", "quan-6", "quan-7", "binh-chanh"],
    description: "Đại lý Gas Nhà Mình Quận 8 phủ sóng các phường mới Rạch Ông, Hưng Phú, Xóm Củi và tuyến Phạm Thế Hiển, Tạ Quang Bửu... Đổi gas an toàn, tiết kiệm.",
  },
  {
    slug: "quan-9",
    urlSlug: "giao-gas-quan-9",
    name: "Quận 9",
    fullName: "Quận 9 (TP. Thủ Đức), TP. Hồ Chí Minh",
    slaMinutes: "15 - 25",
    hubName: "Kho Gas Công Nghệ Cao - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Hiệp Phú", "Long Bình", "Long Phước", "Long Thạnh Mỹ", "Phước Bình", "Phước Long A", "Phước Long B", "Tăng Nhơn Phú A", "Tăng Nhơn Phú B"],
    neighboringSlugs: ["thu-duc", "quan-2", "binh-duong"],
    description: "Giao gas Quận 9 nhanh chóng từ Gas Nhà Mình cho cư dân Vinhomes Grand Park, Đỗ Xuân Hợp, Lê Văn Việt. Cam kết bình gas chính hãng đủ ký.",
  },
  {
    slug: "quan-10",
    urlSlug: "giao-gas-quan-10",
    name: "Quận 10",
    fullName: "Quận 10, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Thành Thái - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 1", "Phường 2", "Phường 4", "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 12", "Phường 14", "Phường 15"],
    neighboringSlugs: ["quan-3", "quan-5", "quan-11", "tan-binh"],
    description: "Gas Nhà Mình Quận 10 giao hỏa tốc 15 phút tại Tô Hiến Thành, Sư Vạn Hạnh, Thành Thái... Bình gas đủ ký, tặng dây van chống chuột.",
  },
  {
    slug: "quan-11",
    urlSlug: "giao-gas-quan-11",
    name: "Quận 11",
    fullName: "Quận 11, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Đầm Sen - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 1", "Phường 3", "Phường 5", "Phường 7", "Phường 8", "Phường 10", "Phường 11", "Phường 14", "Phường 15", "Phường 16"],
    neighboringSlugs: ["quan-5", "quan-6", "quan-10", "tan-binh", "tan-phu"],
    description: "Đại lý Gas Nhà Mình Quận 11 uy tín, giá niêm yết chuẩn thị trường. Giao hàng ngay sau khi gọi, kỹ thuật viên chu đáo, lễ phép.",
  },
  {
    slug: "quan-12",
    urlSlug: "giao-gas-quan-12",
    name: "Quận 12",
    fullName: "Quận 12, TP. Hồ Chí Minh",
    slaMinutes: "20 - 25",
    hubName: "Kho Gas An Phú Đông - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["An Phú Đông", "Đông Hưng Thuận", "Hiệp Thành", "Tân Chánh Hiệp", "Tân Hưng Thuận", "Tân Thới Hiệp", "Thạnh Lộc", "Thạnh Xuân", "Thới An", "Trung Mỹ Tây"],
    neighboringSlugs: ["go-vap", "tan-binh", "hoc-mon", "thu-duc", "binh-duong"],
    description: "Gas Nhà Mình Quận 12 giao tận nơi trên toàn địa bàn Quốc lộ 1A, Lê Văn Khương, Tô Ký, Nguyễn Ảnh Thủ. Luôn cân gas trước khi lắp đặt.",
  },
  {
    slug: "binh-thanh",
    urlSlug: "giao-gas-binh-thanh",
    name: "Bình Thạnh",
    fullName: "Quận Bình Thạnh, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Hàng Xanh - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Gia Định (mới)", "Phường Bình Thạnh (mới)", "Phường Bình Lợi Trung (mới)", "Phường Thạnh Mỹ Tây (mới)", "Phường Bình Quới (mới)", "Phường 1", "Phường 2", "Phường 5", "Phường 11", "Phường 13", "Phường 19", "Phường 22", "Phường 25"],
    newWards: ["Phường Gia Định", "Phường Bình Thạnh", "Phường Bình Lợi Trung", "Phường Thạnh Mỹ Tây", "Phường Bình Quới"],
    neighboringSlugs: ["quan-1", "phu-nhuan", "go-vap", "thu-duc", "quan-2"],
    description: "Giao gas Bình Thạnh cực nhanh của Gas Nhà Mình tại các phường mới Gia Định, Bình Thạnh, Bình Lợi Trung, Thạnh Mỹ Tây, Bình Quới và các khu Hàng Xanh, Landmark 81.",
  },
  {
    slug: "go-vap",
    urlSlug: "giao-gas-go-vap",
    name: "Gò Vấp",
    fullName: "Quận Gò Vấp, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Quang Trung - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Gò Vấp (mới)", "Phường An Hội Đông (mới)", "Phường Thông Tây Hội (mới)", "Phường Hạnh Thông (mới)", "Phường An Nhơn (mới)", "Phường An Hội Tây (mới)", "Phường 1", "Phường 3", "Phường 5", "Phường 8", "Phường 10", "Phường 11", "Phường 15", "Phường 16"],
    newWards: ["Phường Gò Vấp", "Phường An Hội Đông", "Phường Thông Tây Hội", "Phường Hạnh Thông", "Phường An Nhơn", "Phường An Hội Tây"],
    neighboringSlugs: ["binh-thanh", "phu-nhuan", "quan-12", "tan-binh"],
    description: "Đại lý Gas Nhà Mình Gò Vấp phục vụ hỏa tốc các phường mới Gò Vấp, An Hội Đông, Thông Tây Hội, Hạnh Thông, An Nhơn, An Hội Tây. Cam kết gas đủ ký 100%.",
  },
  {
    slug: "phu-nhuan",
    urlSlug: "giao-gas-phu-nhuan",
    name: "Phú Nhuận",
    fullName: "Quận Phú Nhuận, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Phan Xích Long - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Đức Nhuận (mới)", "Phường 15 (mới)", "Phường 4 (mới)", "Phường 1", "Phường 2", "Phường 7", "Phường 8", "Phường 10", "Phường 11", "Phường 13"],
    newWards: ["Phường Đức Nhuận (nhập P.4, 5, 9)", "Phường 15 (nhập P.17)", "Phường 4 (nhập P.3)"],
    neighboringSlugs: ["quan-1", "quan-3", "binh-thanh", "tan-binh"],
    description: "Giao gas Phú Nhuận 15 phút từ Gas Nhà Mình tại phường mới Đức Nhuận, Phan Xích Long, Nguyễn Văn Trỗi, Huỳnh Văn Bánh... Thợ thân thiện, an toàn tuyệt đối.",
  },
  {
    slug: "tan-binh",
    urlSlug: "giao-gas-tan-binh",
    name: "Tân Bình",
    fullName: "Quận Tân Bình, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Cộng Hòa - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường 1", "Phường 2", "Phường 4", "Phường 6", "Phường 8", "Phường 10", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    neighboringSlugs: ["quan-3", "quan-10", "phu-nhuan", "go-vap", "tan-phu", "quan-12"],
    description: "Gas Nhà Mình Tân Bình đổi gas tận nhà khu vực Cộng Hòa, Hoàng Hoa Thám, Trường Chinh. Bình gas kiểm định định kỳ, ngọn lửa xanh đều.",
  },
  {
    slug: "tan-phu",
    urlSlug: "giao-gas-tan-phu",
    name: "Tân Phú",
    fullName: "Quận Tân Phú, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Kho Gas Lũy Bán Bích - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Hiệp Tân", "Hòa Thạnh", "Phú Thạnh", "Phú Thọ Hòa", "Phú Trung", "Sơn Kỳ", "Tân Quý", "Tân Sơn Nhì", "Tân Thành", "Tây Thạnh"],
    neighboringSlugs: ["tan-binh", "quan-11", "binh-tan", "quan-12"],
    description: "Đại lý Gas Nhà Mình Tân Phú giao hàng tận tâm trong 15 phút. Phục vụ gia đình, bếp ăn trường học và xưởng may mặc trên địa bàn.",
  },
  {
    slug: "binh-tan",
    urlSlug: "giao-gas-binh-tan",
    name: "Bình Tân",
    fullName: "Quận Bình Tân, TP. Hồ Chí Minh",
    slaMinutes: "20 - 25",
    hubName: "Kho Gas Tên Lửa - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["An Lạc", "An Lạc A", "Bình Hưng Hòa", "Bình Hưng Hòa A", "Bình Hưng Hòa B", "Bình Trị Đông", "Bình Trị Đông A", "Bình Trị Đông B", "Tân Tạo"],
    neighboringSlugs: ["quan-6", "tan-phu", "binh-chanh", "quan-8"],
    description: "Gas Nhà Mình Bình Tân giao hàng nhanh khu Tên Lửa, Lê Văn Quới, Quốc lộ 1A... Đầy đủ hóa đơn, tem chống giả và bảo hiểm an toàn toàn diện.",
  },
  {
    slug: "thu-duc",
    urlSlug: "giao-gas-thu-duc",
    name: "TP. Thủ Đức",
    fullName: "Thành phố Thủ Đức, TP. Hồ Chí Minh",
    slaMinutes: "15 - 25",
    hubName: "Kho Gas Tổng Thủ Đức - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Thảo Điền", "An Phú", "Bình Trưng Tây", "Hiệp Bình Chánh", "Hiệp Bình Phước", "Linh Trung", "Linh Chiểu", "Tăng Nhơn Phú", "Phước Long", "Long Thạnh Mỹ"],
    neighboringSlugs: ["binh-thanh", "quan-1", "quan-12", "quan-2", "quan-9", "binh-duong"],
    description: "Giao gas TP. Thủ Đức của Gas Nhà Mình phủ sóng cả 3 khu vực (Quận 2, Quận 9, Thủ Đức cũ). Đầy đủ gas gia đình 12kg và gas bò 45kg.",
  },
  // Các huyện ngoại thành
  {
    slug: "binh-chanh",
    urlSlug: "giao-gas-binh-chanh",
    name: "Bình Chánh",
    fullName: "Huyện Bình Chánh, TP. Hồ Chí Minh",
    slaMinutes: "20 - 30",
    hubName: "Kho Gas Quốc Lộ 50 - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Bình Hưng", "Phong Phú", "Vĩnh Lộc A", "Vĩnh Lộc B", "Tân Kiên", "An Phú Tây", "Đa Phước", "Quy Đức"],
    neighboringSlugs: ["quan-8", "binh-tan", "nha-be"],
    description: "Gas Nhà Mình Bình Chánh phục vụ Bình Hưng, Vĩnh Lộc, Quốc lộ 50. Bình gas chính hãng, bảo hiểm an toàn đầy đủ.",
  },
  {
    slug: "nha-be",
    urlSlug: "giao-gas-nha-be",
    name: "Nhà Bè",
    fullName: "Huyện Nhà Bè, TP. Hồ Chí Minh",
    slaMinutes: "20 - 25",
    hubName: "Kho Gas Lê Văn Lương - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Phước Kiển", "Nhà Bè", "Phú Xuân", "Nhơn Đức", "Long Thới", "Hiệp Phước"],
    neighboringSlugs: ["quan-7", "binh-chanh"],
    description: "Đại lý Gas Nhà Mình Nhà Bè giao hỏa tốc tại Phước Kiển, Lê Văn Lương, Huỳnh Tấn Phát. Đổi bình gas đủ ký, giao nhanh trong 20 phút.",
  },
  {
    slug: "hoc-mon",
    urlSlug: "giao-gas-hoc-mon",
    name: "Hóc Môn",
    fullName: "Huyện Hóc Môn, TP. Hồ Chí Minh",
    slaMinutes: "20 - 30",
    hubName: "Kho Gas Bà Điểm - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Bà Điểm", "Hóc Môn", "Xuân Thới Thượng", "Tân Thới Nhì", "Đông Thạnh", "Tân Hiệp", "Nhị Bình"],
    neighboringSlugs: ["quan-12", "cu-chi", "binh-duong"],
    description: "Giao gas Hóc Môn từ Gas Nhà Mình tận nhà an toàn. Phục vụ khu vực Bà Điểm, Chợ Đầu Mối Hóc Môn, Quốc lộ 22.",
  },
  {
    slug: "cu-chi",
    urlSlug: "giao-gas-cu-chi",
    name: "Củ Chi",
    fullName: "Huyện Củ Chi, TP. Hồ Chí Minh",
    slaMinutes: "25 - 35",
    hubName: "Kho Gas Tỉnh Lộ 8 - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Củ Chi", "Tân An Hội", "Phước Vĩnh An", "Tân Phú Trung", "Hòa Phú", "Bình Mỹ", "Tân Thạnh Đông"],
    neighboringSlugs: ["hoc-mon", "binh-duong"],
    description: "Đại lý Gas Nhà Mình Củ Chi uy tín, giao tận nơi cho gia đình và xưởng, khu công nghiệp Tân Phú Trung. Bình gas đủ cân, tem chống giả.",
  },
  {
    slug: "can-gio",
    urlSlug: "giao-gas-can-gio",
    name: "Cần Giờ",
    fullName: "Huyện Cần Giờ, TP. Hồ Chí Minh",
    slaMinutes: "30 - 40",
    hubName: "Trạm Gas Cần Thạnh - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Cần Thạnh", "Long Hòa", "Bình Khánh", "An Thới Đông", "Lý Nhơn", "Tam Thôn Hiệp"],
    neighboringSlugs: ["nha-be"],
    description: "Giao gas tận nơi tại Cần Giờ, phục vụ các xã Bình Khánh, Cần Thạnh. Bình gas chính hãng Gas Nhà Mình an toàn tuyệt đối.",
  },
  {
    slug: "binh-duong",
    urlSlug: "giao-gas-binh-duong",
    name: "Bình Dương",
    fullName: "Dĩ An - Thuận An, Tỉnh Bình Dương",
    slaMinutes: "20 - 30",
    hubName: "Kho Gas Dĩ An - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Dĩ An", "Thuận An", "Lái Thiêu", "An Phú", "Tân Đông Hiệp", "Bình Hòa"],
    neighboringSlugs: ["thu-duc", "quan-12"],
    description: "Gas Nhà Mình phục vụ Dĩ An, Thuận An - Bình Dương giáp ranh TP.HCM. Giao gas 20 phút tận nhà cho khu công nghiệp và chung cư.",
  },
];

/**
 * Sinh danh sách từ khóa On-Page SEO toàn diện cho từng quận của Gas Nhà Mình
 */
export function getDistrictKeywords(district: DistrictInfo, brandName: string = BRAND_NAME): string[] {
  const n = district.name;
  const nLower = district.name.toLowerCase();

  const keywords: string[] = [
    // Nhóm 1: GIAO GAS
    `giao gas ${n}`,
    `giao gas ${nLower}`,
    `giao gas tận nhà ${n}`,
    `giao gas nhanh ${n}`,
    `giao gas siêu tốc ${n}`,
    `giao gas 24/7 ${n}`,
    `dịch vụ giao gas ${n}`,

    // Nhóm 2: ĐẶT GAS
    `đặt gas ${n}`,
    `đặt gas ${nLower}`,
    `đặt gas online ${n}`,
    `đặt bình gas ${n}`,
    `đặt đổi gas ${n}`,
    `đặt gas giao tận nhà ${n}`,
    `đặt gas nhanh ${n}`,

    // Nhóm 3: GỌI GAS
    `gọi gas ${n}`,
    `gọi gas ${nLower}`,
    `số gọi gas ${n}`,
    `số điện thoại gọi gas ${n}`,
    `gọi đổi gas ${n}`,
    `gọi gas nhanh ${n}`,
    `hết gas gọi ${n}`,

    // Nhóm 4: ĐỔI GAS & ĐẠI LÝ & TỪ KHÓA CHUNG (Ảnh 1)
    `đổi gas ${n}`,
    `đổi gas ${nLower}`,
    `đổi gas bình ${n}`,
    `đổi gas bình`,
    `đổi bình gas ${n}`,
    `đổi bình gas 12kg ${n}`,
    `giá gas hôm nay ${n}`,
    `giá gas hôm nay`,
    `đại lý gas ${n}`,
    `đại lý gas uy tín ${n}`,
    `đại lý gas chính hãng ${n}`,
    `gas chính hãng ${n}`,
    `gas gia đình ${n}`,
    `gas bình 12kg ${n}`,
    `đặt gas online`,
    `mua gas online`,
    `giao gas nhanh`,

    // Nhóm 5: THƯƠNG HIỆU GAS NHÀ MÌNH
    `${brandName}`,
    `gas Nhà Mình`,
    `đặt gas Nhà Mình`,
    `đại lý gas Nhà Mình`,
    `gas Nhà Mình ${n}`,
    `đặt gas Nhà Mình ${n}`,
    `đại lý gas Nhà Mình ${n}`,

    // Nhóm 6: 10 SẢN PHẨM CỤ THỂ (Ảnh 2)
    `gas bò 45 kg ${n}`,
    `gas bò 45 kg`,
    `bình gas bò 45kg ${n}`,
    `gas tuấn khang vàng 12kg ${n}`,
    `gas tuấn khang vàng 12kg`,
    `gas v-gas xám 12kg ${n}`,
    `gas v-gas xám 12kg`,
    `gas petrolimex đứng 12kg ${n}`,
    `gas petrolimex đứng 12kg`,
    `gas petrolimex shell 12kg ${n}`,
    `gas petrolimex shell 12kg`,
    `gas v-gas đỏ 12 kg ${n}`,
    `gas v-gas đỏ 12 kg`,
    `gas v-gas-pe 12kg ${n}`,
    `gas v-gas-pe 12kg`,
    `gas v-gas-shell 12kg ${n}`,
    `gas v-gas-shell 12kg`,
    `gas v-gas vàng 12kg ${n}`,
    `gas v-gas vàng 12kg`,
    `gas v-gas xanh đen 12kg ${n}`,
    `gas v-gas xanh đen 12kg`,
  ];

  // Nhóm 7: TỪ KHÓA CẤP PHƯỜNG XÃ NỘI THÀNH (Bao gồm các phường mới sáp nhập)
  const targetWards = district.newWards && district.newWards.length > 0 
    ? [...district.newWards, ...district.popularWards.slice(0, 5)]
    : district.popularWards.slice(0, 8);

  targetWards.forEach((ward) => {
    const cleanWard = ward.replace(/\s*\(.*?\)\s*/g, "").trim();
    keywords.push(`giao gas ${cleanWard} ${n}`);
    keywords.push(`đặt gas ${cleanWard} ${n}`);
    keywords.push(`gọi gas ${cleanWard} ${n}`);
    keywords.push(`đổi gas ${cleanWard} ${n}`);
  });

  return Array.from(new Set(keywords));
}

/**
 * Tìm thông tin quận theo slug
 */
export function getDistrictBySlug(slug: string): DistrictInfo | undefined {
  if (!slug) return undefined;
  let cleanSlug = slug.toLowerCase().trim();
  
  const strippedSlug = cleanSlug
    .replace(/^(giao-gas-|dat-gas-|goi-gas-|doi-gas-|dai-ly-gas-|gia-gas-)/, "")
    .trim();

  return DISTRICTS_DATA.find(
    (d) => 
      d.slug === strippedSlug || 
      d.slug === cleanSlug || 
      d.urlSlug === cleanSlug || 
      `giao-gas-${d.slug}` === cleanSlug
  );
}

export function getAllDistricts(): DistrictInfo[] {
  return DISTRICTS_DATA;
}

export function getInnerCityDistricts(): DistrictInfo[] {
  return DISTRICTS_DATA.filter((d) => d.isInnerCity);
}
