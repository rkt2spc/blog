import { Metadata } from 'next'

import PostListByTagPage from './page/[page]/page'

import { getAllPostsTag } from '@/lib/mdx'
import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

type BlogByTagPageParams = {
  tag: string
}

type BlogByTagPageProps = {
  params: BlogByTagPageParams
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<BlogByTagPageParams[]> {
  const tags = await getAllPostsTag()
  return Object.keys(tags).map((tag) => ({ tag: tag }))
}

export async function generateMetadata({ params }: BlogByTagPageProps): Promise<Metadata> {
  const { tag } = params

  const title = `${tag} | ${siteMetadata.title}`
  const description = `All posts with tag:${tag} @ ${siteMetadata.title}`
  const url = `${siteMetadata.host}/tags/${tag}`

  return getMetadata({ title, description, url })
}

export default async function BlogByTagPage({ params }: BlogByTagPageProps) {
  const { tag } = params
  return <PostListByTagPage params={{ tag: tag, page: '1' }} />
}
