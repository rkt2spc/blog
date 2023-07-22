'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import MenuIcon from './menu.svg'
import CloseIcon from './close.svg'

import Link from '@/components/Link'
import { NavLinks } from '@/types'

type MobileNavProps = {
  links: NavLinks
}

export default function MobileNav({ links }: MobileNavProps) {
  const [navShow, setNavShow] = useState(false)
  const currentPath = usePathname()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const drawerCls = [
    'fixed top-0 left-0',
    'h-screen w-full',
    'z-40',
    'bg-gray-200 dark:bg-gray-800 opacity-95',
    'transition-transform duration-300 ease-in-out',
    navShow ? 'translate-x-0' : 'translate-x-full',
  ]
    .join(' ')
    .trim()

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <MenuIcon className="text-gray-900 dark:text-gray-100" />
      </button>
      <div className={drawerCls}>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-5 mt-11 h-8 w-8 rounded"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <CloseIcon className="text-gray-900 dark:text-gray-100" />
          </button>
        </div>
        <nav className="h-full overflow-y-auto pb-64">
          {Object.entries(links).map(([key, link]) => (
            <Link
              key={key}
              href={link.href}
              className="text-2xl text-gray-900 dark:text-gray-100 block px-12 py-4"
              active={currentPath === `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${link.href}`}
              activeClassName="font-semibold text-primary-500 dark:text-secondary-500"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
