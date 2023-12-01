import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentHero from '../components/ContentHero/ContentHero'
import Tabs from '../components/Tabs/Tabs'
import CardSlider from '../components/CardSlider/CardSlider'
import Card from '../components/Card/Card'
import Button, { ButtonTypes } from '../components/Button/Button'
import { TVObjectType, MovieObjectType, PlatformTypes, CastType } from '../types'
import noPoster from '../assets/images/noPoster.png'
import OPTIONS from '../api/apiConfig'
import '../styles/contentInfo.scss'

// interface ReleaseDatesType {
//     iso_3166_1: string,
//     release_dates: [{ certification: string }]
// }

interface CastCardProp {
    cast: CastType
}

const ContentIntro = () => {
    let location = useLocation()
    const [id, setId] = useState(0)
    const [isMovie, setIsMovie] = useState(true)
    // const [contentData, setContentData] = useState<MovieObjectType | TVObjectType>()
    const [movieData, setMovieData] = useState<MovieObjectType>()
    const [tvData, setTvData] = useState<TVObjectType>()
    const [isCastLoading, setIsCastLoading] = useState(false)

    // const [movieDataWithRate, setMovieDataWithRate] = useState<MovieWithRateType>()
    // const [TVDataWithRate, setTVDataWithRate] = useState<TVWithRateType>()
    // const [rating, setRating] = useState('')

    useEffect(() => {
        const locationArray = location.pathname.split('/')
        setId(Number(locationArray[3]))
        if (locationArray[2] === 'tv') setIsMovie(false)

        const fetchContent = async () => {
            try {
                let END_POINT = null
                if (isMovie) {
                    END_POINT = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,recommendations,videos`
                } else {
                    END_POINT = `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,recommendations,videos`
                }
                setIsCastLoading(true)
                let res = await fetch(END_POINT, OPTIONS)
                const data = await res.json()
                isMovie ? setMovieData(data) : setTvData(data)
            } catch (error) {
                console.error(error)
                setIsCastLoading(false)
            }
        }
        if (location && id) {
            fetchContent()
        }
    }, [location, id, isMovie])

    useEffect(() => {
        if (movieData || tvData) setIsCastLoading(false)
    }, [movieData, tvData])

    const CastCard = ({ cast }: CastCardProp) => {
        return <li className='cast-card'>
            <img
                src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt='cast-profile'
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src = `${noPoster}`
                }} />
            <p className='cast-name'>{cast.name}</p>
            <p className='character'>{cast.character}</p>
        </li>
    }

    return (
        <div className='space-y-4'>
            {
                isMovie ?
                    (movieData && <ContentHero isMovie={isMovie} movie={movieData} />) : (tvData && <ContentHero isMovie={isMovie} tv={tvData} />)
            }
            <Tabs tabTitles={['Top Billed Cast']}>
                <CardSlider isLoading={isCastLoading}>
                    {
                        isMovie ? (movieData && movieData.credits.cast.map((c, idx) => <CastCard cast={c} key={idx} />))
                            :
                            (tvData && tvData.credits.cast.map((c, idx) => <CastCard cast={c} key={idx} />))
                    }
                </CardSlider>
            </Tabs>
        </div>
    )
}

export default ContentIntro