import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getAllDistricts } from '@/lib/districts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'gasnhaminh.com';
  const proto = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`;

  const districts = getAllDistricts();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...districtUrls,
  ];
}
