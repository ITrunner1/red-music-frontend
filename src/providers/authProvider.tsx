'use client';

import Cookies from "js-cookie";
import { getAccessToken } from "@/services/auth/auth.helper";
import { useAuth } from "@/store/hooks/UseAuth";
import { useActions } from "@/store/hooks/useActions";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { protectedRoutes } from "@/interfaces/protected-routes.data";

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({
    children
}) => {
    const { user } = useAuth()
    const { checkAuth, logout } = useActions()

    const pathname = usePathname()

    const router = useRouter()

    const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route))
    
    useEffect(() =>{
        const accessToken = getAccessToken()
        if(accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken && user) logout()
    }, [pathname])

    if (!isProtectedRoute) return <>{children}</> 

    if (user && isProtectedRoute) return <>{children}</>     

    if (!user && user) return <>{children}</>   

    pathname !== '/' && router.replace('/')

    return null
}

export default AuthProvider;