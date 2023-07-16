'use client'

// import { useState } from 'react'

import PostListItem, { PostListItemProps } from './PostListItem'
import SearchBox from './SearchBox'

export type PostListProps = {
  searchable?: boolean
  posts: PostListItemProps[]
}

export default function PostList({ searchable = false, posts }: PostListProps) {
  return (
    <div>
      {searchable ? <SearchBox /> : null}
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {posts.map((post) => (
          <li key={`${post.slug}`} className="py-6">
            <PostListItem {...post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
