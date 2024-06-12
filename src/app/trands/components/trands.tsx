'use client'

import { ISong } from "@/interfaces/song.interface";
import { motion } from "framer-motion";
import { FC } from "react";
import CatalogPaginationTrands from "./catalogPaginationTrands";
import CatalogPlaylistsPaginationTrands from "./catalogPlaylistsPaginationTrands";
import { IPlaylist } from "@/interfaces/playlist.interface";

const TrandsMain: FC<{ length: number, songs: ISong[], playlists: IPlaylist[] }> = ({ length, songs, playlists }) => {
  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <CatalogPaginationTrands data={{ length, songs }} />
      <CatalogPlaylistsPaginationTrands data={{ length, playlists }} />
    </motion.div>
  )
}

export default TrandsMain
