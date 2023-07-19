import { Metadata } from 'next'

import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPostsCount, getAllPostsMetadata } from '@/lib/mdx'
import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

type PostsListPageParams = {
  page: string
}

type PostsListPageProps = {
  params: PostsListPageParams
}

const POSTS_PER_PAGE = siteMetadata.postsPerPage

export const dynamicParams = false

export async function generateStaticParams(): Promise<PostsListPageParams[]> {
  const totalPosts = await getAllPostsCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export async function generateMetadata({ params }: PostsListPageProps): Promise<Metadata> {
  const { page } = params

  const title = `Blog | Page ${page} | ${siteMetadata.title}`
  const description = `Blog posts (page ${page}) @ ${siteMetadata.title}`

  return getMetadata({
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteMetadata.host}/blog/page/${page}`,
    },
    twitter: {
      title: title,
      description: description,
    },
  })
}

export default async function PostsListPage({ params }: PostsListPageProps) {
  const { page } = params
  const pageNumber = Number(page)

  const postsMetadata = await getAllPostsMetadata()

  return (
    <PageLayout title="All Posts">
      <PostList
        searchable
        postsMetadata={postsMetadata}
        pagination={{
          linkPrefix: '/blog',
          currentPage: pageNumber,
          itemsPerPage: POSTS_PER_PAGE,
        }}
      />
    </PageLayout>
  )
}
