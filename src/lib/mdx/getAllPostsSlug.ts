import 'server-only'

import path from 'path'
import { glob } from 'glob'

import { cache } from './caches'
import { DIRECTORY_DATA_POSTS, CACHE_KEY_SLUGS } from './constants'

export default async function getAllPostsSlug(): Promise<string[]> {
  const cachedSlugs = cache.get<string[]>(CACHE_KEY_SLUGS)
  if (cachedSlugs) {
    return cachedSlugs
  }

  const paths = await glob(path.join(DIRECTORY_DATA_POSTS, '/**/*.{md,mdx}'))
  const slugs = paths.map((v) =>
    v.slice(DIRECTORY_DATA_POSTS.length + 1).replace(/(\/index)?\.(md|mdx)$/, '')
  )

  cache.set(CACHE_KEY_SLUGS, slugs)
  return slugs
}
