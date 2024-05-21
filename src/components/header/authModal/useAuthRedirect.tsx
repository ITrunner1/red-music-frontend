import { useAuth } from "@/store/hooks/UseAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useAuthRedirect = () => {
    const { user } = useAuth()

    const { replace } = useRouter() 

    useEffect(() => {
        if(user)
            replace('/music')
    }, [user])
}