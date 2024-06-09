'use client'

import { FC } from "react";
import { IArtist } from "@/interfaces/artist.interface";
import ArtistInfoShort from "@/components/ui/artist-info-small";
import SubscribeButton from "@/components/ui/subscribedButton";
import Catalog from "@/components/catalog";
import PlaylistsCatalog from "@/app/playlists/components/playlistsCatalog";

const ArtistMain: FC<IArtist> = ({ artist }) => {
    return (
        <div className="mt-8">
            <PlaylistsCatalog newPlaylists={artist.playlists || []} />
        </div>
    )
}


export default ArtistMain