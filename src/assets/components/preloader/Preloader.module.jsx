import styles from "./Preloader.module.scss"

export default function Preloader() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}