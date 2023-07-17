'use client'

import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

type CustomLinkProps = ComponentPropsWithoutRef<'a'> & {
  active?: boolean
  activeClassName?: string
}

export default function CustomLink({
  href,
  className = '',
  active = false,
  activeClassName = 'font-semibold',
  ...rest
}: CustomLinkProps) {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  const cls = [
    'hover:text-primary-500 dark:hover:text-secondary-500',
    `${className}`,
    `${active ? activeClassName : ''}`,
  ]
    .join(' ')
    .trim()

  if (isInternalLink) {
    return <Link href={href} className={cls} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} className={cls} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} className={cls} {...rest} />
}
