import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '@/interfaces/user.interface'
import { USERS } from '../../services/user.service'
import Cookies from "js-cookie"

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Song', 'Profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4200/api/",
        prepareHeaders: (headers) => {
            const token = Cookies.get('refreshToken')

            if(token) headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),

    endpoints: builder => ({
        getProfile: builder.query<IUser, any>({
            query: () => `${USERS}/user/profile`,
            providesTags: () => [{ type: 'Profile' }]
        }),
        subscribeToArtist: builder.mutation<boolean, number>({
            query: (artistId) => ({
                url: `${USERS}/subscribe/:${artistId}`,
                method: 'PATCH'
            }),
            invalidatesTags: () => [{ type: 'Profile' }]
        })
    })
})


