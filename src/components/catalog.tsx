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
import Heading from "./heading"
import SongItem from "@/components/songItem/songItem"

const Catalog: FC<{
  newSongs: ISong[]
  removeHadler?: (songId: number) => void
  isUpdateLink?: boolean
}> = ({ newSongs, removeHadler, isUpdateLink }) => {
  return (
    <div>
      <div>
        <Heading title={removeHadler ? 'Моя музыка' : 'Рекомендации' }/>
      </div>
      <Carousel 
        opts={{
              align: "start",
            }}
        className="w-full"
      >
        <CarouselContent> 
          {newSongs.map(song => (          
            <CarouselItem key={song.id} className="lg:basis-1/6 md:basis-1/2">
              <SongItem 
                item={song}
                key={song.id}
                removeHandler={removeHadler}
                isUpdateLink={isUpdateLink}
              />
            </CarouselItem>
          ))}      
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )    
}

export default Catalog