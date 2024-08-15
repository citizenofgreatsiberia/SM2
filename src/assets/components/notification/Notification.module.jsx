import styles from './Notification.module.scss'

export default function Notification({ message }) {
    return (
        <div className={styles.notice}>
            <h1 className={styles.noticeText}>{message}</h1>
        </div>
    )
}