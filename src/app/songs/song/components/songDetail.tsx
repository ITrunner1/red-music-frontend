import ArtistInfoShort from "@/components/ui/artist-info-small"
import SubscribeButton from "@/components/ui/subscribedButton"
import formatNumberToK from "@/lib/format-number-to-k"
import dayjs from "dayjs"
import { FC } from "react"
import { ISong } from "@/interfaces/song.interface"
import { IUser } from "@/interfaces/user.interface"
import { songApi } from "@/store/api/api.song"
import { BsCalendar2Check, BsChatRightHeartFill } from "react-icons/bs"
import { BiSolidLike } from "react-icons/bi";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const SongDetail: FC<{ song: ISong, artist: IUser }> = ({
    song,
    artist
}) => {
    const [updateLike, { isLoading: isLikeLoading }] = songApi.useUpdateLikesMutation()

    return (
        <div className="rounded-lg border py-8" >
            <div className="px-8">
                <div className="flex flex-col gap-y-2 text-2xl">
                    <ArtistInfoShort artist={artist} />
                    <div className="py-2">
                        {song.user?.id && (
                            <SubscribeButton artistIdForSubscribe={song.user.id} />
                        )}
                    </div>
                </div>
                <div className="mt-4 inline-flex gap-x-4 text-xl">
                    <div>                         
                        <span className="">{formatNumberToK(song.listens)} прослушиваний</span>
                    </div>
                    <div>                        
                        <span className="">{formatNumberToK(song.likes)} лайков</span>
                    </div>
                    <div>                        
                        <span className="">{dayjs(new Date(song.createdAt)).fromNow()}</span>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-3xl mb-4">{song.name}
                        <Button
                            className="align-middle ml-2 text-white hover:text-primary"
                            size='icon'
                            variant="link"
                            disabled={isLikeLoading}
                            onClick={() => updateLike(song.id)}>
                            <BiSolidLike size={36} />
                        </Button>
                    </div>
                    <Textarea                        
                        defaultValue={song.lyrics}
                        disabled
                        className="h-[700px] px-6 pt-6 text-xl text-white disabled:opacity-100 disabled:cursor-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default SongDetail