'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TypePaginationSongs } from "@/interfaces/song.interface"
import { FC, useState } from "react"
import SongItem from "@/components/songItem/songItem"
import useOnPlay from "@/hooks/useOnPlay"
import { useQuery } from "react-query"
import { SongService } from "@/services/song.service"
import { Button } from "./ui/button"

const Catalog: FC<{
  data: TypePaginationSongs
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ data, removeHadler, isUpdateLink }) => {

  const [page, setPage] = useState(1)

  const { data: response, isLoading } = useQuery(
    ['songs', page], () => SongService.getAll({
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
                <CarouselItem onClick={() => onPlay(song.id)} className="lg:basis-1/6 md:basis-1/2">
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
          <div className="my-4">Это конец</div>
          <Button onClick={() => setPage(page - 1)}>
            Назад
          </Button>
        </div>)
      }
    </div>
  )
}

export default Catalog