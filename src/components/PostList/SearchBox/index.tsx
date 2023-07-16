'use client'

import SearchIcon from './search.svg'

export type SearchBoxProps = {
  setSearchText: (_: string) => void
}

export default function SearchBox({ setSearchText }: SearchBoxProps) {
  return (
    <div className="relative max-w-lg mb-6">
      <input
        aria-label="Search articles"
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search articles"
        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
      />
      <SearchIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
    </div>
  )
}
