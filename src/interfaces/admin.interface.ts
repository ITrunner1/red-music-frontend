import { IPlaylist } from "./playlist.interface"
import { ISong } from "./song.interface"

export interface IListItem {
    id: number,
    editUrl?: string,
    viewUrl?: string,
    items: string[]
}

export interface IAdminListItem {
    listItem: IListItem,
    removeHandler?: () => void
}

export interface IAdminSongDto
    extends Pick<
        ISong,
        'id' | 'thumbnailPath' | 'lyrics' | 'name' | 'audioPath' | 'isPublic' | 'playlist' | 'genre' | 'status' | 'rejectionReason' 
> { }

export interface IAdminPlaylistDto
    extends Pick<
        IPlaylist,
        'id' | 'description' | 'picturePath' | 'name' | 'isPublic' | 'genre' | 'status' | 'rejectionReason' 
> { }