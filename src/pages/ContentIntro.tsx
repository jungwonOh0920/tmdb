import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentHero from '../components/ContentHero/ContentHero'
import "../styles/contentIntro.scss"

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
        setPlatform(locationArray[2] === 'tv' ? platformTypes.tv : platformTypes.movie)
    }, [location.pathname])

    // useEffect(() => {
    //     console.log('content: ', contentData)
    // }, [contentData])

    useEffect(() => {
        const fetchAPI = async () => {
            if (platform === platformTypes.movie) {
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
        fetchAPI()
    }, [platform, id, key])

    return (
        <div className='content-intro-container'>
            <ContentHero contentData={contentData} />
            {/* {
                <p>{contentData ? contentData.title : ''}</p>
            } */}
        </div>
    )
}

export default ContentIntro