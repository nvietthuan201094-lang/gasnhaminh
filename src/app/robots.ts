import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://gasnhaminh.com').replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Google-Extended',
          'Bingbot',
          'cohere-ai',
          'Meta-ExternalAgent',
          'FacebookBot',
          'DuckDuckBot',
          'Amazonbot',
          'ByteSpider',
          'Bytespider',
          'YouBot',
          'CCBot',
          'GoogleOther',
          'Google-InspectionTool',
          'Perplexity-Search',
          'Claude-Web',
          'Timpibot',
          'KagiBot',
          'Diffbot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
