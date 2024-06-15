'use client'

import { FC } from "react";
import { IArtist } from "@/interfaces/artist.interface";
import PlaylistsCatalog from "@/components/playlistsCatalog";

const ArtistMain: FC<IArtist> = ({ artist }) => {
    return (
        <div className="mt-8">
            <PlaylistsCatalog newPlaylists={artist.playlists || []} />
        </div>
    )
}

export default ArtistMain