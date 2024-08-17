import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import classNames from 'classnames'

import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher.module'
import { useGetFiltersIdsQuery } from '@services/kinopoiskAPI'
import ErrorComponent from '../error/Error.module'
import Preloader from '../preloader/Preloader.module'

import styles from './SideBar.module.scss'

export default function SideBar({ handler, active }) {

    // селектор темы оформления
    const theme = useSelector(state => state.theme)

    // id жанра из URL параметра
    const { id: urlId } = useParams()

    // цвет крестика сайдбара
    const crossColor = () => theme === 'light' ? '#000' : '#fff'

    // список id жанров из kinopoisk API
    const { data: filters, error: filtersError, isLoading: filtersIsLoading } = useGetFiltersIdsQuery()

    // массив исключаемых жанров
    const excludeGenres = [25, 28, 30, 32]

    // функция фильтрации жанров
    const filterGenres = (genres, excludeGenres) => {
        return genres?.filter((genre) => !excludeGenres.includes(genre.id))
    }

    // мемоизация отфильтрованных жанров
    const filteredGenres = useMemo(() => filterGenres(filters?.genres, excludeGenres), [filters?.genres, excludeGenres])

    // закрыть сайдбар при смене url
    const location = useLocation()
    useEffect(() => {
        if (active) {
            handler(active)
        }
    }, [location.pathname])

    // предотвратить скроллинг при открытом сайдбаре
    useEffect(() => {
        if (active) {
            document.body.style.overflow = 'hidden'
        }
        return () => document.body.style.overflow = 'auto'
    }, [active])

    // стили NavLink
    const getNavLinkClassName = (genreId) => {
        return classNames(
            'nav-link',
            { [styles.link]: true },
            { 'nav-link-dark': theme === 'dark' },
            { 'nav-link-light': theme === 'light' },
            { [styles.bold]: urlId == genreId }
        )
    }
    //вывести пользователю инофрмацию об ошибке загрузки даннных
    if (filtersError) {
        console.log(error)
        return < ErrorComponent error={filtersError} />
    }
    //отобразить прелоадер во время загрузки данных изи API
    if (filtersIsLoading) {
        <Preloader />
    }

    if (filteredGenres) {
        return (
            <>
                <div
                    className={classNames(styles.overlay, { [styles.active]: active })}
                    onClick={() => handler(active)}>
                </div>

                <div id="sidebar"
                    className={classNames(styles.sideBar,
                        {
                            [styles.active]: active,
                            [styles.dark]: theme === 'dark',
                            [styles.light]: theme === 'light'
                        }
                    )}>
                    <div
                        className={classNames(styles.head,
                            {
                                [styles.active]: active,
                                [styles.dark]: theme === 'dark',
                                [styles.light]: theme === 'light'
                            }
                        )}>
                        <div className={styles.themeSwitcher}>
                            <ThemeSwitcher />
                        </div>
                        <div onClick={() => handler(active)} className={styles.cross}>
                            <svg fill={crossColor()} width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.categories}>
                        {filteredGenres?.map((genre) => (
                            <NavLink
                                key={genre.id}
                                className={getNavLinkClassName(genre.id)}
                                to={`/categories/${genre.id}`}>
                                {genre.genre}
                            </NavLink>)
                        )
                        }
                        <div className={styles.space}></div>
                    </div>
                </div>
            </>
        )
    }
}
