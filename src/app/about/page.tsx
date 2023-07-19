import { memo } from 'react'
import { Metadata } from 'next'

import { getMDXComponent } from 'mdx-bundler/client'

import { Components } from '@/components/MDX'

import PageLayout from '@/layouts/PageLayout'
import AuthorLayout from '@/layouts/AuthorLayout'

import { getAuthor } from '@/lib/mdx'
import { getMetadata } from '@/lib/site'

import { siteMetadata } from '@/data'

export async function generateMetadata(): Promise<Metadata> {
  const title = `About Me | ${siteMetadata.title}`
  const description = `About ${siteMetadata.author}`

  return getMetadata({
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${siteMetadata.host}/about`,
    },
    twitter: {
      title: title,
      description: description,
    },
  })
}

async function AboutPage() {
  const author = await getAuthor()

  const Author = getMDXComponent(author.mdxCode)

  return (
    <PageLayout title="About" subtitle="More about me and this blog">
      <AuthorLayout authorMetadata={author.metadata}>
        <Author components={Components} />
      </AuthorLayout>
    </PageLayout>
  )
}

export default memo(AboutPage)
