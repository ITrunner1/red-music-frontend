'use client'

import Catalog from "@/components/catalog";
import PlaylistsCatalog from "@/components/playlistsCatalog";
import Loader from "@/components/ui/loader";
import { api } from "@/store/api/api";
import { playlistApi } from "@/store/api/api.playlist";
import { songApi } from "@/store/api/api.song";
import { motion } from "framer-motion";
import { FC } from "react";

const StudioMain: FC = () => {
  const { data, isLoading } = api.useGetProfileQuery(null)
  const [removeSong] = songApi.useDeleteSongMutation()
  const [removePlaylist] = playlistApi.useDeletePlaylistMutation()

  const songs = data?.songs
  const playlists = data?.playlists

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {isLoading ? (
        <Loader />
      ) : songs?.length ? (
        <>
          <Catalog newSongs={songs}
            removeHadler={removeSong}
            isUpdateLink
          />
          <PlaylistsCatalog newPlaylists={playlists}
            removeHadler={removePlaylist}
            isUpdateLink
          />
        </>
      ) : (
        <p>Музыка не найдена!</p>
      )}
    </motion.div>
  )
}

export default StudioMain
