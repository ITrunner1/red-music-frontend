'use client'

import Link from "next/link"
import Statistics from "../statistics"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const SongItem: FC<ISongItem> = ({ isSmall, isUpdateLink, removeHandler, item }) => {
    const { push } = useRouter()

    const player = useStore(usePlayerToggle, (state) => state);

    if (!player) return null;

    return (
        <motion.div className="z-5" whileHover={{ scale: 1.1 }}>
            <Card className="flex max-sm:text-sm max-sm:w-[170px]">
                <div className="max-sm:w-[160px] max-sm:h-[160px] w-[240px] h-[240px]">
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
                    className="mt-4 w-[200px]"
                    whileTap={{ scale: 0.9 }}>
                    {item?.user?.avatarPath && (
                        <Link href={`/user/${item.user.id}`}>
                            <div className="flex items-center gap-2">
                                <Avatar className=""
                                    src={item.user.avatarPath}
                                    alt={item.user.avatarPath}>
                                </Avatar>
                                <span>{item.user.name}</span>
                            </div>
                        </Link>
                    )}
                </motion.div>
                <div className="my-4">
                    <div className="">
                        {isSmall && <div>{item.user?.name}</div>}
                        <div>{item.name}</div>
                        <Statistics
                            listens={item.listens}
                            createdAt={isSmall ? item.createdAt : ''}
                        />
                    </div>
                    <div className="flex justify-end pr-4">
                        <Link className="flex items-center" href={`/songs/song/${item.id}`}>
                            <MdOpenInFull className="inline" size={26} />
                        </Link>
                    </div>
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