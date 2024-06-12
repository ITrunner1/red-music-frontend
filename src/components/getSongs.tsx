import { SongService } from "@/services/song.service";
import { ISong } from "@/interfaces/song.interface";
import { PlaylistService } from "@/services/playlist.service";
import shuffle from "lodash/shuffle";
import { IHome } from "@/interfaces/home.interfaces";

const getSongs = async() => {
    const { data: topSongs } = await SongService.getMostPopular()
    const { songs: songs } = await SongService.getAll({
        page: 1,
        perPage: 6,   
    })
    const { data: newPlaylists } = await PlaylistService.getAll()

    return {
        songs,
        newPlaylists,
        topSong: topSongs[0],
        randomSong:
            shuffle(songs.filter(s => s.id !== topSongs[0].id))[0] || ({} as ISong),        
    } as IHome|| []
}

export default getSongs