'use client'

import ArtistInfoShort from "@/components/ui/artist-info-small"
import { IPlaylist } from "@/interfaces/playlist.interface"
import { IUser } from "@/interfaces/user.interface"
import { FC } from "react"
import { BsCalendar2Check } from "react-icons/bs"
import dayjs from "dayjs"

const playlistDetail: FC<{ playlist: IPlaylist, artist: IUser }> = ({
    playlist,
    artist
}) => {
    return (
        <div className="flex flex-col space-y-6 pb-10">
            <div className="text-4xl">{playlist?.name}</div>
            <article className="text-2xl">{playlist?.description}</article>
            <div className="inline-flex gap-4">
                <BsCalendar2Check size={36} />
                <div className="pt-1">
                    {dayjs(new Date(playlist?.createdAt)).fromNow()}
                </div>
            </div>
            <ArtistInfoShort artist={artist} />
        </div>

    )
}

export default playlistDetail