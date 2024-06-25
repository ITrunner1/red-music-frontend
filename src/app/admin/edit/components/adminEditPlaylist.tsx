'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { IPlaylistDto } from "@/interfaces/playlist.interface";
import { playlistApi } from "@/store/api/api.playlist";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
import UploadField from "@/components/ui/uploadField";
import { Select, SelectItem } from "@nextui-org/select";
import { IAdminPlaylistDto } from "@/interfaces/admin.interface";
import UploadPlaylistInformation from "@/app/playlists/edit/[id]/components/createPlaylistInformation";

const AdminPlaylistEdit: FC = () => {
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
                toastr.success('Статус', 'Песня обновлена!',)
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