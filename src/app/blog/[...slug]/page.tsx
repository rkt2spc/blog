import { getSlugs, getPostBySlug } from '@/lib/mdx'
import { getMDXComponent } from 'mdx-bundler/client'
import { Components } from '@/components/MDX'

type PostPageParams = {
  slug: string[]
}

type PostPageProps = {
  params: PostPageParams
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<PostPageParams[]> {
  const slugs = await getSlugs()
  return slugs.map((v) => ({ slug: v.split('/') }))
}

async function PostPage({ params }: PostPageProps) {
  const { slug } = params

  const res = await getPostBySlug(slug.join('/'))
  const Post = getMDXComponent(res.mdxCode)

  return (
    <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
      <Post components={Components} />
    </div>
  )
}

export default PostPage
