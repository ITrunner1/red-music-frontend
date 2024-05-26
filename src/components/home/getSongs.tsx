'use server'

import { IHome } from "@/interfaces/home.interfaces"
import { ISong } from "@/interfaces/song.interface"
import { SongService } from "@/services/song.service"
import shuffle from "lodash/shuffle"

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


export default getSongs