'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'

import Giscus from '@giscus/react'

import Button from '@/components/Button'

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

  const [hidden, setHidden] = useState(true)

  if (!enabled || !topic) {
    return null
  }

  const { owner, repo, repoId, category, categoryId, reactionsEnabled, language } = giscus

  const cls = ['flex justify-center', className || ''].join(' ').trim()

  const buttonCls = [
    'text-gray-900 dark:text-gray-100',
    'hover:text-primary-500 dark:hover:text-secondary-500',
  ]
    .join(' ')
    .trim()

  return (
    <div id={componentId} className={cls}>
      {hidden ? (
        <Button className={buttonCls} onClick={() => setHidden(false)}>
          Load Comments
        </Button>
      ) : (
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
