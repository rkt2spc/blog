import { PostMetadata } from '@/types'

import { Article, WithContext } from 'schema-dts'

import { siteMetadata } from '@/data'

export default async function generateArticleJsonLdFromPostMetadata(postMd: PostMetadata) {
  const { slug, title, summary, thumbnail, date } = postMd
  const { host, author, siteLogo } = siteMetadata

  const thumbnailUrl = thumbnail.startsWith('/') ? `${host}${thumbnail}` : thumbnail

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${host}/blog/${slug}`,
    },
    headline: title,
    description: summary,
    image: thumbnailUrl ? [{ '@type': 'ImageObject', url: thumbnailUrl }] : [],
    datePublished: date.toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: author,
      logo: {
        '@type': 'ImageObject',
        url: `${host}${siteLogo}`,
      },
    },
  }

  return jsonLd
}
