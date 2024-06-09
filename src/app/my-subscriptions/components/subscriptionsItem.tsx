'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FC } from "react";
import { IUser } from "@/interfaces/user.interface";
import { Avatar, Link } from "@nextui-org/react";
import { IArtist } from "@/interfaces/artist.interface";

const SubscriptionsItem: FC<IArtist> = ({ artist }) => {

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ originX: 0 }}
            whileTap={{ scale: 1 }}
            className="flex gap-x-3 cursor-pointer p-2 outline-none">
            <Link className="text-white" href={`/user/${artist?.id}`}>
                <div className="relative min-h-[48px] min-w-[48px]">
                    {artist?.avatarPath &&
                        <Avatar
                            src={artist?.avatarPath}
                            alt={artist?.avatarPath}
                            size="lg"
                        >
                        </Avatar>
                    }
                </div>
                <div className="flex flex-col pl-4 gap-y-1 text-xl">
                    <p className="text-mattewhite truncate">
                        {artist?.name}
                    </p>
                    <p className="text-gray truncate">
                        {artist?.subscribersCount} слушателей
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default SubscriptionsItem;