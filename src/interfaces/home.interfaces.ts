import { IPlaylist } from "./playlist.interface";
import { ISong } from "./song.interface";

export interface IHome {
    randomSong: ISong,
    topSong: ISong,
    songs: ISong[]
    newPlaylists: IPlaylist[]
    length: number
}
