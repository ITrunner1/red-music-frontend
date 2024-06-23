import { IBase } from "./base.iterface";
import { IComment } from "./comment.interface";
import { IPlaylist } from "./playlist.interface";
import { IUser } from "./user.interface";

export interface ISong extends IBase {
    name: string,
    thumbnailPath: string,
    audioPath: string,
    lyrics: string,
    likes: number,
    listens: number,
    duration: number,
    genre: string,
    status: string,
    isPublic?: boolean,
    user?: IUser
    comments?: IComment[],
    playlist: IPlaylist,
}

export interface ISongItem {
    item: ISong,
    removeHandler?: (songId: number) => void 
    isOpen: boolean | undefined;
    isUpdateLink?: boolean
    isSmall?: boolean
}

export type TypeSongDataFilters = {
    page: string | number
    perPage: string | number
    genreId?: string
}

export interface ISongDto
    extends Pick<
        ISong,
        'id' | 'thumbnailPath' | 'lyrics' | 'name' | 'audioPath' | 'isPublic' | 'playlist' | 'genre'
    > { }

