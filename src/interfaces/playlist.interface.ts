import { IBase } from "./base.iterface";
import { ISong } from "./song.interface";
import { IUser } from "./user.interface";

export interface IPlaylist extends IBase {    
    name: string,
    picturePath: string,
    description: string, 
    likes: number,
    listens: number,
    isPublic: boolean,  
    user: IUser,     
    songs: ISong[],
}

export interface IPlaylistDto
 extends Pick<
    IPlaylist,
    'id' | 'picturePath' | 'description' | 'name' | 'isPublic'
> {}
