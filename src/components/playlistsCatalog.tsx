'use client'

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel"
import { FC } from "react"
import { IPlaylist } from "@/interfaces/playlist.interface"
import PlaylistItem from "./playlistItem/playlistItem"

const PlaylistsCatalog: FC<{
  newPlaylists?: IPlaylist[]
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ newPlaylists, removeHadler, isUpdateLink }) => {
  return (
    <div className="">
      <div className="mb-4 text-2xl">
        {removeHadler ? 'Мои плейлисты' : 'Плейлисты'}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {newPlaylists?.map(playlist => (
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
    </div>
  )
}

export default PlaylistsCatalog