'use client'

import SubscriptionsItem from "./subscriptionsItem";
import { motion } from "framer-motion";
import { api } from "@/store/api/api";
import { FC } from "react";
import { useAuth } from "@/hooks/UseAuth";

const Subscriptions: FC = () => {
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
                Мои подписки
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3 overflow-hidden">
                {data?.subscriptions?.map((artist) => (
                    <div className="flex items-center">
                        <div className="flex-1">
                            <SubscriptionsItem
                                key={artist.id}
                                artist={artist.toArtist}
                            />
                        </div>                        
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Subscriptions;