import { Metadata } from 'next'

import PostsListPage from './page/[page]/page'

import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Blog | ${siteMetadata.title}`
  const description = `Blog posts @ ${siteMetadata.title}`
  const url = `${siteMetadata.host}/blog`

  return getMetadata({ title, description, url })
}

export default async function BlogPage() {
  return <PostsListPage params={{ page: '1' }} />
}
