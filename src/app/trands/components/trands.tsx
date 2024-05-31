'use client'

import Catalog from "@/components/catalog";
import { ISong } from "@/interfaces/song.interface";
import { FC } from "react";

const TrandsMain: FC<{ topSongs: ISong[] }> = ({ topSongs }) => {
  return (
    <div className="mt-10">
      <Catalog newSongs={topSongs} />
    </div>
  )    
}

export default TrandsMain
