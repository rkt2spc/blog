'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { NavLinks } from '@/types'

type NavProps = {
  links: NavLinks
}

export default function Nav({ links }: NavProps) {
  const currentPath = usePathname()

  return (
    <nav className="hidden sm:block sm:py-2 font-medium">
      {Object.entries(links).map(([key, link]) => (
        <Link
          key={key}
          href={link.href}
          active={currentPath === `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${link.href}`}
          activeClassName="font-semibold text-primary-500 dark:text-secondary-500"
          className="text-gray-900 dark:text-gray-100 p-1 sm:p-4 first:ps-0"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  )
}
