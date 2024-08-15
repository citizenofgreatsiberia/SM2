import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper/modules'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styles from './Similar.module.scss'

export default function Similar({ similarData }) {

    if (similarData && similarData.items.length > 0) {
        return (
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Похожее: </h2>
                <Swiper className={styles.swiper}
                    modules={[Navigation, Pagination, Scrollbar, A11y, FreeMode]}
                    spaceBetween={10}
                    slidesPerView='auto'
                    navigation
                    freeMode={true}
                    scrollbar={{ draggable: true }}
                >
                    {
                        similarData?.items.map((film, index) => {
                            if (index < 50 && film.nameRu) {
                                return (
                                    <SwiperSlide key={index} className={styles.swiperSlide}>
                                        <NavLink to={`/films/${film.filmId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <figure className={styles.imgWrapper}>
                                                <img className={styles.img} src={film.posterUrl} alt="poster" />
                                                <figcaption className={styles.title}>{film.nameRu}</figcaption>
                                            </figure>
                                        </NavLink>
                                    </SwiperSlide>
                                )
                            }
                        })
                    }
                </Swiper>
            </div>
        )
    }
}