import React, { useState } from 'react'
import axios from 'axios'

function Home() {
    type ResultType = {
        // adult: boolean,
        // backdrop_path: string,
        // genre_ids: [],
        // id: number,
        // original_language: string,
        // original_title: string,
        // overview: string,
        // popularity: number,
        poster_path: string,
        // release_date: string,
        // title: string,
        // video: boolean,
        // vote_average: number,
        // vote_count: number
    }
    type DataType = {
        page: number,
        results: ResultType[],
        total_pages: number,
        total_results: number
    }
    const [data, setData] = useState<DataType>()

    React.useEffect(() => {
        const api_key = process.env.REACT_APP_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`

        axios.get(url).then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <div className=''>
            {
                data?.results.map((d, idx) => {
                    return <img src={`https://image.tmdb.org/t/p/original${d.poster_path}`} key={idx} />
                })
            }
        </div>
    )
}

export default Home