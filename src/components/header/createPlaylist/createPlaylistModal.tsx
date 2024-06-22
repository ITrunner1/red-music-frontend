import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { playlistApi } from "@/store/api/api.playlist";
import { FC, useState } from "react";
import useUploadPlaylistForm from "./useCreatePlaylistForm";
import { Controller } from "react-hook-form";
import UploadField from "../../ui/uploadField";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import { AddPlaylistIcon } from "@vidstack/react/icons";

const CreatePlaylistModal: FC = () => {
    const [playlistId, setPlaylistId] = useState<number>(0)
    const [createPlaylist, { isLoading }] = playlistApi.useCreatePlaylistMutation()
    const { form, status, file } = useUploadPlaylistForm({ playlistId })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size='sm'
                    variant="ghost"
                    className="max-sm:p-0"
                    disabled={isLoading}
                    onClick={() => {
                        !createPlaylist().unwrap().then(id => {
                            setPlaylistId(+id)
                        })
                    }}
                >
                    <AddPlaylistIcon size={28} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px] max-sm:w-[300px]">
                <DialogHeader>
                    Ввод данных
                </DialogHeader>
                <DialogDescription>
                    Введите информацию о плейлисте и загрузите его превью
                </DialogDescription>
                <form
                    onSubmit={form.handleSubmit(form.onSubmit)}
                    className="flex flex-wrap gap-x-20 max-sm:justify-start"
                >
                    <div className="flex flex-col gap-y-4 w-1/2  max-sm:w-full">
                        <Input
                            {...form.register('name', {
                                required: 'Название обязательно!'
                            })}
                            placeholder="Имя"
                        />
                        <Textarea
                            {...form.register('description', {
                                required: 'Описание плейлиста обязательно!'
                            })}
                            placeholder="Слова"
                        />
                        <div className="flex my-4">
                            <div className="">Плейлист публичный?</div>
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
                        <div className="">
                            <Image
                                src={file.picturePath}
                                alt={''}
                                width={210}
                                height={210}
                                layout="responsive"
                            />
                        </div>
                        <div className="mt-8 max-sm:w-full">
                            <Controller
                                control={form.control}
                                name='picturePath'
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
                        <Button>
                            {isLoading ? 'Ожидайте...' : 'Создать'}
                        </Button>
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
        </Dialog>
    )
}

export default CreatePlaylistModal;