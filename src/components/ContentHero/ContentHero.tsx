import { useState, useEffect } from 'react'
import './content-hero.scss'

const ContentHero = ({ contentData }: any) => {
    const [backgroundImage, setBackgroundImage] = useState('')

    useEffect(() => {
        contentData && setBackgroundImage(contentData.backdrop_path)
        console.log('contentData: ', contentData)
    }, [contentData])

    return (
        <div className='content-hero-container'>
            {/* {contentData ? contentData.title : ''} */}
            <div className='image-background' style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${backgroundImage})`
            }}>
            </div>
            <div className='content-container'>
                <div className='poster-container'>
                    <img src={`https://image.tmdb.org/t/p/original${contentData && contentData.poster_path}`} alt='post' />
                </div>
                <div className='content-info'>
                    <h2 style={{ color: 'white' }}>{contentData ? contentData.title : ''}</h2>
                </div>
            </div>
        </div>
    )
}

export default ContentHero