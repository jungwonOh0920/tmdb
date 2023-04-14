import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import './card.scss'

function CardOverlay({ data }: any) {
    const [isMovie, setIsMovie] = useState(false)

    useEffect(() => {
        if (data.title && data.release_date) {
            setIsMovie(true)
        }
    }, [data.title, data.release_date])

    return (
        <div className='card-overlay'>
            <Button linkTo={`/contents/${isMovie ? 'movie' : 'tv'}/${data.id}`}>See details</Button>
            <Button>Add to favorite</Button>
        </div>
    )
}

export default CardOverlay