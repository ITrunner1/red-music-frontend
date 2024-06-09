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
    isPublic?: boolean,  
    user?: IUser     
    comments?: IComment[],     
    playlist: IPlaylist,
}

export interface ISongDto
 extends Pick<
    ISong,
    'id' | 'thumbnailPath' | 'lyrics' | 'name' | 'audioPath' | 'isPublic' | 'playlist'
> {}
