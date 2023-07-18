import { MetadataRoute } from 'next'

import { siteMetadata } from '@/data'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { host } = siteMetadata

  return {
    sitemap: `${host}/sitemap.xml`,
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
  }
}
