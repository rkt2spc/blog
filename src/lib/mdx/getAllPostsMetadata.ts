import 'server-only'

import { PostMetadata } from '@/types'

import { cache } from './caches'
import { CACHE_KEY_METADATA } from './constants'

import getAllPosts from './getAllPosts'

export default async function getAllPostsMetadata(): Promise<PostMetadata[]> {
  const cachedMetadata = cache.get<PostMetadata[]>(CACHE_KEY_METADATA)
  if (cachedMetadata) {
    return cachedMetadata
  }

  const posts = await getAllPosts()
  const allMetadata = posts.map((p) => p.metadata)

  cache.set(CACHE_KEY_METADATA, allMetadata)
  return allMetadata
}
