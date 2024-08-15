import { useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './BackToTop.module.scss'

export default function BackToTop() {

    // видимость кнопки backToTop
    const [visibility, setVisibility] = useState(false)
    //состояние кнопки backToTop
    const [backToTopTriggered, setBackToTopTriggered] = useState(false)
    //ref для кнопки backToTop

    //сделать кнопку видимой / невидимой
    const toggleVisibility = () => {
        const scrolled = document.documentElement.scrollTop
        setVisibility(scrolled > 300)
    }

    //добавить / удалить обработчик события scroll на window
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return function () {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    // запустить прокрутку к началу страницы
    useEffect(() => {
        if (backToTopTriggered) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            setBackToTopTriggered(false)
        }
    }, [backToTopTriggered])

    //handler для кнопки backToTop
    const handleScrollToTop = () => {
        setBackToTopTriggered(true)
    }

    //компонент кнопки backToTop
    return (
        <div className={classNames({ [styles.wrapper]: true, [styles.active]: visibility })} onClick={handleScrollToTop}>
            <svg
                fill="#F39C12"
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="25px"
                viewBox="0 0 52 52"
                enableBackground="new 0 0 52 52"
                xmlSpace="preserve">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <path d="M11.4,21.6L24.9,7.9c0.6-0.6,1.6-0.6,2.2,0l13.5,13.7c0.6,0.6,0.6,1.6,0,2.2L38.4,26 c-0.6,0.6-1.6,0.6-2.2,0l-9.1-9.4c-0.6-0.6-1.6-0.6-2.2,0l-9.1,9.3c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2C10.9,23.1,10.9,22.2,11.4,21.6 z"></path>
                        <path d="M11.4,39.7L24.9,26c0.6-0.6,1.6-0.6,2.2,0l13.5,13.7c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2 c-0.6,0.6-1.6,0.6-2.2,0l-9.1-9.4c-0.6-0.6-1.6-0.6-2.2,0L15.8,44c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2C10.9,41.2,10.9,40.2,11.4,39.7z "></path>
                    </g>
                </g>
            </svg>
        </div >
    )
}