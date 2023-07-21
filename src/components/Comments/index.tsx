'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useInView } from 'react-intersection-observer'

import Giscus from '@giscus/react'

import { siteMetadata } from '@/data'

type CommentsProps = {
  topic: string
  className?: string
}

export default function Comments({ topic, className }: CommentsProps) {
  const { comments } = siteMetadata
  const { enabled, componentId, giscus } = comments

  const { theme, resolvedTheme } = useTheme()
  const commentsTheme = theme === 'dark' || resolvedTheme === 'dark' ? 'dark' : 'light'

  const { ref, inView } = useInView({ triggerOnce: true })

  const [show, setShow] = useState(false)

  useEffect(() => setShow(true), [inView])

  if (!enabled || !topic) {
    return null
  }

  const { owner, repo, repoId, category, categoryId, reactionsEnabled, language } = giscus

  const cls = ['flex justify-center', className || ''].join(' ').trim()

  return (
    <div id={componentId} ref={ref} className={cls}>
      {show && (
        <Giscus
          repo={`${owner}/${repo}`}
          repoId={repoId}
          category={category}
          categoryId={categoryId}
          reactionsEnabled={reactionsEnabled ? '1' : '0'}
          lang={language}
          mapping="specific"
          term={topic}
          theme={commentsTheme}
          emitMetadata="0"
          inputPosition="top"
          loading="lazy"
        />
      )}
    </div>
  )
}
