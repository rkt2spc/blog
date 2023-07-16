import 'server-only'

import { Post } from '@/types'

import getAllPostsSlug from './getAllPostsSlug'
import getPostBySlug from './getPostBySlug'

export default async function getAllPosts(): Promise<Post[]> {
  const slugs = await getAllPostsSlug()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  return posts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime())
}
