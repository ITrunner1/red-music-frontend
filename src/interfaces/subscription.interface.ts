import { IBase } from "./base.iterface";
import { IUser } from "./user.interface";

export interface ISubscription extends IBase {
    toArtist: IUser
}