import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './KinopoiskPoster.module.scss'

export default function KinopoiskPoster({ film, theme, children }) {

    const toFixedRating = (rating) => rating === 'null' ? '' : Number(rating).toFixed(1)

    return (
        <div className={styles.wrapper} >
            <NavLink to={`/films/${film.filmId || film.kinopoiskId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.imgWrapper}>
                    <img src={film.posterUrl} alt="poster" className={styles.poster} />
                    <p className={
                        classNames(styles.rating, {
                            [styles.green]: ((film.ratingKinopoisk || film.rating) >= 7),
                            [styles.yellow]: ((film.ratingKinopoisk || film.rating) >= 5 && (film.ratingKinopoisk || film.rating) < 7),
                            [styles.red]: ((film.ratingKinopoisk || film.rating) < 5)
                        })
                    }>
                        {toFixedRating(film.ratingKinopoisk || film.rating)}
                    </p>
                    <div className={styles.countries}>
                        {film.countries.map((country, index) => {
                            return <p key={index} className={styles.country}>{country.country}</p>
                        })}
                    </div>
                </div>
            </NavLink>
            {children}
            <h6 className={classNames({ [styles.title]: true, [styles.light]: theme === 'light' })}>{film.nameRu || film.nameOriginal}. {film.year}</h6>
            <p className={classNames({ [styles.genres]: true, [styles.light]: theme === 'light' })}>{film.genres.map((genre) => `${genre.genre} `)} </p>

        </div>
    )
}
