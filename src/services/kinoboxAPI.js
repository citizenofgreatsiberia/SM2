import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const kinoboxApi = createApi({
    reducerPath: 'kinoboxApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://kinobox.tv/api/films/' }),
    endpoints: (builder) => ({
        getKinoboxFilmsByName: builder.query({
            query: (type) => `popular?type=${type}`,
            keepUnusedDataFor: 1200,
        })
    }),
})

export const { useGetKinoboxFilmsByNameQuery } = kinoboxApi