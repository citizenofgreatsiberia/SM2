import Notification from '../notification/Notification.module'
import styles from './NotFoundPage.module.scss'

export default function NotFoundPage() {
    return (
        <Notification message='404. Такой страницы нет!' />
    )
}