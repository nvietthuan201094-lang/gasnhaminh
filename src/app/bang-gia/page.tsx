import { Metadata } from 'next';
import Link from 'next/link';
import GasPriceTable from '@/components/GasPriceTable';
import { getAllDistricts, HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { fetchDynamicGasPrices } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Bảng Giá Gas Hôm Nay Mới Nhất 2026 | Báo Giá Đổi Bình Gas 12kg, 45kg TP.HCM – Gas Nhà Mình',
  description: 'Bảng giá gas hôm nay mới nhất cập nhật liên tục từ hệ thống CRM Gas Nhà Mình. Báo giá đổi bình gas 12kg V-Gas, Petrolimex, Tuấn Khang và gas bò 45kg chính hãng. Cam kết đủ 12kg ruột, cân gas tại chỗ, giao nhanh 15 phút TP.HCM. Hotline: 0888 113 831.',
  keywords: [
    'giá gas hôm nay',
    'giá gas mới nhất',
    'bảng giá gas',
    'bảng giá gas hôm nay',
    'giá đổi bình gas 12kg',
    'giá gas petrolimex hôm nay',
    'giá gas v-gas',
    'giá gas tuấn khang',
    'đổi gas bao nhiêu tiền',
    'giá gas bò 45kg',
    'bình gas 12kg giá bao nhiêu',
    'giá đổi gas hôm nay',
    'giá gas tphcm',
    'đại lý gas nhà mình'
  ],
  alternates: {
    canonical: `${SITE_URL}/bang-gia`,
  },
  openGraph: {
    title: 'Bảng Giá Gas Hôm Nay Mới Nhất 2026 – Gas Nhà Mình',
    description: 'Tra cứu bảng giá đổi bình gas 12kg, 45kg chính hãng mới nhất hôm nay. Đầy đủ tem chống giả, giao hỏa tốc 15 phút tại 21 quận huyện TP.HCM.',
    url: `${SITE_URL}/bang-gia`,
    siteName: 'Gas Nhà Mình',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default async function BangGiaPage() {
  const districts = getAllDistricts();
  const products = await fetchDynamicGasPrices();

  const currentDateStr = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/bang-gia#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bảng giá gas hôm nay',
            item: `${SITE_URL}/bang-gia`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/bang-gia#pricelist`,
        name: 'Bảng giá gas hôm nay mới nhất 2026 - Gas Nhà Mình',
        description: 'Báo giá chi tiết các loại bình gas chính hãng 12kg và 45kg',
        itemListElement: products.map((prod, idx) => ({
          '@type': 'Product',
          position: idx + 1,
          name: prod.name,
          description: prod.desc,
          image: prod.image,
          sku: prod.slug,
          brand: {
            '@type': 'Brand',
            name: prod.brand,
          },
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/bang-gia`,
            price: prod.priceVal,
            priceCurrency: 'VND',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'Gas Nhà Mình',
            },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/bang-gia#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Giá gas hôm nay bao nhiêu tiền một bình 12kg?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Giá đổi bình gas 12kg hôm nay dao động từ 480.000đ đến 500.000đ tùy theo thương hiệu (V-Gas xám và Tuấn Khang giá 480.000đ; các dòng V-Gas màu cao cấp và van Shell giá 500.000đ; Petrolimex giá 485.000đ). Giá đã bao gồm VAT và miễn phí giao hàng, kiểm tra an toàn tại nhà.',
            },
          },
          {
            '@type': 'Question',
            name: 'Tiền cọc vỏ bình gas mới lần đầu là bao nhiêu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tiền thế chân cọc vỏ bình gas 12kg tiêu chuẩn là 250.000đ/vỏ (có biên bản thu cọc rõ ràng). Với bình gas bò công nghiệp 45kg, tiền cọc vỏ là 1.000.000đ/vỏ. Khi khách hàng không còn nhu cầu sử dụng, Gas Nhà Mình sẽ thu hồi vỏ và hoàn lại 100% tiền cọc.',
            },
          },
          {
            '@type': 'Question',
            name: 'Đổi vỏ bình gas khác hãng có bị tính thêm phí không?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hoàn toàn không. Gas Nhà Mình hỗ trợ đổi ngang miễn phí giữa tất cả các loại vỏ bình gas 12kg hợp chuẩn trên thị trường (V-Gas, Petrolimex, Saigon Petro, Tuấn Khang, Gia Đình Gas...) nếu vỏ còn hạn kiểm định.',
            },
          },
          {
            '@type': 'Question',
            name: 'Thời gian giao gas tại TP.HCM là bao lâu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Với mạng lưới 5 kho gas chiến lược trải đều khắp TP.HCM, thời gian giao gas trung bình từ 15 đến 20 phút kể từ lúc tiếp nhận cuộc gọi hoặc đơn đặt trực tuyến.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-orange-500 selection:text-white">
        {/* Header Tối Giản */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Gas Nhà Mình Logo" className="h-10 w-auto object-contain" />
              <span className="text-[#FF5722] font-black text-xl tracking-tight">GAS NHÀ MÌNH</span>
              <span className="hidden sm:inline-block text-xs text-gray-500 font-medium pl-2 border-l border-gray-300">
                Hết gas, gọi Nhà Mình
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/#khu-vuc"
                className="hidden md:inline-block text-xs font-bold text-gray-700 hover:text-[#FF5722] transition-colors"
              >
                Khu vực giao 15P
              </Link>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-50 hover:bg-orange-100 text-[#FF5722] border border-orange-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                💬 Chat Zalo
              </a>
              <a
                href={HOTLINE_TEL}
                className="bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>📞 Hotline:</span>
                <span className="font-extrabold">{HOTLINE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-100 py-2.5">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <ol className="flex items-center gap-2 text-xs text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#FF5722]">Trang chủ</Link>
              </li>
              <li>/</li>
              <li className="font-bold text-gray-900">Bảng giá gas hôm nay</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-50/60 via-white to-gray-50 py-10 md:py-14 border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Áp dụng Bảng giá thương hiệu Gas Nhà Mình & Niêm yết mới nhất {currentDateStr}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight leading-tight mb-4">
                Bảng Giá Gas Hôm Nay Mới Nhất 2026 – Báo Giá Đổi Bình Gas 12kg & 45kg TP.HCM
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                Cập nhật chính xác <strong>giá gas hôm nay</strong> cho các dòng bình gas V-Gas xám/đỏ/vàng/PE/Shell, Petrolimex và Tuấn Khang 12kg tại <strong>Gas Nhà Mình</strong>. Cam kết đủ 12kg ruột, cân gas trực tiếp tại nhà, miễn phí kiểm tra an toàn van bếp.
              </p>
              
              {/* Thẻ tóm tắt nhanh giá hôm nay */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 block font-semibold">V-Gas Xám 12kg:</span>
                  <span className="text-lg font-black text-[#FF5722]">{products.find(p => p.slug === 'gas-v-gas-xam-12kg')?.price || 'Liên hệ báo giá'}</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">✓ Bán chạy nhất</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 block font-semibold">V-Gas Màu/Shell:</span>
                  <span className="text-lg font-black text-[#FF5722]">{products.find(p => p.slug === 'gas-v-gas-do-12kg')?.price || 'Liên hệ báo giá'}</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">✓ Vỏ bình cao cấp</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 block font-semibold">Tuấn Khang 12kg:</span>
                  <span className="text-lg font-black text-[#FF5722]">{products.find(p => p.slug === 'gas-tuan-khang-vang-12kg')?.price || 'Liên hệ báo giá'}</span>
                  <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">✓ Tiết kiệm chi phí</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-[11px] text-gray-500 block font-semibold">Petrolimex 12kg:</span>
                  <span className="text-lg font-black text-[#FF5722]">{products.find(p => p.slug === 'gas-petrolimex-dung-12kg')?.price || 'Liên hệ báo giá'}</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">✓ Thương hiệu quốc gia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Khung Bảng Giá Tương Tác Chi Tiết */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <GasPriceTable initialProducts={products} showDetailLink={false} brandName="Gas Nhà Mình" />
          </div>
        </section>

        {/* Hướng Dẫn Tính Tiền Khi Đổi Gas Minh Bạch */}
        <section className="py-12 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block mb-1">
                Minh bạch – Rõ ràng – Không phát sinh
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                Hướng Dẫn Cách Tính Tiền Khi Đổi Hoặc Mua Bình Gas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF5722] font-black flex items-center justify-center mb-4 text-lg">
                    1
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Đã Có Vỏ Bình Cùng Hãng</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Khách hàng chỉ cần thanh toán đúng số <strong>tiền ruột gas</strong> niêm yết trong bảng giá. Kỹ thuật viên sẽ thu hồi vỏ cũ và lắp bình mới hoàn toàn miễn phí.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-bold text-orange-800">
                  Tổng tiền = Giá ruột gas
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center mb-4 text-lg">
                    2
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Đổi Vỏ Khác Thương Hiệu</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Đổi ngang miễn phí giữa tất cả các vỏ bình 12kg hợp chuẩn (VD: Đổi vỏ Saigon Petro sang V-Gas hoặc Petrolimex). <strong>Không thu thêm bất kỳ phụ phí đổi vỏ nào.</strong>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-bold text-emerald-800">
                  Tổng tiền = Giá ruột gas (Đổi ngang 0đ)
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center mb-4 text-lg">
                    3
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Mua Mới Chưa Có Vỏ Bình</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Áp dụng cho gia đình mới dùng bếp gas lần đầu. Khách thanh toán: Tiền ruột gas + Tiền cọc thế chân vỏ bình (250k với bình 12kg, 1tr với bình 45kg có phiếu thu cọc).
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs font-bold text-amber-800">
                  Tổng tiền = [Ruột gas] + [Cọc vỏ 250k]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cam Kết Chất Lượng Dịch Vụ */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-orange-50/50">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                5 Cam Kết Vàng Khi Đổi Gas Tại Gas Nhà Mình
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Giao hỏa tốc 15 phút</h3>
                  <p className="text-xs text-gray-600 mt-1">Kho gas phân bổ 5 cụm trọng điểm, nhân viên có mặt ngay khi bạn cần.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Cân gas tại chỗ</h3>
                  <p className="text-xs text-gray-600 mt-1">Cân điện tử trước sự chứng kiến của khách, cam kết đủ 12kg/45kg ruột chuẩn.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">🛡️</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Nguyên tem chống giả</h3>
                  <p className="text-xs text-gray-600 mt-1">Màng co niêm phong còn nguyên vẹn, tích hợp mã QR truy xuất nguồn gốc chính hãng.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">🔧</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Kiểm tra van bếp miễn phí</h3>
                  <p className="text-xs text-gray-600 mt-1">Thử bọt xà phòng hoặc máy đo rò rỉ, thay gioăng cao su định kỳ hoàn toàn miễn phí.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">📑</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Bảo hiểm 10 tỷ đồng</h3>
                  <p className="text-xs text-gray-600 mt-1">Tất cả bình gas đều được mua bảo hiểm trách nhiệm sản phẩm theo quy chuẩn PCCC.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3.5">
                <span className="text-2xl">🎁</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">Tích điểm đổi quà</h3>
                  <p className="text-xs text-gray-600 mt-1">Tích điểm mỗi lần đổi gas, nhận voucher giảm giá hoặc quà tặng gia dụng hấp dẫn.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Khối Hỏi Đáp Thường Gặp (FAQs) chuẩn Schema */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block mb-1">
                Giải đáp thắc mắc
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                Câu Hỏi Thường Gặp Về Giá Gas Hôm Nay
              </h2>
            </div>

            <div className="space-y-4">
              <details className="group bg-gray-50 p-5 rounded-2xl border border-gray-200 open:bg-orange-50/50 open:border-orange-200 transition-all">
                <summary className="font-bold text-gray-900 text-sm md:text-base cursor-pointer list-none flex items-center justify-between">
                  <span>Giá gas hôm nay bao nhiêu tiền một bình 12kg?</span>
                  <span className="text-[#FF5722] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">
                  Giá đổi bình gas 12kg hôm nay dao động từ <strong>480.000đ đến 500.000đ</strong> tùy dòng sản phẩm: V-Gas xám và Tuấn Khang vàng/xanh có giá 480.000đ; các dòng V-Gas đỏ/vàng/xanh đen/PE/Shell có giá 500.000đ; Petrolimex đứng/shell có giá 485.000đ. Mức giá đã bao gồm VAT và công giao tận nhà.
                </p>
              </details>

              <details className="group bg-gray-50 p-5 rounded-2xl border border-gray-200 open:bg-orange-50/50 open:border-orange-200 transition-all">
                <summary className="font-bold text-gray-900 text-sm md:text-base cursor-pointer list-none flex items-center justify-between">
                  <span>Tiền cọc vỏ bình gas mới lần đầu là bao nhiêu?</span>
                  <span className="text-[#FF5722] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">
                  Tiền thế chân cọc vỏ bình gas 12kg là <strong>250.000đ</strong> (có biên bản thu tiền cọc chính thức). Với bình bò công nghiệp 45kg, tiền cọc vỏ là <strong>1.000.000đ</strong>. Quý khách giữ phiếu thu, khi chuyển nhà hoặc không còn nhu cầu sẽ được hoàn lại 100% số tiền cọc này.
                </p>
              </details>

              <details className="group bg-gray-50 p-5 rounded-2xl border border-gray-200 open:bg-orange-50/50 open:border-orange-200 transition-all">
                <summary className="font-bold text-gray-900 text-sm md:text-base cursor-pointer list-none flex items-center justify-between">
                  <span>Đổi vỏ bình gas khác thương hiệu có mất thêm tiền không?</span>
                  <span className="text-[#FF5722] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">
                  Hoàn toàn không mất thêm tiền. Gas Nhà Mình chấp nhận đổi ngang miễn phí 100% giữa tất cả các hãng gas hợp chuẩn PCCC tại TP.HCM.
                </p>
              </details>

              <details className="group bg-gray-50 p-5 rounded-2xl border border-gray-200 open:bg-orange-50/50 open:border-orange-200 transition-all">
                <summary className="font-bold text-gray-900 text-sm md:text-base cursor-pointer list-none flex items-center justify-between">
                  <span>Thời gian giao gas có thật sự trong 15 - 20 phút không?</span>
                  <span className="text-[#FF5722] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-xs md:text-sm text-gray-600 mt-3 leading-relaxed">
                  Đúng vậy. Nhờ hệ thống định vị O2O liên kết trực tiếp với 5 kho hàng thực tế tại Quận 7, Quận 8, Quận 10, Bình Thạnh và Gò Vấp, đơn hàng được chuyển ngay tới nhân viên giao gas đang trực gần địa chỉ của quý khách nhất.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Mạng Lưới 21 Quận Huyện Giao Gas Siêu Tốc */}
        <section className="py-12 bg-gray-100/70 border-t border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Giao Gas Hỏa Tốc 15 Phút Tại Tất Cả Quận Huyện TP.HCM
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Bấm vào từng quận huyện dưới đây để xem hotline và kho hàng Gas Nhà Mình phụ trách gần bạn nhất:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {districts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/giao-gas/${d.slug}`}
                  className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-3 text-center transition-all group shadow-sm"
                >
                  <span className="block font-bold text-xs text-gray-800 group-hover:text-[#FF5722]">
                    {d.name}
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    Giao {d.slaMinutes}P
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 border-t border-gray-800">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center text-xs text-gray-400 space-y-3">
            <p className="font-bold text-sm text-white">
              🏠 HỆ THỐNG GIAO GAS CHÍNH HÃNG TẬN NHÀ – GAS NHÀ MÌNH
            </p>
            <p>
              Tổng đài đặt gas & tư vấn an toàn 24/7: <a href={HOTLINE_TEL} className="text-orange-400 font-bold hover:underline">{HOTLINE_DISPLAY}</a>
            </p>
            <p className="text-gray-500">
              © 2026 Gas Nhà Mình. Bảng giá cập nhật theo giá thị trường và niêm yết chính hãng.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
