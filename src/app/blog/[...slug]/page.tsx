import { memo } from 'react'
import { Metadata } from 'next'

import { getMDXComponent } from 'mdx-bundler/client'

import { Components } from '@/components/MDX'
import PostLayout from '@/layouts/PostLayout'

import { getAllPostsSlug, getPostBySlug, getPostMetadataBySlug } from '@/lib/mdx'
import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

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

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params

  const postMetadata = await getPostMetadataBySlug(slug.join('/'))

  const title = `${postMetadata.title} | ${siteMetadata.title}`
  const description = `${postMetadata.summary}`

  return getMetadata({
    title: title,
    description: description,
    openGraph: {
      type: 'article',
      title: title,
      description: description,
      url: `${siteMetadata.host}/blog/${slug.join('/')}`,
      ...(postMetadata.thumbnail ? { images: [postMetadata.thumbnail] } : {}),
    },
    twitter: {
      title: title,
      description: description,
      ...(postMetadata.thumbnail ? { images: [postMetadata.thumbnail] } : {}),
    },
  })
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
