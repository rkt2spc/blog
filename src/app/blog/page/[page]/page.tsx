import { getAllPostsCount, getAllPostsMetadata } from '@/lib/mdx'
import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

type PostsListPageParams = {
  page: string
}

type PostsListPageProps = {
  params: PostsListPageParams
}

const POSTS_PER_PAGE = 5

export const dynamicParams = false

export async function generateStaticParams(): Promise<PostsListPageParams[]> {
  const totalPosts = await getAllPostsCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
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
