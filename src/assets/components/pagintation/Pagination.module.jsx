import classNames from 'classnames'
import { useSelector } from 'react-redux'
import styles from './Pagination.module.scss'

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {

    //селектор темы оформления
    const theme = useSelector((state) => state.theme)

    //логика перехода к следующей странице
    const openNextPage = (totalPages, currentPage) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    //логика перехода к предыдущей странице
    const openPrevPage = (page) => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    // стили для ClassNames
    const themeColor = {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light'
    }

    return (
        <div className={styles.wrapper}>
            <button
                className={classNames(styles.button, themeColor)}
                onClick={() => openPrevPage(currentPage)}
                disabled={currentPage === 1}
            >
                &#171;
            </button>
            <span
                className={classNames(styles.span, themeColor)}
            >
                страница: {currentPage} из {totalPages}
            </span>
            <button
                className={classNames(styles.button, themeColor)}
                onClick={() => openNextPage(totalPages, currentPage)}
                disabled={currentPage === totalPages}
            >
                &#187;
            </button>
        </div>
    )
}
