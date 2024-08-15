import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import SearchForm from '../searchForm/SearchForm.module'
import SideBar from '../sideBar/SideBar.module'

import styles from './Header.module.scss'

export default function Header({ children }) {

    //состояние сайдбара (виден/скрыт)
    const [sidebarIsActive, setSidebarIsActive] = useState(false)
    //колбэк переклчатель состояния сайдбара
    const toggleActive = (sidebarIsActive) => setSidebarIsActive(!sidebarIsActive)

    // селектор темы офромления
    const theme = useSelector((state) => state.theme)
    // изменить цвет бургера в зависимости от темы оформления
    const burgerColor = () => (
        theme === "light"
            ? '#000'
            : '#fff'
    )

    //определить стили для NavLink
    const linkClassName = (isActive, theme) => (
        [
            "nav-link",
            isActive ? "nav-link-active" : "nav-link",
            (theme === 'dark') ? "nav-link-dark " : "nav-link-light"
        ].join(" ")
    )

    return (
        <div className={
            classNames(styles.wrapper,
                { [styles.light]: theme === 'light' },
                { [styles.dark]: theme === 'dark' }
            )
        }>
            <SearchForm />
            <SideBar handler={toggleActive} active={sidebarIsActive} />
            <div className={styles.content}>
                <nav>
                    <NavLink
                        to='/'
                        className={({ isActive }) => linkClassName(isActive, theme)}
                    >
                        Главная страница</NavLink>
                    <NavLink
                        to='/films/selected/'
                        className={({ isActive }) => linkClassName(isActive, theme)}
                    >
                        Избранное
                    </NavLink>
                </nav>
                {children}
                <div className={styles.burger} onClick={() => toggleActive(sidebarIsActive)}>
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M4 18L20 18" stroke={burgerColor()} strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M4 12L20 12" stroke={burgerColor()} strokeWidth="2" strokeLinecap="round"></path>
                            <path d="M4 6L20 6" stroke={burgerColor()} strokeWidth="2" strokeLinecap="round"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}