import { ISong } from "./song.interface"

export interface ISongItem {
    item: ISong,
    removeHandler?: (songId: number) => void
    isUpdateLink?: boolean
    isSmall?: boolean
}