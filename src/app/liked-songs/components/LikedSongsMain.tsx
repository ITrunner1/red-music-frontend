'use client'

import LikedSongsItem from "./LikedSongsItem";

import { motion } from "framer-motion";
import { api } from "@/store/api/api";
import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";

const LikedSongsMain: FC = () => {
    const user = useAuth()

    const { data } = api.useGetProfileQuery(null, {
        skip: !user
    })

    return (
        <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="text-3xl mb-4">
                Избранная музыка
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-hidden ">
                {data?.likedSongs?.map((song) => (
                    <div className="flex items-center" key={song.likedSong?.id}>
                        <LikedSongsItem
                            key={song.likedSong?.id}
                            likedSong={song.likedSong}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default LikedSongsMain;