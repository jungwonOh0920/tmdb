import React, { useEffect, useState } from 'react'
import './hero.scss'
import eventBus from "../../assets/utilities/EventBus"

const Hero = ({ tvData }: any) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        eventBus.on('adjustWidth', (d: number) => {
            setIsMobile(d < 760)
        })
    }, [])

    return (
        <div className='hero-container'>
            {
                isMobile ?
                    <div className="row">
                        {
                            tvData &&
                            tvData.map((d: any) => {
                                return <div className='img-container'>
                                    <img src={`https://image.tmdb.org/t/p/original${d.backdrop_path}`} />
                                </div>
                            })}
                    </div> :
                    <img src="https://www.peacocktv.com/dam/commerce/assets/221005-hero-1440x753-04.jpg?downsize=1200:*&output-quality=70" alt="hero" />
            }

            <div className='hero-content-container'>
                <div className="hero-content">
                    <h1 className='text-5xl'>
                        Bingeworthy TV, Hit Movies, Live Sports & So Much More
                    </h1>
                    <p>
                        Stream it all for only $4.99/month. Cancel anytime.
                    </p>
                    <button>Pick a Plan</button>
                </div>
            </div>
        </div>
    )
}

export default Hero