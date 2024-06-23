import { IBase } from "./base.iterface"
import { IPlaylist } from "./playlist.interface"
import { ISong } from "./song.interface"
import { ISubscription } from "./subscription.interface"

export interface ILikePlaylist {
    likedPlaylist: IPlaylist
}

export interface ILikeSong {
    likedSong: ISong
}

export interface IUser extends IBase {
    email: string,
    password: string,
    name: string,
    description: string,
    avatarPath: string,
    subscribersCount: number,
    isVerified: boolean,
    isAdmin: boolean,
    songs: ISong[],
    subscriptions: ISubscription[],
    playlists: IPlaylist[],
    likedPlaylists: ILikePlaylist[],
    likedSongs: ILikeSong[],
}

export interface IUserDto
    extends Pick<
        IUser,
        'id' | 'avatarPath' | 'description' | 'name' | 'isVerified' | 'email' | 'password'
    > { }


