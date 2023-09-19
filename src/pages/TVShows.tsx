import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import '../styles/tvshows.scss'

function Shows() {
    const [tvShows, setTVShows] = useState([])
    const fetchAPI = (page = 1) => {
        const key = process.env.REACT_APP_TMDB_API_KEY
        const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=${page}`

        fetch(URL)
            .then(res => res.json())
            .then(data => setTVShows(data.results))
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    return (
        <div className='tv-shows-container max-w-7xl'>
            <div className='sort-menu'>filter section...</div>
            <div className='tv-card-container'>
                {
                    tvShows.map((show) => <Card data={show} />)
                }
            </div>
        </div>
    )
}

export default Shows