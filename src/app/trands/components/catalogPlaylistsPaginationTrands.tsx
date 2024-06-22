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

const CatalogPlaylistsPaginationTrands: FC<{
  data: TypePaginationPlaylists
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

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
    <div className="">
      <div className="text-2xl max-sm:text-xl">
        Самые популярные плейлисты
      </div>
      {response?.length ? (
        <>
          <Carousel opts={{ align: "start", }} className="w-full">
            <CarouselContent>
              {response.playlists?.map(playlist => (
                <CarouselItem key={playlist.id} className="pt-6 pl-8 2xl:basis-1/6 xl:basis-1/4 lg:basis-1/3 md:basis-1/2">
                  <PlaylistItem
                    item={playlist}
                    key={playlist.id}
                    removeHandler={removeHadler}
                    isUpdateLink={isUpdateLink}
                    />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
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
      )
      }
    </div>
  )
}

export default CatalogPlaylistsPaginationTrands