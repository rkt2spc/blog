import 'server-only'

import path from 'path'
import { glob } from 'glob'

import { DIRECTORY_DATA_POSTS, CACHE_KEY_META_SLUGS } from './constants'
import { metaCache } from './cache'

export default async function getSlugs(): Promise<string[]> {
  // const cachedSlugs: string[] | undefined = metaCache.get(CACHE_KEY_META_SLUGS)
  // if (cachedSlugs) {
  //   return cachedSlugs
  // }

  const paths = await glob(path.join(DIRECTORY_DATA_POSTS, '/**/*.{md,mdx}'))
  const slugs = paths.map((v) =>
    v.slice(DIRECTORY_DATA_POSTS.length + 1).replace(/(\/index)?\.(md|mdx)$/, '')
  )

  metaCache.set(CACHE_KEY_META_SLUGS, slugs)
  return slugs
}
