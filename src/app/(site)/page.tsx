import { SongService } from "@/services/song.service";
import { ISong } from "@/interfaces/song.interface";

import shuffle from "lodash/shuffle";
import Home from "./components/home";

async function getSongs() {

  const { data: topSongs } = await SongService.getMostPopular()      
  const { data: newSongs } = await SongService.getAll()

  return {
      newSongs,   
      topSong: topSongs[0],        
      randomSong: 
        shuffle(newSongs.filter(v => v.id !== topSongs[0].id))[0] || ({} as ISong)
    }      
}   

async function MainPage() {  
  const data = await getSongs()

  return (
    <Home newSongs={data.newSongs} randomSong={data.randomSong} topSong={data.topSong} />
  )    
}

export default MainPage
