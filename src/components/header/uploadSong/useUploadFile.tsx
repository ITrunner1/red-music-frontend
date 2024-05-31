import { FileService } from "@/services/file.service";
import { useMutation } from "react-query";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { errorCatch } from "@/lib/api.utils";

const useUploadFile = (
    onChange: (...event: any) => void,
    folder?: string,
    setValue?: (val: number) => void,
    setIsChosen?: Dispatch<SetStateAction<boolean>>
) => {
    const { mutateAsync } = useMutation(
        'upload file',
        (data: FormData) => FileService.upload(data, folder, setValue),
        {
            onSuccess: ({ data }) => {
                onChange(data)
            },
            onError: (error: any) => {
                alert(
                    errorCatch(error)
                )
            }
        },       
    )

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files?.length) return

        setIsChosen && setIsChosen(true)

        const formData = new FormData()
        formData.append('file', files[0])

        await mutateAsync(formData)
    }

    return {
        uploadFile
    }
}

export default useUploadFile