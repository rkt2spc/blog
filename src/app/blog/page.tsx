import { Metadata } from 'next'

import PostsListPage from './page/[page]/page'

import { siteMetadata } from '@/data'

export const metadata: Metadata = {
  title: `Blog | ${siteMetadata.title}`,
  description: `Blog posts @ ${siteMetadata.title}`,
}

export default async function BlogPage() {
  return <PostsListPage params={{ page: '1' }} />
}
