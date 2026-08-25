import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://gsoc.rishavjha.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/timeline/', '/before-after/', '/writeup/'].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
