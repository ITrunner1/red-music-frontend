'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FC } from "react"
import { IPlaylist } from "@/interfaces/playlist.interface"
import PlaylistItem from "./playlistItem"
import Heading from "@/components/heading"

const PlaylistsCatalog: FC<{
  newPlaylists: IPlaylist[]
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ newPlaylists, removeHadler, isUpdateLink }) => {
  return (
    <div className="">
      <div className="mb-4">
        <Heading title={removeHadler ? 'Мои плейлисты' : 'Плейлисты'} />
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {newPlaylists?.map(item => (
            <CarouselItem key={item.id} className="lg:basis-1/6 md:basis-1/2">
              <PlaylistItem
                item={item}
                key={item.id}
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

export default PlaylistsCatalog