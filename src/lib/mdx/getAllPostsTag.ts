import 'server-only'

import { cache } from './caches'
import { CACHE_KEY_TAGS } from './constants'

import getAllPostsMetadata from './getAllPostsMetadata'

export default async function getAllPostsTag(): Promise<Record<string, number>> {
  const cachedTags = cache.get<Record<string, number>>(CACHE_KEY_TAGS)
  if (cachedTags) {
    return cachedTags
  }

  const allPostsMetadata = await getAllPostsMetadata()

  const tags = allPostsMetadata.flatMap((m) => m.tags)
  const tagsWithCount: Record<string, number> = {}
  for (const tag of tags) {
    tagsWithCount[tag] = tagsWithCount[tag] || 0
    tagsWithCount[tag] += 1
  }

  cache.set(CACHE_KEY_TAGS, tagsWithCount)
  return tagsWithCount
}
