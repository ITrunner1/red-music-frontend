import { api } from "./api";
import { IPlaylist, IPlaylistDto } from "@/interfaces/playlist.interface";
import { PLAYLISTS } from "@/services/playlist.service";

export const playlistApi = api.injectEndpoints({
    endpoints: builder => ({
        getAllPlaylists: builder.query<IPlaylist[], number | undefined>({
            query: id => ({ url: `/${PLAYLISTS}` })
        }),

        getPlaylistsbySearchTerm: builder.query<IPlaylist[], string>({
            query: searchTerm => ({ url: `/${PLAYLISTS}?searchTerm=${searchTerm}` })
        }),

        getPlaylistById: builder.query<IPlaylist, number>({
            query: id => `/${PLAYLISTS}/${id}`,
            providesTags: (result, error, id) => [{ type: 'Playlist', id }]
        }),

        getPlaylistPrivate: builder.query<IPlaylist, number>({
            query: id => `/${PLAYLISTS}/get-private/${id}`,
            providesTags: (result, error, id) => [{ type: 'Playlist', id }]
        }),

        createPlaylist: builder.mutation<string, void>({
            query: () => ({
                url: `/${PLAYLISTS}`,
                method: 'POST',
            }),
            invalidatesTags: () => [{ type: 'Profile' }]
        }),

        updatePlaylist: builder.mutation<IPlaylist, IPlaylistDto>({
            query: ({ id, ...body }) => ({
                url: `/${PLAYLISTS}/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Playlist', id },
                { type: 'Profile' }
            ]
        }),

        deletePlaylist: builder.mutation<IPlaylist, number>({
            query: id => ({
                url: `/${PLAYLISTS}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Playlist' }, { type: 'Profile' }]
        }),

        updateListens: builder.mutation<IPlaylist, number>({
            query: id => ({
                url: `/${PLAYLISTS}/update-listens/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Playlist' }]
        }),

        updateLikes: builder.mutation<Boolean, number>({
            query: playlistId => ({
                url: `/${PLAYLISTS}/update-likes/${playlistId}`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Playlist' }, { type: 'Profile' }]
        }),

    }),
})