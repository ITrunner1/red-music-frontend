import { FC } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { BsPersonPlusFill } from "react-icons/bs"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/store/api/api"
import { songApi } from "@/store/api/api.song"
import { IoMdHeart, IoIosHeartDislike, IoIosHeart } from "react-icons/io";

const LikeSongButton: FC<{
    songIdForLike: number
}> = ({ songIdForLike }) => {

    const { user } = useAuth()

    const { data: profile } = api.useGetProfileQuery(null, {
        skip: !user
    })

    const [updateLikes, { isLoading, data }] = songApi.useUpdateLikesMutation()

    if (user?.id === songIdForLike) return null

    const isLiked = profile?.likedSongs?.some(
        like => like.likedSong?.id === songIdForLike
    ) || !!data

    return (
        <Button
            variant='link'
            size='icon'
            className={cn('text-white', { 'text-primary': isLiked })}
            onClick={() => updateLikes(songIdForLike).unwrap()}
            disabled={isLoading}
        >
            <div className="flex gap-x-2 justify-between">
                <div className="">
                    {isLiked ? <IoIosHeart size={36} /> : <IoIosHeartDislike size={36} />}                    
                </div>               
            </div>
        </Button>
    )
}

export default LikeSongButton