import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ContentHero from '../components/ContentHero/ContentHero'
import Tabs from '../components/Tabs/Tabs'
import CardSlider from '../components/CardSlider/CardSlider'
import Card from '../components/Card/Card'
import { TVType } from '../pages/Home'
import "../styles/contentIntro.scss"

export enum PlatformTypes {
    tv,
    movie
}

interface ReleaseDatesType {
    iso_3166_1: string,
    release_dates: [{ certification: string }]
}

export interface MovieInfoType {
    backdrop_path: string,
    poster_path: string,
    title: string,
    release_date: string,
    genres: { id: number, name: string }[],
    runtime: number,
    vote_average: number,
    overview: string,
    tagline: string,
    id: number
}

export interface MovieInfoRateType {
    contentData: MovieInfoType,
    rating: string
}

const ContentIntro = () => {
    let location = useLocation()
    const [id, setId] = useState(0)
    const [platform, setPlatform] = useState<PlatformTypes>()
    const [movieInfoRate, setMovieInfoRate] = useState<MovieInfoRateType>()
    const [movieInfo, setMovieInfo] = useState<MovieInfoType>()
    const [TVInfo, setTVInfo] = useState<TVType>()
    const [rating, setRating] = useState('')
    const [recommendationsData, setRecommendationsData] = useState<MovieInfoType[]>([])
    const [isLoading, setIsLoading] = useState<any>(false)

    const key = process.env.REACT_APP_TMDB_API_KEY

    // useEffect(() => {
    //     console.log('tvData: ', TVInfo);
    // }, [TVInfo])
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

        setMovieInfoRate({
            contentData: movieInfo as MovieInfoType,
            rating: rating
        })

        setIsLoading(true)

        if (movieInfo) {
            fetchRecommendation()
        }
    }, [movieInfo, rating, key])

    useEffect(() => {
        console.log('check: ', recommendationsData);
        if (recommendationsData) {
            setIsLoading(false)
        }
    }, [recommendationsData])

    useEffect(() => {
        const fetchTV = () => {
            const TMDB_AUTHORIZATION = process.env.REACT_APP_TMDB_AUTHORIZATION

            const URL = `https://api.themoviedb.org/3/tv/${id}`
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_AUTHORIZATION}`
                }
            };
            fetch(URL, options).then(res => res.json()).then(data => {
                setTVInfo(data)
            })
        }

        const fetchAPI = async () => {
            if (platform === PlatformTypes.movie) {
                try {
                    let [movieData, releaseDates] = await Promise.all([
                        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`).then(res => res.json()),
                        fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${key}`).then(res => res.json())
                    ])
                    setMovieInfo(movieData)
                    getUSRating(releaseDates.results)
                } catch (err) {
                    console.log('err: ', err);
                }
            } else {
                fetchTV()
            }
        }
        fetchAPI()
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
    return (
        <div className='space-y-4'>
            {
                platform === PlatformTypes.movie ? (movieInfoRate && <ContentHero type={PlatformTypes.movie} content={movieInfoRate} />) :
                    (TVInfo && <ContentHero type={PlatformTypes.tv} content={TVInfo} />)
            }
            {
                recommendationsData.length ?
                    <Tabs titles={['Recommendations']}>
                        <CardSlider isLoading={isLoading}>
                            {
                                recommendationsData?.map((data: MovieInfoType, idx: number) => <Card data={data} key={idx} />)
                            }
                        </CardSlider>
                    </Tabs> : ''
            }
        </div>
    )
}

export default ContentIntro