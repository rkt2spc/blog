import 'server-only'

import getSlugs from './getAllPostSlugs'
import getPostBySlug from './getPostBySlug'
import { Post } from '@/types'

export default async function getAllPosts(): Promise<Post[]> {
  const slugs = await getSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  return posts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime())
}
