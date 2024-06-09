import { getContentType } from "@/store/api/api.helper"
import axios from "axios"
import Cookies from "js-cookie"
import { saveToStorage } from "./auth.helper"
import { instance } from "@/store/api/api.interceptor"
import { IAuthData, IAuthResponse, IRegisterData } from "@/interfaces/auth.interface"

export const AuthService = {

    async register(type: 'register', data: IRegisterData) {
        const response = await instance<IAuthResponse>({
            url: `/auth/${type}`,
            method: 'POST',
            data
        })

        if (response.data.accessToken) saveToStorage(response.data)
        
        return response.data
    },

    async login(type: 'login', data: IAuthData) {
        const response = await instance<IAuthResponse>({
            url: `/auth/${type}`,
            method: 'POST',
            data
        })

        if (response.data.accessToken) saveToStorage(response.data)
        
        return response.data
    },

    async getNewTokens() {
        const refreshToken = Cookies.get('refreshToken')

        const response = await axios.post<string, { data: IAuthResponse }>(
            "http://localhost:4200/api" + '/auth/login/access-token',
            { refreshToken },
            {
                headers: getContentType()
            }
        )
        
        if (response.data.accessToken) saveToStorage(response.data)

        return response
    }
}

