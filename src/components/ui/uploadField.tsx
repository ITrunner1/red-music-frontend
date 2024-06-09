import { IUploadField } from "@/interfaces/uploadSong"
import { FC } from "react"
import useUploadFile from "../../hooks/useUploadFile"
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
        <div className="">
            {title && <h1>{title}</h1>}
            <Input id="file-ipload" className="file:text-white cursor-pointer" type='file' onChange={uploadFile} />
        </div>
    )
}

export default UploadField