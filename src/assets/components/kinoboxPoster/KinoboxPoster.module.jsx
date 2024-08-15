import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './KinoboxPoster.module.scss'

export default function KinoboxPoster({ film, theme }) {

    const toFixedRating = (rating) => Number(rating).toFixed(1)

    return (
        <div className={styles.wrapper}>
            <NavLink to={`/films/${film.id}`}>
                <div className={styles.imgWrapper}>
                    <img src={film.posterUrl} alt="poster" className={styles.poster} />
                    <p className={
                        classNames(styles.rating, {
                            [styles.green]: (film.rating >= 7),
                            [styles.yellow]: (film.rating >= 5 && film.rating < 7),
                            [styles.red]: (film.rating < 5)
                        })
                    }>
                        {toFixedRating(film.rating)}
                    </p>
                    <div className={styles.countries}>
                        {film.countries.map((country, index) => {
                            return <p key={index} className={styles.country}>{country}</p>
                        })}
                    </div>
                </div>
            </NavLink>
            <h6 className={classNames({ [styles.title]: true, [styles.light]: theme === 'light' })}>{film.title}. {film.year}</h6>
            <p className={classNames({ [styles.genres]: true, [styles.light]: theme === 'light' })}>{film.genres.join(` `)} </p>
        </div>
    )
}