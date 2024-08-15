import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import classNames from 'classnames'
import { addFilm, removeFilm } from '@assets/selectedFilmsSlice'

import styles from './FilmCard.module.scss'

export function FilmCard({ filmInfo, staff, }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // селектор темы офромления 
    const theme = useSelector((state) => state.theme)
    // список избранных фильмов из Redux store
    const selectedFilms = useSelector(state => state.selectedFilms)
    // id фильма
    const { id } = useParams()

    //временное хранилище для названия фильма, чтобы отобразить его на странице с проигрывателем без запроса к серверу
    // передать пропами нельзя, т.к. нет вложенности компонентов, хранить в Redux store тоже нет необходимости
    useEffect(() => {
        if (filmInfo && filmInfo.nameRu) {
            sessionStorage.setItem('watching', filmInfo.nameRu)
        }
    }, [filmInfo])

    //перейти к странице с проигрывателем
    const moveToWatch = () => {
        navigate(`/films/${id}/watch`)
    }

    // объект с информацией о фильме, которая будет записана в localStorage для раздела "избранное"
    const createFilm = (filmInfo) => ({
        filmId: filmInfo.kinopoiskId,
        posterUrl: filmInfo.posterUrl,
        rating: filmInfo.ratingKinopoisk,
        countries: filmInfo.countries,
        nameRu: filmInfo.nameRu,
        nameOriginal: filmInfo.nameOriginal,
        year: filmInfo.year,
        genres: filmInfo.genres,
    })

    // колбэк для добавления фильма в "Избранное"
    const handleAddFilm = () => {
        const film = createFilm(filmInfo)
        dispatch(addFilm(film))
    }
    // колбэк для удаления фильма из избранного
    const handleDeleteFilm = (id) => {
        dispatch(removeFilm(id))
    }

    const moveToKinopoisk = (id) => {
        window.location.href = `https://www.kinopoisk.ru/film/${id}/`
    }

    return (
        <div className={styles.wrapper}>
            <img className={styles.filmPicture} src={filmInfo.posterUrl} alt="poster" />
            <div className={styles.filmInfo}>
                <h2 className={styles.title}>{filmInfo.nameRu} ({filmInfo.year})</h2>
                <h3 className={styles.title}>{filmInfo.nameOriginal}</h3>
                <p className={styles.miniTitle}>Режиссер: <span>{staff && staff[0].nameRu}</span></p>
                <p className={styles.miniTitle}>Страна: <span>{filmInfo && filmInfo.countries.map(item => `${item.country} `)}</span> </p>
                <p className={styles.miniTitle}>Слоган: <span>{filmInfo && filmInfo.slogan}</span></p>
                <p className={styles.miniTitle}>Рейтинг IMDb: <span>{filmInfo && filmInfo.ratingImdb}</span></p>
                <p className={styles.miniTitle}>Рейтинг Кинопоиск: <span>{filmInfo && filmInfo.ratingKinopoisk}</span></p>
                <p className={styles.miniTitle}>Продолжительность: <span>{filmInfo && filmInfo.filmLength} мин.</span></p>
                <div className={styles.watchButtons}>
                    <button className={classNames(styles.button, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })} onClick={moveToWatch}>Смотреть онлайн</button>
                    <a href={`https://www.kinopoisk.ru/film/${id}/`}>
                        <button className={classNames(styles.button, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })} >Кинопоиск</button>
                    </a>
                     {
                        selectedFilms.some(film => film.filmId == id)
                            ? (
                                <button
                                    className={classNames(styles.button, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}
                                    onClick={() => handleDeleteFilm(id)}
                                >Удалить из избранного</button>
                            ) : (
                                <button
                                    className={classNames(styles.button, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}
                                    onClick={() => handleAddFilm()}
                                >Добавить в избранное</button>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
