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

const CatalogPaginationTrands: FC<{
  data: TypePaginationSongs
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

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
      <div className="text-2xl">
        Самая популярная музыка
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
              {response.songs?.map(song => (
                <CarouselItem key={song.id} onClick={() => onPlay(song.id)} className="lg:basis-1/6 md:basis-1/2">
                  <SongItem
                    item={song}
                    key={song.id}
                    removeHandler={removeHadler}
                    isUpdateLink={isUpdateLink}
                    isOpen={false} />
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

export default CatalogPaginationTrands