'use client'

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { playlistApi } from "@/store/api/api.playlist";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { IAdminPlaylistDto } from "@/interfaces/admin.interface";
import UploadPlaylistInformation from "@/app/playlists/edit/[id]/components/createPlaylistInformation";

const AdminPlaylistEdit: FC = () => {
    const router = useRouter()
    const params = useParams()
    const playlistId = Number(params.id)

    const { data, isLoading } = playlistApi.useGetPlaylistByIdQuery(Number(params.id), {
        skip: !params?.id
    })

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        watch,
        setValue,
    } = useForm<IAdminPlaylistDto>({
        mode: 'onChange'
    })

    useEffect(() => {
        if (!watch('name') && data) {
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('picturePath', data.picturePath)
            setValue('isPublic', data.isPublic)
            setValue('genre', data.genre)
            setValue('status', data.status)
        }
    }, [data])

    const [updatePlaylist, { isLoading: isUpdateLoading }] = playlistApi.useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<IAdminPlaylistDto> = data => {
        updatePlaylist({ ...data, id: playlistId })
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
                        <span>Статус: {data?.status}</span>
                        <span>Путь до превью</span>
                        {data?.picturePath}
                        <span>Жанр: {data?.genre}</span>
                        <span>Описание плейлиста:</span>
                        <Textarea
                            defaultValue={data?.description}
                            disabled
                            className="h-[300px] max-sm:h-[300px] max-sm:text-xl px-6 pt-6 text-xl text-white disabled:opacity-100 disabled:cursor-auto"
                        />
                        <div className="mt-2">
                            <span>Выберите статус:</span>
                            <Controller
                                control={control}
                                name='status'
                                render={({ field: { onChange } }) => (
                                    <Select
                                        className="bg-background border rounded-md mt-2"
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
                        <span>Введите основание отказа</span>
                        <Textarea
                            {...register('rejectionReason', {})}
                            placeholder="Причина отказа"
                        />
                        <Button>
                            {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
                        </Button>
                    </div>
                    <div className="w-1/3 max-sm:w-full flex flex-col gap-y-4">
                        <div className="">
                            <UploadPlaylistInformation
                                picturePath={watch('picturePath')}
                                playlistId={playlistId}
                            />
                        </div>
                        <span>Превью песни</span>
                    </div>
                </form>
            )}
        </div>
    )
}

export default AdminPlaylistEdit