import { ISong } from "./song.interface"

export interface ISongItem {
    item: ISong,
    removeHandler?: (songId: number) => void 
    isOpen: boolean | undefined;
    isUpdateLink?: boolean
    isSmall?: boolean
}