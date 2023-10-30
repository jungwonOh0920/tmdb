import { useEffect, useState, useCallback } from 'react'
import Card from '../components/Card/Card'
import Accordion from '../components/Accordion/Accordion'
import Pill from '../components/Pill/Pill'
import { GenreType } from '../types'
import '../styles/tvshows.scss'

function Shows() {
    const [tvShows, setTVShows] = useState([])
    const [genres, setGenres] = useState<string[]>([])
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
        const fetchAPI = (page = 1) => {
            const URL = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'

            fetch(URL, options).then(res => res.json())
                .then(data => {
                    setTVShows(data.results)
                }).catch(err => console.error(err))
        }

        const fetchGenres = () => {
            const URL = 'https://api.themoviedb.org/3/genre/tv/list?language=en'

            fetch(URL, options).then(res => res.json())
                .then(data => {
                    data.genres.forEach((genre: GenreType, idx: number) => {
                        setGenres((prev) => [...prev, genre.name])
                    })

                }).catch(err => console.error(err))
        }

        fetchAPI()
        fetchGenres()
    }, [])

    useEffect(() => {
        console.log('activeGenres: ', activeGenres);
    }, [activeGenres])

    const handlePillClick = (genre: string) => {
        setActiveGenres((prev) => {
            if (prev.includes(genre)) return prev.filter(item => item !== genre)
            else return [...prev, genre]
        })
    }

    const FilterContent = useCallback(() => {
        return <>{genres.map((genre, idx) => <Pill selectable key={idx} onClickHandler={handlePillClick}>{genre}</Pill>)}</>
    }, [genres])

    return (
        <div className='max-w-7xl flex flex-col justify-center md:flex-row'>
            <div className='sort-menu'>
                <Accordion title='filter' open>
                    <Accordion.Content><FilterContent /></Accordion.Content>
                </Accordion>
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