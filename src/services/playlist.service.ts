import instance from "@/store/api/api.interceptor"
import { TypeDataFilters, TypePagination, TypePaginationPlaylists } from "@/interfaces/pagination.type"

export const PLAYLISTS = 'playlists'

export const PlaylistService = {
    async getAll(queryData = {} as TypeDataFilters) {
        const { data } = await instance<TypePaginationPlaylists>({
            url: `/${PLAYLISTS}/all`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getAllNewPlaylists(queryData = {} as TypeDataFilters) {
        const { data } = await instance<TypePaginationPlaylists>({
            url: `/${PLAYLISTS}`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getMostPopular(queryData = {} as TypePagination) {
        const { data } = await instance<TypePaginationPlaylists>({
            url: `/${PLAYLISTS}/most-popular`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getByGenre(genreSlug: string) {
        return instance<TypePaginationPlaylists>({
           url: `/${PLAYLISTS}/by-genre/${genreSlug}`,
           method: 'GET',                  
       })
   },
}

