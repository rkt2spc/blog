import { MetadataRoute } from 'next'

import { getAllRoutes } from '@/lib/site'

import { siteMetadata } from '@/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { host } = siteMetadata

  const now = new Date()

  const routes = await getAllRoutes()
  return routes.map((route) => ({
    url: `${host}${route}`,
    lastModified: now,
  }))
}
