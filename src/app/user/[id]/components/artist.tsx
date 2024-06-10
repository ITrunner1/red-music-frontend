'use client'

import { FC } from "react";
import { IArtist } from "@/interfaces/artist.interface";
import { motion } from "framer-motion";
import ArtistInfoShort from "@/components/ui/artist-info-small";
import SubscribeButton from "@/components/ui/subscribedButton";
import Catalog from "@/components/catalog";
import PlaylistsCatalog from "@/app/playlists/components/playlistsCatalog";

const ArtistMain: FC<IArtist> = ({ artist }) => {
    return (
        <motion.div
            className="mt-10 flex flex-col gap-y-6"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="flex justify-between">
                <div className="text-3xl w-1/2">
                    Пользователь
                    <div className="text-xl pt-4">
                        <ArtistInfoShort artist={artist} />
                    </div>
                    <div className="mt-2">
                        <SubscribeButton artistIdForSubscribe={artist.id} />
                    </div>
                </div>
                <div className="text-xl mb-6 w-1/2">
                    <article className="flex flex-col gap-y-2">
                        <span className="text-3xl">
                            Об пользователе
                        </span>
                        <span className="pt-4">
                            {artist.description}
                        </span>
                    </article>
                </div>
            </div>
            <Catalog newSongs={artist.songs} />
            <PlaylistsCatalog newPlaylists={artist.playlists} />
        </motion.div>
    )
}


export default ArtistMain