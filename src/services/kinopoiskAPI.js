import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoiskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kinopoiskapiunofficial.tech/',
        prepareHeaders: (headers) => {
            headers.set('X-Api-Key', `8d4c6cca-1db9-4920-9a4f-e60c4cb07ce0`)
            headers.set('Content-Type', 'application/json')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        //найти фильм по имени
        getFilmByName: builder.query({
            query: (name) => `api/v2.1/films/search-by-keyword?keyword=${name}&page=1`,
            keepUnusedDataFor: 1200,
        }),
        //получить общую информацию о фильме по id
        getFilmById: builder.query({
            query: (id) => `/api/v2.2/films/${id}`,
            keepUnusedDataFor: 1200,
        }),
        //получить список похожих фильмов
        getSimilarById: builder.query({
            query: (id) => `/api/v2.2/films/${id}/similars`
        }),
        //получить список рецензий зрителей
        getFilmReviewsById: builder.query({
            query: (id) => `/api/v2.2/films/${id}/reviews`
        }),
        //поулчить информацию об актерах и режиссерах
        getStaffById: builder.query({
            query: (id) => `/api/v1/staff?filmId=${id}`
        }),
        //получить список фильмов по фильтрам
        getFilmsByFilters: builder.query({
            query: ({ id, page = 1, limit = 5 }) => {
                return `/api/v2.2/films?genres=${id}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=0&yearTo=3000&page=${page}`
            }
        }),
        //получить информацию о конкретном человеке
        getPersonById: builder.query({
            query: (id) => `/api/v1/staff/${id}`
        }),
        //получить id стран и жанров
        getFiltersIds: builder.query({
            query: () => `/api/v2.2/films/filters`
        }),
    }),
})

export const {
    useGetFilmByNameQuery,
    useGetFilmByIdQuery,
    useGetFilmReviewsByIdQuery,
    useGetSimilarByIdQuery,
    useGetStaffByIdQuery,
    useGetFilmsByFiltersQuery,
    useGetPersonByIdQuery,
    useGetFiltersIdsQuery
} = kinopoiskApi

