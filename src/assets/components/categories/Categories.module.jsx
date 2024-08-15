import { useParams } from "react-router-dom"
import { useState } from "react"
import { useGetFilmsByFiltersQuery } from "../../../services/kinopoiskAPI.js"
import KinopoiskPoster from "../kinopoiskPoster/KinopoiskPoster.module.jsx"
import { useSelector } from "react-redux"
import Preloader from "../preloader/Preloader.module.jsx"
import ErrorComponent from "../error/Error.module.jsx"
import Pagination from "../pagintation/Pagination.module.jsx"
import Notification from "../notification/Notification.module.jsx"
import styles from './Categories.module.scss'

export default function Categories() {

    //порядковый номер текущей страницы
    const [page, setPage] = useState(1)

    //селектор темы офромления
    const theme = useSelector((state) => state.theme)

    // id жанра из URL
    const { id } = useParams()

    // список фильмов из Kinopoisk API
    const { data, error, isLoading } = useGetFilmsByFiltersQuery({ id, page, limit: 5 })

    // отобразить прелоадер
    if (isLoading) {
        return <Preloader />
    }

    // отобразить ошибку
    if (error) {
        return <ErrorComponent error={error} />
    }

    // если ошибки нет, но данные в ответе от API отсутствуют
    if (!data || data.items.length === 0) {
        return <Notification message='Сожалеем, ничего не найдено!' />
    }

    // компонент страницы с фильмами
    return (
        <>
            <div className={styles.box}>
                {data.items.map((film) => (
                    <KinopoiskPoster key={film.kinopoiskId} film={film} theme={theme} />
                ))}
            </div>
            <Pagination totalPages={data.totalPages} currentPage={page} setCurrentPage={setPage} />
        </>
    )
}