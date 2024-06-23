'use client'

import { FC } from "react"
import { Button } from "./ui/button"

interface IPagination {
  numberPages: number
  changePage: (page: string) => void
  currentPage?: number | string
}

const Pagination: FC<IPagination> = ({
  numberPages,
  changePage,
  currentPage
}) => {
  return (
    <div className="text-center mt-2 max-sm:mb-4">
      {Array.from({ length: numberPages > 1 ? numberPages : 1 }).map((_, index) => {
        const pageNumber = (index + 1).toString()
        return (
          <Button
            key={pageNumber}
            size='icon'
            variant={currentPage === pageNumber ? 'default' : 'ghost'}
            onClick={() => changePage(pageNumber)}
            className="mx-3"
          >
            {pageNumber}
          </Button>
        )
      })}
    </div>
  )
}

export default Pagination