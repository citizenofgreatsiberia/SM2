import { useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import styles from './Review.module.scss'

export default function Review({ review }) {

    // селектор темы офромления
    const theme = useSelector((state) => state.theme)

    //ограничим изнвчальный размер отображемой рецензии 300 символов 
    const [length, setLength] = useState(300)

    // приведем оценку автора рецензии в удобный формат
    const rate = (rating) => {
        switch (rating) {
            case 'POSITIVE':
                return 'Отлично!'
            case 'NEGATIVE':
                return 'Плохо!'
            case 'NEUTRAL':
                return 'Средне'
            default:
                return 'Без оценки'
        }
    }

    const reviewDataLength = review.description.length

    // стили для header
    const headerClass = classNames(styles.header, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
    })

    // стили для growButton
    const growButtonClass = classNames(styles.growButton, {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
    })

    // стили для rate
    const rateClass = classNames(styles.rate, {
        [styles.green]: review.type === 'POSITIVE',
        [styles.yellow]: review.type === 'NEUTRAL',
        [styles.red]: review.type === 'NEGATIVE',
    })

    //читабельное представление даты
    const formatDate = (date) => {
        const day = date.split('T')[0]
        const correctDay = day.split('-').reverse().join('.')
        return correctDay
    }

    // разметка компонента 
    return (
        <article key={review.kinopoiskId} className={styles.wrapper}>
            <div className={headerClass}>
                <cite className={styles.cite}>{review.author}</cite>
                <time className={styles.time} dateTime={review.date}>{formatDate(review.date)}</time>
                <h3 className={styles.title}>{review.title}</h3>
            </div>
            <p
                className={styles.reviewText}
                dangerouslySetInnerHTML={{ __html: review.description.substr(0, length - 1) + (reviewDataLength > length ? '...' : '') }}
            />
            {
                reviewDataLength > length && (
                    <button onClick={() => setLength(reviewDataLength + 1)} className={growButtonClass}>
                        Показать полностью
                    </button>
                )
            }
            {
                reviewDataLength <= length && (
                    <p className={styles.rateTitle}>
                        Оценка:&nbsp;
                        <span className={rateClass}>{rate(review.type)}</span>
                    </p>
                )
            }
        </article>
    )
}