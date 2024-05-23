import { api } from "./api";
import { ISong, ISongDto } from "@/interfaces/song.interface";
import { SONGS } from "@/services/song.service";

export const songApi = api.injectEndpoints({
    endpoints: builder => ({
       getSongsBySearchTerm: builder.query<ISong[], string>({
        query: searchTerm => ({ url: `/${SONGS}`, param: { searchTerm }})
       }),

       getSongById: builder.query<ISong, number>({
        query: id => `/${SONGS}/${id}`,
        providesTags: (result, error, id) => [{ type: 'Song', id}]
       }),

       getSongPrivate: builder.query<ISong, number>({
        query: id => `/${SONGS}/get-private/${id}`,
        providesTags: (result, error, id) => [{ type: 'Song', id}]
       }),

       createSong: builder.mutation<string, void>({
        query: () => ({
            url: `/${SONGS}`,
            method: 'POST',
        }),
        invalidatesTags: () => [{ type: 'Profile'}]
       }),

       updateSong: builder.mutation<ISong, ISongDto>({
        query: ({ id, ...body }) => ({
            url: `/${SONGS}`,
            method: 'PUT',
            body
        }),
        invalidatesTags: (result, error, { id }) => [
            { type: 'Song', id},
            { type: 'Profile'}
        ]
       }),

       updateListens: builder.mutation<ISong, number>({
        query: id => ({
            url: `/${SONGS}/update-listens/${id}`,
            method: 'PUT'
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Song', id}]
       }),

       updateLikes: builder.mutation<ISong, number>({
        query: id => ({
            url: `/${SONGS}/update-likes/${id}`,
            method: 'PUT'
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Song', id}]
       }),

       deleteSong: builder.mutation<ISong, number>({
        query: id => ({
            url: `/${SONGS}/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: (result, error, id) => [{ type: 'Song' }, { type: 'Profile', id}]
       }),

    }),
})