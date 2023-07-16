import PostsListPage from './page/[page]/page'

export default async function BlogPage() {
  return <PostsListPage params={{ page: '1' }} />
}
