'use client'

import PlaylistDetail from "./playlistDetail";
import NextImage from "next/image";
import { FC, useEffect } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { playlistApi } from "@/store/api/api.playlist";
import { useParams } from "next/navigation";
import { IUser } from "@/interfaces/user.interface";
import { Image } from "@nextui-org/image";
import Catalog from "@/components/catalog";


const PlaylistMain: FC = () => {
  const params = useParams()

  const { data: playlist = {} as IPlaylist } = playlistApi.useGetPlaylistByIdQuery(Number(params.id), {
    skip: !params?.id
  })

  const [updateListens] = playlistApi.useUpdateListensMutation()

  useEffect(() => {
    if (params.id) updateListens(Number(params.id))
  }, [params.id])

  return (
    <div className="">
      <div className="flex justify-center max-md:flex max-md:flex-wrap max-md:justify-start">
        <div className="w-1/2 max-md:w-full max-md:flex max-md:justify-center">        
          <Image
            as={NextImage}
            className="pb-10"
            src={playlist.picturePath}
            alt={playlist.name}
            width={300}
            height={300}
            priority
          />
        </div>
        <div className="w-1/2 max-md:w-full">
          <PlaylistDetail playlist={playlist} artist={playlist.user || ({} as IUser)} />
        </div>
      </div>
      <Catalog songs={playlist.songs} />
    </div>
  )
}

export default PlaylistMain