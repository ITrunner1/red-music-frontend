'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FC, useState } from "react"
import { useQuery } from "react-query"
import { PlaylistService } from "@/services/playlist.service"
import { Button } from "@/components/ui/button"
import { TypePaginationPlaylists } from "@/interfaces/pagination.type"
import PlaylistItem from "@/components/playlistItem/playlistItem"
import { cn } from "@/lib/utils"
import useStore from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"

const CatalogPlaylistsPaginationTrands: FC<{
  data: TypePaginationPlaylists
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  const [page, setPage] = useState(1)

  const { data: response, isLoading } = useQuery(
    ['playlists', page], () => PlaylistService.getMostPopular({
      page,
      perPage: 6,
    }),
    {
      initialData: data
    }
  )

  return (
    <div className="max-sm:w-[280px]">
      <div className="text-2xl max-sm:text-xl">
        Самые популярные плейлисты
      </div>
      {response?.length ? (
        <>
          <Carousel>
            <CarouselContent className="p-2 md:p-4 max-sm:pl-6 max-sm:pt-6 ease-in-out">
              {response.playlists?.map(playlist => (
                <CarouselItem key={playlist.id}
                  className={cn("sm:p-5 max-sm:basis-full xl:basis-1/3 lg:basis-1/2 md:basis-1/2 ease-in-out duration-500",
                    sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5 xl:basis-1/3 lg:basis-1/2"
                  )}>
                  <PlaylistItem
                    item={playlist}
                    key={playlist.id}
                    removeHandler={removeHadler}
                    isUpdateLink={isUpdateLink}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
            <CarouselNext className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
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

export default CatalogPlaylistsPaginationTrands