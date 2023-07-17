'use client'

import { useState } from 'react'

import PostListItem from './PostListItem'
import Pagination from './Pagination'
import SearchBox from './SearchBox'

import { PostMetadata } from '@/types'

export type PostListProps = {
  searchable?: boolean
  pagination?: {
    linkPrefix: string
    itemsPerPage: number
    currentPage?: number
  }
  postsMetadata: PostMetadata[]
}

export default function PostList({ searchable = false, pagination, postsMetadata }: PostListProps) {
  const [searchClause, setSearchClause] = useState('')
  const normalizedSearchClause = searchClause.toLowerCase().trim()

  if (searchable && normalizedSearchClause) {
    const filteredPostsMetadata = postsMetadata.filter(({ title, summary, tags }) => {
      const searchText = [title, summary, tags.join('')].join(' ').toLowerCase().trim()
      return searchText.includes(normalizedSearchClause)
    })

    return (
      <div>
        <SearchBox setSearchClause={setSearchClause} />
        {filteredPostsMetadata.length == 0 ? (
          <p>No matching results</p>
        ) : (
          <>
            <p>Showing top {filteredPostsMetadata.length} results</p>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredPostsMetadata.map((md) => (
                <li key={`${md.slug}`} className="py-6">
                  <PostListItem {...md} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  if (pagination) {
    const { linkPrefix, itemsPerPage, currentPage = 1 } = pagination

    const totalPages = Math.ceil(postsMetadata.length / itemsPerPage)

    const startIdx = (currentPage - 1) * itemsPerPage
    const endIdx = startIdx + itemsPerPage
    const paginatedPostsMetadata = postsMetadata.slice(startIdx, endIdx)

    return (
      <div>
        {searchable && <SearchBox setSearchClause={setSearchClause} />}
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {paginatedPostsMetadata.map((md) => (
            <li key={`${md.slug}`} className="py-6">
              <PostListItem {...md} />
            </li>
          ))}
        </ul>
        {pagination && (
          <Pagination linkPrefix={linkPrefix} currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    )
  }

  return (
    <div>
      {searchable && <SearchBox setSearchClause={setSearchClause} />}
      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {postsMetadata.map((md) => (
          <li key={`${md.slug}`} className="py-6">
            <PostListItem {...md} />
          </li>
        ))}
      </ul>
    </div>
  )
}
