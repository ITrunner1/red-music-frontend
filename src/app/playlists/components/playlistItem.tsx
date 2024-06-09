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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../components/ui/alert-dialog";

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
            <Card className="p-6 flex">
                <Link href={`/playlists/${item.id}`}>
                    <div>
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
                    <motion.div
                        className="absolute ml-[200px] mt-[235px]"
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                        {item?.user?.avatarPath && (
                            <Avatar src={item.user.avatarPath} alt={item.user.avatarPath}>
                                <Link href={`/user/${item.user.id}`}>
                                </Link>
                            </Avatar>
                        )}
                    </motion.div>
                </Link>
                <div className="my-4">
                    <div className="">
                        {isSmall && <div>{item.user?.name}</div>}
                        <div>{item.name}</div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        {isUpdateLink && (
                            <Button
                                variant='link'
                                className='bg-background z-10'
                                onClick={() => push(`playlists/edit/${item.id}`)}
                            >
                                <MdEditNote className='text-white hover:text-primary z-10' size={36} />
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