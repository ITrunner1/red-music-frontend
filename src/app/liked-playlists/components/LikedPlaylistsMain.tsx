'use client'

import { motion } from "framer-motion";
import { api } from "@/store/api/api";
import { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import LikedPlaylistsItem from "./LikedPlaylitsItem";

const LikedPlaylistsMain: FC = () => {
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
                Избранные плейлисты
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-hidden ">
                {data?.likedPlaylists?.map((playlist) => (
                    <div className="flex items-center" key={playlist.likedPlaylist?.id}>
                        <LikedPlaylistsItem
                            key={playlist.likedPlaylist?.id}
                            likedPlaylist={playlist.likedPlaylist}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default LikedPlaylistsMain;