import 'server-only'

import getSlugs from './getSlugs'
import getPostBySlug from './getPostBySlug'
import { Post } from './types'

export default async function getAllPosts(): Promise<Post[]> {
  const slugs = await getSlugs()
  return Promise.all(slugs.map((slug) => getPostBySlug(slug)))
}
