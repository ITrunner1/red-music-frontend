'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ISong } from "@/interfaces/song.interface"
import { FC } from "react"
import SongItem from "@/components/songItem/songItem"
import useOnPlay from "@/hooks/useOnPlay"
import { cn } from "@/lib/utils"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import useStore from "@/hooks/use-store"

const Catalog: FC<{
  newSongs: ISong[]
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ newSongs, removeHadler, isUpdateLink }) => {
  
  const sidebar = useStore(useSidebarToggle, (state) => state);

  const onPlay = useOnPlay(newSongs);
  
  return (
    <div className="">
      <div className="text-2xl max-sm:text-xl">
        {removeHadler ? 'Моя музыка' : 'Музыка'}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {newSongs?.map(song => (
            <CarouselItem key={song.id} onClick={() => onPlay(song.id)} 
            className={cn("pt-6 pl-12 max-sm:pl-24  xl:basis-1/4 lg:basis-1/3 md:basis-1/2 max-sm:justify-center ease-in-out duration-500",
              sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5"
            )}>
              <SongItem
                item={song}
                key={song.id}
                removeHandler={removeHadler}
                isUpdateLink={isUpdateLink} isOpen={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
        <CarouselNext className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
      </Carousel>
    </div>
  )
}

export default Catalog