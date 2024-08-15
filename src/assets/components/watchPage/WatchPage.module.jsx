import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useParams } from 'react-router'
import { useGetSimilarByIdQuery } from '@services/kinopoiskAPI'
import Similar from '../similar/Similar.moduls'
import styles from './WatchPage.module.scss'

export default function WatchPage() {
    const { id } = useParams()

    const playerRef = useRef(null)

    const { data: similarData } = useGetSimilarByIdQuery(id)

    const [watching, setWatching] = useState('')

    //добавить плеер kinobox на страницу
    useEffect(() => {
        const kinoboksParams = document.createElement('script')
        kinoboksParams.innerText = `{kbox('.kinobox_player', { search: { kinopoisk: ${id} } })}`
        document.body.appendChild(kinoboksParams)
        return () => {
            document.body.removeChild(kinoboksParams)
        }
    }, [id])
    // вместо useEffect, поскольку мне нужно обратиться к playerRef уже после того как он построен весь DOM компонента
    useLayoutEffect(() => {
        if (playerRef.current) {
            playerRef.current.setAttribute('class', 'kinobox_player')
        }
    }, []);

    // получить название фильма для отображения на странице
    useEffect(() => {
        const film = sessionStorage.getItem('watching')
        setWatching(film)
    })

    return (
        <div className={styles.wrapper}>
            <h1>{watching}</h1>
            <div ref={playerRef} style={{ width: "100%", margin: "0 auto", paddingTop: "20px" }}></div >
            <Similar similarData={similarData} />
        </div>
    )
}