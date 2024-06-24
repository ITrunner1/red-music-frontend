'use client'

import { FC } from "react";
import { motion } from "framer-motion";
import useAdminSongs from "./useAdminSongs";
import AdminList from "./adminList";
import useAdminPlaylists from "./useAdminPlaylists";

const Home: FC = () => {
  const { data: songs, isFetching, removeSong } = useAdminSongs()
  const { data: playlists, isFetching: playistFetching, removePlaylist } = useAdminPlaylists()

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-5xl max-sm:text-3xl">Админ Панель</div>
      <div className="text-2xl mt-4">Новая музыка</div>
      <AdminList
        removeHandler={removeSong}
        listItems={songs}
        isLoading={isFetching} />
      <div className="text-2xl mt-4">Новые плейлисты</div>
      <AdminList
        removeHandler={removePlaylist}
        listItems={playlists}
        isLoading={playistFetching} />
    </motion.div>
  )
}

export default Home