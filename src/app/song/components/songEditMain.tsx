'use client'

import UploadField from "@/components/header/uploadSong/uploadField";
import UploadSongInformation from "@/components/header/uploadSong/uploadSongInformation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { ISongDto } from "@/interfaces/song.interface";
import { songApi } from "@/store/api/api.song";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";

const SongEditMain: FC = () => {
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
  } = useForm<ISongDto>({
    mode: 'onChange'
  })

  useEffect(() => {
    if (!watch('name') && data) {
      setValue('name', data.name)
      setValue('lyrics', data.lyrics)
      setValue('audioPath', data.audioPath)
      setValue('thumbnailPath', data.thumbnailPath)
      setValue('isPublic', data.isPublic)
    }
  }, [data])

  const [updateSong, { isLoading: isUpdateLoading }] = songApi.useUpdateSongMutation()

  const { push } = useRouter()

  const onSubmit: SubmitHandler<ISongDto> = data => {
    updateSong({ ...data, id: songId })
      .unwrap()
      .then(() => {
        toastr.success('Статус', 'Песня обновлена!',
        
        )
      })
  }

  return (
    <div className="mt-10">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
          <div>
            <Input
              {...register('name', {
                required: 'Название обязательно!'
              })}
              placeholder="Имя"
            />
            <Textarea
              {...register('lyrics', {
                required: 'Текст песни обязателен!'
              })}
              placeholder="Слова песни"
            />
          </div>
          <div className="mt-8">
            <Controller
              control={control}
              name='thumbnailPath'
              render={({ field: { onChange } }) => (
                <UploadField
                  folder="thumbnails"
                  onChange={(value: IFileResponse) => {
                    onChange(value.url)
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name='isPublic'
              render={({ field: { onChange, value } }) => (
                <Switch
                  onClick={() => { onChange(!value) }}
                />
              )}
            />
          </div>
          <div className="w-[200px]">
            <UploadSongInformation
              songId={songId}
              thumbnailPath={watch('thumbnailPath')}
              fileName={''}
              isUploaded
            />
          </div>
          <div className="mt-10">
              <Button>
                {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
              </Button>
          </div>
        </form>
      )}
    </div>
 )
}

export default SongEditMain
