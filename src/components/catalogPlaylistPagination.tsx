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
import { TypePaginationPlaylists } from "@/interfaces/pagination.type"
import { Button } from "@/components/ui/button"
import { PlaylistService } from "@/services/playlist.service"
import PlaylistItem from "./playlistItem/playlistItem"

const CatalogPlaylistsPagination: FC<{
  data: TypePaginationPlaylists
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

  const [page, setPage] = useState(1)

  const { data: response, isLoading } = useQuery(
    ['playlists', page], () => PlaylistService.getAll({
      page,
      perPage: 6,
    }),
    {
      initialData: data
    }
  )

  return (
    <div className="">
      <div className="mb-4 text-2xl">
        {removeHadler ? 'Мои плейлисты' : 'Плейлисты'}
      </div>
      {response?.length ? (
        <>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {response.playlists?.map(playlist => (
                <CarouselItem key={playlist.id} className="lg:basis-1/6 md:basis-1/2">
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
            {Array.from({ length: response.length / 3 }).map((_, index) => {
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

export default CatalogPlaylistsPagination