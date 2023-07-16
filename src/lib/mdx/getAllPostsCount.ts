import 'server-only'

import { cache } from './caches'
import { CACHE_KEY_COUNT } from './constants'

import getAllPostsMetadata from './getAllPostsMetadata'

export default async function getAllPostsCount(): Promise<number> {
  const cachedCount = cache.get<number>(CACHE_KEY_COUNT)
  if (cachedCount) {
    return cachedCount
  }

  const allMetadata = await getAllPostsMetadata()
  const postCount = allMetadata.length

  cache.set(CACHE_KEY_COUNT, postCount)
  return postCount
}
