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
    const [offset, setOffset] = useState(0)
    const [scrollX, setScrollX] = useState(0)
    const [isScrollEnd, setIsScrollEnd] = useState(false)
    const contentsRef = useRef<HTMLDivElement>(null)


    // called initially
    useEffect(() => {
        setScrollX(contentsRef.current?.scrollLeft ?? -1)
        // Update the state with new window width
        const handleResize = () => {
            setWindowSize(getWindowSize)
        }

        // Add a listener
        window.addEventListener('resize', handleResize)

        // Clean up the listener 
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const refObject = contentsRef.current
        refObject!.scrollLeft = scrollX
        setIsScrollEnd(refObject!.scrollWidth <= scrollX + offset + 66)
    }, [scrollX])


    const scroll = (scrollOffset: number) => {
        setOffset(scrollOffset)
        const refObject = contentsRef.current

        if (refObject!.scrollWidth > scrollX + 66) {
            setScrollX(scrollX + scrollOffset ?? -1)
        }
    }

    return (
        <div className='card-slider-container'>
            {
                // scrollX round down bc it could be sth like 0.2
                Math.floor(scrollX) > 0 ?
                    <button className='scroll-button left' onClick={() => scroll(windowSize / 2 * -1)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button> : null
            }

            <div className='contents space-x-4' ref={contentsRef}>
                {prop.children}
            </div>
            {
                !isScrollEnd &&
                <button className='scroll-button right' onClick={() => scroll(windowSize / 2)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            }

        </div>
    )
}

export default CardSlider