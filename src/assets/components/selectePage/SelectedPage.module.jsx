import { useSelector, useDispatch } from "react-redux"
import classNames from "classnames"
import KinopoiskPoster from "../kinopoiskPoster/KinopoiskPoster.module"
import Notification from "../notification/Notification.module"
import { removeFilm } from "@assets/selectedFilmsSlice"
import styles from './SelectedPage.module.scss'

export default function SelectedPage() {
    //селектор темы оформления
    const theme = useSelector((state) => state.theme)
    //селектор списка избранных фильмов
    const selectedFilms = useSelector((state) => state.selectedFilms)
    const dispatch = useDispatch()
    //если фильмов в избранном нет
    if (!selectedFilms || selectedFilms.length === 0) {
        return <Notification message='Список избранного пуст' />
    }

    return (
        <>
            <div className={styles.box}>
                {selectedFilms.map((film) => (
                    <KinopoiskPoster key={film.filmId} film={film} theme={theme}>
                        <button
                            className={classNames(styles.button, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}
                            onClick={() => dispatch(removeFilm(film.filmId))}
                        >Удалить</button>
                    </KinopoiskPoster>
                ))}
            </div>
        </>
    )
}