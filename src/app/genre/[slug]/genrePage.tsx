'use client'

import Catalog from "@/components/catalog";
import CatalogPlaylists from "@/components/catalogPlaylists";
import Pagination from "@/components/pagination";
import { useFilters } from "@/hooks/useFilters";
import { IPlaylist } from "@/interfaces/playlist.interface";
import { ISong } from "@/interfaces/song.interface";
import { FC } from "react";

export const revalidate = 60;

const GenreMain: FC<{ songs: ISong[], playlists: IPlaylist[] }> = ({ songs, playlists }) => {
    const { queryParams, updateQueryParams } = useFilters()

    return (
        <>
            <Catalog songs={songs} />
            <CatalogPlaylists playlists={playlists} />
            <Pagination
                numberPages={songs!?.length / +queryParams.perPage}
                currentPage={queryParams.page}
                changePage={page => updateQueryParams('page', page.toString())}
            />
        </>
    )
}

export default GenreMain