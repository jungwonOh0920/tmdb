import React, { useState } from 'react'
import axios from 'axios'

function Home() {
    const [data, setData] = useState()

    React.useEffect(() => {
        const api_key = process.env.REACT_APP_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/550?api_key=${api_key}`

        axios.get(url).then(res => {
            console.log(res.data)
            setData(res.data.title)
        })
    })

    return (
        <div className=''>{data}</div>
    )
}

export default Home