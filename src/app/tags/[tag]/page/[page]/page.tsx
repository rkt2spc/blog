import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPostsTag, getPostsCountByTag, getBatchPostsMetadataByTag } from '@/lib/mdx'

type PostListByTagPageParams = {
  tag: string
  page: string
}

type PostListByTagPageProps = {
  params: PostListByTagPageParams
}

const POSTS_PER_PAGE = 5

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

export default async function PostListByTagPage({ params }: PostListByTagPageProps) {
  const { tag, page } = params
  const pageNumber = Number(page)

  const postsMetadata = await getBatchPostsMetadataByTag(
    { offset: (pageNumber - 1) * POSTS_PER_PAGE, limit: POSTS_PER_PAGE },
    tag
  )

  const totalPosts = await getPostsCountByTag(tag)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <PageLayout title={`Tag: ${tag}`}>
      <PostList
        searchable
        postsMetadata={postsMetadata}
        pagination={{ linkPrefix: `/tags/${tag}`, currentPage: pageNumber, totalPages: totalPages }}
      />
    </PageLayout>
  )
}
