import { FC } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { BsPersonPlusFill } from "react-icons/bs"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/store/api/api"


const SubscribeButton: FC<{
    artistIdForSubscribe: number
}> = ({ artistIdForSubscribe }) => {

    const { user } = useAuth()

    const { data: profile } = api.useGetProfileQuery(null, {
        skip: !user
    }) 

    const [subscribe, { isLoading, data }] = api.useSubscribeToArtistMutation()

    if ( user?.id === artistIdForSubscribe) return null

    const isSubscribed = profile?.subscriptions?.some(
        sub => sub.toArtist.id === artistIdForSubscribe        
    ) || !!data

    return (
        <Button
            className={cn('bg-white text-black', {'text-white bg-primary': isSubscribed})}
            onClick={() => subscribe(artistIdForSubscribe).unwrap()}
            disabled={ isLoading }
        >
            <BsPersonPlusFill />
                {isSubscribed ? 'Уже подписан' : 'Подписаться'}
        </Button>
    )
}

export default SubscribeButton