import { TypePaginationPlaylists, TypePaginationSongs } from "./pagination.type";
import { IPlaylist } from "./playlist.interface";
import { ISong } from "./song.interface";

export interface IHome {    
    initialSongs: TypePaginationSongs
    initialPlaylists: TypePaginationPlaylists
}
