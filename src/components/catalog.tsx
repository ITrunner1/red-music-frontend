'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { FC } from "react"
import SongItem from "@/components/songItem/songItem"
import useOnPlay from "@/hooks/useOnPlay"
import useStore from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { cn } from "@/lib/utils"
import { ISong } from "@/interfaces/song.interface"

const Catalog: FC<{
  songs: ISong[]
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ songs, removeHadler, isUpdateLink }) => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  const onPlay = useOnPlay(songs);

  return (
    <div className="max-sm:w-[280px]">
      <div className="mt-6 text-2xl max-sm:text-xl">
        {removeHadler ? 'Моя музыка' : 'Новая музыка'}
      </div>
      {songs?.length ? (
        <>
          <Carousel>
            <CarouselContent className="p-2 md:p-4 max-sm:pl-6 max-sm:pt-6 ease-in-out">
              {songs.map(song => (
                <CarouselItem key={song.id} onClick={() => onPlay(song.id)}
                  className={cn("sm:p-5 max-sm:basis-full xl:basis-1/3 lg:basis-1/2 md:basis-1/2 ease-in-out duration-500",
                    sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5 xl:basis-1/3 lg:basis-1/2"
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
            <CarouselPrevious className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
            <CarouselNext className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
          </Carousel>
        </>
      ) : (
        <div className="mb-6">
          <div className="my-4">Музыка не загружена!</div>
        </div>
      )}
    </div>
  )
}

export default Catalog