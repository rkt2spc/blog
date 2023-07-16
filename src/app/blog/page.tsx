import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPostMetadata } from '@/lib/mdx'

export default async function BlogPage() {
  const postsMetadata = await getAllPostMetadata()

  return (
    <PageLayout title="All Posts">
      <PostList searchable posts={postsMetadata} />
    </PageLayout>
  )
}
