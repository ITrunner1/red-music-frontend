import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { songApi } from "@/store/api/api.song";
import { FC, useState } from "react";
import { HiUpload } from 'react-icons/hi'
import useUploadSongForm from "./useUploadSongForm";
import FooterUploadSong from "./footerUploadSong";
import { Controller } from "react-hook-form";
import UploadField from "../../ui/uploadField";
import UploadSongInformation from "./uploadSongInformation";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { Input } from "@/components/ui/input";
import { useQuery } from "react-query";
import { GenreService } from "@/services/genre.service.";
import { Select, SelectItem } from "@nextui-org/select";

const UploadSongModal: FC = () => {
    const [songId, setSongId] = useState<number>(0)
    const [createSong, { isLoading }] = songApi.useCreateSongMutation()
    const { form, status, file } = useUploadSongForm({ songId })
    const { data: genres } = useQuery(
        ['get genres'],
        () => GenreService.getAll(),
        { select: ({ data }) => data }
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='sm'
                    variant="ghost"
                    disabled={isLoading}
                    className="max-sm:p-0"
                    onClick={() => {
                        !createSong().unwrap().then(id => {
                            setSongId(+id)
                        })
                    }}
                >
                    <HiUpload size={28} />
                </Button>
            </DialogTrigger>
            {status.isChosen ? (
                <DialogContent className="max-w-[700px] max-sm:w-[300px]">
                    <DialogHeader>
                        Ввод данных
                    </DialogHeader>
                    <DialogDescription>
                        Введите информацию о песни и загрузите её превью
                    </DialogDescription>
                    <form
                        onSubmit={form.handleSubmit(form.onSubmit)}
                        className="flex flex-wrap gap-x-20"
                    >
                        <div className="flex flex-col gap-y-4 w-1/2  max-sm:w-full">
                            <Input
                                {...form.register('name', {
                                    required: 'Название обязательно!'
                                })}
                                placeholder="Имя"
                            />
                            <Textarea
                                {...form.register('lyrics', {
                                    required: 'Текст песни обязателен!'
                                })}
                                placeholder="Слова"
                            />
                            <div className="flex my-4">
                                <div className="">Видео публичное?</div>
                                <Controller
                                    control={form.control}
                                    name='isPublic'
                                    render={({ field: { onChange, value } }) => (
                                        <Switch
                                            className="ml-6"
                                            onClick={() => { onChange(!value) }}
                                        />
                                    )}
                                />
                            </div>

                        </div>


                        <div className="w-1/3 flex flex-col gap-y-4 max-sm:w-full">
                            <div>
                                <UploadSongInformation
                                    thumbnailPath={file.thumbnailPath}
                                    isUploaded={status.isUploaded}
                                />
                            </div>
                            <div className="mt-8">
                                <Controller
                                    control={form.control}
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
                        </div>
                        <DialogFooter className="w-full mt-8">
                            <FooterUploadSong percent={status.percent} isUploaded={status.isUploaded} />
                            {status.isSuccess &&
                                <DialogClose>
                                    <div className="pl-2 pt-2">
                                        Успешно!
                                    </div>
                                </DialogClose>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            ) : (
                <DialogContent className="w-[350px]">
                    <DialogHeader>
                        Загрузка аудио файла
                    </DialogHeader>
                    <DialogDescription>
                        Добавьте аудио файл
                    </DialogDescription>
                    <Controller
                        control={form.control}
                        name='audioPath'
                        render={() => (
                            <UploadField
                                folder="songs"
                                onChange={file.handleUploadSong}
                                setValue={status.setProgressPercentage}
                                setIsChosen={status.setIsChosen}
                            />
                        )}
                    />
                </DialogContent>
            )
            }
        </Dialog>
    )
}

export default UploadSongModal;