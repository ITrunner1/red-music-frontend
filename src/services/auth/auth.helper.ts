import { IAuthResponse, ITokens } from "@/interfaces/auth.interface"
import Cookies from "js-cookie"

export const saveTokensStorage = (data: ITokens) => {
    Cookies.set('accessToken', data.accessToken)
    Cookies.set('refreshToken', data.refreshToken)
}

export const getAccessToken = () => {
    const accessToken = Cookies.get('accessToken')
    return accessToken || null
}

export const getRefreshToken = () => {
    const refreshToken = Cookies.get('refreshToken')
    return refreshToken || null
}

export const getUserFromStorage= () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}

export const removeFromStorage = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokensStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}

export default getAccessToken