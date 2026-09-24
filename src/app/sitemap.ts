import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getAllDistricts, SEO_PRODUCTS } from '@/lib/districts';

// Ngày cập nhật phiên bản nội dung chuẩn SEO cho Google Search Console
const STATIC_LAST_MODIFIED = new Date('2026-09-17T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'gasnhaminh.com';
  const proto = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`;

  const districts = getAllDistricts();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const productUrls: MetadataRoute.Sitemap = SEO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    ...districtUrls,
    ...productUrls,
  ];
}
