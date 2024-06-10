'use client';

import { motion } from "framer-motion";
import { FC } from "react";
import { Avatar, Link } from "@nextui-org/react";
import { ILikePlaylist } from "@/interfaces/user.interface";
import { usePlayerToggle } from "@/hooks/usePlayer";
import useStore from "@/hooks/use-store";

const LikedPlaylistsItem: FC<ILikePlaylist> = ({ likedPlaylist }) => {

    const player = useStore(usePlayerToggle, (state) => state);

    if (!player) return null;

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ originX: 0 }}
            whileTap={{ scale: 1 }}
            className="flex gap-x-3 cursor-pointer p-2 outline-none">
            <Link className="text-white" href={`/playlists/${likedPlaylist?.id}`}>
                <div className="relative min-h-[48px] min-w-[48px]">
                    {likedPlaylist &&
                        <Avatar
                            src={likedPlaylist?.picturePath}
                            alt={likedPlaylist?.picturePath}
                            size="lg"
                        >
                        </Avatar>
                    }
                </div>
                <div className="flex flex-col pl-4 gap-y-1 text-xl">
                    {likedPlaylist?.name}
                </div>
            </Link>
        </motion.div >
    );
};

export default LikedPlaylistsItem;