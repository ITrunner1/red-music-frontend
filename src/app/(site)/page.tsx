import { FC } from "react";
import Catalog from "./components/catalog";
import { ISong } from "@/interfaces/song.interface";

export interface IHome {
  randomSong: ISong
  topsong: ISong
  newSongs: ISong[]
}

const Home: FC = () => {
  return (
    <div>
      <Catalog />
    </div>
  )    
}

export default Home
