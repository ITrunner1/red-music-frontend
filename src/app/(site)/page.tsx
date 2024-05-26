import { FC } from "react";
import { IHome } from "@/interfaces/home.interfaces";

import Home from "@/components/home/home"
import { SongService } from "@/services/song.service";
import shuffle from "lodash/shuffle";
import { ISong } from "@/interfaces/song.interface";
import getStaticProps from "@/components/home/getSongs";
import getSongs from "@/components/home/getSongs";

async function MainPage() {
  const data = await getSongs()

  return (
    <Home newSongs={data.newSongs} randomSong={data.randomSong} topSong={data.topSong} />
  )    
}

export default MainPage
