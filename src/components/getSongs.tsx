import { SongService } from "@/services/song.service";
import { ISong } from "@/interfaces/song.interface";
import { PlaylistService } from "@/services/playlist.service";
import shuffle from "lodash/shuffle";

async function getSongs() {
    const { data: topSongs } = await SongService.getMostPopular()
    const { data: newSongs } = await SongService.getAll()
    const { data: newPlaylists } = await PlaylistService.getAll()

    return {
        newSongs,
        newPlaylists,
        topSong: topSongs[0],
        randomSong:
            shuffle(newSongs.filter(s => s.id !== topSongs[0].id))[0] || ({} as ISong)
    } || []
}

export default getSongs