import PageLayout from '@/layouts/PageLayout'
import PostList from '@/components/PostList'

import { getAllPosts } from '@/lib/mdx'

export default async function BlogPage() {
  const posts = await getAllPosts()
  const postListItems = posts.map((v) => v.metadata)

  return (
    <PageLayout title="All Posts">
      <PostList searchable posts={postListItems} />
    </PageLayout>
  )
}
