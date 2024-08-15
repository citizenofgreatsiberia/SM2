import styles from './FilmDescription.module.scss'

export default function FilmDescription({ data }) {
    if (data && data.description) {
        return (
            <div className={styles.wrapper}>
                <p className={styles.title}>Описание:</p>
                <p className={styles.descriptionText}> {data.description}</p>
                <p className={styles.miniTitle}>Жанр: {data.genres.map((item, index) => <span className={styles.marked} key={index}>{item.genre}</span>)}</p>
            </div>
        )
    }
}