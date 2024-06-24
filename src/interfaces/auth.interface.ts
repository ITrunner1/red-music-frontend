import { IUser } from "@/interfaces/user.interface"

export type IUserState = {
    id: number
    email: string
    isAdmin: boolean
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IInitialState {  
    user: IUserState | null
    isLoading: boolean
}

export interface IRegisterData { 
    email: string
    password: string
    name: string  
}

export interface IAuthData { 
    email: string
    password: string   
}

export interface IAuthResponse extends ITokens {
    user: IUser   
}
