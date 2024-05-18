import { IAuthResponse, ITokens } from "@/interfaces/auth.interface"
import { cookies } from "next/headers"

export const saveTokensStorage = (data: ITokens) => {
    cookies().set('accessToken', data.accessToken)
    cookies().set('refreshToken', data.accessToken)
}

export const getAccessToken = async () => {
    const accessToken = cookies().get('accessToken')
    return accessToken || null
}

export const getUserFromStorage= async () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}

export const removeFromStorage = () => {
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokensStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}

