import Catalog from "@/components/home/catalog";
import TrandsMain from "./components/trands";
import { FC } from "react";
import { IHome } from "@/interfaces/home.interfaces"
import { ISong } from "@/interfaces/song.interface"
import { SongService } from "@/services/song.service"

import shuffle from "lodash/shuffle"

async function getTopSongs() {

    const { data: topSongs } = await SongService.getMostPopular() 
  
    return { topSongs, revalidate: 60}      
}

async function Trands() {
  const data = await getTopSongs()

  return (
      <TrandsMain topSongs={data.topSongs} />
  )    
}

export default Trands
