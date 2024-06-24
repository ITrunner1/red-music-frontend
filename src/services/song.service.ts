import instance from "@/store/api/api.interceptor"
import { TypeDataFilters, TypePagination, TypePaginationSongs } from "@/interfaces/pagination.type"

export const SONGS = 'songs'

export const SongService = {
    async getAll(queryData = {} as TypeDataFilters) {
        const { data } = await instance<TypePaginationSongs>({
            url: `/${SONGS}/all`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getAllNewSongs(queryData = {} as TypeDataFilters) {
        const { data } = await instance<TypePaginationSongs>({
            url: `/${SONGS}`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getMostPopular(queryData = {} as TypePagination) {
        const { data } = await instance<TypePaginationSongs>({
            url: `/${SONGS}/most-popular`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getByGenre(genreSlug: string) {
         return instance<TypePaginationSongs>({
            url: `/${SONGS}/by-genre/${genreSlug}`,
            method: 'GET',                  
        })
    },
}

