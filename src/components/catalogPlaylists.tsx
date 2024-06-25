'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FC, useState } from "react"
import PlaylistItem from "./playlistItem/playlistItem"
import { cn } from "@/lib/utils"
import useStore from "@/hooks/use-store"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { IPlaylist } from "@/interfaces/playlist.interface"

const CatalogPlaylists: FC<{
  playlists: IPlaylist[]
  removeHadler?: (playlistId: number) => void
  isUpdateLink?: boolean
}> = ({ playlists, removeHadler, isUpdateLink }) => {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <div className="max-sm:w-[250px]">
      <div className="mt-8 text-2xl max-sm:text-xl">
        {removeHadler ? 'Мои плейлисты' : 'Новые плейлисты'}
      </div>
      {playlists?.length ? (
        <>
          <Carousel>
            <CarouselContent className="p-2 md:p-4 max-sm:pl-6 max-sm:pt-6 ease-in-out">
              {playlists?.map(playlist => (
                <CarouselItem key={playlist.id}
                  className={cn("sm:p-5 max-sm:basis-full xl:basis-1/3 lg:basis-1/2 md:basis-1/2 ease-in-out duration-500",
                    sidebar?.isOpen === false ? "2xl:basis-1/6" : "2xl:basis-1/5 xl:basis-1/3 lg:basis-1/2"
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
            <CarouselPrevious className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
            <CarouselNext className={cn("max-sm:hidden ease-in-out", sidebar?.isOpen === false ? "2xl:hidden" : "")} />
          </Carousel>        
        </>
      ) : (
        <div className="mb-6">
          <div className="my-4">Плейлисты не загружены!</div>
        </div>
      )
      }
    </div>
  )
}

export default CatalogPlaylists