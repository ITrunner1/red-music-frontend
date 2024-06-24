'use client'

import NextImage from "next/image"
import Link from "next/link"
import { Avatar, Card, Image } from "@nextui-org/react";
import { FC } from "react"
import { MdDelete, MdEditNote, MdOpenInFull } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import Statistics from "@/components/statistics";

export interface IPlaylistItem {
    item: IPlaylist,
    removeHandler?: (playlistId: number) => void
    isUpdateLink?: boolean
    isSmall?: boolean
}

const PlaylistItem: FC<IPlaylistItem> = ({ isSmall, isUpdateLink, removeHandler, item }) => {
    const { push } = useRouter()

    return (
        <motion.div className="" whileHover={{ scale: 1.1 }}>
            <Card className="flex">
                <Link href={`/playlists/${item.id}`}>
                    <div className="max-sm:w-[210px] max-sm:h-[210px] w-[230px] h-[240px]">
                        <Image
                            as={NextImage}
                            className="rounded-xl object-cover cursor-pointer"
                            src={item.picturePath}
                            alt={item.name}
                            fallbackSrc="https://via.placeholder.com/200x200"
                            width={240}
                            height={240}
                            priority
                            isBlurred
                        />
                    </div>
                    {item?.user?.avatarPath && (
                        <motion.div className="mt-4 w-[200px]" whileTap={{ scale: 0.9 }}>
                            <Link href={`/user/${item.user.id}`}>
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src={item.user.avatarPath}
                                        alt={item.user.avatarPath}>
                                    </Avatar>
                                    <span>{item.user.name}</span>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </Link>
                <div className="my-4">
                    <div className="">
                        {isSmall && <div>{item.user?.name}</div>}
                        <div>{item.name}</div>
                        <div>Жанр: {item.genre}</div>
                        <Statistics
                            listens={item.listens}
                            createdAt={isSmall ? item.createdAt : ''}
                        />
                    </div>
                    {isUpdateLink && (
                        <div className="mt-6 text-red-600">
                            <div className="text-red-600">
                                <span className="text-white mr-2">Статус:</span>
                                {item.status}
                            </div>
                            <span className="text-white mr-2">Ответ:</span>
                            {item.rejectionReason}
                        </div>
                    )}
                    <div className="mt-2 flex justify-between">
                        {isUpdateLink && (
                            <Button
                                variant='link'
                                className='bg-background z-10'
                                onClick={() => push(`playlists/edit/${item.id}`)}
                            >
                                <MdEditNote className='text-white hover:text-green-500 z-10' size={36} />
                            </Button>
                        )}
                        {!!removeHandler && (
                            <AlertDialog>
                                <Button
                                    variant='link'
                                    className='bg-background z-10'
                                >
                                    <AlertDialogTrigger>
                                        <MdDelete className='text-white hover:text-primary z-10' size={36} />
                                    </AlertDialogTrigger>
                                </Button>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Это действие не может быть возвращено. Подумайте хорошо перед тем как нажимать кнопку!
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => removeHandler(item.id)}>Удалить
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export default PlaylistItem