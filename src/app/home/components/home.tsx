'use client'

import { FC } from "react";
import { motion } from "framer-motion";
import { IHome } from "@/interfaces/home.interfaces";
import Discover from "@/components/discover";
import PlaylistsCatalog from "@/app/playlists/components/playlistsCatalog";
import CatalogPagination from "@/components/catalogPagination";

const Home: FC<IHome> = ({ randomSong, topSong, songs, newPlaylists, length }) => {

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-5xl">Главная</div>
      <Discover topSong={topSong || {}} randomSong={randomSong || {}}  />
      <CatalogPagination data = {{ length, songs }} />
      <PlaylistsCatalog newPlaylists={newPlaylists || {}} />
    </motion.div>
  )
}


export default Home