import { IBase } from "./base.iterface";
import { IPlaylist } from "./playlist.interface";
import { ISong } from "./song.interface";
import { IUser } from "./user.interface";

export interface ISubscription extends IBase {
    toArtist: IUser
}