import { IPlaylist } from "./playlist.interface"
import { ISong } from "./song.interface"

export type TypePaginationSongs = {
    length: number
    songs: ISong[]    
}

export type TypePaginationPlaylists = {
    length: number
    playlists: IPlaylist[]    
}

export type TypeDataFilters = {
    searchTerm?: string
    page?: string | number
    perPage?: string | number
}

export type TypePagination = {
    page?: string | number
    perPage?: string | number
}
