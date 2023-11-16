import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentHero from '../components/ContentHero/ContentHero'
import Tabs from '../components/Tabs/Tabs'
import CardSlider from '../components/CardSlider/CardSlider'
import Card from '../components/Card/Card'
import Button, { ButtonTypes } from '../components/Button/Button'
import { TVObjectType, TVWithRateType, MovieObjectType, MovieWithRateType, ContentDetailInfoType, PlatformTypes, CastType } from '../types'
import '../styles/contentInfo.scss'

interface ReleaseDatesType {
    iso_3166_1: string,
    release_dates: [{ certification: string }]
}

interface CastCardProp {
    cast: CastType
}

// TODO: We're fetching TV or movie again but we already have data from Home.tsx. 
// The only thing we need to fetch is rate with ID.

const ContentIntro = () => {
    let location = useLocation()
    const [id, setId] = useState(0)
    const [platform, setPlatform] = useState<PlatformTypes>()
    // TODO: combine movieInfo and TVInfo together
    const [contentDetailInfo, setContentDetailInfo] = useState<ContentDetailInfoType>()
    const [movieInfo, setMovieInfo] = useState<MovieObjectType>()
    const [TVInfo, setTVInfo] = useState<TVObjectType>()
    const [movieDataWithRate, setMovieDataWithRate] = useState<MovieWithRateType>()
    const [TVDataWithRate, setTVDataWithRate] = useState<TVWithRateType>()
    const [rating, setRating] = useState('')
    const [recommendationsData, setRecommendationsData] = useState<MovieObjectType[]>([])
    const [isLoading, setIsLoading] = useState<any>(false)
    const key = process.env.REACT_APP_TMDB_API_KEY

    useEffect(() => {
        const locationArray = location.pathname.split('/')
        setId(Number(locationArray[3]))
        setPlatform(locationArray[2] === 'tv' ? PlatformTypes.tv : PlatformTypes.movie)
    }, [location.pathname])

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    useEffect(() => {
        const fetchRecommendation = async () => {
            await sleep(2000)
            fetch(`https://api.themoviedb.org/3/movie/${movieInfo?.id}/recommendations?api_key=${key}&language=en-US&page=1`)
                .then((res) => {
                    return res.json()
                })
                .then(data => setRecommendationsData(data.results))
        }

        setMovieDataWithRate({
            contentData: movieInfo as MovieObjectType,
            rating: rating
        })

        setTVDataWithRate({
            contentData: TVInfo as TVObjectType,
            rating: rating
        })

        setIsLoading(true)

        if (movieInfo) {
            fetchRecommendation()
        }
    }, [movieInfo, TVInfo, rating, key])

    useEffect(() => {
        if (recommendationsData) {
            setIsLoading(false)
        }
    }, [recommendationsData])

    useEffect(() => {
        const fetchTV = async () => {
            const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION
            const TV_END_POINT = `https://api.themoviedb.org/3/tv/${id}?&append_to_response=credits`
            const TV_RATE_END_POINT = `https://api.themoviedb.org/3/tv/${id}/content_ratings`

            const OPTIONS = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_AUTHORIZATION}`
                }
            }

            let [tvData, contentRatings] = await Promise.all([
                fetch(TV_END_POINT, OPTIONS).then(res => res.json()).catch(err => console.error(err)),
                fetch(TV_RATE_END_POINT, OPTIONS).then(res => res.json()).catch(err => console.error(err))
            ])
            setTVInfo(tvData)
            setRating(contentRatings.results[0].rating)
        }

        const fetchMovie = async () => {
            try {
                let [movieData, releaseDates] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=credits`).then(res => res.json()),
                    fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${key}`).then(res => res.json())
                ])
                setMovieInfo(movieData)
                getUSRating(releaseDates.results)
            } catch (err) {
                console.log('err: ', err);
            }
        }

        const fetchAPI = async () => {
            if (platform === PlatformTypes.movie) {
                fetchMovie()
            } else {
                fetchTV()
            }
        }
        if (id) {
            fetchAPI()
        }
    }, [platform, id, key])

    const getUSRating = (releaseDates: ReleaseDatesType[]) => {
        for (let i = 0; i < releaseDates.length; i++) {
            const curr = releaseDates[i]

            if (curr.iso_3166_1 === 'US') {
                const rating = curr.release_dates[0].certification
                setRating(rating)
            }
        }
    }

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
                platform === PlatformTypes.movie ? (movieDataWithRate && <ContentHero type={PlatformTypes.movie} content={movieDataWithRate} />) :
                    (TVDataWithRate && <ContentHero type={PlatformTypes.tv} content={TVDataWithRate} />)
            }
            {
                <Tabs tabTitles={['Top Billed Cast']}>
                    <CardSlider>
                        {
                            platform === PlatformTypes.movie ?
                                (
                                    movieInfo && movieInfo.credits.cast.length >= 10 ? <>
                                        {
                                            movieInfo.credits.cast.slice(0, 10).map((c, idx) => <CastCard cast={c} key={idx} />)
                                        }
                                        <div className='mb-auto mt-auto w-40'>
                                            <Button type={ButtonTypes.noBorder}>View More </Button>
                                        </div>
                                    </>
                                        : (
                                            movieInfo?.credits.cast.map((c, idx) => <CastCard cast={c} key={idx} />)
                                        )
                                )
                                : (
                                    TVInfo && TVInfo.credits.cast.length >= 10 ?
                                        <>
                                            {
                                                TVInfo.credits.cast.slice(0, 10).map((c, idx) => <CastCard cast={c} key={idx} />)
                                            }
                                            <div className='mb-auto mt-auto w-40'>
                                                <Button type={ButtonTypes.noBorder}>View More </Button>
                                            </div>
                                        </>
                                        :
                                        (TVInfo?.credits.cast.map((c, idx) => <CastCard cast={c} key={idx} />))
                                )
                        }
                    </CardSlider>
                </Tabs>
            }
            {
                recommendationsData.length ?
                    <Tabs tabTitles={['Recommendations']}>
                        <CardSlider isLoading={isLoading}>
                            {
                                recommendationsData?.map((data: MovieObjectType, idx: number) => <Card data={data} key={idx} />)
                            }
                        </CardSlider>
                    </Tabs> : ''
            }
        </div>
    )
}

export default ContentIntro