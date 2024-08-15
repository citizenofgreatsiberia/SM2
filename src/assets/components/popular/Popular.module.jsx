import { useSelector } from "react-redux"

import { useGetKinoboxFilmsByNameQuery } from "../../../services/kinoboxAPI"
import KinoboxPoster from "../kinoboxPoster/KinoboxPoster.module"
import CategorySwitcher from "../kinoboxChangeCategory/CategorySwitcher.module"
import Preloader from "../preloader/Preloader.module"
import ErrorComponent from "../error/Error.module"

import styles from './Popular.module.scss'


export default function Popular() {

    const theme = useSelector((state) => state.theme)
    const category = useSelector((state) => state.category)

    const { data, error, isLoading } = useGetKinoboxFilmsByNameQuery(category)

    if (isLoading) {
        return <Preloader />
    }

    if (error) {
        return <ErrorComponent error={error} />
    }

    if (data) {
        return (
            <>
                <CategorySwitcher />
                <div className={styles.wrapper}>
                    {data.map((film) => <KinoboxPoster key={film.id} film={film} theme={theme} />)}
                </div>
            </>
        )
    }
}