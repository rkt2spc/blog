import { Metadata } from 'next'

import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPostsTag, getPostsCountByTag, getPostsMetadataByTag } from '@/lib/mdx'
import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

type PostListByTagPageParams = {
  tag: string
  page: string
}

type PostListByTagPageProps = {
  params: PostListByTagPageParams
}

const POSTS_PER_PAGE = siteMetadata.postsPerPage

export const dynamicParams = false

export async function generateStaticParams(): Promise<PostListByTagPageParams[]> {
  const tags = await getAllPostsTag()
  const params: PostListByTagPageParams[] = []

  for (const tag of Object.keys(tags)) {
    const totalPosts = await getPostsCountByTag(tag)
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    for (let page = 1; page <= totalPages; ++page) {
      params.push({
        tag: tag,
        page: page.toString(),
      })
    }
  }

  return params
}

export async function generateMetadata({ params }: PostListByTagPageProps): Promise<Metadata> {
  const { tag, page } = params

  const title = `${tag} | Page ${page} | ${siteMetadata.title}`
  const description = `All posts with tag:${tag} (page ${page}) @ ${siteMetadata.title}`
  const url = `${siteMetadata.host}/tags/${tag}/page/${page}`

  return getMetadata({ title, description, url })
}

export default async function PostListByTagPage({ params }: PostListByTagPageProps) {
  const { tag, page } = params
  const pageNumber = Number(page)

  const postsMetadata = await getPostsMetadataByTag(tag)

  return (
    <PageLayout title={`Tag: ${tag}`}>
      <PostList
        searchable
        postsMetadata={postsMetadata}
        pagination={{
          linkPrefix: `/tags/${tag}`,
          currentPage: pageNumber,
          itemsPerPage: POSTS_PER_PAGE,
        }}
      />
    </PageLayout>
  )
}
