import instance from "@/store/api/api.interceptor"
import { ISong, TypeDataFilters, TypePaginationSongs } from "@/interfaces/song.interface"

export const SONGS = 'songs'

export const SongService = {
    async getAll(queryData = {} as TypeDataFilters) {
        const { data } = await instance<TypePaginationSongs>({
            url: `/${SONGS}`,
            method: 'GET',
            params: queryData
        })

        return data || []
    },

    async getMostPopular() {        
        return await instance<ISong[]>({
            url: `/${SONGS}/most-popular`,
            method: 'GET',
        })        
    },

}

