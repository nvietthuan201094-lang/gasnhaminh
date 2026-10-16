import { MetadataRoute } from 'next';
import { getAllDistricts, SEO_PRODUCTS } from '@/lib/districts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');
  const now = new Date();

  const districts = getAllDistricts();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const productUrls: MetadataRoute.Sitemap = SEO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...districtUrls,
    ...productUrls,
  ];
}
