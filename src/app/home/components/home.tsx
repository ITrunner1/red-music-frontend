'use client'

import { FC } from "react";
import { motion } from "framer-motion";
import { IHome } from "@/interfaces/home.interfaces";
import Discover from "@/components/discover";
import Catalog from "@/components/catalog";
import PlaylistsCatalog from "@/app/playlists/components/playlistsCatalog";

const Home: FC<IHome> = ({ randomSong, topSong, newSongs, newPlaylists }) => {

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-5xl">Главная</div>
      <Discover topSong={topSong} randomSong={randomSong} />
      <Catalog newSongs={newSongs} />
      <PlaylistsCatalog newPlaylists={newPlaylists} />
    </motion.div>
  )
}


export default Home