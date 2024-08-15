import { useParams } from 'react-router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { useGetPersonByIdQuery } from '@services/kinopoiskAPI'
import Preloader from '../preloader/Preloader.module'
import ErrorComponent from '../error/Error.module'

import styles from './PersonPage.module.scss'

export default function PersonPage() {

    // отображение текущего факта о персоне
    const [currentFact, setCurrentFact] = useState(0)

    // селектор темы оформления
    const theme = useSelector((state) => state.theme)

    // функция переключения факта о персоне
    const nextFact = (total) => {
        if (currentFact < total) {
            setCurrentFact(currentFact + 1)
        } else {
            setCurrentFact(0)
        }
    }

    // id персоны
    const { id } = useParams()

    // данные из kinopoisk API
    const { data: personData, error: personError, isLoading: personIsLoading } = useGetPersonByIdQuery(id)

    const age = personData?.age ? personData.age : 'неизвестно'
    const birthday = personData?.birthday ? personData.birthday.split('-').reverse().join('.') : 'неизвестно'
    const birthplace = personData?.birthplace ? personData.birthplace : 'неизвестно'
    const sex = personData?.sex === 'MALE' ? 'муж.' : 'жен.'
    const growth = personData?.growth ? personData.growth : 'неизвестно'
    const death = personData?.death ? personData.death.split('-').reverse().join('.') : null
    const deathplace = personData?.deathplace ? personData.deathplace : null
    const profession = personData?.profession ? personData.profession : 'нет данных'
    const spouses = personData?.spouses.length > 0 ? (personData.spouses.map((person) => `${person.name} ${person.divorced ? '(в разводе)' : ''}`)).join(', ') : 'нет данных'
    const filmRole = (professionKey) => {
        switch (professionKey) {
            case 'ACTOR':
                return 'актер'
                break;
            case 'HIMSELF':
            case 'HERSELF':
                return 'играет себя'
                break;
            case 'DIRECTOR':
                return 'режиссер'
                break;
            case 'PRODUCER':
                return 'продюссер'
                break;
            case 'OPERATOR':
                return 'оператор'
                break;
            case 'EDITOR':
                return 'редактор'
            case 'WRITER':
                return 'сценарист'
                break;
            case 'COMPOSER':
                return 'композитор'
                break;
            default:
                return professionKey
                break;
        }
    }

    //стилизация NavLink
    const navLinkClassName = classNames(styles.link, 'nav-link', { [styles.link]: true, 'nav-link-dark': theme === 'dark', 'nav-link-light': theme === 'light' })

    //прелоадер
    if (personIsLoading) {
        return <Preloader />
    }

    // ошибка
    if (personError) {
        <ErrorComponent error={personError} />
    }

    //компонент
    if (personData) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.personCard}>
                    <img src={personData.posterUrl} alt="photo" className={styles.personPhoto} />
                    <div className={styles.personInfo}>
                        <h2 className={styles.title}>{personData.nameRu}</h2>
                        <h3 className={styles.title}>{personData.nameEn}</h3>
                        <p className={styles.miniTitle}>Возраст: <span>{age}</span></p>
                        <p className={styles.miniTitle}>Пол: <span>{sex}</span></p>
                        <p className={styles.miniTitle}>Рост: <span>{growth}</span></p>
                        <p className={styles.miniTitle}>Дата рождения: <span>{birthday}</span> </p>
                        <p className={styles.miniTitle}>Местро рождения: <span>{birthplace}</span></p>
                        {death && <p className={styles.miniTitle}>Дата смерти: <span> {death}</span></p>}
                        {deathplace && <p className={styles.miniTitle}>Место смерти: <span>{deathplace}</span></p>}
                        <p className={styles.miniTitle}>Профессия: <span>{profession}</span></p>
                        <p className={styles.miniTitle}>Брак: <span>{spouses}</span></p>
                    </div>
                </div>
                {
                    personData?.facts?.length > 0 &&
                    (
                        <div className={styles.facts}>
                            <h1 className={styles.title}>Интересные факты:</h1>
                            <div className={styles.fact} onClick={() => nextFact(personData?.facts.length - 1)}>
                                <p>{personData?.facts[currentFact]} <span className={styles.accentText}>Еще...</span></p>
                            </div>
                        </div>
                    )
                }

                <div className={styles.filmsWrapper}>
                    <h1 className={styles.title}>Фильмография:</h1>
                    <div className={styles.linksWrapper}>
                        {
                            personData?.films?.map((film, index) => (
                                <NavLink
                                    key={index}
                                    to={`/films/${film.filmId}`}
                                    className={navLinkClassName}
                                >
                                    <span className={styles.accentText}>{++index}. {film.nameRu || film.nameEn}</span>
                                    {` Рейтинг фильма: ${film.rating || 'нет'}. Роль: ${filmRole(film.professionKey)} `}
                                </NavLink>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}