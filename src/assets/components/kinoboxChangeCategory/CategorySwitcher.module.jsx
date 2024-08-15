import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { changeCategory } from '@assets/categorySlice'
import styles from './CategorySwitcher.module.scss'

export default function CategorySwitcher() {

    //селектор категорий фильмов (фильмы/сериалы)
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch()

    return (
        <div className={styles.wrapper} onClick={() => dispatch(changeCategory())}>
            <p className={classNames(styles.label, { [styles.active]: category === 'film' })}>Фильмы</p>
            <p className={classNames(styles.label, { [styles.active]: category === 'series' })}>Сериалы</p>
            <div className={classNames(styles.slider, { [styles.films]: category === 'film', [styles.series]: category === 'series' })}></div>
        </div>
    )
}