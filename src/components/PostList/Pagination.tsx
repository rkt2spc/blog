'use client'

import Link from '@/components/Link'

export type PaginationProps = {
  linkPrefix: string
  totalPages: number
  currentPage: number
}

export default function Pagination({ linkPrefix, totalPages, currentPage }: PaginationProps) {
  const firstPage = 1
  const hasFirstPage = firstPage != Number(currentPage)
  const firstLink = linkPrefix

  const prevPage = Number(currentPage) - 1
  const hasPrevPage = prevPage > 0
  const prevLink = prevPage == firstPage ? firstLink : `${linkPrefix}/page/${prevPage}`

  const nextPage = Number(currentPage) + 1
  const hasNextPage = nextPage <= Number(totalPages)
  const nextLink = `${linkPrefix}/page/${nextPage}`

  const lastPage = Number(totalPages)
  const hasLastPage = lastPage != Number(currentPage)
  const lastLink = `${linkPrefix}/page/${lastPage}`

  const LeftNavigation = (
    <div className="flex-1 space-x-4 text-start">
      <button rel="first" className="disabled:opacity-50" disabled={!hasFirstPage}>
        {hasFirstPage ? <Link href={firstLink}>First</Link> : <span>First</span>}
      </button>
      <button rel="prev" className="disabled:opacity-50" disabled={!hasPrevPage}>
        {hasPrevPage ? <Link href={prevLink}>Prev</Link> : <span>Prev</span>}
      </button>
    </div>
  )

  const RightNavigation = (
    <div className="flex-1 space-x-4 text-end">
      <button rel="next" className="disabled:opacity-50" disabled={!hasNextPage}>
        {hasNextPage ? <Link href={nextLink}>Next</Link> : <span>Next</span>}
      </button>
      <button rel="last" className="disabled:opacity-50" disabled={!hasLastPage}>
        {hasLastPage ? <Link href={lastLink}>Last</Link> : <span>Last</span>}
      </button>
    </div>
  )

  return (
    <div className="space-y-2 mt-10 md:space-y-5">
      <nav className="flex justify-between">
        {LeftNavigation}

        <span>
          {currentPage} of {totalPages}
        </span>

        {RightNavigation}
      </nav>
    </div>
  )
}
