'use client'

import { FC } from "react";
import { IArtist } from "@/interfaces/artist.interface";
import CatalogPlaylists from "@/components/catalogPlaylists";

const ArtistMain: FC<IArtist> = ({ artist }) => {
    return (
        <div className="mt-8">
            <CatalogPlaylists playlists={artist.playlists || []} />
        </div>
    )
}

export default ArtistMain