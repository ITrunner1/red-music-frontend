import { instance } from "@/store/api/api.interceptor"
import { IUser } from "@/interfaces/user.interface"

export const USERS = 'users'

export const UserService = {
    async getAll(){
        return instance<IUser[]>({
            url: `${USERS}`,
            method: 'GET',
        }) 
    },

    async getUser(id:number){
        return instance<IUser>({
            url: `${USERS}/by-id/${id}`,
            method: 'GET',
        }) 
    },
    
    async getProfile() {
        return instance<IUser[]>({
            url: `${USERS}/profile`,
            method: 'GET',
        })       
    },   
}

