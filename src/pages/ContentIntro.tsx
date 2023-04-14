import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

enum platformTypes {
    tv,
    movie
}

const ContentIntro = () => {
    let location = useLocation()
    const [id, setId] = useState(0)
    const [platform, setPlatform] = useState<platformTypes>()
    const [contentData, setContentData] = useState<any>()

    const key = process.env.REACT_APP_TMDB_API_KEY

    useEffect(() => {
        const locationArray = location.pathname.split('/')
        setId(Number(locationArray[3]))
        setPlatform(locationArray[2] == 'tv' ? platformTypes.tv : platformTypes.movie)

        // fetchAPI()
    }, [])

    useEffect(() => {
        console.log('contentData: ', contentData)
    }, [contentData])

    useEffect(() => {
        fetchAPI()
    }, [platform])

    const fetchAPI = async () => {
        console.log('platform: ', platform)
        if (platform == platformTypes.movie) {
            console.log('hitting');
            await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`).then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw res
            }).then(data => setContentData(data)).catch(error => {
                console.log('error fetching contentData...')
            })
        }
    }

    return (
        <div>
            <h1>ContentIntro - Still working on it...</h1>
            <p>{id}</p>
            {
                <p>{contentData ? contentData.title : ''}</p>
            }

        </div>
    )
}

export default ContentIntro