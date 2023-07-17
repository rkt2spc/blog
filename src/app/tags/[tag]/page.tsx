import { getAllPostsTag } from '@/lib/mdx'
import PostListByTagPage from './page/[page]/page'

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

export default async function BlogByTagPage({ params }: BlogByTagPageProps) {
  const { tag } = params
  return <PostListByTagPage params={{ tag: tag, page: '1' }} />
}
