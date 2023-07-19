import 'server-only'

import { PostMetadata } from '@/types'

import { cache } from './caches'
import { CACHE_KEY_METADATA } from './constants'

import getPostBySlug from './getPostBySlug'

export default async function getPostMetadataBySlug(slug: string): Promise<PostMetadata> {
  const cacheKey = `${CACHE_KEY_METADATA}[slug:${slug}]`

  const cachedMetadata = cache.get<PostMetadata>(cacheKey)
  if (cachedMetadata) {
    return cachedMetadata
  }

  const post = await getPostBySlug(slug)
  const metadata = post.metadata

  cache.set(cacheKey, metadata)
  return metadata
}
