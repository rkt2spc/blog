'use client'

import Link from '@/components/Link'

import { kebabCase } from '@/lib/util'

export type TagProps = {
  name: string
  count?: number
}

export default function Tag({ name, count }: TagProps) {
  const cls = [
    'rounded-full px-3 py-1 text-xs uppercase no-underline inline-block',
    'text-primary-600 dark:text-secondary-400',
    'bg-gray-200 dark:bg-neutral-700',
    'group hover:bg-slate-300 dark:hover:bg-neutral-600',
  ]
    .join(' ')
    .trim()

  const countCls = [
    'rounded-full py-1 px-3 ml-2 text-xs uppercase inline-block',
    'text-black dark:text-white',
    'bg-slate-100 dark:bg-neutral-800',
    'group-hover:bg-slate-200 dark:group-hover:bg-neutral-700',
  ]
    .join(' ')
    .trim()

  return (
    <Link className={cls} href={`/tags/${kebabCase(name)}`}>
      {name}
      {count && <span className={countCls}>{count}</span>}
    </Link>
  )
}
