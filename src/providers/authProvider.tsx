'use client';

import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { protectedRoutes } from "@/interfaces/protected-routes.data";
import { getAccessToken } from "@/services/auth/auth.helper";
import { useActions } from "@/hooks/useActions";
import NotFound from "@/app/not-found/page";

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({
    children
}) => {
    const { user } = useAuth()
    const { checkAuth, logout } = useActions()

    const pathname = usePathname()

    const router = useRouter()

    const isProtectedRoute = protectedRoutes.some(route => pathname?.startsWith(route))

    useEffect(() => {
        const accessToken = getAccessToken()
        if (accessToken) checkAuth()
    }, [])

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken && user) logout()
    }, [pathname])

    const isAdminRoute = pathname?.startsWith('/admin')

    if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

    if (user?.isAdmin) return <>{children}</>    

    if (user && isProtectedRoute) return <>{children}</>

    if (!user && user) return <>{children}</>

    if (user && isAdminRoute) return <NotFound />

    pathname !== '/home' && router.replace('/home')

    return null
}

export default AuthProvider;