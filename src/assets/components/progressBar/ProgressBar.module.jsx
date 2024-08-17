import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ProgressBar.module.scss'

export default function ProgressBar() {
    const progressBarRef = useRef(null)
    const location = useLocation()

    // Функция для обновления ширины прогресс-бара
    const updateProgressBar = () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const scrollPercentage = (scrollTop / scrollHeight) * 100

        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${scrollPercentage}%`
        }
    }

    useEffect(() => {
        // Обработчик прокрутки
        const handleScroll = () => updateProgressBar()

        // Добавляем обработчик прокрутки
        window.addEventListener('scroll', handleScroll)

        // Убираем обработчик при размонтировании
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        // Сброс и обновление прогресс-бара при изменении маршрута
        if (progressBarRef.current) {
            progressBarRef.current.style.width = '0%'
        }
        updateProgressBar()
    }, [location])

    return (
        <div className={styles.progressBar} ref={progressBarRef}></div>
    )
}
