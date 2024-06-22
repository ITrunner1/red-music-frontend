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
import { cn } from "@/lib/utils"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import useStore from "@/hooks/use-store"

const PlaylistsCatalog: FC<{
  newPlaylists?: IPlaylist[]
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ newPlaylists, removeHadler, isUpdateLink }) => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <div className="">
      <div className="mb-4 text-2xl max-sm:text-xl">
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
            <CarouselItem key={playlist.id}
              className={cn("pt-6 pl-12 max-sm:pl-24  xl:basis-1/4 lg:basis-1/3 md:basis-1/2 max-sm:justify-center ease-in-out duration-500",
                sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5"
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
        <CarouselPrevious className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
        <CarouselNext className={cn("max-sm:ml-12", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
      </Carousel>
    </div>
  )
}

export default PlaylistsCatalog