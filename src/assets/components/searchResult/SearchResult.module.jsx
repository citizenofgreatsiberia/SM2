import { useParams } from "react-router-dom"
import { useGetFilmByNameQuery } from "@services/kinopoiskAPI.js"
import KinopoiskPoster from "../kinopoiskPoster/KinopoiskPoster.module.jsx"
import { useSelector } from "react-redux"
import Preloader from "../preloader/Preloader.module.jsx"
import ErrorComponent from "../error/Error.module.jsx"
import Notification from "../notification/Notification.module.jsx"
import styles from './SearchResult.module.scss'

export default function SearchResult() {
    //селектор темы оформления
    const theme = useSelector((state) => state.theme)
    // имя фильма из URL
    const { name } = useParams()
    // получить данные из kinopoisk API
    const { data, error, isLoading } = useGetFilmByNameQuery(name)
    // если данные еще загружаются отобразить прелоадер
    if (isLoading) {
        return <Preloader />
    }
    // в случае ошибки отобразить информацию пользователю
    if (error) {
        console.log(error)
        return <ErrorComponent error={error} />
    }
    // если данных по запросу нет
    if (!data || data.films.length === 0) {
        return <Notification message='Сожалеем, ничего не найдено!' />
    }

    return (
        <>
            <div className={styles.wrapper}>
                {data.films.map((film) => (
                    <KinopoiskPoster key={film.filmId} film={film} theme={theme} />
                ))}
            </div>
        </>
    )
}