import { Dispatch, SetStateAction } from "react"

export interface IUploadModal {   
    songId: number
}

export interface IUploadField {
    title?: string
    onChange: (...event: any) => void
    folder?: string
    setValue?: (val: number) => void
    setIsChosen?: Dispatch<SetStateAction<boolean>>
}