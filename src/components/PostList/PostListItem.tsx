'use client'

import Image from 'next/image'
import Link from '@/components/Link'

export interface PostListItemProps {
  slug: string
  title: string
  date: Date
  summary: string
  thumbnail?: string
  tags: string[]
}

export default function PostListItem({
  slug,
  title,
  date,
  summary,
  thumbnail,
  tags,
}: PostListItemProps) {
  const tagCls = [
    'rounded-full px-3 py-1 text-xs uppercase no-underline',
    'text-primary-600 dark:text-secondary-400',
    'bg-slate-100 dark:bg-neutral-700',
    'hover:bg-slate-200 dark:hover:bg-neutral-600',
  ]
    .join(' ')
    .trim()

  const dateStr = date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className="md:flex md:gap-6">
      {thumbnail && (
        <div className="w-full mb-4 md:mb-auto md:flex-none md:w-48 md:h-32">
          <Image
            alt={title}
            src={thumbnail}
            width={192}
            height={128}
            className="object-cover w-full rounded-md h-full"
          />
        </div>
      )}
      <div className="md:flex-auto">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date.toISOString()}>{dateStr}</time>
          </dd>
        </dl>
        <h3 className="text-2xl font-bold leading-8 tracking-tight">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <div className="text-md leading-tight line-clamp-2 text-gray-600 dark:text-gray-300">
          {summary}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} className={tagCls} href="/tags">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
