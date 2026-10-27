import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { getAllDistricts, HOTLINE_DISPLAY, HOTLINE_TEL, ZALO_URL } from '@/lib/districts';
import { fetchDynamicGasPrices } from '@/lib/api';
import { createHowToSchema } from '@/lib/seo-schema';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: 'Cẩm nang gian bếp an toàn | Gas Nhà Mình',
    };
  }

  const canonicalUrl = `${SITE_URL}/cam-nang/${guide.slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: canonicalUrl,
      siteName: 'Gas Nhà Mình',
      locale: 'vi_VN',
      type: 'article',
      publishedTime: `${guide.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${guide.updatedAt}T00:00:00.000Z`,
      authors: [guide.authorName],
      images: [
        {
          url: '/hero_gasnhaminh.jpg',
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: ['/hero_gasnhaminh.jpg'],
    },
  };
}

function getDistrictAnchorText(d: { slug: string; name: string; slaMinutes: string }) {
  switch (d.slug) {
    case 'quan-12':
      return `Đổi gas ${d.name} uy tín (15 phút)`;
    case 'quan-8':
      return `Giao gas ${d.name} hỏa tốc (15 phút)`;
    case 'tan-phu':
      return `Gọi gas ${d.name} chính hãng (15 phút)`;
    case 'quan-12':
      return `Đổi gas ${d.name} uy tín & an toàn (15 phút)`;
    case 'quan-6':
      return `Đổi bình gas ${d.name} an toàn (15 phút)`;
    case 'hoc-mon':
      return `Giao gas ${d.name} tận nhà (15 phút)`;
    case 'go-vap':
      return `Đặt gas ${d.name} đủ ký (15 phút)`;
    case 'binh-thanh':
      return `Đổi gas ${d.name} giá tốt (15 phút)`;
    case 'tan-binh':
      return `Giao gas ${d.name} siêu tốc (15 phút)`;
    case 'quan-7':
      return `Gọi gas ${d.name} nhanh (15 phút)`;
    case 'binh-tan':
      return `Đổi bình gas ${d.name} (15 phút)`;
    case 'quan-1':
      return `Giao gas ${d.name} trung tâm (15 phút)`;
    case 'quan-10':
      return `Gọi gas ${d.name} giá tốt (15 phút)`;
    default:
      return `Giao gas ${d.name} (${d.slaMinutes} phút)`;
  }
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const allGuides = getAllGuides();
  const otherGuides = allGuides.filter((g) => g.slug !== guide.slug);
  const allDistricts = getAllDistricts();
  const products = await fetchDynamicGasPrices();

  const relatedProducts = products.filter((p) =>
    guide.relatedProductSlugs.includes(p.slug)
  );
  const relatedDistricts = allDistricts.filter((d) =>
    guide.relatedDistrictSlugs.includes(d.slug)
  );

  const pageUrl = `${SITE_URL}/cam-nang/${guide.slug}`;

  const isHowToGuide =
    guide.slug.startsWith('cach-') ||
    guide.slug.startsWith('huong-dan-') ||
    guide.slug.includes('quy-trinh') ||
    guide.slug.includes('kiem-tra') ||
    guide.category === 'xu-ly-su-co';

  const howToSchema = isHowToGuide
    ? createHowToSchema({
        name: guide.title,
        description: guide.metaDescription,
        totalTime: 'PT5M',
        image: [`${SITE_URL}/hero_gasnhaminh.jpg`],
        steps: guide.sections.map((s) => ({
          name: s.heading,
          text: s.paragraphs[0] || s.heading,
          url: `${pageUrl}#${s.id}`,
        })),
      })
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: guide.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        headline: guide.title,
        description: guide.metaDescription,
        image: [`${SITE_URL}/hero_gasnhaminh.jpg`],
        datePublished: `${guide.publishedAt}T00:00:00+07:00`,
        dateModified: `${guide.updatedAt}T00:00:00+07:00`,
        author: {
          '@type': 'Organization',
          name: guide.authorName,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Gas Nhà Mình',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
          },
        },
        inLanguage: 'vi-VN',
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: guide.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
      ...(howToSchema ? [howToSchema] : []),
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-[#E02424] font-medium">Trang chủ</Link>
            <span>/</span>
            <Link href="/cam-nang" className="hover:text-[#E02424] font-medium">Cẩm nang gian bếp an toàn</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold line-clamp-1">{guide.title}</span>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <article className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Article Header */}
            <div className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-b from-red-50/60 to-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${guide.badgeColor}`}>
                  {guide.heroIcon} {guide.categoryLabel}
                </span>
                <span className="text-xs text-slate-500 font-medium">⏱️ {guide.readingTime}</span>
                <span className="text-xs text-slate-500 font-medium">• Cẩm nang An toàn Gia đình 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
                {guide.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {guide.excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-200/70 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-900">{guide.authorName}</strong>
                  <span className="block text-[11px] text-slate-500">{guide.authorRole}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/bang-gia"
                    className="bg-red-50 hover:bg-red-100 text-[#E02424] border border-red-200 font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    📊 Xem Bảng Giá Gas Hôm Nay
                  </Link>
                  <a
                    href={HOTLINE_TEL}
                    className="bg-[#E02424] hover:bg-[#B91C1C] text-white font-bold px-3.5 py-1.5 rounded-lg transition-colors"
                  >
                    📞 Gọi: {HOTLINE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            {/* TL;DR Box for AI Overviews & Featured Snippets */}
            <div className="p-6 sm:px-10 pt-6 pb-2">
              <div className="bg-red-50/80 border-2 border-red-200 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-black text-[#B91C1C] uppercase tracking-wider mb-3">
                  <span>⚡</span>
                  <span>Tóm Tắt Nhanh Cho Gia Đình (30 Giây)</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {guide.tldr.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#E02424] text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-6 sm:p-10 space-y-10">
              {guide.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-l-4 border-[#E02424] pl-3.5">
                    {sec.heading}
                  </h2>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
                          <span className="text-[#E02424] font-black mt-0.5">✓</span>
                          <div>
                            <strong className="text-slate-900">{b.label}</strong> {b.text}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.table && (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs my-4">
                      {sec.table.caption && (
                        <div className="bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 border-b border-slate-200">
                          📊 {sec.table.caption}
                        </div>
                      )}
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#B91C1C] text-white">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 font-extrabold border-r border-red-700 last:border-r-0">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3.5 leading-relaxed ${
                                    cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.callout && (
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border-l-4 ${
                        sec.callout.type === 'warning'
                          ? 'bg-red-50 border-red-600 text-red-950'
                          : sec.callout.type === 'tip'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                          : 'bg-amber-50 border-amber-500 text-amber-950'
                      }`}
                    >
                      <div className="font-black text-xs sm:text-sm mb-1">
                        {sec.callout.type === 'warning' ? '⚠️ ' : sec.callout.type === 'tip' ? '💡 ' : '📌 '}
                        {sec.callout.title}
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                        {sec.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* Mid-Article Conversion CTA */}
              <div className="bg-gradient-to-r from-[#7F1D1D] to-[#DC2626] text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                    🏡 Hết Gas, Gọi Nhà Mình – Có Mặt Sau 15 Phút
                  </span>
                  <h3 className="text-lg sm:text-xl font-black">
                    Đổi Bình Gas Chính Hãng Đủ Ký – Chăm Sóc Gian Bếp Miễn Phí 100%
                  </h3>
                  <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                    Kỹ thuật viên hỗ trợ thử kín cổ van bằng bọt xà phòng, thay gioăng cao su mới, vệ sinh họng đốt và chỉnh lửa xanh hoàn toàn miễn phí cho gia đình bạn.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                  <a
                    href={HOTLINE_TEL}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl text-center shadow-sm transition-all"
                  >
                    📞 Gọi Ngay: {HOTLINE_DISPLAY}
                  </a>
                  <Link
                    href="/bang-gia"
                    className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl text-center transition-all"
                  >
                    Xem Bảng Giá Hôm Nay
                  </Link>
                </div>
              </div>

              {/* Related Products Showcase */}
              {relatedProducts.length > 0 && (
                <section className="pt-4">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-4">
                    🔥 Các Dòng Bình Gas Gia Đình Đề Xuất (Giá Cập Nhật Hôm Nay)
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedProducts.map((prod) => (
                      <Link
                        key={prod.slug}
                        href={`/${prod.slug}`}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-[#E02424] bg-slate-50/60 hover:bg-red-50/40 transition-all flex items-center justify-between gap-4"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-[#E02424] uppercase tracking-wider">
                            {prod.brand} • {prod.valveType}
                          </span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{prod.desc}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm sm:text-base font-black text-[#E02424]">{prod.price}</div>
                          <span className="text-[11px] font-bold text-slate-600">Đặt ngay →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQ Section */}
              <section className="pt-6 border-t border-slate-200">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-5">
                  ❓ Giải Đáp Thắc Mắc Thường Gặp Của Gia Đình
                </h2>
                <div className="space-y-4">
                  {guide.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-slate-50 rounded-2xl p-5 border border-slate-200"
                    >
                      <h3 className="text-sm sm:text-base font-black text-slate-900 mb-2">
                        {fIdx + 1}. {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </article>

          {/* Other Guides */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                📚 Các Bài Viết Hữu Ích Khác Trong Cẩm Nang Gian Bếp
              </h2>
              <Link href="/cam-nang" className="text-xs font-bold text-[#E02424] hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherGuides.map((og) => (
                <Link
                  key={og.slug}
                  href={`/cam-nang/${og.slug}`}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#E02424] shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#E02424] uppercase">
                      {og.heroIcon} {og.categoryLabel}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-1.5 mb-2 leading-snug">
                      {og.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#E02424]">Đọc tiếp →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related Districts */}
          {relatedDistricts.length > 0 && (
            <section className="mt-8 bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3">
                📍 Trạm Giao Gas 15 Phút & Bảo Dưỡng Bếp Miễn Phí Tại Các Quận Huyện:
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedDistricts.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/giao-gas/${d.slug}`}
                    className="text-xs bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#E02424] border border-slate-200 px-3 py-1.5 rounded-xl font-semibold transition-colors"
                  >
                    {getDistrictAnchorText(d)}
                  </Link>
                ))}
                <Link
                  href="/bang-gia"
                  className="text-xs bg-red-50 text-[#E02424] border border-red-200 px-3 py-1.5 rounded-xl font-bold"
                >
                  Bảng giá gas hôm nay →
                </Link>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
