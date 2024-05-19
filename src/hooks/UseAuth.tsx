import { IAthData } from "@/interfaces/auth.interface";

export const useAuth = ():IAthData => ({
    user: null,
    accesToken: ''
})