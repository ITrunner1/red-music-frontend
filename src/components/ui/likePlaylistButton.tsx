import { FC } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { BsPersonPlusFill } from "react-icons/bs"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/store/api/api"
import { playlistApi } from "@/store/api/api.playlist"
import { IoMdHeart, IoIosHeartDislike, IoIosHeart } from "react-icons/io";

const LikePlaylistButton: FC<{
    playlistIdForLike: number
}> = ({ playlistIdForLike }) => {

    const { user } = useAuth()

    const { data: profile } = api.useGetProfileQuery(null, {
        skip: !user
    })

    const [updateLikes, { isLoading, data }] = playlistApi.useUpdateLikesMutation()

    if (user?.id === playlistIdForLike) return null

    const isLiked = profile?.likedPlaylists?.some(
        like => like.likedPlaylist?.id === playlistIdForLike
    ) || !!data

    return (
        <Button
            variant='link'
            size='icon'
            className={cn('text-white', { 'text-primary': isLiked })}
            onClick={() => updateLikes(playlistIdForLike).unwrap()}
            disabled={isLoading}
        >
            <div className="flex gap-x-2 justify-between">
                <div className="pt-[2px]">
                    {isLiked ? <IoIosHeart size={36} /> : <IoIosHeartDislike size={36} />}                    
                </div>               
            </div>
        </Button>
    )
}

export default LikePlaylistButton