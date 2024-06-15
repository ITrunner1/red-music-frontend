'use client'

import { FC } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import CatalogPlaylistsPagination from "../../../components/catalogPlaylistPagination";

interface IPlaylists {
  length: number
  playlists: IPlaylist[]
}

const PlaylistsMain: FC<IPlaylists> = ({ playlists }) => {
  return (
    <CatalogPlaylistsPagination data={{ length, playlists }} />
  )
}


export default PlaylistsMain