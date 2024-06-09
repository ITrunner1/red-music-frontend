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
import CreatePlaylistInformation from "./createPlaylistInformation";
import UploadField from "@/components/ui/uploadField";

const PlaylistEditMain: FC = () => {
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
  } = useForm<IPlaylistDto>({
    mode: 'onChange'
  })

  useEffect(() => {
    if (!watch('name') && data) {
      setValue('name', data.name)
      setValue('description', data.description)
      setValue('picturePath', data.picturePath)
      setValue('isPublic', data.isPublic)
    }
  }, [data])

  const [updatePlaylist, { isLoading: isUpdateLoading }] = playlistApi.useUpdatePlaylistMutation()

  const { push } = useRouter()

  const onSubmit: SubmitHandler<IPlaylistDto> = data => {
    updatePlaylist({ ...data, id: playlistId })
      .unwrap()
      .then(() => {
        toastr.success('Статус', 'Песня обновлена!',

        )
      })
  }

  return (
    <div className="flex justify-center shadow-block">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-x-20">
          <div className="flex flex-col gap-y-4 w-1/2">
            <div className="">
              <Input
                {...register('name', {
                  required: 'Название обязательно!'
                })}
                placeholder="Название плейлиста"
              />
            </div>
            <div>
              <Textarea
                {...register('description', {
                  required: 'Описание плейлиста обязательно!'
                })}
                placeholder="Описание плейлиста"
              />
            </div>
            <div className="flex">
              <div className="">Плейлист публичный?</div>
              <Controller
                control={control}
                name='isPublic'
                render={({ field: { onChange, value } }) => (
                  <Switch
                    className="ml-6"
                    onClick={() => { onChange(!value) }}
                  />
                )}
              />
            </div>
            <div className="mt-2">
              <Button>
                {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
              </Button>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-y-4">
            <div className="">
              <CreatePlaylistInformation
                playlistId={playlistId}
                picturePath={watch('picturePath')}
              />
            </div>
            <Controller
              control={control}
              name='picturePath'
              render={({ field: { onChange } }) => (
                <UploadField
                  folder="pictures"
                  onChange={(value: IFileResponse) => {
                    onChange(value.url)
                  }}
                />
              )}
            />
            <span className="flex justify-center">Загрузите изображение для плейлиста</span>
          </div>
        </form>
      )}
    </div>
  )
}

export default PlaylistEditMain
