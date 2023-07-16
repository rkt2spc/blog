'use client'

import { useState } from 'react'

import PostListItem from './PostListItem'
import Pagination, { PaginationProps } from './Pagination'
import SearchBox from './SearchBox'

import { PostMetadata } from '@/types'

export type PostListProps = {
  searchable?: boolean
  pagination?: PaginationProps
  postsMetadata: PostMetadata[]
}

export default function PostList({ searchable = false, pagination, postsMetadata }: PostListProps) {
  const [searchText, setSearchText] = useState('')

  return (
    <div>
      {searchable && <SearchBox setSearchText={setSearchText} />}
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {postsMetadata.map((md) => (
          <li key={`${md.slug}`} className="py-6">
            <PostListItem {...md} />
          </li>
        ))}
      </ul>
      {pagination && <Pagination {...pagination} />}
    </div>
  )
}
