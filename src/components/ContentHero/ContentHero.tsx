import { useState, useEffect } from 'react'
import Rate, { SizeType } from '../Rate/Rate'
import Button from '../Button/Button'
import './content-hero.scss'
import Modal from '../Modal/Modal'
import noPoster from '../../assets/images/noPoster.png'
import { MovieWithRateType, MovieObjectType, TVWithRateType, TVObjectType } from '../../types'

// interface MovieProp {
//     type: PlatformTypes.movie
//     // content: MovieWithRateType
//     content: MovieObjectType | undefined
// }

// interface TVProp {
//     type: PlatformTypes.tv
//     // content: TVWithRateType
//     content: TVObjectType | undefined
// }

// type ContentHeroPropType = MovieProp | TVProp

interface ContentHeroPropType {
    isMovie: boolean
    movie?: MovieObjectType
    tv?: TVObjectType
}

const ContentHero = ({ isMovie, movie, tv }: ContentHeroPropType) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    // const getReleaseDate = () => {
    //     if (platform === PlatformTypes.movie && content) {
    //         const movieContent = content as MovieObjectType
    //         let date = movieContent.release_date.split('-').join('/')
    //         return date
    //     }
    // }
    useEffect(() => { console.log('tv check: ', tv); }, [tv])
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

    const movieHero = () => {
        return <>
            {movie && <>
                <div className='image-background'
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})` }} />
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = `${noPoster}`
                            }}
                            alt='post' />
                    </div>
                    <div className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                        <h2>{movie.title}</h2>
                        <div className='facts'>
                            {/* {
                                props.content.rating ? <span className='rating'>{props.content?.rating}</span> : ''
                            }
                            <span className={props.content.rating && 'pl-2'}>{getReleaseDate()}</span> */}
                            <span className='genres'>
                                {
                                    movie.genres.map(genre => genre.name).join(', ')
                                }
                            </span>
                            <span className='runtime'>{convertToHour(movie.runtime)}</span>
                        </div>
                        <p className='tagline'>{movie.tagline}</p>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                        <Rate rate={Math.floor(movie.vote_average || 0)} size={SizeType.medium} />
                        <br />
                        <Button onClick={toggleModal}>Play Trailer</Button>
                        {
                            isModalOpen ?
                                <>
                                    <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                                        <iframe
                                            title='trailer'
                                            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}></iframe>
                                    </Modal>
                                </> : ''
                        }
                    </div>
                </section>
            </>
            }
        </>
    }

    const tvHero = () => {
        return (
            tv && <>
                <div className='image-background'
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tv.backdrop_path})` }}></div>
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null
                                currentTarget.src = `${noPoster}`
                            }}
                            alt='post' />
                    </div>
                    <div className={`content-info ${isModalOpen ? 'space-y-4' : ''}`}>
                        <h2>{tv.name}</h2>
                        <div className='facts'>
                            {/* {
                                props.content.rating ? <span className='rating'>{props.content?.rating}</span> : ''
                            }
                            <span className={props.content.rating && 'pl-2'}>{getReleaseDate()}</span> */}
                            <span className='genres'>
                                {
                                    tv.genres && tv.genres.map(genre => genre.name).join(', ')
                                }
                            </span>
                            {/* <span className='runtime'>{convertToHour(props.content.contentData.runtime)}</span> */}
                        </div>
                        <p className='tagline'>{tv.tagline}</p>
                        <h3>Overview</h3>
                        <p>{tv.overview}</p>
                        <Rate rate={Math.floor(tv.vote_average || 0)} size={SizeType.medium} />
                        <br />
                        {
                            tv.videos.results.length ? <>
                                <Button onClick={toggleModal}>Play Trailer</Button>
                                {
                                    isModalOpen ?
                                        <>
                                            <Modal modalHeader='Play Trailer' toggleModal={toggleModal}>
                                                <iframe
                                                    title='trailer'
                                                    src={`https://www.youtube.com/embed/${tv.videos.results[0].key}`}></iframe>
                                            </Modal>
                                        </>
                                        : ''
                                }
                            </> : ''
                        }
                    </div>
                </section>
            </>
        )
    }

    return (
        <div className='content-hero-container'>
            {isMovie ? movieHero() : tvHero()}
        </div>
    )
}

export default ContentHero