import { useParams, useNavigate } from 'react-router'
import Preloader from '../preloader/Preloader.module'

import { useGetFilmByIdQuery, useGetStaffByIdQuery, useGetFilmReviewsByIdQuery, useGetSimilarByIdQuery } from '@services/kinopoiskAPI'

import ErrorComponent from '../error/Error.module'
import FilmDescription from '../filmDescription/FilmDescription.module'
import FilmCrew from '../filmCrew/FilmCrew.module'
import Reviews from '../reviews/Reviews.module'
import Similar from '../similar/Similar.moduls'

import styles from './FilmPage.module.scss'
import { FilmCard } from '../filmCard/FilmCard.module'

export default function FilmPage() {

    const { id } = useParams()
    // получить данные из Kinopoisk API
    const { data: filmInfo, error: filmError, isLoading: filmIsloading } = useGetFilmByIdQuery(id)
    const { data: staff, error: staffError, isLoading: staffIsLoading } = useGetStaffByIdQuery(id)
    const { data: reviews, error: reviewsError, isLoading: reviewIsLoading } = useGetFilmReviewsByIdQuery(id)
    const { data: similarData } = useGetSimilarByIdQuery(id)

    //во время загрузки отобразить прелоадер
    if (filmIsloading || staffIsLoading || reviewIsLoading) {
        return (
            <Preloader />
        )
    }
    //в случае ошибки отобразить информацию для пользователя 
    if (filmError) {
        console.log(error)
        return <ErrorComponent error={filmError} />
    }

    if (filmInfo) {
        return (

            <div className={styles.filmPage}>
                <FilmCard
                    filmInfo={filmInfo}
                    staff={staff}
                    id={id}
                />

                <FilmDescription data={filmInfo} />
                <Similar similarData={similarData} />

                <FilmCrew staff={staff} />
                <Reviews reviews={reviews} />
            </div >
        )
    }
}


