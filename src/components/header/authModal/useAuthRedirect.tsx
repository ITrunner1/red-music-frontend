import { useAuth } from "@/hooks/UseAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useAuthRedirect = () => {
    const { user } = useAuth()

    const router = useRouter()

    useEffect(() => {
        if(user)
            router.refresh()
    }, [user])
}