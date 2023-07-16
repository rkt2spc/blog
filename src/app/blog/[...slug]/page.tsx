import { memo } from 'react'
import { getAllPostsSlug, getPostBySlug } from '@/lib/mdx'
import { getMDXComponent } from 'mdx-bundler/client'
import { Components } from '@/components/MDX'
import PostLayout from '@/layouts/PostLayout'

type PostPageParams = {
  slug: string[]
}

type PostPageProps = {
  params: PostPageParams
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<PostPageParams[]> {
  const slugs = await getAllPostsSlug()
  return slugs.map((v) => ({ slug: v.split('/') }))
}

async function PostPage({ params }: PostPageProps) {
  const { slug } = params

  const post = await getPostBySlug(slug.join('/'))
  const Post = getMDXComponent(post.mdxCode)

  return (
    <PostLayout postMetadata={post.metadata}>
      <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
        <Post components={Components} />
      </div>
    </PostLayout>
  )
}

export default memo(PostPage)
