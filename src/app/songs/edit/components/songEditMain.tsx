'use client'
import Image from "next/image";
import UploadField from "@/components/ui/uploadField";
import UploadSongInformation from "@/components/header/uploadSong/uploadSongInformation";
import Loader from "@/components/ui/loader";;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { ISongDto } from "@/interfaces/song.interface";;
import { songApi } from "@/store/api/api.song";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import { api } from "@/store/api/api";
import { useAuth } from "@/hooks/useAuth";

const SongEditMain: FC = () => {
  const auth = useAuth()
  const router = useRouter()
  const params = useParams()
  const songId = Number(params.id)

  const { data, isLoading } = songApi.useGetSongByIdQuery(Number(params.id), {
    skip: !params?.id
  })

  const { data: curUser } = api.useGetProfileQuery(auth.user?.id)

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
      setValue('playlist', data.playlist)
    }
  }, [data])

  const [updateSong, { isLoading: isUpdateLoading }] = songApi.useUpdateSongMutation()

  const onSubmit: SubmitHandler<ISongDto> = data => {
    updateSong({ ...data, id: songId })
      .unwrap()
      .then(() => {
        router.push('/home')
      })
  }

  return (
    <div className="flex justify-center shadow-block">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-x-20">
          <div className="flex flex-col gap-y-4 w-1/2">
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
            <span>Аудио файл</span>
            <Controller
              control={control}
              name='audioPath'
              render={({ field: { onChange } }) => (
                <UploadField
                  folder="songs"
                  onChange={(value: IFileResponse) => {
                    onChange(value.url)
                  }}
                />
              )}
            />
            <span>Плейлист</span>
            <Controller
              control={control}
              name='playlist'
              render={({ field: { onChange } }) => (
                <Select
                  className="bg-bbackground border rounded-md"
                  onChange={onChange}
                  items={curUser?.playlists}
                  placeholder="Выберите плейлист"
                >
                  {(playlist) => (
                    <SelectItem className="bg-background border rounded-md" key={playlist.id} textValue={playlist.name}>
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col justify-center">
                          <Image priority className="rounded-sm" src={playlist.picturePath} alt={playlist.name} width={40} height={40} />
                        </div>
                        <div className="flex flex-col">
                          <span className="">{playlist.name}</span>
                          <span className="text-sm text-gray-500">{playlist.description}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
            <div className="flex mt-4">
              <div className="">Видео публичное?</div>
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
              <UploadSongInformation
                thumbnailPath={watch('thumbnailPath')}
                isUploaded
              />
            </div>
            <span>Превью песни</span>
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
          </div>
        </form>
      )}
    </div>
  )
}

export default SongEditMain
