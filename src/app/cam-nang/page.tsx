import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import { getAllDistricts, HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { fetchDynamicGasPrices } from '@/lib/api';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Cẩm Nang Chăm Sóc Bếp & An Toàn Gas 2026 | Gas Nhà Mình',
  description: 'Cẩm nang gian bếp gia đình: Bí quyết kiểm tra bình gas 12kg đủ ký, 5 bước xử lý khi ngửi thấy mùi gas, chỉnh bếp gas đỏ lửa và cảnh báo tờ rơi giả.',
  alternates: {
    canonical: `${SITE_URL}/cam-nang`,
  },
  openGraph: {
    title: 'Cẩm Nang Gian Bếp An Toàn & Mẹo Sử Dụng Bếp Gas – Gas Nhà Mình',
    description: 'Bí quyết kiểm tra bình gas 12kg chính hãng, xử lý mùi gas an toàn và chăm sóc bếp gas lửa xanh tiết kiệm cho mọi gia đình tại TP.HCM.',
    url: `${SITE_URL}/cam-nang`,
    siteName: 'Gas Nhà Mình',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/hero_gasnhaminh.jpg',
        width: 1200,
        height: 630,
        alt: 'Cẩm Nang An Toàn Gas – Gas Nhà Mình',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cẩm Nang Gian Bếp An Toàn & Mẹo Sử Dụng Bếp Gas – Gas Nhà Mình',
    description: 'Cẩm nang kiểm tra bình gas 12kg đủ ký, xử lý rò rỉ gas và chỉnh lửa xanh tại nhà.',
    images: ['/hero_gasnhaminh.jpg'],
  },
};

export default async function CamNangHubPage() {
  const guides = getAllGuides();
  const districts = getAllDistricts();
  const products = await fetchDynamicGasPrices();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/cam-nang#breadcrumb`,
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
            name: 'Cẩm nang gian bếp an toàn',
            item: `${SITE_URL}/cam-nang`,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/cam-nang#collection`,
        url: `${SITE_URL}/cam-nang`,
        name: 'Cẩm Nang Chăm Sóc Gian Bếp, An Toàn Gas & Kinh Nghiệm Đổi Gas Gia Đình',
        description:
          'Tổng hợp cẩm nang dành cho người nội trợ: cách nhận biết bình gas 12kg chính hãng đủ ký, xử lý mùi gas an toàn và khắc phục bếp gas đỏ lửa tại nhà.',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: guides.map((g, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${SITE_URL}/cam-nang/${g.slug}`,
            name: g.title,
            description: g.excerpt,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Gas Nhà Mình - Hết Gas Gọi Mình" className="h-11 w-auto object-contain" />
              <span className="hidden sm:inline-block text-xs text-slate-500 font-bold pl-3 border-l border-slate-300">
                Cẩm Nang Gian Bếp
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-700">
              <Link href="/" className="hover:text-[#E02424] transition-colors">Trang chủ</Link>
              <Link href="/bang-gia" className="hover:text-[#E02424] transition-colors">Bảng giá gas hôm nay</Link>
              <Link href="/cam-nang" className="text-[#E02424]">Cẩm nang an toàn</Link>
              <Link href="/#khu-vuc" className="hover:text-[#E02424] transition-colors">Khu vực giao 15P</Link>
            </nav>
            <div className="flex items-center gap-2.5">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-50 hover:bg-red-100 text-[#E02424] border border-red-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                💬 Zalo
              </a>
              <a
                href={HOTLINE_TEL}
                className="bg-[#E02424] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-lg shadow-xs transition-all"
              >
                📞 {HOTLINE_DISPLAY}
              </a>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 py-2.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#E02424] font-medium">Trang chủ</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Cẩm nang chăm sóc gian bếp & An toàn gas</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#7F1D1D] via-[#991B1B] to-[#B91C1C] text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <span>🏡</span>
                <span>Hết Gas, Gọi Nhà Mình – Chăm Sóc Gian Bếp Như Người Nhà</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black leading-tight mb-4">
                Cẩm Nang Chăm Sóc Gian Bếp Gia Đình, An Toàn Gas & Mẹo Đổi Gas Chuẩn Ký (2026)
              </h1>
              <p className="text-red-100 text-sm sm:text-base leading-relaxed mb-6">
                Cẩm nang thực tế dành riêng cho người nội trợ từ đội ngũ kỹ thuật <strong>Gas Nhà Mình</strong>: Bí quyết kiểm tra bình gas 12kg đủ ký, 5 bước bảo vệ gia đình khi ngửi thấy mùi gas, mẹo tự chỉnh bếp gas bị đỏ lửa đen nồi và cách cảnh giác trước tờ rơi số điện thoại giả mạo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/bang-gia"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all"
                >
                  🔥 Xem Bảng Giá Gas Hôm Nay
                </Link>
                <a
                  href={HOTLINE_TEL}
                  className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  📞 Gọi Thợ Kiểm Tra Bếp Miễn Phí: {HOTLINE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Safety Callout Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">🚨</span>
              <div>
                <h2 className="text-sm sm:text-base font-black text-amber-950">
                  Bếp gas nhà mình có mùi gas lạ hoặc lửa cháy đỏ làm đen đáy nồi?
                </h2>
                <p className="text-xs text-amber-900 mt-0.5">
                  Đội ngũ kỹ thuật viên Gas Nhà Mình tại 5 chi nhánh (Quận 8, Tân Phú, Quận 6, Hóc Môn) sẵn sàng có mặt sau 15 phút – Kiểm tra độ kín và chỉnh lửa xanh hoàn toàn miễn phí!
                </p>
              </div>
            </div>
            <a
              href={HOTLINE_TEL}
              className="shrink-0 bg-[#E02424] hover:bg-[#B91C1C] text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all"
            >
              📞 Gọi Hỗ Trợ Ngay: {HOTLINE_DISPLAY}
            </a>
          </div>
        </section>

        {/* Guides Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E02424] block mb-1">
                Kiến thức hữu ích cho mọi tổ ấm
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Chuyên Đề Hướng Dẫn Sử Dụng Gas An Toàn & Tiết Kiệm
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Hiển thị {guides.length} bài cẩm nang thiết thực
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#E02424] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${guide.badgeColor}`}>
                      {guide.heroIcon} {guide.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ⏱️ {guide.readingTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#E02424] transition-colors leading-snug mb-3">
                    <Link href={`/cam-nang/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>

                  {/* Quick TL;DR preview */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-700 space-y-1.5">
                    <div className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider">
                      📌 Tóm tắt nhanh:
                    </div>
                    <p className="line-clamp-2 text-[11px] text-slate-600 leading-relaxed">
                      {guide.tldr[0]}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Cập nhật: 2026
                  </span>
                  <Link
                    href={`/cam-nang/${guide.slug}`}
                    className="text-xs font-extrabold text-[#E02424] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1"
                  >
                    Đọc chi tiết →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Product Reference Section */}
          <section className="mt-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#E02424]">
                  Bình gas chính hãng cho gian bếp gia đình
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Các Dòng Bình Gas 12kg & 45kg Được Tin Dùng Nhất Tại Gas Nhà Mình
                </h2>
              </div>
              <Link
                href="/bang-gia"
                className="text-xs font-extrabold text-[#E02424] hover:underline shrink-0"
              >
                Xem toàn bộ bảng giá hôm nay →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 8).map((prod) => (
                <Link
                  key={prod.slug}
                  href={`/${prod.slug}`}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#E02424] hover:bg-red-50/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                        {prod.brand}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {prod.weight}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                      {prod.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-sm font-black text-[#E02424]">{prod.price}</span>
                    <span className="text-[11px] font-bold text-slate-700">Chi tiết →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Local SEO District Links */}
          <section className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-2">
              Hệ Thống Giao Gas Tận Nhà 15 Phút Khắp 24 Quận Huyện TP.HCM
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Chọn khu vực của gia đình bạn để xem trạm kho phụ trách và danh sách các phường/xã mới sau sáp nhập:
            </p>
            <div className="flex flex-wrap gap-2">
              {districts.map((d) => (
                <Link
                  key={d.slug}
                  href={`/giao-gas/${d.slug}`}
                  className="text-xs bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#E02424] border border-slate-200 hover:border-red-300 px-3 py-1.5 rounded-xl font-semibold transition-all"
                >
                  📍 Giao gas {d.name}
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-10 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-white">GAS NHÀ MÌNH</strong> – Hết gas gọi Nhà Mình, giao nhanh 15 phút tận gian bếp tại TP.HCM.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              <Link href="/bang-gia" className="hover:text-white">Bảng giá</Link>
              <Link href="/cam-nang" className="text-amber-400 font-bold">Cẩm nang</Link>
              <a href={HOTLINE_TEL} className="text-amber-400 font-bold">📞 {HOTLINE_DISPLAY}</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
