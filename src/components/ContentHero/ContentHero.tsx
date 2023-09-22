import { useState, useEffect } from 'react'
import { MovieInfoRateType } from '../../pages/ContentInfo'
import { TVType } from '../../pages/Home'
import Rate, { SizeType } from '../Rate/Rate'
import Button from '../Button/Button'
import './content-hero.scss'
import Modal from '../Modal/Modal'
import noPoster from '../../assets/images/noPoster.png'

interface ContentHeroPropType {
    content: MovieInfoRateType
}

const ContentHero = ({ content }: ContentHeroPropType) => {
    const [contentInfo, setContentInfo] = useState<MovieInfoRateType>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // const [trailerKey, setTrailerKey] = useState<string>('')
    const key = process.env.REACT_APP_TMDB_API_KEY

    useEffect(() => {
        console.log('content check: ', content);
    }, [content])
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
            <div className='image-background'
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${content.contentData && content.contentData.backdrop_path})` }}></div>
            {
                contentInfo &&
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original${contentInfo.contentData.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = `${noPoster}`
                            }}
                            alt='post' />
                    </div>
                    <section className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                        <h2>{contentInfo.contentData.title}</h2>
                        <div className='facts'>
                            {
                                contentInfo.rating && <span className='rating'>{contentInfo?.rating}</span>
                            }

                            {/* <span className={contentInfo.rating && 'pl-2'}>{getReleaseDate()}</span> */}
                            <span className='genres'>
                                {
                                    contentInfo.contentData.genres.map(genre => genre.name).join(', ')
                                }
                            </span>
                            <span className='runtime'>{convertToHour(contentInfo.contentData.runtime)}</span>
                        </div>
                        <p className='tagline'>{contentInfo.contentData.tagline}</p>
                        <h3>Overview</h3>
                        <p>{contentInfo.contentData.overview}</p>

                        <Rate rate={Math.floor(contentInfo.contentData.vote_average || 0)} size={SizeType.medium} />
                        <Button onClick={toggleModal}>Play Trailer</Button>
                        {/* {
                            isModalOpen ?
                                <>
                                    <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                                        <iframe
                                            title='trailer'
                                            src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
                                    </Modal>
                                </>
                                : ''
                        } */}
                    </section>
                </section>
            }
        </div>
    )
}

export default ContentHero