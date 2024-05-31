import { IFileResponse } from "@/interfaces/file.interface"
import instance from "@/store/api/api.interceptor"

export const FileService = {
    async upload(file:FormData, folder?:string, setValue?: (val:number) => void) {
        return instance.post<IFileResponse>('/file', file, {
            params: { folder },
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                if(setValue){
                    const progress = (progressEvent.loaded / progressEvent.total ) * 100
                    setValue(Math.ceil(progress))
                }
            }
        })
    }
}