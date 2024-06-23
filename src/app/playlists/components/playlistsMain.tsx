'use client'

import { FC } from "react";
import { IPlaylist } from "@/interfaces/playlist.interface";
import CatalogPlaylistsPagination from "../../../components/catalogPlaylists";

interface IPlaylists {
  length: number
  playlists: IPlaylist[]
}

const PlaylistsMain: FC<IPlaylists> = ({ playlists }) => {
  return (
    <CatalogPlaylistsPagination playlists={playlists || {}} />
  )
}


export default PlaylistsMain