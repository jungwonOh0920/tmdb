import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import './card-slider.scss'

interface CardSliderProps {
    children: JSX.Element[] | undefined
}

const getWindowSize = () => {
    const { innerWidth } = window
    return innerWidth
}

const CardSlider = (prop: CardSliderProps) => {
    const [windowSize, setWindowSize] = useState(getWindowSize)
    const contentsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        // Update the state with new window width
        const handleResize = () => {
            setWindowSize(getWindowSize)
        }

        // add a listener
        window.addEventListener('resize', handleResize)

        // Clean up the listener 
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const scroll = (scrollOffset: number) => {
        (contentsRef.current) && (contentsRef.current.scrollLeft += scrollOffset)
    }

    return (
        <div className='card-slider-container'>
            <button className='absolute left-0 top-0 w-10 h-full bg-red-100' onClick={() => scroll(windowSize / 2 * -1)}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div className='contents space-x-4' ref={contentsRef}>
                {prop.children}
            </div>
            <button className='absolute right-0 top-0 w-10 h-full bg-red-100' onClick={() => scroll(windowSize / 2)}>
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    )
}

export default CardSlider