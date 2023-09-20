import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import '../styles/tvshows.scss'

function Shows() {
    const [tvShows, setTVShows] = useState([])
    const fetchAPI = (page = 1) => {
        // const key = process.env.REACT_APP_TMDB_API_KEY
        // const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=${page}`

        // fetch(URL)
        //     .then(res => res.json())
        //     .then(data => setTVShows(data.results))
        const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION
        const URL = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_AUTHORIZATION}`
            }
        };

        fetch(URL, options).then(res => res.json())
            .then(data => {
                console.log(data.results)
                setTVShows(data.results)
            })
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    return (
        <div className='tv-shows-container max-w-7xl'>
            <div className='sort-menu'>filter section...</div>
            <div className='tv-card-container'>
                {
                    tvShows.map((show, idx) => <div key={idx}><Card data={show} /></div>)
                }
            </div>
        </div>
    )
}

export default Shows