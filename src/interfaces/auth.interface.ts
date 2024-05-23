import { IUser } from "@/interfaces/user.interface"

export interface IAthData {
    user: {
        id: number
        email: string
    } | null
    accesToken: string
}

export interface IUserState {
    id: number
    email: string
    // isAdmin: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IInitialState {    
    user: IUserState | null
    isLoading: boolean
}

export interface IEmailPassword { 
    email: string
    password: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}