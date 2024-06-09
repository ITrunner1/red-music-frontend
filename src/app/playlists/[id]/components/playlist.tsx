'use client'

import PlaylistDetail from "./playlistDetail";
import Catalog from "@/components/catalog";
import NextImage from "next/image";
import { FC } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { playlistApi } from "@/store/api/api.playlist";
import { useParams } from "next/navigation";
import { IUser } from "@/interfaces/user.interface";
import { Image } from "@nextui-org/image";

const PlaylistMain: FC = () => {
  const params = useParams()

  const { data: playlist = {} as IPlaylist } = playlistApi.useGetPlaylistByIdQuery(Number(params.id), {
    skip: !params?.id
  })

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-1/2 f;e">
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
        <div className="w-1/2">
          <PlaylistDetail playlist={playlist} artist={playlist.user || ({} as IUser)} />
        </div>
      </div>
      <Catalog newSongs={playlist.songs} />
    </div>
  )
}

export default PlaylistMain