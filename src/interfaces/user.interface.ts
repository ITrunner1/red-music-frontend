import { IBase } from "./base.iterface"
import { IPlaylist } from "./playlist.interface"
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
    subscriptions: ISubscription[],
    playlists: IPlaylist[]
}

export interface IUserDto
 extends Pick<
    IUser,
    'id' | 'avatarPath' | 'description' | 'name' |'isVerified' | 'email' | 'password'
> {}


