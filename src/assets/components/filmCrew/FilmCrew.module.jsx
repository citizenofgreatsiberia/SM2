import { NavLink } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import styles from './FilmCrew.module.scss'

export default function FilmCrew({ staff }) {

    // отбрасываем всех повторяющихся членов съемочной группы
    const uniqueStaffIds = new Set();
    const uniqueStaffArray = staff?.filter(person => {
        if (uniqueStaffIds.has(person.staffId)) {
            return false;
        }
        uniqueStaffIds.add(person.staffId);
        return true;
    })

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Съемочная группа: </h2>

            <Swiper className={styles.swiper}
                modules={[Navigation, Pagination, Scrollbar, FreeMode]}
                spaceBetween={10}
                slidesPerView='auto'
                navigation
                freeMode={true}
                scrollbar={{ draggable: true }}
            >
                {
                    uniqueStaffArray?.map((person, index) => {
                        if (index < 50 && person.nameRu) {
                            return (
                                <SwiperSlide key={person.staffId} className={styles.swiperSlide}>
                                    <NavLink to={`/staff/${person.staffId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <figure className={styles.person}>
                                            <img className={styles.photo} src={person.posterUrl} alt="poster" />
                                            <figcaption className={styles.personName}>{person.nameRu}</figcaption>
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