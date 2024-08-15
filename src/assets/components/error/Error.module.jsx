import styles from './Error.module.scss'

export default function ErrorComponent({ error }) {
    // вывести данные об ошибке в консоль и дать пользователю сообщение на экране
    if (error) {
        console.log(error.status, JSON.stringify(error.data))
    }

    return (
        <div className={styles.errorWrapper}>
            <h1 className={styles.errorText}>Что-то пошло не по плану...</h1>
            <h2 className={styles.errorText}>Попробуйте позже</h2>
        </div>
    )
}

