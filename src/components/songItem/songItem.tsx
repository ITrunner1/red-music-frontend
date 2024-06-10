'use client'

import SongDuration from "./songDuration"
import Link from "next/link"
import SongStatistics from "./songStatistics"
import useStore from "@/hooks/use-store";
import NextImage from "next/image";
import { MdOpenInFull } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { ISongItem } from "@/interfaces/songItem.interface"
import { Avatar, Card, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation"
import { FC } from "react"
import { motion } from "framer-motion";
import { usePlayerToggle } from "@/hooks/usePlayer";
import { MdDelete } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { FaEdit } from "react-icons/fa";

const SongItem: FC<ISongItem> = ({ isSmall, isUpdateLink, removeHandler, item }) => {
    const { push } = useRouter()

    const player = useStore(usePlayerToggle, (state) => state);

    if (!player) return null;

    return (
        <motion.div className="" whileHover={{ scale: 1.1 }}>
            <Card className="p-6 flex">
                <div className="w-[230px] h-[240px]">
                    <Image
                        onClick={() => player.setIsOpen()}
                        as={NextImage}
                        removeWrapper
                        className="rounded-xl object-cover cursor-pointer"
                        src={item.thumbnailPath}
                        alt={item.name}
                        fallbackSrc="https://via.placeholder.com/200x200"
                        width={240}
                        height={240}
                        priority
                        isBlurred
                    />
                </div>
                <motion.div
                    className="absolute ml-[195px] mt-[250px]"
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    {item?.user?.avatarPath && (
                        <Link href={`/user/${item.user.id}`}>
                            <Avatar
                                src={item.user.avatarPath}
                                alt={item.user.avatarPath}>
                            </Avatar>
                        </Link>
                    )}
                </motion.div>
                <motion.div
                    className="absolute ml-[200px] mt-[310px]"
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                >
                    <Link href={`/songs/song/${item.id}`}>
                        <MdOpenInFull className="" size={26} />
                    </Link>
                </motion.div>
                <div className="my-4">
                    <div className="">
                        {isSmall && <div>{item.user?.name}</div>}
                        <div>{item.name}</div>
                        <SongStatistics
                            listens={item.listens}
                            createdAt={isSmall ? item.createdAt : ''}
                        />
                    </div>
                    {/* <SongDuration duration={item.duration} /> */}
                    <div className="mt-6 flex justify-between">
                        {isUpdateLink && (
                            <Button
                                variant='link'
                                className='bg-background z-10'
                                onClick={() => push(`songs/edit/${item.id}`)}
                            >
                                <FaEdit className='text-white hover:text-green-500 z-10' size={36} />
                            </Button>
                        )}
                        {!!removeHandler && (
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button
                                        variant='link'
                                        className='bg-background z-10'
                                    >
                                        <MdDelete className='text-white hover:text-primary z-10' size={36} />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Вы абсолютно уверены?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Это действие не может быть возвращено. Подумайте хорошо перед тем как нажимать кнопку!
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => removeHandler(item.id)}>                                      Удалить
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

export default SongItem