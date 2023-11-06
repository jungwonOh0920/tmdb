import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Accordion from '../components/Accordion/Accordion'
import Pill from '../components/Pill/Pill'
import { GenreType } from '../types'
import '../styles/tvshows.scss'
import Tooltip, { ToolTipPosition } from '../components/Tooltip/Tooltip'

function Shows() {
    const [tvShows, setTVShows] = useState([])
    const [genresMap, setGenresMap] = useState(new Map())
    const [activeGenres, setActiveGenres] = useState<string[]>([])

    useEffect(() => {
        const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_AUTHORIZATION}`
            }
        };

        const TV_URL = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
        const GENRE_URL = 'https://api.themoviedb.org/3/genre/tv/list?language=en'

        Promise.all([
            fetch(TV_URL, options),
            fetch(GENRE_URL, options)
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                setTVShows(data1.results)
                data2.genres.forEach((genre: GenreType) => {
                    setGenresMap(new Map(genresMap.set(genre.id, genre.name)))
                })
            })
    }, [])// eslint-disable-line

    useEffect(() => {
        console.log('genres in map: ', genresMap);
    }, [genresMap])

    useEffect(() => {
        console.log('activeGenres: ', activeGenres);
    }, [activeGenres])

    const handlePillClick = (genre: string) => {
        setActiveGenres((prev) => {
            if (prev.includes(genre)) return prev.filter(item => item !== genre)
            else return [...prev, genre]
        })
    }

    const getPill = () => {
        let pillContainer: Array<JSX.Element> = []

        genresMap.forEach((value: string) => {
            pillContainer.push(<Pill selectable onClickHandler={handlePillClick}>{value}</Pill>)
        })
        return pillContainer.map((pill, idx) => <span key={idx}>{pill}</span>)
    }

    return (
        <div className='max-w-7xl flex flex-col justify-center md:flex-row'>
            <div className='sort-menu'>
                <Tooltip content={<>Filter genres feature is coming soon ^.^</>} position={ToolTipPosition.top}>
                    <Accordion title='filter' open>
                        <Accordion.Content>
                            <>{getPill()}</>
                        </Accordion.Content>
                    </Accordion>
                </Tooltip>
            </div>
            <div className='tv-card-container'>
                {
                    tvShows.map((show, idx) => <div key={idx} className='ml-auto mr-auto'><Card data={show} /></div>)
                }
            </div>
        </div>
    )
}

export default Shows