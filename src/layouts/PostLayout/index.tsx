import { PropsWithChildren } from 'react'

import Tag from '@/components/Tag'
import Emoji from '@/components/Emoji'

import { PostMetadata } from '@/types'

import { siteMetadata } from '@/data'

export type PostLayoutProps = PropsWithChildren & {
  postMetadata: PostMetadata
}

export default function PostLayout({ postMetadata, children }: PostLayoutProps) {
  const titleCls = [
    'text-4xl md:text-5xl',
    'leading-9 sm:leading-10 md:leading-14',
    'font-extrabold tracking-tight',
    'text-gray-900 dark:text-gray-100',
  ]
    .join(' ')
    .trim()

  const { title, date, readingMinutes, tags, draft } = postMetadata

  const { locale } = siteMetadata
  const dateStr = date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pb-3 space-y-1 text-center">
        <div>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-lg font-medium text-gray-500 dark:text-gray-400">
              <time dateTime={date.toISOString()}>{dateStr}</time>
            </dd>
          </dl>
        </div>
        <h1 className={titleCls}>{title}</h1>
        <div className="py-1 text-base font-normal text-gray-500 dark:text-gray-400">
          <Emoji emoji="⌛" className="mr-1" /> {Math.ceil(readingMinutes)} mins read
        </div>
        <div className="py-1 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </div>
      <div className="pt-4">
        {draft ? (
          <div className="text-center p-10 text-3xl space-x-2">
            <Emoji emoji="🚧" />
            <Emoji emoji="🛠" />
            <Emoji emoji="🚧" />
            <span>Coming soon</span>
            <Emoji emoji="🚧" />
            <Emoji emoji="🛠" />
            <Emoji emoji="🚧" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
