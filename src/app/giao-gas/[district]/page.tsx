import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDistrictBySlug, getAllDistricts, getDistrictKeywords, BRAND_NAME, SEO_PRODUCTS } from '@/lib/districts';
import { createProductSchema } from '@/lib/seo-schema';
import DistrictLandingView from '@/components/DistrictLandingView';

interface PageProps {
  params: Promise<{
    district: string;
  }>;
}

/**
 * Pre-render tất cả các quận huyện khi build để tối ưu SEO và tốc độ tải trang
 */
export async function generateStaticParams() {
  const districts = getAllDistricts();
  return districts.map((d) => ({
    district: d.slug,
  }));
}

/**
 * Tối ưu hoá On-page SEO Metadata chuyên biệt cho từng quận của Gas Nhà Mình
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { district: slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    return {
      title: `Khu vực giao gas | ${BRAND_NAME}`,
    };
  }

  const title = `Giao Gas ${district.name} Siêu Tốc ${district.slaMinutes}P | ${BRAND_NAME}`;
  const description = `Giao gas ${district.name} ${district.slaMinutes} phút từ ${BRAND_NAME}. Đổi bình gas 12kg, 45kg chính hãng V-Gas, Petrolimex đủ ký, nguyên tem màng co, kiểm tra an toàn miễn phí. Hotline: ${district.hotline}.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';
  const canonicalUrl = `${siteUrl}/giao-gas/${district.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: 'vi_VN',
      type: 'website',
      images: [
        {
          url: '/hero_gasnhaminh.jpg',
          width: 1200,
          height: 630,
          alt: `Giao gas ${district.name} - ${BRAND_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero_gasnhaminh.jpg'],
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { district: slug } = await params;
  const district = getDistrictBySlug(slug);

  if (!district) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com';
  const pageUrl = `${siteUrl}/giao-gas/${district.slug}`;

  // Structured Data Schema JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${pageUrl}#business`,
        name: `Đại Lý Giao Gas, Đặt Gas ${district.name} - ${BRAND_NAME}`,
        description: district.description,
        url: pageUrl,
        image: `${siteUrl}/hero_gasnhaminh.jpg`,
        telephone: district.hotline,
        priceRange: '500.000đ - 1.730.000đ',
        address: {
          '@type': 'PostalAddress',
          streetAddress: district.hubName,
          addressLocality: district.name,
          addressRegion: 'Thành phố Hồ Chí Minh',
          postalCode: '700000',
          addressCountry: 'VN',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: district.fullName,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '06:00',
          closes: '22:00',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Mạng lưới giao gas TP.HCM',
            item: `${siteUrl}/#khu-vuc`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Giao gas ${district.name}`,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#products`,
        name: `Bảng giá bình gas chính hãng Gas Nhà Mình tại ${district.name}`,
        itemListElement: SEO_PRODUCTS.map((prod, idx) => {
          const defaultPrice = prod.priceVal || (prod.weight === '45kg' ? 1730000 : 530000);
          const productPrice = prod.priceVal > 0 ? prod.priceVal : defaultPrice;
          return createProductSchema({
            position: idx + 1,
            name: `${prod.name} tại ${district.name}`,
            description: prod.desc,
            image: prod.image || '/hero_gasnhaminh.jpg',
            sku: `${prod.slug}-${district.slug}`,
            mpn: `${prod.slug}-${district.slug}`,
            brand: prod.brand,
            url: pageUrl,
            price: productPrice,
            location: district.name,
            sellerName: BRAND_NAME,
          });
        }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Thời gian giao gas của Gas Nhà Mình tại ${district.name} là bao lâu?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Thời gian giao gas tại ${district.name} trung bình từ ${district.slaMinutes} phút kể từ lúc xác nhận đơn hàng nhờ trạm phân phối tại ${district.hubName}, phục vụ tất cả các phường nội thành.`,
            },
          },
          {
            '@type': 'Question',
            name: `Gas Nhà Mình tại ${district.name} có giao các loại bình gas nào?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Chúng tôi cung cấp đủ 11 dòng sản phẩm chính hãng: V-Gas (xám, đỏ, vàng, xanh đen, V-Gas PE bọc nhựa chống va đập, V-Gas Shell van chụp), Petrolimex (van đứng, van chụp Shell), Tuấn Khang (vàng, xanh) 12kg và Gas bò 45kg công nghiệp.`,
            },
          },
          {
            '@type': 'Question',
            name: `Quy trình kiểm tra an toàn khi giao gas của Gas Nhà Mình?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Kỹ thuật viên kiểm tra bình nguyên tem màng co chính hãng, thay gioăng cao su miễn phí, vệ sinh đầu đốt bếp và kiểm tra rò rỉ khí gas an toàn trước khi khách hàng thanh toán.`,
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
      <DistrictLandingView district={district} />
    </>
  );
}
