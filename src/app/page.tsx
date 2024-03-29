import React from 'react'
import dedent from 'dedent'

import PageLayout from '@/layouts/PageLayout'
import HomeBanner, { HomeBannerProps } from '@/components/HomeBanner'
import PostList from '@/components/PostList'

import { getBatchPostsMetadata } from '@/lib/mdx'

import { siteMetadata } from '@/data'

export default async function Home() {
  const bannerProps: HomeBannerProps = {
    title: `Nice to meet you. I'm Tuan`,
    titleEmoji: '👋',
    message: dedent(
      `I am a software engineer currently working in Singapore.
      Welcome to my digital home - where I collect my thoughts and learnings on various topics (mostly related to technology). I hope my sharing can be useful to you!
      Enjoy your stay!`
    ),
  }

  const { numLatestPosts } = siteMetadata
  const postsMetadata = await getBatchPostsMetadata({ offset: 0, limit: numLatestPosts })

  return (
    <div className="space-y-8">
      <HomeBanner {...bannerProps} />
      <PageLayout title="Latest Posts">
        <PostList postsMetadata={postsMetadata} />
      </PageLayout>
    </div>
  )
}
