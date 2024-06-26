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
import { Select, SelectItem } from "@nextui-org/select";
import { useQuery } from "react-query";
import { GenreService } from "@/services/genre.service.";

const PlaylistEditMain: FC = () => {
  const router = useRouter()
  const params = useParams()
  const playlistId = Number(params.id)

  const { data, isLoading } = playlistApi.useGetPlaylistByIdQuery(Number(params.id), {
    skip: !params?.id
  })

  const { data: genres } = useQuery(
    ['get genres'],
    () => GenreService.getAll(),
    { select: ({ data }) => data }
  )

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
      setValue('genre', data.genre)
      setValue('status', data.status)
    }
  }, [data])

  const [updatePlaylist, { isLoading: isUpdateLoading }] = playlistApi.useUpdatePlaylistMutation()

  const onSubmit: SubmitHandler<IPlaylistDto> = data => {
    updatePlaylist({ ...data, id: playlistId })
      .unwrap()
      .then(() => {
        router.push('/admin')
      })
  }

  return (
    <div className="flex justify-center shadow-block">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-x-20 max-sm:justify-start">
          <div className="flex flex-col gap-y-4 w-1/2 max-sm:w-full">
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
            <span>Жанр</span>
            <Controller
              control={control}
              name='genre'
              render={({ field: { onChange } }) => (
                <Select
                  className="bg-background border rounded-md"
                  items={genres}
                  onChange={onChange}
                  placeholder="Выберите жанр"
                >
                  {genre => (
                    <SelectItem className="bg-background border rounded-md" key={genre.slug} textValue={genre.slug} itemProp={genre.slug} itemType={genre.slug}>
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="">{genre.slug}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
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
              <Input
                {...register('status', { required: 'Статус обязателен!' })}
                readOnly
                defaultValue='New'
                value='New'
                placeholder="New"
              />
            </div>
            <Button>
              {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
            </Button>
          </div>
          <div className="max-sm:w-full max-sm:py-4 w-1/3 flex flex-col gap-y-4">
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
