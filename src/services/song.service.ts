import { instance } from "@/store/api/api.interceptor"
import { ISong } from "@/interfaces/song.interface"

export const SONGS = 'songs'

export const SongService = {
    async getAll(){
        return instance<ISong[]>({
            url: `${SONGS}`,
            method: 'GET',
        }) 
    },

    async getMostPopular(){
        return instance<ISong[]>({
            url: `${SONGS}/most-popular`,
            method: 'GET',
        }) 
    },
  
}

