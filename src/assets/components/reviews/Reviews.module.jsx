import Review from '../review/Review.module'

import styles from './Reviews.module.scss'

export default function Reviews({ reviews }) {

    if (reviews?.items?.length > 0) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.amount}></div>
                <h2 className={styles.miniTitle}>Отзывы зрителей:</h2>
                {
                    reviews?.items.map((review) => (
                        <Review review={review} key={review.kinopoiskId} />
                    ))
                }
            </div>
        )
    }

}