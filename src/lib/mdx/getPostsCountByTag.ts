import 'server-only'

import { cache } from './caches'
import { CACHE_KEY_COUNT } from './constants'

import getPostsMetadataByTag from './getPostsMetadataByTag'

export default async function getPostsCountByTag(tag: string): Promise<number> {
  const cacheKey = `${CACHE_KEY_COUNT}[tag:${tag}]`

  const cachedCount = cache.get<number>(cacheKey)
  if (cachedCount) {
    return cachedCount
  }

  const postsMetadata = await getPostsMetadataByTag(tag)
  const postCount = postsMetadata.length

  cache.set(cacheKey, postCount)
  return postCount
}
