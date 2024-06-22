import ArtistInfoShort from "@/components/ui/artist-info-small"
import SubscribeButton from "@/components/ui/subscribedButton"
import formatNumberToK from "@/lib/format-number-to-k"
import LikeSongButton from "@/components/ui/likeSongButton"
import dayjs from "dayjs"
import { FC } from "react"
import { ISong } from "@/interfaces/song.interface"
import { IUser } from "@/interfaces/user.interface"
import { Textarea } from "@/components/ui/textarea"

const SongDetail: FC<{ song: ISong, artist: IUser }> = ({
    song,
    artist
}) => { 
    return (
        <div className="rounded-lg border py-8 max-sm:relative max-md:relative" >
            <div className="px-8">
                <div className="flex flex-col gap-y-2 text-2xl">
                    <ArtistInfoShort artist={artist} />
                    <div className="py-2">
                        {song.user?.id && (
                            <SubscribeButton artistIdForSubscribe={song.user.id} />
                        )}
                    </div>
                </div>
                <div className="mt-4 inline-flex gap-x-4 text-xl max-sm:flex-col max-sm:text-xl max-sm:gap-y-2 md:text-xl max-md:gap-y-2 max-md:flex-col max-md:text-xl">
                    <div>
                        <span className="">{formatNumberToK(song.listens)} прослушиваний</span>
                    </div>
                    <div>
                        <span className="">{formatNumberToK(song.likes)} добавлений в избранное</span>
                    </div>
                    <div>
                        <span className="">{dayjs(new Date(song.createdAt)).fromNow()}</span>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-3xl mb-4 flex gap-x-4">
                        <div className="max-sm:text-2xl">
                            {song.name}
                        </div>
                        <div className="">
                            <LikeSongButton songIdForLike={song.id} />
                        </div>
                    </div>
                    <Textarea
                        defaultValue={song.lyrics}
                        disabled
                        className="h-[700px] max-sm:h-[300px] max-sm:text-xl px-6 pt-6 text-xl text-white disabled:opacity-100 disabled:cursor-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetail