'use client'

import ArtistInfoShort from "@/components/ui/artist-info-small"
import dayjs from "dayjs"
import formatNumberToK from "@/lib/format-number-to-k"
import { IPlaylist } from "@/interfaces/playlist.interface"
import { IUser } from "@/interfaces/user.interface"
import { FC } from "react"
import LikePlaylistButton from "@/components/ui/likePlaylistButton"

const playlistDetail: FC<{ playlist: IPlaylist, artist: IUser }> = ({
    playlist,
    artist
}) => {

    return (
        <div className="flex flex-col space-y-6 pb-10 mt-2">
            <div className="text-4xl flex gap-x-4 max-md:flex max-md:justify-center">
                <div>{playlist?.name}</div>
                <div>
                    <LikePlaylistButton playlistIdForLike={playlist.id} />
                </div>
            </div>
            <article className="text-3xl">{playlist?.description}</article>
            <div className="text-2xl">
                <ArtistInfoShort artist={artist} />
            </div>
            <div className="inline-flex gap-x-10 text-xl max-md:flex max-md:flex-col max-md:gap-2">
                <div>
                    <span className="">{formatNumberToK(playlist.listens)} прослушиваний</span>
                </div>
                <div>
                    <span className="">{formatNumberToK(playlist.likes)} добавлений в избранное</span>
                </div>
                <div>
                    <span className="">{dayjs(new Date(playlist.createdAt)).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default playlistDetail