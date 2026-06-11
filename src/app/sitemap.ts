import type { MetadataRoute } from 'next';

const BASE_URL = 'https://jstnyoo.com';

const APP_SLUGS = ['brik', 'eunho', 'uninstall', 'bord', 'whistle'] as const;
const LEGAL_PAGES = ['privacy', 'terms', 'support'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/apps`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...APP_SLUGS.map((slug) => ({
      url: `${BASE_URL}/apps/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...LEGAL_PAGES.map((page) => ({
      url: `${BASE_URL}/app/${page}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
