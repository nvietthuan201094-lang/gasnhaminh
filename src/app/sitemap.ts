import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getAllDistricts, SEO_PRODUCTS } from '@/lib/districts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'gasnhaminh.com';
  const proto = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`;
  const now = new Date();

  const districts = getAllDistricts();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: now,
  }));

  const productUrls: MetadataRoute.Sitemap = SEO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: now,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: now,
    },
    ...districtUrls,
    ...productUrls,
  ];
}
