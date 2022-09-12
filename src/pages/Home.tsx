import React from 'react'

function Home() {

    React.useEffect(() => {
        const api_key = process.env.REACT_APP_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/550?api_key=${api_key}`

    })

    return (
        <div className=''>Home Page will come soon... </div>
    )
}

export default Home