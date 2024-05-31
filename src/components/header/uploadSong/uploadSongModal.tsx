import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { songApi } from "@/store/api/api.song";
import { FC, useState } from "react";
import { HiUpload } from 'react-icons/hi'
import useUploadSongForm from "./useUploadSongForm";
import FooterUploadSong from "./footerUploadSong";
import { Controller } from "react-hook-form";
import UploadField from "./uploadField";
import UploadSongInformation from "./uploadSongInformation";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { Input } from "@/components/ui/input";

const uploadSongModal: FC = () => {
    const [songId, setSongId] = useState<number>(0)
    const [createSong, { isLoading }] = songApi.useCreateSongMutation()
    const { form, status, file } = useUploadSongForm({ songId })


    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    className=''
                    disabled={isLoading}
                    onClick={() => {
                        !createSong().unwrap().then(id => {
                            setSongId(+id)
                        })
                    }}
                >
                    <HiUpload />
                </Button>
            </DialogTrigger>
            {status.isSuccess && "Успешно!"}
            {status.isChosen ? (
                <DialogContent>
                    <form
                        onSubmit={form.handleSubmit(form.onSubmit)}
                        className="flex flex-wrap"
                    >
                        <div className="m-7/12 pr-6 pt-3">
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
                            <Controller
                                control={form.control}
                                name='isPublic'
                                render={({ field: { onChange, value } }) => (
                                    <Switch
                                        onClick={() => { onChange(!value) }}
                                    />
                                )}
                            />
                        </div>
                        <div className="">
                            <UploadSongInformation
                                songId={songId}
                                thumbnailPath={file.thumbnailPath}
                                fileName={file.songFileName}
                                isUploaded={status.isUploaded}
                            />
                        </div>
                        <DialogFooter>
                            <FooterUploadSong percent={status.percent} isUploaded={status.isUploaded} />
                        </DialogFooter>
                    </form>

                </DialogContent>
            )
                : (
                    <DialogContent>
                        <Controller
                            control={form.control}
                            name='audioPath'
                            render={() => (
                                <UploadField
                                    title='Сначала, загрузи песню'
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

export default uploadSongModal;