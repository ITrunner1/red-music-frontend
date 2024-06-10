import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, IUserDto } from '@/interfaces/user.interface'
import { USERS } from '../../services/user.service'
import Cookies from "js-cookie"

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Song', 'Profile', 'Playlist'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.SERVER_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('refreshToken')

            if (token) headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),

    endpoints: builder => ({
        getProfile: builder.query<IUser, any>({
            query: () => `${USERS}/user/profile`,
            providesTags: () => [{ type: 'Profile' }]
        }),
        updateProfile: builder.mutation<IUser, IUserDto>({
            query: ({ id, ...body }) => ({
                url: `/${USERS}/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Profile' },
            ]
        }),
        subscribeToArtist: builder.mutation<boolean, number>({
            query: (artistId) => ({
                url: `${USERS}/subscribe/${artistId}`,
                method: 'PUT'
            }),
            invalidatesTags: () => [{ type: 'Profile' }]
        })
    })
})


