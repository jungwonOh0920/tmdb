import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentHero from '../components/ContentHero/ContentHero'
import Tabs from '../components/Tabs/Tabs'
import CardSlider from '../components/CardSlider/CardSlider'
import Card from '../components/Card/Card'
import Button, { ButtonTypes } from '../components/Button/Button'
import { TVObjectType, MovieObjectType, PlatformTypes, CastType } from '../types'
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
    const [contentData, setContentData] = useState<MovieObjectType | TVObjectType>()
    // const [movieDataWithRate, setMovieDataWithRate] = useState<MovieWithRateType>()
    // const [TVDataWithRate, setTVDataWithRate] = useState<TVWithRateType>()
    // const [rating, setRating] = useState('')
    // const [isLoading, setIsLoading] = useState<any>(false)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const END_POINT = `https://api.themoviedb.org/3/${isMovie ? 'movie' : 'tv'}/${id}?append_to_response=credits,recommendations`
                let res = await fetch(END_POINT, OPTIONS)
                const data = await res.json()
                setContentData(data)
            } catch (error) {
                console.error(error)
            }
        }

        const locationArray = location.pathname.split('/')
        setId(Number(locationArray[3]))
        if (locationArray[2] === 'tv') setIsMovie(false)

        if (location && id) {
            fetchContent()
        }
    }, [location, id, isMovie])

    // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    // useEffect(() => {
    //     setMovieDataWithRate({
    //         contentData: movieInfo as MovieObjectType,
    //         rating: rating
    //     })

    //     setTVDataWithRate({
    //         contentData: TVInfo as TVObjectType,
    //         rating: rating
    //     })

    //     setIsLoading(true)
    // }, [contentData, rating])

    // useEffect(() => {
    //     const fetchTV = async () => {
    //         const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION
    //         const TV_END_POINT = `https://api.themoviedb.org/3/tv/${id}?&append_to_response=credits`
    //         const TV_RATE_END_POINT = `https://api.themoviedb.org/3/tv/${id}/content_ratings`

    //         const OPTIONS = {
    //             method: 'GET',
    //             headers: {
    //                 accept: 'application/json',
    //                 Authorization: `Bearer ${TMDB_AUTHORIZATION}`
    //             }
    //         }

    //         let [tvData, contentRatings] = await Promise.all([
    //             fetch(TV_END_POINT, OPTIONS).then(res => res.json()).catch(err => console.error(err)),
    //             fetch(TV_RATE_END_POINT, OPTIONS).then(res => res.json()).catch(err => console.error(err))
    //         ])
    //         setTVInfo(tvData)
    //         setRating(contentRatings.results[0].rating)
    //     }
    // }, [platform, id])

    // const getUSRating = (releaseDates: ReleaseDatesType[]) => {
    //     for (let i = 0; i < releaseDates.length; i++) {
    //         const curr = releaseDates[i]

    //         if (curr.iso_3166_1 === 'US') {
    //             const rating = curr.release_dates[0].certification
    //             setRating(rating)
    //         }
    //     }
    // }

    const CastCard = ({ cast }: CastCardProp) => {
        return <li className='cast-card'>
            <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt='cast-profile' />
            <p className='cast-name'>{cast.name}</p>
            <p className='character'>{cast.character}</p>
        </li>
    }

    return (
        <div className='space-y-4'>
            {
                contentData && <ContentHero platform={isMovie ? PlatformTypes.movie : PlatformTypes.tv} content={contentData} />
            }
            <Tabs tabTitles={['Top Billed Cast']}>
                <CardSlider>
                    {
                        contentData && (
                            contentData.credits.cast.length > 10 ?
                                <>
                                    {contentData.credits.cast.slice(0, 10).map((c, idx) => <CastCard cast={c} key={idx} />)}
                                    <div className='mb-auto mt-auto w-40'>
                                        <Button type={ButtonTypes.noBorder}>View More </Button>
                                    </div>
                                </> : contentData.credits.cast.map((c, idx) => <CastCard cast={c} key={idx} />)
                        )
                    }
                </CardSlider>
            </Tabs>
            {
                contentData && contentData.recommendations.results.length ?
                    <Tabs tabTitles={['Recommendations']}>
                        <CardSlider>
                            {
                                contentData.recommendations.results.map((data, idx) => <Card data={data} key={idx} />)
                            }
                        </CardSlider>
                    </Tabs>
                    : ''
            }
        </div>
    )
}

export default ContentIntro