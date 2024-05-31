'use client'


import { FC } from "react";
import { IHome } from "@/interfaces/home.interfaces";
import Discover from "@/components/discover";
import Catalog from "@/components/catalog";

const Home: FC<IHome> = ({ randomSong, topSong, newSongs }) => {
  return (
    <div>
      <Discover topSong={topSong} randomSong={randomSong} />        
      <Catalog newSongs={newSongs} />    
    </div>
  )    
}


export default Home