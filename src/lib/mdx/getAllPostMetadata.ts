import 'server-only'

import { CACHE_KEY_META_METADATA } from './constants'
import { metaCache } from './cache'
import { PostMetadata } from '@/types'
import getAllPosts from './getAllPosts'

export default async function getAllPostMetadata(): Promise<PostMetadata[]> {
  const cachedMetadata = metaCache.get<PostMetadata[]>(CACHE_KEY_META_METADATA)
  if (cachedMetadata) {
    return cachedMetadata
  }

  const posts = await getAllPosts()
  const allMetadata = posts.map((p) => p.metadata)

  metaCache.set(CACHE_KEY_META_METADATA, allMetadata)
  return allMetadata
}
