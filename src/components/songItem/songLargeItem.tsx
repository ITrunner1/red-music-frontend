'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { FC } from "react"
import SongDuration from "./songDuration"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import SongStatistics from "./songStatistics"
import { ISong } from "@/interfaces/song.interface"
import { motion } from "framer-motion"
import { MdOpenInFull } from "react-icons/md"

const LargeSongItem: FC<{ song: ISong }> = ({ song }) => {
    const { push } = useRouter()

    return (
        <div className="flex border-white border-2 pt-4 pl-4 rounded-2xl align-baseline">
            <div className="w-[320px] h-[320px]">
                {song?.thumbnailPath && (
                    <Image
                        src={song.thumbnailPath}
                        alt={song.name}
                        height={300}
                        width={300}
                        priority
                    />
                )}
            </div>
            <div className="my-4 mx-4">
                <div className="flex justify-between">
                    <span className="text-5xl">{song?.name}</span>
                    <motion.div
                        className="pt-[14px]"
                        whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                    >
                        <Link href={`/v/${song.id}`}>
                            <MdOpenInFull size={36} />
                        </Link>
                    </motion.div>
                </div>
                <div className="flex mt-6">
                    <Link href={`/c/${song.user?.id}`}>
                        <motion.div
                            className="flex align-middle"
                            whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                            {song.user?.avatarPath && (
                                <Avatar className="w-[60px] h-[60px] ">

                                    <AvatarImage src={song.user.avatarPath} />

                                    <AvatarFallback>{song.user.name}</AvatarFallback>
                                </Avatar>
                            )}
                            <span className="text-4xl ml-4">

                                {song?.user?.name}

                            </span>

                        </motion.div>
                    </Link>

                </div>
                <div className="mt-6 text-2xl">
                    <SongDuration isBottom duration={song?.duration} />
                    <SongStatistics
                        listens={song?.listens}
                        createdAt={song?.createdAt}
                    />
                </div>
            </div>
        </div>
    )
}

export default LargeSongItem