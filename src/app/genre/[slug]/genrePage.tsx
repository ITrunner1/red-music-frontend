'use client'

import Catalog from "@/components/catalog";
import Pagination from "@/components/pagination";
import { useFilters } from "@/hooks/useFilters";
import { ISong } from "@/interfaces/song.interface";
import { FC } from "react";

export const revalidate = 60;

const GenreMain: FC<{ songs: ISong[] }> = ({ songs }) => {
    const { queryParams, updateQueryParams } = useFilters()

    return (
        <>
            <Catalog songs={songs} />
            <Pagination
                numberPages={songs!?.length / +queryParams.perPage}
                currentPage={queryParams.page}
                changePage={page => updateQueryParams('page', page.toString())}
            />
        </>
    )
}

export default GenreMain