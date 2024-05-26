'use client'

import Discover from "@/components/home/discover";
import Catalog from "@/components/home/catalog";
import { FC } from "react";
import { IHome } from "@/interfaces/home.interfaces";

const Home: FC<IHome> = ({ randomSong, topSong, newSongs }) => {
  return (
    <div>
      <Discover topSong={topSong} randomSong={randomSong} />
      <Catalog newSongs={newSongs} />
    </div>  )    
}


export default Home