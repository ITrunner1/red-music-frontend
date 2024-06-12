import { SongService } from "@/services/song.service";
import { ISong } from "@/interfaces/song.interface";
import { PlaylistService } from "@/services/playlist.service";
import shuffle from "lodash/shuffle";
import { IHome } from "@/interfaces/home.interfaces";

const getSongs = async() => {   
    const { songs: songs } = await SongService.getAll({
        page: 1,
        perPage: 6,   
    })
    const { playlists: playlists } = await PlaylistService.getAll({
        page: 1,
        perPage: 6, 
    })

    return {
        songs,
        playlists, 
    } as IHome|| []
}

export default getSongs