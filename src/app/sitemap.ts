import { MetadataRoute } from 'next';
import { getAllDistricts, SEO_PRODUCTS } from '@/lib/districts';
import { getAllGuides } from '@/lib/guides';
import { getLpgPriceValidityDates } from '@/lib/seo-schema';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');
  const { validFrom } = getLpgPriceValidityDates();
  const monthlyCycleDate = new Date(`${validFrom}T00:00:00.000Z`);
  const contentReleaseDate = new Date('2026-10-30T08:00:00.000Z');
  const stableLastModified = monthlyCycleDate > contentReleaseDate ? monthlyCycleDate : contentReleaseDate;

  const districts = getAllDistricts();
  const guides = getAllGuides();

  const districtUrls: MetadataRoute.Sitemap = districts.map((d) => ({
    url: `${baseUrl}/giao-gas/${d.slug}`,
    lastModified: stableLastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const productUrls: MetadataRoute.Sitemap = SEO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: stableLastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${baseUrl}/cam-nang/${g.slug}`,
    lastModified: g.updatedAt ? new Date(`${g.updatedAt}T08:00:00.000Z`) : stableLastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: contentReleaseDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: contentReleaseDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cam-nang`,
      lastModified: stableLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...districtUrls,
    ...productUrls,
    ...guideUrls,
  ];
}
