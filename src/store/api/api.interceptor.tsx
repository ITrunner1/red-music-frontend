import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { getAccessToken } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { removeFromStorage } from "@/services/auth/auth.helper";

export const instance = axios.create({
    baseURL: "http://localhost:4200/api",
    headers: getContentType()
})

instance.interceptors.request.use(async config => {
    const accessToken = getAccessToken()

    if(config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

instance.interceptors.request.use(config =>  config, async error => {
    const originalRequest = error.config

    if (
        (error.response.status == 401 || 
            errorCatch(error) == 'jwt expired' ||
            errorCatch(error) == 'jwt must be provided' && 
        error.config &&
        !error.config._isRetry
        )
    ) {
        originalRequest._isRetry = true
        try {            
            // get new tokens
            await AuthService.getNewTokens()
            return instance.request(originalRequest)
        } catch (error) {
            if (errorCatch(error) == 'jwt expired')
                // delete tokens
            removeFromStorage()
        }
    }

    throw error
})
