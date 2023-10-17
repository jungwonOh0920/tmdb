import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Accordion from '../components/Accordion/Accordion'
import { GenreType } from '../types'
import '../styles/tvshows.scss'

function Shows() {
    const [tvShows, setTVShows] = useState([])
    const [genres, setGenres] = useState<string[]>([])

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
                    data.genres.forEach((genre: GenreType) => {
                        setGenres((prev) => [...prev, genre.name])
                    })

                }).catch(err => console.error(err))
        }

        fetchAPI()
        fetchGenres()
    }, [])

    useEffect(() => {
        console.log('genres: ', genres);
    }, [genres])

    const FilterContent = () => {
        return <div>{genres}</div>
    }

    return (
        <div className='tv-shows-container max-w-7xl'>
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