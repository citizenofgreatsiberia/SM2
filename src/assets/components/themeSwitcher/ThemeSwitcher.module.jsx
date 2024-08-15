import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '@assets/themeSlice'
import classNames from 'classnames'
import styles from './ThemeSwitcher.module.scss'

export default function ThemeSwitcher() {

    const theme = useSelector((state) => state.theme)
    const dispatch = useDispatch()

    return (
        <div className={classNames(styles.switcher, { [styles.light]: theme === 'light', [styles.dark]: theme === 'dark' })} onClick={() => dispatch(changeTheme())}>
            <div className={classNames(styles.sun, { [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}></div>
            <div className={classNames(styles.star1, { [styles.star]: true, [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}></div>
            <div className={classNames(styles.star2, { [styles.star]: true, [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}></div>
            <div className={classNames(styles.star3, { [styles.star]: true, [styles.dark]: theme === 'dark', [styles.light]: theme === 'light' })}></div>
        </div>
    )
}