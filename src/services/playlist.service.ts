import instance from "@/store/api/api.interceptor"
import { IPlaylist } from "@/interfaces/playlist.interface"

export const PLAYLISTS = 'playlists'

export const PlaylistService = {
    async getAll(){
        return instance<IPlaylist[]>({
            url: `/${PLAYLISTS}`,
            method: 'GET',
        }) 
    },  
}

