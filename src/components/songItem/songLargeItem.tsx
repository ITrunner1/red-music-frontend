'use client'

import Link from "next/link"
import SongStatistics from "./songStatistics"
import Image from "next/image"
import SongDuration from "./songDuration"
import { FC } from "react"
import { ISong } from "@/interfaces/song.interface"
import { motion } from "framer-motion"
import { MdOpenInFull } from "react-icons/md"
import { Avatar } from "@nextui-org/react"
import useStore from "@/hooks/use-store"
import { usePlayerToggle } from "@/hooks/usePlayer"

const LargeSongItem: FC<{ song: ISong }> = ({ song }) => {
    const player = useStore(usePlayerToggle, (state) => state);

    return (
        <div className="flex pt-4 pl-4">
            <div className="flex justify-between gap-x-6">
                <div className="h-[230px]">
                    {song?.thumbnailPath && (
                        <Image
                            className="rounded-xl object-cover cursor-pointer"
                            onClick={() => player?.setIsOpen()}
                            src={song.thumbnailPath}
                            alt={song.name}
                            height={230}
                            width={230}
                            priority
                        />
                    )}
                </div>
                <div className="w-1/2">
                    <div className="flex justify-between">
                        <span className="text-3xl">{song?.name}</span>


                    </div>
                    <Link className="flex mt-4" href={`/user/${song.user?.id}`}>
                        {song.user?.avatarPath && (
                            <>
                                <Avatar
                                    src={song.user.avatarPath}
                                    alt={song.user.avatarPath}
                                    size="md"
                                    className=""
                                />
                                <span className="text-2xl ml-4 mt-1">
                                    {song?.user?.name}
                                </span>
                            </>
                        )}
                    </Link>
                    <div className="mt-6 text-2xl">
                        {/* <SongDuration isBottom duration={song?.duration} /> */}
                        <SongStatistics
                            listens={song?.listens}
                            createdAt={song?.createdAt}
                        />

                    </div>
                    <motion.div
                        className=""
                    >
                        <Link className="flex justify-end" href={`/songs/song/${song.id}`}>
                            <MdOpenInFull className="" size={36} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div >
    )
}

export default LargeSongItem