'use client'

import { FC } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import PlaylistsCatalog from "./playlistsCatalog";

interface IPlaylists {
  newPlaylists: IPlaylist[]
}

const PlaylistsMain: FC<IPlaylists> = ({ newPlaylists }) => {
  return (
    <div className="">
      <PlaylistsCatalog newPlaylists={newPlaylists} />
    </div>
  )
}


export default PlaylistsMain