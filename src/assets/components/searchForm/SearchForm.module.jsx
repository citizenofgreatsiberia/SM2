import { Form } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import classNames from "classnames"
import styles from './SearchForm.module.scss'

export default function SearchForm() {

    // название фильма
    const [name, setName] = useState('')
    const navigate = useNavigate()
    // селектор темы оформления
    const theme = useSelector((state => state.theme))
    const location = useLocation()

    //перейти на страницу с фильмои
    const handleSubmit = (event) => {
        if (name && !name.startsWith(' ')) {
            event.preventDefault()
            navigate(`/films/search/${name}`)
        }
    }
    //сбросить название фильма в инпуте если произошел переход к другой странице
    useEffect(() => {
        if (!location.pathname.includes('/films/search/')) {
            setName('')
        }
    }, [location])

    return (
        <Form id="search-form" role="search" onSubmit={handleSubmit} className={styles.form}>
            <input className={classNames(styles.input, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}
                autoComplete="off"
                id="q"
                placeholder="Введите название фильма"
                type="search"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className={styles.button}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" fill={theme === "dark" ? "#bebebe" : "#242424"}></path>
                </svg>
            </button>
        </Form>
    )
}