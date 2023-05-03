import { useState, useEffect } from 'react'
import { ContentInfoType } from '../../pages/ContentIntro'
import './content-hero.scss'

const ContentHero = (prop: any) => {
    const [contentInfo, setContentInfo] = useState<ContentInfoType>()

    useEffect(() => {
        if (prop && prop.contentInfo && prop.contentInfo.contentData) {
            setContentInfo(prop.contentInfo)
        }
    }, [prop])

    return (
        <div className='content-hero-container'>
            <div className='image-background' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${contentInfo && contentInfo.contentData.backdrop_path})`
            }}>
            </div>
            <div className='content-container'>
                <div className='poster-container'>
                    <img src={`https://image.tmdb.org/t/p/original${contentInfo && contentInfo.contentData.poster_path}`} alt='post' />
                </div>
                <div className='content-info'>
                    <h2>{contentInfo && contentInfo?.contentData.title}</h2>
                    <div className='facts'>
                        <span className='rating'>{contentInfo?.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentHero