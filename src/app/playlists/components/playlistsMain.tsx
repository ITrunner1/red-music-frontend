'use client'

import { FC } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import PlaylistsCatalog from "../../../components/playlistsCatalog";
import CatalogPlaylistsPagination from "../../../components/catalogPlaylistPagination";

interface IPlaylists {
  length: number
  playlists: IPlaylist[]
}

const PlaylistsMain: FC<IPlaylists> = ({ playlists }) => {
  return (
    <div className="">
      <CatalogPlaylistsPagination data={{
        length,
        playlists
      }}  />
    </div>
  )
}


export default PlaylistsMain