import { useState, useEffect } from 'react'
import { ContentInfoType } from '../../pages/ContentIntro'
import Rate, { SizeType } from '../Rate/Rate'
import './content-hero.scss'

const ContentHero = (prop: any) => {
    const [contentInfo, setContentInfo] = useState<ContentInfoType>()

    useEffect(() => {
        if (prop && prop.contentInfo && prop.contentInfo.contentData) {
            console.log('content check: ', prop);
            setContentInfo(prop.contentInfo)
        }
    }, [prop])

    const getReleaseDate = () => {
        let date = contentInfo?.contentData.release_date.split('-').join('/')
        return date
    }

    const convertToHour = (mins: number = 0) => {
        const hourNum = Math.floor(mins / 60)
        const minNum = mins % 60
        const hourText = hourNum > 0 ? `${hourNum}h` : ''
        const minText = minNum > 0 ? ` ${minNum}m` : ''

        return hourText + minText
    }

    return (
        <div className='content-hero-container'>
            <div className='image-background' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${contentInfo && contentInfo.contentData.backdrop_path})`
            }}>
            </div>
            {
                contentInfo &&
                <section className='content-container'>
                    <div className='poster-container'>
                        <img src={`https://image.tmdb.org/t/p/original${contentInfo.contentData.poster_path}`} alt='post' />
                    </div>
                    <section className='content-info space-y-4'>
                        <h2>{contentInfo.contentData.title}</h2>
                        <div className='facts'>
                            {
                                contentInfo?.rating && <span className='rating'>{contentInfo?.rating}</span>
                            }

                            <span className={contentInfo?.rating && 'pl-2'}>{getReleaseDate()}</span>
                            <span className='genres'>
                                {
                                    contentInfo?.contentData.genres.map(genre => genre.name).join(', ')
                                }
                            </span>

                            <span className='runtime'>{convertToHour(contentInfo?.contentData.runtime)}</span>
                        </div>
                        <p className='tagline'>{contentInfo?.contentData.tagline}</p>
                        <h3>Overview</h3>
                        <p>{contentInfo?.contentData.overview}</p>
                        <Rate rate={Math.floor(contentInfo?.contentData.vote_average || 0)} size={SizeType.medium} />
                    </section>
                </section>
            }
        </div>
    )
}

export default ContentHero