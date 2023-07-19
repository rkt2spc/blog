import { Metadata } from 'next'

import { deepMerge } from '@/lib/util'

import { siteMetadata } from '@/data'

async function getDefaultMetadata(): Promise<Metadata> {
  const { title, description, host, siteThumbnail } = siteMetadata

  const metadata: Metadata = {
    title: title,
    description: description,
    metadataBase: new URL(host),
    icons: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
    ],
    robots: {
      follow: true,
      index: true,
    },
    manifest: '/site.webmanifest',
    themeColor: 'white',
    openGraph: {
      type: 'website',
      title: title,
      description: description,
      siteName: title,
      url: host,
      images: [siteThumbnail],
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image',
      images: [siteThumbnail],
    },
  }

  return metadata
}

type MetadataOverrides = {
  title?: string
  description?: string
  url?: string
  thumbnail?: string
  openGraphType?: 'website' | 'article'
}

export default async function getMetadata(overrides?: MetadataOverrides): Promise<Metadata> {
  const defaultMetadata = await getDefaultMetadata()

  if (!overrides) {
    return defaultMetadata
  }

  const { title, description, url, thumbnail, openGraphType } = overrides

  const overridesMD: Metadata = {
    title: title,
    description: description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: openGraphType || 'website',
      title: title,
      description: description,
      url: url,
      images: thumbnail ? [thumbnail] : undefined,
    },
    twitter: {
      title: title,
      description: description,
      images: thumbnail ? [thumbnail] : undefined,
    },
  }

  return deepMerge(defaultMetadata, overridesMD)
}
