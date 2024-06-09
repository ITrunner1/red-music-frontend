'use client'

import Catalog from "@/components/catalog";
import { ISong } from "@/interfaces/song.interface";
import { motion } from "framer-motion";
import { FC } from "react";

const TrandsMain: FC<{ topSongs: ISong[] }> = ({ topSongs }) => {
  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Catalog newSongs={topSongs} />
    </motion.div>
  )
}

export default TrandsMain
