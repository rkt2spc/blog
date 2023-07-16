import 'server-only'

import { PostMetadata } from '@/types'

import { cache } from './caches'
import { CACHE_KEY_METADATA } from './constants'

import getPostsByTag from './getPostsByTag'

export default async function getPostsMetadataByTag(tag: string): Promise<PostMetadata[]> {
  const cacheKey = `${CACHE_KEY_METADATA}[tag:${tag}]`

  const cachedMetadata = cache.get<PostMetadata[]>(cacheKey)
  if (cachedMetadata) {
    return cachedMetadata
  }

  const posts = await getPostsByTag(tag)
  const postsMetadata = posts.map((p) => p.metadata)

  cache.set(cacheKey, postsMetadata)
  return postsMetadata
}
