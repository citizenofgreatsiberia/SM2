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
                <h2 className={styles.title}>Пожалуйста, ознакомьтесь!</h2>
                <p className={styles.text}>
                    Сайт создан с целью практики в разработке веб-приложений с использованием библиотек React, React Router, Redux Toolkit, RTK Query и демонстрирует навыки автора в работе с ними.
                    Все материалы на сайте представлены исключительно в ознакомительных целях, взяты из открытых источников и принадлежат их законным правообладателям. 
                    Сайт не предназначен для публичного распространения кинематографической продукции и имеет технические ограничения на объем отображаемых данных. 
                    Для просмотра фильмов используйте лицензированные источники.
                </p>
                <button className={buttonStyles} onClick={toAgreeHandler}>Продолжить</button>
            </div>
        </div>
    )
}
