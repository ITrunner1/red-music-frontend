import { IUploadField } from "@/interfaces/uploadSong"
import { FC } from "react"
import useUploadFile from "./useUploadFile"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const UploadField: FC<IUploadField> = ({
    title,
    onChange,
    folder,
    setValue,
    setIsChosen
}) => {
    const { uploadFile } = useUploadFile(onChange, folder, setValue, setIsChosen)
    
    return (
        <div>
            {title && <h1>{title}</h1>}
            <Label>
                <span className="sr-only">Выберите файл</span>
                <Input type='file' onChange={uploadFile} />
            </Label>
        </div>
    )
}

export default UploadField