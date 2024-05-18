import { IBase } from "./base.iterface";
import { ISong } from "./song.interface";
import { IUser } from "./user.interface";

export interface IComment extends IBase {
    user: IUser,    
    song: ISong,
    text: true,    
}

export interface ICommentDto extends Pick<IComment, 'text'> {
    songId: number
}