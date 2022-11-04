import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import './card-slider.scss'

interface CardSliderProps {
    children: JSX.Element[] | undefined
}

const CardSlider = (prop: CardSliderProps) => {
    const contentsRef = useRef<HTMLDivElement>(null)

    const scroll = (scrollOffset: number) => {
        (contentsRef.current) && (contentsRef.current.scrollLeft += scrollOffset)
    }

    return (
        <div className='card-slider-container'>
            <button className='absolute left-0 top-0 w-10 h-full bg-red-100' onClick={() => scroll(-300)}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div className='contents space-x-4' ref={contentsRef}>
                {prop.children}
            </div>
            <button className='absolute right-0 top-0 w-10 h-full bg-red-100' onClick={() => scroll(300)}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    )
}

export default CardSlider