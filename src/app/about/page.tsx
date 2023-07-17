import { memo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Components } from '@/components/MDX'
import PageLayout from '@/layouts/PageLayout'
import AuthorLayout from '@/layouts/AuthorLayout'
import { getAuthor } from '@/lib/mdx'

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
