import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Thay thế URL bằng domain thật của bạn sau khi go live
  const baseUrl = 'https://GASO.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];
}
