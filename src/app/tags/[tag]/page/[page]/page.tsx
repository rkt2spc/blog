import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPostsTag, getPostsCountByTag, getPostsMetadataByTag } from '@/lib/mdx'

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

  const postsMetadata = await getPostsMetadataByTag(tag)

  return (
    <PageLayout title={`Tag: ${tag}`}>
      <PostList
        searchable
        postsMetadata={postsMetadata}
        pagination={{
          linkPrefix: `/tags/${tag}/page`,
          currentPage: pageNumber,
          itemsPerPage: POSTS_PER_PAGE,
        }}
      />
    </PageLayout>
  )
}
