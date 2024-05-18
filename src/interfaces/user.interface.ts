import { IBase } from "./base.iterface"
import { ISong } from "./song.interface"
import { ISubscription } from "./subscription.interface"

export interface IUser extends IBase {
    email: string,
    password: string,
    name: string,
    description: string,
    avatarPath: string,
    subscribersCount: number,        
    isVerified: boolean,
    songs: ISong[],
    subscriptions: ISubscription[]
}


