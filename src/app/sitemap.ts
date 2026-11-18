import { MetadataRoute } from 'next';
import { getAllDistricts, SEO_PRODUCTS } from '@/lib/districts';
import { getAllGuides } from '@/lib/guides';
import { getLpgPriceValidityDates } from '@/lib/seo-schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');
  const { validFrom } = getLpgPriceValidityDates();
  const monthlyPriceCycleDate = new Date(`${validFrom}T00:00:00.000Z`);
  const coreHubUpdateDate = new Date('2026-11-18T00:00:00.000Z');
  const standardDistrictDate = new Date('2026-11-01T00:00:00.000Z');
  const CORE_HUB_SLUGS = new Set(['quan-8', 'tan-phu', 'quan-6', 'hoc-mon', 'quan-12', 'binh-tan']);

  const districts = getAllDistricts();
  const guides = getAllGuides();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: CORE_HUB_SLUGS.has(d.slug) ? coreHubUpdateDate : standardDistrictDate,
    changeFrequency: 'weekly',
    priority: CORE_HUB_SLUGS.has(d.slug) ? 0.95 : 0.85,
  }));

  const productUrls: MetadataRoute.Sitemap = SEO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: monthlyPriceCycleDate,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/cam-nang/${g.slug}`,
    lastModified: new Date(`${g.publishedAt || '2026-10-22'}T08:00:00.000Z`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: monthlyPriceCycleDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: monthlyPriceCycleDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cam-nang`,
      lastModified: new Date('2026-10-25T08:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...districtUrls,
    ...productUrls,
    ...guideUrls,
  ];
}
