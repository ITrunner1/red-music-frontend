'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FC, useState } from "react"
import SongItem from "@/components/songItem/songItem"
import useOnPlay from "@/hooks/useOnPlay"
import { useQuery } from "react-query"
import { SongService } from "@/services/song.service"
import { TypePaginationSongs } from "@/interfaces/pagination.type"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useStore from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"

const CatalogPaginationTrands: FC<{
  data: TypePaginationSongs
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  const [page, setPage] = useState(1)

  const { data: response, isLoading } = useQuery(
    ['songs', page], () => SongService.getMostPopular({
      page,
      perPage: 6,
    }),
    {
      initialData: data
    }
  )

  const onPlay = useOnPlay(data.songs);

  return (
    <div className="">
      <div className="text-2xl max-sm:text-xl">
        Самая популярная музыка
      </div>
      {response?.length ? (
        <>
          <Carousel>
            <CarouselContent className="max-sm:max-w-sm">
              {response.songs?.map(song => (
                <CarouselItem key={song.id} onClick={() => onPlay(song.id)}
                  className={cn("pt-6 pl-12 max-sm:pl-24  xl:basis-1/4 lg:basis-1/3 md:basis-1/2 max-sm:justify-center ease-in-out duration-500",
                    sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5"
                  )}>
                  <SongItem
                    item={song}
                    key={song.id}
                    removeHandler={removeHadler}
                    isUpdateLink={isUpdateLink}
                    isOpen={false} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
            <CarouselNext className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
          </Carousel>
          <div className="text-center mt-2">
            {Array.from({ length: response.length / 6 }).map((_, index) => {
              const pageNumber = index + 1
              return (
                <Button
                  key={index}
                  size='icon'
                  variant={page === pageNumber ? 'default' : 'ghost'}
                  onClick={() => setPage(pageNumber)}
                  className="mx-3"
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>
        </>
      ) : (
        <div className="mb-6">
          <div className="my-4">Музыка не загружена!</div>
        </div>
      )}
    </div>
  )
}

export default CatalogPaginationTrands