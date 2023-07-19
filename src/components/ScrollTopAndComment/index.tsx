'use client'

import { useEffect, useState } from 'react'

import { siteMetadata } from '@/data'

import CommentIcon from './comment.svg'
import TopIcon from './top.svg'

export default function ScrollTopAndComment() {
  const { comment } = siteMetadata

  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }

  const handleScrollToComment = () => {
    const elem = document.getElementById('comment')
    if (elem) elem.scrollIntoView()
  }

  const cls = ['fixed right-8 bottom-8 hidden flex-col gap-3', show ? 'md:flex' : 'md:hidden']
    .join(' ')
    .trim()

  return (
    <div className={cls}>
      {comment.enabled && (
        <button
          aria-label="Scroll To Comment"
          type="button"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <CommentIcon className="h-5 w-5" />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <TopIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
