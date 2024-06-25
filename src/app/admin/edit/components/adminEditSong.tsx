'use client'

import UploadSongInformation from "@/components/header/uploadSong/uploadSongInformation";
import Loader from "@/components/ui/loader";;
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { songApi } from "@/store/api/api.song";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import { IAdminSongDto } from "@/interfaces/admin.interface";

const AdminSongEdit: FC = () => {
    const router = useRouter()
    const params = useParams()
    const songId = Number(params.id)

    const { data, isLoading } = songApi.useGetSongByIdQuery(Number(params.id), {
        skip: !params?.id
    })

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        watch,
        setValue,
    } = useForm<IAdminSongDto>({
        mode: 'onChange'
    })

    useEffect(() => {
        if (!watch('status') && data) {
            setValue('status', data.status)
            setValue('rejectionReason', data.genre)
            setValue('name', data.name)
            setValue('lyrics', data.lyrics)
            setValue('audioPath', data.audioPath)
            setValue('thumbnailPath', data.thumbnailPath)
            setValue('isPublic', data.isPublic)
            setValue('playlist', data.playlist)
            setValue('genre', data.genre)
        }
    }, [data])

    const [updateSong, { isLoading: isUpdateLoading }] = songApi.useUpdateSongMutation()

    const onSubmit: SubmitHandler<IAdminSongDto> = data => {
        updateSong({ ...data, id: songId })
            .unwrap()
            .then(() => {
                router.push('/admin')
            })
    }

    return (
        <div className="flex justify-center shadow-block w-full">
            {isLoading ? (
                <Loader />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-x-20 gap-y-4 max-sm:justify-start">
                    <div className="flex flex-col gap-y-4 w-1/2 max-sm:w-full">
                        <span>Название: {data?.name}</span>
                        <span>Путь до аудио файла</span>
                        {data?.audioPath}
                        <span>Жанр: {data?.genre} </span>                 
                        <span>Введите основание отказа</span>
                        <Textarea
                            {...register('rejectionReason', {})}
                            placeholder="Причина отказа"
                        />
                        <div className="mt-2">
                            <Controller
                                control={control}
                                name='status'
                                render={({ field: { onChange } }) => (
                                    <Select
                                        className="bg-background border rounded-md"
                                        onChange={onChange}
                                        placeholder="Выберите действие"
                                    >
                                        <SelectItem className="bg-background border rounded-md" textValue='Rejected' key="Rejected">
                                            <div className="flex gap-2 items-center">
                                                Отклонить
                                            </div>
                                        </SelectItem>
                                        <SelectItem className="bg-background border rounded-md" textValue='Checked' key="Checked">
                                            <div className="flex gap-2 items-center">
                                                Принять
                                            </div>
                                        </SelectItem>
                                    </Select>
                                )}
                            />
                        </div>
                        <Button>
                            {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
                        </Button>
                    </div>
                    <div className="w-1/3 max-sm:w-full flex flex-col gap-y-4">
                        <div className="">
                            <UploadSongInformation
                                thumbnailPath={watch('thumbnailPath')}
                                isUploaded
                            />
                        </div>
                        <span>Превью песни</span>
                    </div>
                </form>
            )}
        </div>
    )
}

export default AdminSongEdit;