'use client'

import { FC } from "react";
import { IArtist } from "@/interfaces/artist.interface";
import Catalog from "@/components/home/catalog";
import ArtistInfoShort from "@/components/ui/artist-info-small";
import SubscribeButton from "@/components/ui/subscribedButton";

const ArtistMain: FC<IArtist> = ({ artist }) => {
  return (
        <>
            <div className="">
                {artist.name}
            </div>
            <div>
                <ArtistInfoShort artist={artist} />
                <SubscribeButton artistIdForSubscribe={artist.id} />
            </div>
            <div className="mt-4">
                <article>
                    {artist.description}
                </article>
            </div>
            <div className="mt-8">
                <Catalog newSongs={artist.songs || []} />
            </div>
        </>  
    )    
}


export default ArtistMain