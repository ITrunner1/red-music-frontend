'use client'

import { FC } from "react";
import { motion } from "framer-motion";
import { IHome } from "@/interfaces/home.interfaces";
import PlaylistsCatalog from "@/app/playlists/components/playlistsCatalog";
import CatalogPagination from "@/components/catalogPagination";
import CatalogPlaylistsPagination from "@/app/playlists/components/catalogPlaylistPagination";

const Home: FC<IHome> = ({ songs, playlists, length }) => {

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="text-5xl">Главная</div>     
      <CatalogPagination data={{ length, songs } || {}} />
      <CatalogPlaylistsPagination data={{ length, playlists } || {}} />
    </motion.div>
  )
}


export default Home