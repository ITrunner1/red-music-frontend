import { IPlaylist } from "./playlist.interface";
import { ISong } from "./song.interface";

export interface IHome {
    randomSong: ISong,
    topSong: ISong,
    songs: ISong[]
    playlists: IPlaylist[]
    length: number
}
