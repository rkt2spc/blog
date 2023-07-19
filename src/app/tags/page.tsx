import { Metadata } from 'next'

import PageLayout from '@/layouts/PageLayout'
import Tag from '@/components/Tag'

import { siteMetadata } from '@/data'
import { getAllPostsTag } from '@/lib/mdx'

export const metadata: Metadata = {
  title: `Tags | ${siteMetadata.title}`,
  description: `Post tags @ ${siteMetadata.title}`,
}

export default async function TagsPage() {
  const tags = await getAllPostsTag()
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  return (
    <PageLayout hLayout title="Tags">
      <div className="flex flex-wrap md:max-w-lg">
        {Object.keys(tags).length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="mt-2 mb-2 mr-5">
              <Tag name={t} count={tags[t]} />
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}
