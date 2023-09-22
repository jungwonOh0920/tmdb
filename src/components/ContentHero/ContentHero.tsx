import { useState, useEffect } from 'react'
import { MovieInfoRateType } from '../../pages/ContentInfo'
import { TVType } from '../../pages/Home'
import Rate, { SizeType } from '../Rate/Rate'
import Button from '../Button/Button'
import './content-hero.scss'
import Modal from '../Modal/Modal'
import noPoster from '../../assets/images/noPoster.png'
import { useLocation } from 'react-router-dom'
import { PlatformTypes } from '../../pages/ContentInfo'

interface MovieProp {
    type: PlatformTypes.movie
    content: MovieInfoRateType
}

interface TVProp {
    type: PlatformTypes.tv
    content: TVType
}

type ContentHeroPropType = MovieProp | TVProp

const ContentHero = (props: ContentHeroPropType) => {
    let location = useLocation()
    // const [platform, setPlatform] = useState<PlatformTypes>()
    // const [contentInfo, setContentInfo] = useState<MovieInfoRateType>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // const [trailerKey, setTrailerKey] = useState<string>('')
    const key = process.env.REACT_APP_TMDB_API_KEY

    // useEffect(() => {
    //     console.log('content check: ', props);
    // }, [props])

    // useEffect(() => {
    //     const locationArray = location.pathname.split('/')
    //     setPlatform(locationArray[2] === 'tv' ? PlatformTypes.tv : PlatformTypes.movie)
    // }, [location.pathname])

    useEffect(() => { }, [])

    // useEffect(() => {
    //     console.log('contentInfo: ', contentInfo)
    //     const fetchAPI = async () => {
    //         try {
    //             let res = await fetch(`https://api.themoviedb.org/3/movie/${contentInfo?.contentData.id}/videos?api_key=${key}&language=en-US`)
    //             const jsonData = await res.json()
    //             setTrailerKey(jsonData.results[0].key)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     if (prop && prop.contentInfo && prop.contentInfo.contentData) {
    //         setContentInfo(prop.contentInfo)
    //         fetchAPI()
    //     }
    // }, [prop, contentInfo, key])

    // const getReleaseDate = () => {
    //     let date = contentInfo?.contentData.release_date.split('-').join('/')
    //     return date
    // }

    const convertToHour = (mins: number = 0) => {
        const hourNum = Math.floor(mins / 60)
        const minNum = mins % 60
        const hourText = hourNum > 0 ? `${hourNum}h` : ''
        const minText = minNum > 0 ? ` ${minNum}m` : ''

        return hourText + minText
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div className='content-hero-container'>
            {props.type === PlatformTypes.movie ? (props.content.contentData && props.content.contentData.title) : (props.content.name)}
            {/* <div className='image-background'
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${content.contentData && content.contentData.backdrop_path})` }}></div> */}
            {
                // content.contentData &&
                // <section className='content-container'>
                //     <div className='poster-container'>
                //         <img src={`https://image.tmdb.org/t/p/original${content.contentData.poster_path}`}
                //             onError={({ currentTarget }) => {
                //                 currentTarget.onerror = null
                //                 currentTarget.src = `${noPoster}`
                //             }}
                //             alt='post' />
                //     </div>
                //     <section className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                //         <h2>{content.contentData.title}</h2>
                //         <div className='facts'>
                //             {
                //                 content.rating && <span className='rating'>{content?.rating}</span>
                //             }

                //             <span className={content.rating && 'pl-2'}>{getReleaseDate()}</span>
                //             <span className='genres'>
                //                 {
                //                     content.contentData.genres.map(genre => genre.name).join(', ')
                //                 }
                //             </span>
                //             <span className='runtime'>{convertToHour(content.contentData.runtime)}</span>
                //         </div>
                //         <p className='tagline'>{content.contentData.tagline}</p>
                //         <h3>Overview</h3>
                //         <p>{content.contentData.overview}</p>

                //         <Rate rate={Math.floor(content.contentData.vote_average || 0)} size={SizeType.medium} />
                //         <Button onClick={toggleModal}>Play Trailer</Button>
                //         {
                //             isModalOpen ?
                //                 <>
                //                     <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                //                         <iframe
                //                             title='trailer'
                //                             src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
                //                     </Modal>
                //                 </>
                //                 : ''
                //         }
                //     </section>
                // </section>
            }
        </div>
    )
}

export default ContentHero