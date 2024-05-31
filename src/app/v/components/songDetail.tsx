import ArtistInfoShort from "@/components/ui/artist-info-small"
import { Button } from "@/components/ui/button"
import SubscribeButton from "@/components/ui/subscribedButton"
import { ISong } from "@/interfaces/song.interface"
import { IUser } from "@/interfaces/user.interface"
import formatNumberToK from "@/lib/format-number-to-k"
import { songApi } from "@/store/api/api.song"
import { FC } from "react"
import { BsCalendar2Check, BsChatRightHeartFill } from "react-icons/bs"
import { BiSolidLike } from "react-icons/bi";
import dayjs from "dayjs"

const SongDetail: FC<{ song: ISong, artist: IUser }> = ({
    song,
    artist
}) => {
    const [updateLike, { isLoading: isLikeLoading }] = songApi.useUpdateLikesMutation()

    return (
        <div className="flex space-x-6 items-center justify-center pb-10">
            <ArtistInfoShort artist={artist} />
            <h1>{song.name}</h1>
            <article>{song.lyrics}</article> 
            <div className="pt-2">
                {song.user?.id && (
                    <SubscribeButton artistIdForSubscribe={song.user.id} />
                )}
                <Button 
                    disabled={ isLikeLoading } 
                    onClick={() => updateLike(song.id)}>
                    <BsChatRightHeartFill />
                    Лайк
                </Button>                
            </div>
            <div>
                <div>
                    <BsChatRightHeartFill />
                    <span>{formatNumberToK(song.listens)} прослушиваний</span>
                </div>
                <div>
                    <BiSolidLike />
                    <span>{formatNumberToK(song.likes)} лайков</span>
                </div>
                <div>
                    <BsCalendar2Check />
                    <span>{dayjs(new Date(song.createdAt)).fromNow()}</span>
                </div>
            </div>
        </div>

    )
}

export default SongDetail