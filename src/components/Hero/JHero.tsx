import React from 'react'
import './hero.scss'

const JHero = ({ tvData }: any) => {
    const data = tvData;

    return (
        <div className='j-hero-container'>
            <div className="row">
                {
                    tvData &&
                    tvData.map((d: any) => {
                        return <div className='img-container'>
                            <img src={`https://image.tmdb.org/t/p/original${d.backdrop_path}`} />
                        </div>
                    })}
            </div>

        </div>
    )
}

export default JHero