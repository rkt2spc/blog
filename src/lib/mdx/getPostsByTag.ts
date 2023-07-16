import 'server-only'

import { Post } from '@/types'

import { cache } from './caches'
import { CACHE_KEY_POSTS } from './constants'

import getAllPosts from './getAllPosts'

export default async function getPostsByTag(tag: string): Promise<Post[]> {
  const cacheKey = `${CACHE_KEY_POSTS}[tag:${tag}]`

  const cachedPosts = cache.get<Post[]>(cacheKey)
  if (cachedPosts) {
    cache
    return cachedPosts
  }

  const allPosts = await getAllPosts()
  const postsByTag = allPosts.filter((post) => post.metadata.tags.includes(tag))

  cache.set(cacheKey, postsByTag)
  return postsByTag
}
