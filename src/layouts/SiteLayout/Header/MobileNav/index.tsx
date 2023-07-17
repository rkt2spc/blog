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
      <div
        className={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
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
        <nav className="fixed mt-8 h-full">
          {Object.entries(links).map(([key, link]) => (
            <div key={key} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl text-gray-900 dark:text-gray-100"
                active={currentPath === `${process.env.NEXT_PUBLIC_BASE_PATH}${link.href}`}
                activeClassName="font-semibold text-primary-500 dark:text-secondary-500"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
