import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import styles from './Disclaimer.module.scss'

export default function Disclaimer() {

    const initialState = sessionStorage.getItem('isAgree') === 'true'
    const [isAgree, setIsAgree] = useState(initialState)
    const theme = useSelector(state => state.theme)

    useEffect(() => {
        if (!isAgree) {
            document.body.style.overflow = 'hidden'
        }
        return () => document.body.style.overflow = 'auto'
    }, [isAgree])

    const toAgreeHandler = () => {
        sessionStorage.setItem('isAgree', 'true')
        setIsAgree(true)
    }

    const overlayStyles = classNames(
        {
            [styles.overlay]: true,
            [styles.active]: !isAgree
        }
    )

    const wrapperStyles = classNames(
        {
            [styles.wrapper]: true,
            [styles.dark]: theme === 'dark',
            [styles.light]: theme === 'light'
        }
    )

    const buttonStyles = classNames(
        {
            [styles.button]: true,
            [styles.dark]: theme === 'dark',
            [styles.light]: theme === 'light'
        }
    )

    return (
        <div className={overlayStyles}>
            <div className={wrapperStyles}>
                <h2 className={styles.title}>Добро пожаловать!</h2>
                <p className={styles.text}>

                    Сайт создан с целью попрактиковаться в разработке веб-приложений с использованием библиотек React, React Router, Redux Toolkit, RTK Query и продемонстрировать навыки работы с ними.
                    Все материалы на сайте представлены исключительно в ознакомительных целях, взяты из открытых источников и являются собственностью их правообладателей.
                    Смотрите фильмы только в лицензированных источниках!
                </p>
                <button className={buttonStyles} onClick={toAgreeHandler}>Продолжить</button>
            </div>
        </div>
    )
}
