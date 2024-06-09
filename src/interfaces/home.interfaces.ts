import { IPlaylist } from "./playlist.interface";
import { ISong } from "./song.interface";

export interface IHome {
    randomSong: ISong,
    topSong: ISong,
    newSongs: ISong[]
    newPlaylists: IPlaylist[]
}
