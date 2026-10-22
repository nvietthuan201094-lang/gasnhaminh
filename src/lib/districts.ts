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
/**
 * Danh mục sản phẩm Gas chuẩn hóa phục vụ SEO & Đặt hàng:
 * LƯU Ý: Giá bán lẻ và tiền cọc vỏ KHÔNG fix cứng tại đây.
 * Bảng giá được cập nhật tự động theo thời gian thực từ Backend CRM qua API fetchDynamicGasPrices().
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
    price: "530.000đ",
    priceVal: 530000,
    newPrice: "780.000đ",
    newPriceVal: 780000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/168/image_1024",
    tag: "Bán chạy nhất 🔥",
    desc: "Đổi bình V-Gas xám 12kg tại Gas Nhà Mình: đủ 12kg nước gas tinh khiết, lửa xanh đều, nguyên màng co chống giả và miễn phí kiểm tra van bếp.",
  },
  {
    id: "gas-v-gas-do-12kg",
    slug: "gas-v-gas-do-12kg",
    name: "Gas V-Gas đỏ 12 kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/172/image_1024",
    tag: "Chính hãng 100%",
    desc: "Bình V-Gas đỏ 12kg vỏ thép chịu lực sơn tĩnh điện bền đẹp, đạt chuẩn kiểm định PCCC, giao lắp tận nhà trong 15 phút bởi đội ngũ Gas Nhà Mình.",
  },
  {
    id: "gas-v-gas-vang-12kg",
    slug: "gas-v-gas-vang-12kg",
    name: "Gas V-Gas vàng 12kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/174/image_1024",
    tag: "Khuyên dùng",
    desc: "Dòng V-Gas vàng 12kg cao cấp cho gian bếp gia đình: nhiệt lượng ổn định, cháy sạch không muội đen đáy nồi, có bảo hiểm an toàn chính hãng.",
  },
  {
    id: "gas-v-gas-xanh-den-12kg",
    slug: "gas-v-gas-xanh-den-12kg",
    name: "Gas V-Gas xanh đen 12kg",
    brand: "V-Gas",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/173/image_1024",
    tag: "Thiết kế hiện đại",
    desc: "Bình V-Gas xanh đen 12kg chiết nạp tự động chuẩn 12kg ruột gas LPG, niêm phong màng co nhiệt kèm mã QR xác thực từ nhà máy.",
  },
  {
    id: "gas-v-gas-pe-12kg",
    slug: "gas-v-gas-pe-12kg",
    name: "Gas V-Gas-PE 12kg",
    brand: "V-Gas (Vỏ Bọc PE)",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn (Ren Ngoài)",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/178/image_1024",
    tag: "Công nghệ mới 🛡️",
    desc: "Bình V-Gas-PE 12kg bọc nhựa Polyethylene chống ăn mòn, không trầy xước gạch nền, lựa chọn tối ưu cho nhà phố và căn hộ hiện đại.",
  },
  {
    id: "gas-v-gas-shell-12kg",
    slug: "gas-v-gas-shell-12kg",
    name: "Gas V-Gas-Shell 12kg",
    brand: "V-Gas (Van Chụp Shell)",
    category: "v-gas",
    weight: "12kg",
    valveType: "Van Chụp Shell (Ngắt tự động)",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/177/image_1024",
    tag: "Van chụp Shell 🛡️",
    desc: "Bình V-Gas-Shell 12kg sử dụng cổ van chụp tự khóa thông minh, tháo lắp 1 chạm chống rò rỉ khí gas tối đa cho người lớn tuổi.",
  },
  {
    id: "gas-petrolimex-dung-12kg",
    slug: "gas-petrolimex-dung-12kg",
    name: "Gas Petrolimex đứng 12kg",
    brand: "Petrolimex",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Ren Ngoài",
    price: "500.000đ",
    priceVal: 500000,
    newPrice: "750.000đ",
    newPriceVal: 750000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/175/image_1024",
    tag: "Thương hiệu quốc gia 🇻🇳",
    desc: "Đổi bình gas Petrolimex van đứng 12kg chính hãng tại Gas Nhà Mình: đầy đủ tem chống giả bộ Công An, đủ cân và an toàn tuyệt đối.",
  },
  {
    id: "gas-petrolimex-shell-12kg",
    slug: "gas-petrolimex-shell-12kg",
    name: "Gas Petrolimex shell 12kg",
    brand: "Petrolimex",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Chụp Shell",
    price: "500.000đ",
    priceVal: 500000,
    newPrice: "750.000đ",
    newPriceVal: 750000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/176/image_1024",
    tag: "Petrolimex Van Chụp",
    desc: "Bình gas Petrolimex van chụp Shell 12kg tiêu chuẩn an toàn kép, tương thích hoàn hảo với các dòng van điều áp chụp cao cấp.",
  },
  {
    id: "gas-tuan-khang-vang-12kg",
    slug: "gas-tuan-khang-vang-12kg",
    name: "Gas Tuấn Khang vàng 12kg",
    brand: "Tuấn Khang Gas",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/169/image_1024",
    tag: "Giá tốt tiết kiệm",
    desc: "Bình gas Tuấn Khang vàng 12kg chính hãng: ngọn lửa xanh mạnh, tiết kiệm chi phí sinh hoạt hàng tháng cho gia đình và quán ăn nhỏ.",
  },
  {
    id: "gas-tuan-khang-xanh-12kg",
    slug: "gas-tuan-khang-xanh-12kg",
    name: "Gas Tuấn Khang xanh 12kg",
    brand: "Tuấn Khang Gas",
    category: "petrolimex-tuankhang",
    weight: "12kg",
    valveType: "Van Đứng Tiêu Chuẩn",
    price: "550.000đ",
    priceVal: 550000,
    newPrice: "800.000đ",
    newPriceVal: 800000,
    image: "https://crm.posplus.vn/api/v1/public_image/product.template/171/image_1024",
    tag: "Chất lượng cao",
    desc: "Bình gas Tuấn Khang xanh 12kg vỏ bình kiểm định nghiêm ngặt, van đứng ren ngoài thông dụng, hỗ trợ đổi vỏ ngang miễn phí 0đ.",
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
    desc: "Bình gas bò công nghiệp 45kg áp suất ổn định cho bếp nhà hàng, quán ăn, bếp ăn tập thể. Giao nhanh bằng xe chuyên dụng, hỗ trợ hóa đơn VAT.",
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
    popularWards: ["Phường Sài Gòn (mới)", "Phường Tân Định (mới)", "Phường Bến Thành (mới)", "Phường Cầu Ông Lãnh (mới)", "Bến Nghé", "Cô Giang", "Cầu Kho", "Đa Kao", "Nguyễn Cư Trinh", "Nguyễn Thái Bình", "Phạm Ngũ Lão"],
    newWards: ["Phường Sài Gòn", "Phường Tân Định", "Phường Bến Thành", "Phường Cầu Ông Lãnh"],
    neighboringSlugs: ["quan-3", "quan-4", "binh-thanh", "phu-nhuan"],
    description: "Dịch vụ giao gas, gọi gas, đặt gas Quận 1 hỏa tốc 15 phút từ Gas Nhà Mình tại các phường mới Sài Gòn, Tân Định, Bến Thành, Cầu Ông Lãnh. Đổi bình gas 12kg, 45kg chính hãng V-Gas, Petrolimex, Tuấn Khang nguyên tem, kiểm tra van dây an toàn miễn phí.",
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
    popularWards: ["Phường An Khánh (mới)", "Phường Bình Trưng (mới)", "Phường Cát Lái (mới)", "Thảo Điền", "An Phú", "Bình An", "Bình Trưng Đông", "Bình Trưng Tây", "Thạnh Mỹ Lợi"],
    newWards: ["Phường An Khánh", "Phường Bình Trưng", "Phường Cát Lái"],
    neighboringSlugs: ["binh-thanh", "quan-1", "quan-7", "quan-9", "thu-duc"],
    description: "Giao gas, gọi gas, đặt gas Quận 2 siêu tốc từ hệ thống Gas Nhà Mình tại các phường mới An Khánh, Bình Trưng, Cát Lái và khu Thảo Điền, An Phú. Bình gas chính hãng nguyên tem, kiểm định PCCC, kiểm tra van dây an toàn tận nơi.",
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
    popularWards: ["Phường Xuân Hòa (mới)", "Phường Bàn Cờ (mới)", "Phường Nhiêu Lộc (mới)", "Võ Thị Sáu", "Phường 9 (mới)", "Phường 12 (mới)", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 11", "Phường 14"],
    newWards: ["Phường Xuân Hòa", "Phường Bàn Cờ", "Phường Nhiêu Lộc", "Phường Võ Thị Sáu", "Phường 9 (nhập P.10)", "Phường 12 (nhập P.13)"],
    neighboringSlugs: ["quan-1", "quan-10", "phu-nhuan", "tan-binh"],
    description: "Dịch vụ giao gas, gọi gas, đặt gas tận nhà Quận 3 của Gas Nhà Mình tại các phường mới Xuân Hòa, Bàn Cờ, Nhiêu Lộc, Võ Thị Sáu. Giao nhanh 15-20 phút, cam kết bình gas đủ ký, tem niêm phong chuẩn, an toàn tuyệt đối.",
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
    popularWards: ["Phường Khánh Hội (mới)", "Phường Vĩnh Hội (mới)", "Phường Xóm Chiếu (mới)", "Phường 8 (mới)", "Phường 9 (mới)", "Phường 15 (mới)", "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 13", "Phường 16", "Phường 18"],
    newWards: ["Phường Khánh Hội", "Phường Vĩnh Hội", "Phường Xóm Chiếu", "Phường 8 (nhập P.10)", "Phường 9 (nhập P.6)", "Phường 15 (nhập P.14)"],
    neighboringSlugs: ["quan-1", "quan-7", "quan-8"],
    description: "Giao gas, gọi gas, đặt gas Quận 4 giao nhanh 15 phút từ Gas Nhà Mình. Phục vụ các phường mới Khánh Hội, Vĩnh Hội, Xóm Chiếu và tuyến Bến Vân Đồn, Tôn Đản, Hoàng Diệu. Kiểm tra an toàn tận tâm.",
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
    popularWards: ["Phường Chợ Quán (mới)", "Phường An Đông (mới)", "Phường Chợ Lớn (mới)", "Phường 2 (mới)", "Phường 5 (mới)", "Phường 7 (mới)", "Phường 11 (mới)", "Phường 1", "Phường 4", "Phường 9", "Phường 12", "Phường 14"],
    newWards: ["Phường Chợ Quán", "Phường An Đông", "Phường Chợ Lớn", "Phường 2 (nhập P.3)", "Phường 5 (nhập P.6)", "Phường 7 (nhập P.8)", "Phường 11 (nhập P.10)"],
    neighboringSlugs: ["quan-1", "quan-6", "quan-8", "quan-10"],
    description: "Giao gas, gọi gas, đặt gas và đổi bình gas Quận 5 uy tín từ Gas Nhà Mình tại các phường mới Chợ Quán, An Đông, Chợ Lớn. Giá niêm yết rõ ràng, phục vụ nhanh cho gia đình và hộ kinh doanh ẩm thực.",
  },
  {
    slug: "quan-6",
    urlSlug: "giao-gas-quan-6",
    name: "Quận 6",
    fullName: "Quận 6, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Cư Xá Bình Phú – 14R Đường 32B Cư Xá Bình Phú, Quận 6",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Bình Tiên (mới)", "Phường Bình Tây (mới)", "Phường Bình Phú (mới)", "Phường Phú Lâm (mới)", "Phường 1 (mới)", "Phường 2 (mới)", "Phường 9 (mới)", "Phường 14 (mới)", "Phường 10", "Phường 11", "Phường 12"],
    newWards: ["Phường Bình Tiên", "Phường Bình Tây", "Phường Bình Phú", "Phường Phú Lâm", "Phường 1 (nhập P.3, P.4)", "Phường 2 (nhập P.6)", "Phường 9 (nhập P.5)", "Phường 14 (nhập P.13)"],
    neighboringSlugs: ["quan-5", "quan-8", "binh-tan"],
    description: "Giao gas, gọi gas, đặt gas Quận 6 siêu tốc từ Trạm Cư Xá Bình Phú của Gas Nhà Mình tại các phường mới Bình Tiên, Bình Tây, Bình Phú, Phú Lâm. Kiểm tra dây van tỉ mỉ, bình gas chính hãng nguyên tem 100%.",
  },
  {
    slug: "quan-7",
    urlSlug: "giao-gas-quan-7",
    name: "Quận 7",
    fullName: "Quận 7, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Chánh Hưng – 1009 Phạm Thế Hiển, Q.8 (Kho giáp ranh Q.7, giao nhanh 15P qua cầu Him Lam)",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Tân Mỹ (mới)", "Phường Tân Hưng (mới)", "Phường Tân Thuận (mới)", "Phường Phú Thuận (mới)", "Tân Phong", "Tân Phú", "Phú Mỹ", "Tân Quy", "Tân Kiểng", "Bình Thuận", "Tân Thuận Đông", "Tân Thuận Tây"],
    newWards: ["Phường Tân Mỹ", "Phường Tân Hưng", "Phường Tân Thuận", "Phường Phú Thuận"],
    neighboringSlugs: ["quan-4", "quan-8", "nha-be", "binh-chanh", "quan-2"],
    description: "Giao gas, gọi gas, đặt gas Quận 7 từ Gas Nhà Mình phục vụ các phường mới Tân Mỹ, Tân Hưng, Tân Thuận, Phú Thuận và khu Phú Mỹ Hưng, Him Lam. Giao nhanh 15 phút, bình nguyên tem niêm phong, kiểm tra rò rỉ gas miễn phí.",
  },
  {
    slug: "quan-8",
    urlSlug: "giao-gas-quan-8",
    name: "Quận 8",
    fullName: "Quận 8, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Chánh Hưng – 1009 Phạm Thế Hiển, Phường Chánh Hưng, Quận 8",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Chánh Hưng (mới)", "Phường Bình Đông (mới)", "Phường Phú Định (mới)", "Phường Rạch Ông (mới)", "Phường Hưng Phú (mới)", "Phường Xóm Củi (mới)", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 14", "Phường 15", "Phường 16"],
    newWards: ["Phường Chánh Hưng", "Phường Bình Đông", "Phường Phú Định", "Phường Rạch Ông (P.1, P.2, P.3 mới)", "Phường Hưng Phú (P.8, P.9, P.10 mới)", "Phường Xóm Củi (P.11, P.12, P.13 mới)"],
    neighboringSlugs: ["quan-5", "quan-6", "quan-7", "binh-chanh"],
    description: "Đại lý giao gas, gọi gas, đặt gas Quận 8 của Gas Nhà Mình phủ sóng các phường mới Chánh Hưng, Bình Đông, Phú Định, Rạch Ông, Hưng Phú, Xóm Củi và tuyến Phạm Thế Hiển, Tạ Quang Bửu. Đổi gas an toàn, đủ ký.",
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
    popularWards: ["Phường Phước Long (mới)", "Phường Tăng Nhơn Phú (mới)", "Phường Long Bình (mới)", "Phường Long Trường (mới)", "Phường Long Phước (mới)", "Hiệp Phú", "Long Thạnh Mỹ", "Phước Bình", "Phước Long A", "Phước Long B", "Tăng Nhơn Phú A", "Tăng Nhơn Phú B"],
    newWards: ["Phường Phước Long", "Phường Tăng Nhơn Phú", "Phường Long Bình", "Phường Long Trường", "Phường Long Phước"],
    neighboringSlugs: ["thu-duc", "quan-2", "binh-duong"],
    description: "Giao gas, gọi gas, đặt gas Quận 9 nhanh chóng từ Gas Nhà Mình tại các phường mới Phước Long, Tăng Nhơn Phú, Long Bình, Long Trường, Long Phước và Vinhomes Grand Park, Lê Văn Việt. Cam kết bình gas chính hãng đủ ký.",
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
    popularWards: ["Phường Vườn Lài (mới)", "Phường Diên Hồng (mới)", "Phường Hòa Hưng (mới)", "Phường 1", "Phường 2", "Phường 4", "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 12", "Phường 14", "Phường 15"],
    newWards: ["Phường Vườn Lài", "Phường Diên Hồng", "Phường Hòa Hưng", "Phường 6 (nhập P.7)", "Phường 8 (nhập P.5)", "Phường 10 (nhập P.11)"],
    neighboringSlugs: ["quan-3", "quan-5", "quan-11", "tan-binh"],
    description: "Giao gas, gọi gas, đặt gas Quận 10 hỏa tốc từ Gas Nhà Mình tại các phường mới Vườn Lài, Diên Hồng, Hòa Hưng và trục Tô Hiến Thành, Sư Vạn Hạnh, Thành Thái. Bình gas đủ ký, tem chống giả chính hãng.",
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
    popularWards: ["Phường Hòa Bình (mới)", "Phường Phú Thọ (mới)", "Phường Bình Thới (mới)", "Phường Minh Phụng (mới)", "Phường 1", "Phường 3", "Phường 5", "Phường 7", "Phường 8", "Phường 10", "Phường 11", "Phường 14", "Phường 15"],
    newWards: ["Phường Hòa Bình", "Phường Phú Thọ", "Phường Bình Thới", "Phường Minh Phụng", "Phường 1 (nhập P.2, P.16)", "Phường 7 (nhập P.4, P.6)", "Phường 11 (nhập P.9, P.12)", "Phường 15 (nhập P.13)"],
    neighboringSlugs: ["quan-5", "quan-6", "quan-10", "tan-binh", "tan-phu"],
    description: "Đại lý giao gas, gọi gas, đặt gas Quận 11 của Gas Nhà Mình tại các phường mới Hòa Bình, Phú Thọ, Bình Thới, Minh Phụng. Giá niêm yết chuẩn thị trường, giao ngay sau 15 phút gọi.",
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
    popularWards: ["Phường Đông Hưng Thuận (mới)", "Phường Trung Mỹ Tây (mới)", "Phường Tân Thới Hiệp (mới)", "Phường Thới An (mới)", "Phường An Phú Đông (mới)", "Hiệp Thành", "Tân Chánh Hiệp", "Tân Hưng Thuận", "Thạnh Lộc", "Thạnh Xuân"],
    newWards: ["Phường Đông Hưng Thuận", "Phường Trung Mỹ Tây", "Phường Tân Thới Hiệp", "Phường Thới An", "Phường An Phú Đông"],
    neighboringSlugs: ["go-vap", "tan-binh", "hoc-mon", "thu-duc", "binh-duong"],
    description: "Giao gas, gọi gas, đặt gas Quận 12 tận nơi từ Gas Nhà Mình tại các phường mới Đông Hưng Thuận, Trung Mỹ Tây, Tân Thới Hiệp, Thới An, An Phú Đông và trục Lê Văn Khương, Tô Ký, Nguyễn Ảnh Thủ.",
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
    description: "Giao gas, gọi gas, đặt gas Bình Thạnh cực nhanh của Gas Nhà Mình tại các phường mới Gia Định, Bình Thạnh, Bình Lợi Trung, Thạnh Mỹ Tây, Bình Quới và khu Hàng Xanh, Vinhomes Central Park.",
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
    description: "Đại lý giao gas, gọi gas, đặt gas Gò Vấp của Gas Nhà Mình phục vụ hỏa tốc các phường mới Gò Vấp, An Hội Đông, Thông Tây Hội, Hạnh Thông, An Nhơn, An Hội Tây. Bình chính hãng nguyên tem chống giả.",
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
    popularWards: ["Phường Đức Nhuận (mới)", "Phường Cầu Kiệu (mới)", "Phường Phú Nhuận (mới)", "Phường 15 (mới)", "Phường 4 (mới)", "Phường 1", "Phường 2", "Phường 7", "Phường 8", "Phường 10", "Phường 11", "Phường 13"],
    newWards: ["Phường Đức Nhuận", "Phường Cầu Kiệu", "Phường Phú Nhuận", "Phường 15 (nhập P.17)", "Phường 4 (nhập P.3)"],
    neighboringSlugs: ["quan-1", "quan-3", "binh-thanh", "tan-binh"],
    description: "Giao gas, gọi gas, đặt gas Phú Nhuận từ Gas Nhà Mình tại các phường mới Đức Nhuận, Cầu Kiệu, Phú Nhuận và trục đường Phan Xích Long, Nguyễn Văn Trỗi, Huỳnh Văn Bánh. Kiểm tra an toàn van dây chu đáo.",
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
    popularWards: ["Phường Tân Sơn Hòa (mới)", "Phường Tân Sơn Nhất (mới)", "Phường Tân Hòa (mới)", "Phường Bảy Hiền (mới)", "Phường Tân Bình (mới)", "Phường Tân Sơn (mới)", "Phường 1", "Phường 2", "Phường 4", "Phường 10", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    newWards: ["Phường Tân Sơn Hòa", "Phường Tân Sơn Nhất", "Phường Tân Hòa", "Phường Bảy Hiền", "Phường Tân Bình", "Phường Tân Sơn"],
    neighboringSlugs: ["quan-3", "quan-10", "phu-nhuan", "go-vap", "tan-phu", "quan-12"],
    description: "Giao gas, gọi gas, đặt gas Tân Bình tận nhà từ Gas Nhà Mình tại các phường mới Tân Sơn Hòa, Tân Sơn Nhất, Tân Hòa, Bảy Hiền, Tân Bình, Tân Sơn và trục Cộng Hòa, Trường Chinh.",
  },
  {
    slug: "tan-phu",
    urlSlug: "giao-gas-tan-phu",
    name: "Tân Phú",
    fullName: "Quận Tân Phú, TP. Hồ Chí Minh",
    slaMinutes: "15 - 20",
    hubName: "Trạm Gas Phú Thọ Hòa – 36 Nguyễn Văn Huyên, Phường Phú Thọ Hòa, Quận Tân Phú",
    hotline: HOTLINE_DISPLAY,
    isInnerCity: true,
    popularWards: ["Phường Tây Thạnh (mới)", "Phường Tân Sơn Nhì (mới)", "Phường Phú Thọ Hòa (mới)", "Phường Phú Thạnh (mới)", "Phường Tân Phú (mới)", "Hiệp Tân", "Hòa Thạnh", "Phú Trung", "Sơn Kỳ", "Tân Quý", "Tân Thành"],
    newWards: ["Phường Tây Thạnh", "Phường Tân Sơn Nhì", "Phường Phú Thọ Hòa", "Phường Phú Thạnh", "Phường Tân Phú"],
    neighboringSlugs: ["tan-binh", "quan-11", "binh-tan", "quan-12"],
    description: "Đại lý giao gas, gọi gas, đặt gas Tân Phú trong 15 phút từ Trạm Phú Thọ Hòa của Gas Nhà Mình tại các phường mới Tây Thạnh, Tân Sơn Nhì, Phú Thọ Hòa, Phú Thạnh, Tân Phú.",
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
    popularWards: ["Phường Bình Tân (mới)", "Phường Bình Hưng Hòa (mới)", "Phường Bình Trị Đông (mới)", "Phường An Lạc (mới)", "Phường Tân Tạo (mới)", "An Lạc A", "Bình Hưng Hòa A", "Bình Hưng Hòa B", "Bình Trị Đông A", "Bình Trị Đông B"],
    newWards: ["Phường Bình Tân", "Phường Bình Hưng Hòa", "Phường Bình Trị Đông", "Phường An Lạc", "Phường Tân Tạo"],
    neighboringSlugs: ["quan-6", "tan-phu", "binh-chanh", "quan-8"],
    description: "Giao gas, gọi gas, đặt gas Bình Tân nhanh chóng từ Gas Nhà Mình tại các phường mới Bình Tân, Bình Hưng Hòa, Bình Trị Đông, An Lạc, Tân Tạo và khu Tên Lửa, Lê Văn Quới.",
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
    popularWards: ["Tam Phú", "Phường Thủ Đức (mới)", "Phường Hiệp Bình (mới)", "Phường Tam Bình (mới)", "Phường Linh Xuân (mới)", "Phường An Khánh (mới)", "Phường Bình Trưng (mới)", "Phường Cát Lái (mới)", "Phường Phước Long (mới)", "Phường Tăng Nhơn Phú (mới)", "Thảo Điền", "An Phú", "Hiệp Bình Chánh", "Linh Trung"],
    newWards: ["Phường Thủ Đức", "Phường Hiệp Bình", "Phường Tam Bình", "Phường Linh Xuân", "Phường An Khánh", "Phường Bình Trưng", "Phường Cát Lái", "Phường Phước Long", "Phường Tăng Nhơn Phú", "Phường Long Bình", "Phường Long Trường", "Phường Long Phước"],
    neighboringSlugs: ["binh-thanh", "quan-1", "quan-12", "quan-2", "quan-9", "binh-duong"],
    description: "Giao gas, gọi gas, đặt gas TP. Thủ Đức của Gas Nhà Mình phủ sóng toàn bộ 12 phường mới (Thủ Đức, Hiệp Bình, Tam Bình, Linh Xuân, An Khánh, Bình Trưng, Cát Lái, Phước Long, Tăng Nhơn Phú, Long Bình, Long Trường, Long Phước).",
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
    popularWards: ["Xã Bình Hưng (mới)", "Xã Bình Chánh (mới)", "Xã Hưng Long (mới)", "Xã Vĩnh Lộc (mới)", "Xã Tân Vĩnh Lộc (mới)", "Phong Phú", "Vĩnh Lộc A", "Vĩnh Lộc B", "Tân Kiên", "An Phú Tây"],
    newWards: ["Xã Bình Hưng", "Xã Bình Chánh", "Xã Hưng Long", "Xã Vĩnh Lộc", "Xã Tân Vĩnh Lộc", "Xã Bình Lợi", "Xã Tân Nhựt"],
    neighboringSlugs: ["quan-8", "binh-tan", "nha-be"],
    description: "Giao gas, gọi gas, đặt gas Bình Chánh từ Gas Nhà Mình phục vụ các xã mới Bình Hưng, Bình Chánh, Hưng Long, Vĩnh Lộc, Tân Vĩnh Lộc, Bình Lợi, Tân Nhựt và khu Trung Sơn, Quốc lộ 50.",
  },
  {
    slug: "nha-be",
    urlSlug: "giao-gas-nha-be",
    name: "Nhà Bè",
    fullName: "Huyện Nhà Bè, TP. Hồ Chí Minh",
    slaMinutes: "20 - 25",
    hubName: "Kho Gas Lê Văn Lương - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Xã Nhà Bè (mới)", "Xã Hiệp Phước (mới)", "Phước Kiển", "Phú Xuân", "Nhơn Đức", "Long Thới"],
    newWards: ["Xã Nhà Bè", "Xã Hiệp Phước"],
    neighboringSlugs: ["quan-7", "binh-chanh"],
    description: "Đại lý giao gas, gọi gas, đặt gas Nhà Bè hỏa tốc từ Gas Nhà Mình tại xã mới Nhà Bè, Hiệp Phước và khu Phước Kiển, Phú Xuân, Lê Văn Lương, Huỳnh Tấn Phát.",
  },
  {
    slug: "hoc-mon",
    urlSlug: "giao-gas-hoc-mon",
    name: "Hóc Môn",
    fullName: "Huyện Hóc Môn, TP. Hồ Chí Minh",
    slaMinutes: "15 - 25",
    hubName: "Trạm Gas Bà Điểm (64A Nguyễn Thị Hai) & Trạm Tân Hiệp (111/7H Ấp Thới Tây 2), Hóc Môn",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Xã Bà Điểm (mới)", "Xã Hóc Môn (mới)", "Xã Đông Thạnh (mới)", "Xã Xuân Thới Sơn (mới)", "Tân Hiệp", "Xuân Thới Thượng", "Tân Thới Nhì", "Nhị Bình"],
    newWards: ["Xã Bà Điểm", "Xã Hóc Môn", "Xã Đông Thạnh", "Xã Xuân Thới Sơn"],
    neighboringSlugs: ["quan-12", "cu-chi", "binh-duong"],
    description: "Giao gas, gọi gas, đặt gas Hóc Môn từ 2 trạm trực chiến Bà Điểm và Tân Hiệp của Gas Nhà Mình. Phục vụ các xã mới Bà Điểm, Hóc Môn, Đông Thạnh, Xuân Thới Sơn và Quốc lộ 22.",
  },
  {
    slug: "cu-chi",
    urlSlug: "giao-gas-cu-chi",
    name: "Củ Chi",
    fullName: "Huyện Củ Chi, TP. Hồ Chí Minh",
    slaMinutes: "25 - 35",
    hubName: "Kho Gas Tỉnh Lộ 8 - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Xã Củ Chi (mới)", "Xã Tân An Hội (mới)", "Xã Phú Hòa Đông (mới)", "Xã Bình Mỹ (mới)", "Phước Vĩnh An", "Tân Phú Trung", "Tân Thạnh Đông"],
    newWards: ["Xã Củ Chi", "Xã Tân An Hội", "Xã Thái Mỹ", "Xã An Nhơn Tây", "Xã Nhuận Đức", "Xã Phú Hòa Đông", "Xã Bình Mỹ"],
    neighboringSlugs: ["hoc-mon", "binh-duong"],
    description: "Đại lý giao gas, gọi gas, đặt gas Củ Chi uy tín từ Gas Nhà Mình tại các xã mới Củ Chi, Tân An Hội, Phú Hòa Đông, Bình Mỹ, Thái Mỹ, An Nhơn Tây, Nhuận Đức và KCN Tân Phú Trung.",
  },
  {
    slug: "can-gio",
    urlSlug: "giao-gas-can-gio",
    name: "Cần Giờ",
    fullName: "Huyện Cần Giờ, TP. Hồ Chí Minh",
    slaMinutes: "30 - 40",
    hubName: "Trạm Gas Cần Thạnh - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Xã Cần Giờ (mới)", "Xã Bình Khánh (mới)", "Xã An Thới Đông (mới)", "Xã Thạnh An (mới)", "Cần Thạnh", "Long Hòa", "Lý Nhơn", "Tam Thôn Hiệp"],
    newWards: ["Xã Cần Giờ", "Xã Bình Khánh", "Xã An Thới Đông", "Xã Thạnh An"],
    neighboringSlugs: ["nha-be"],
    description: "Giao gas, gọi gas, đặt gas tận nơi tại Cần Giờ từ Gas Nhà Mình, phục vụ các xã mới Cần Giờ, Bình Khánh, An Thới Đông, Thạnh An. Bình gas chính hãng an toàn tuyệt đối.",
  },
  {
    slug: "binh-duong",
    urlSlug: "giao-gas-binh-duong",
    name: "Bình Dương",
    fullName: "Dĩ An - Thuận An, Tỉnh Bình Dương",
    slaMinutes: "20 - 30",
    hubName: "Kho Gas Dĩ An - Gas Nhà Mình",
    hotline: HOTLINE_DISPLAY,
    popularWards: ["Phường Dĩ An (mới)", "Phường Tân Đông Hiệp (mới)", "Phường Đông Hòa (mới)", "Phường Thuận An (mới)", "Phường Lái Thiêu (mới)", "Phường An Phú (mới)", "Phường Bình Hòa (mới)"],
    newWards: ["Phường Dĩ An", "Phường Tân Đông Hiệp", "Phường Đông Hòa", "Phường Thuận An", "Phường Lái Thiêu", "Phường An Phú", "Phường Thuận Giao", "Phường Bình Hòa"],
    neighboringSlugs: ["thu-duc", "quan-12"],
    description: "Giao gas, gọi gas, đặt gas Dĩ An, Thuận An - Bình Dương giáp ranh TP.HCM từ Gas Nhà Mình. Phục vụ các phường mới Dĩ An, Đông Hòa, Tân Đông Hiệp, Thuận An, Lái Thiêu, An Phú, Bình Hòa.",
  },
];

/**
 * Sinh danh sách từ khóa On-Page SEO toàn diện cho từng quận của Gas Nhà Mình
 */
export function getDistrictKeywords(district: DistrictInfo, brandName: string = BRAND_NAME): string[] {
  const n = district.name;
  const nLower = district.name.toLowerCase();

  const keywords: string[] = [
    // Nhóm 1: GIAO GAS + QUẬN
    `giao gas ${n}`,
    `giao gas ${nLower}`,
    `giao gas tận nhà ${n}`,
    `giao gas nhanh ${n}`,
    `giao gas siêu tốc ${n}`,
    `dịch vụ giao gas ${n}`,

    // Nhóm 2: GỌI GAS + QUẬN
    `gọi gas ${n}`,
    `gọi gas ${nLower}`,
    `số gọi gas ${n}`,
    `số điện thoại gọi gas ${n}`,
    `gọi đổi gas ${n}`,
    `gọi gas tận nhà ${n}`,

    // Nhóm 3: ĐẶT GAS + QUẬN
    `đặt gas ${n}`,
    `đặt gas ${nLower}`,
    `đặt gas online ${n}`,
    `đặt bình gas ${n}`,
    `đặt đổi gas ${n}`,
    `đặt gas giao tận nhà ${n}`,

    // Nhóm 4: ĐỔI GAS & ĐẠI LÝ + QUẬN
    `đổi gas ${n}`,
    `đổi gas ${nLower}`,
    `đổi bình gas ${n}`,
    `đổi bình gas 12kg ${n}`,
    `giá gas hôm nay ${n}`,
    `đại lý gas ${n}`,
    `đại lý gas uy tín ${n}`,
    `gas Nhà Mình ${n}`,
    `gas bò 45kg ${n}`,
    `gas petrolimex ${n}`,
    `gas v-gas ${n}`,
  ];

  // Nhóm 5: TỪ KHÓA CẤP PHƯỜNG/XÃ MỚI SÁP NHẬP & PHƯỜNG HIỆN HỮU
  const targetWards = [
    ...(district.newWards || []),
    ...district.popularWards,
  ];

  targetWards.forEach((ward) => {
    const cleanWard = ward.replace(/\s*\(.*?\)\s*/g, "").trim();
    const shortWard = cleanWard.replace(/^(Phường|Xã)\s+/i, "").trim();

    keywords.push(`giao gas ${cleanWard} ${n}`);
    keywords.push(`gọi gas ${cleanWard} ${n}`);
    keywords.push(`đặt gas ${cleanWard} ${n}`);
    keywords.push(`đổi gas ${cleanWard} ${n}`);

    if (shortWard && shortWard !== cleanWard && !/^\d+$/.test(shortWard)) {
      keywords.push(`giao gas ${cleanWard}`);
      keywords.push(`gọi gas ${cleanWard}`);
      keywords.push(`đặt gas ${cleanWard}`);
      keywords.push(`giao gas ${shortWard} ${n}`);
      keywords.push(`gọi gas ${shortWard} ${n}`);
      keywords.push(`đặt gas ${shortWard} ${n}`);
    }
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
