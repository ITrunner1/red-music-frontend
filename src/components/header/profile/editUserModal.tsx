import UploadField from "@/components/ui/uploadField";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { IFileResponse } from "@/interfaces/file.interface";
import { Input } from "@/components/ui/input";
import { api } from "@/store/api/api";
import { useRouter } from "next/navigation";
import { IUserDto } from "@/interfaces/user.interface";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image"

const EditUserModal: FC = () => {
    const user = useAuth()
    const userId = Number(user.user?.id)

    const { data, isLoading } = api.useGetProfileQuery(Number(userId), {
        skip: !userId
    })

    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        watch,
        setValue,
    } = useForm<IUserDto>({
        mode: 'onChange'
    })

    useEffect(() => {
        if (!watch('name') && data) {
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('avatarPath', data.avatarPath)
            setValue('email', data.email)
            setValue('password', data.password)
            setValue('isVerified', data.isVerified)
        }
    }, [data])

    const [updateUser, { isLoading: isUpdateLoading }] = api.useUpdateProfileMutation()

    const { push } = useRouter()

    const onSubmit: SubmitHandler<IUserDto> = data => {
        updateUser({ ...data, id: userId })
            .unwrap()
            .then(() => {
                push(`/user/${userId}`)
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-sm pl-2" variant='ghost'>
                    Изменить данные о себе
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px] max-sm:w-[300px]">
                <DialogHeader>
                    Ввод данных
                </DialogHeader>
                <DialogDescription>
                    Введите информацию о песни и загрузите её превью
                </DialogDescription>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-wrap gap-x-20"
                >
                    <div className="flex flex-col gap-y-4 w-1/2 my-4 max-sm:w-full">
                        <Input
                            {...register('name', {
                                required: ''
                            })}
                            placeholder="Имя"
                        />
                        <Input
                            {...register('email', {
                                required: ''
                            })}
                            placeholder="Email"
                        />
                        <Input
                            {...register('password', {
                                required: ''
                            })}
                            placeholder="Password"
                        />
                        <Textarea
                            {...register('description', {
                                required: ''
                            })}
                            placeholder="Описание"
                        />
                    </div>
                    <div className="w-1/3 flex flex-col gap-y-4 max-sm:w-full">
                        <div>
                            <Image
                                src={watch('avatarPath')}
                                alt={''}
                                width={210}
                                height={210}
                                layout="responsive"
                            />
                        </div>
                        <div className="mt-8">
                            <Controller
                                control={control}
                                name='avatarPath'
                                render={({ field: { onChange } }) => (
                                    <UploadField
                                        folder="avatars"
                                        onChange={(value: IFileResponse) => {
                                            onChange(value.url)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Button className="mt-2">
                        {isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserModal;