import { ISong } from "./song.interface";

export interface IHome {
    randomSong: ISong,
    topSong: ISong,
    newSongs: ISong[]
}