import { useEffect, useState } from 'react'
import Button, { ButtonTypes } from '../Button/Button'
import favoriteEmptySvg from '../../assets/images/favorite-empty.svg'
import favoriteFillSvg from '../../assets/images/favorite-fill.svg'
import './card.scss'

function CardOverlay({ data }: any) {
    const [isMovie, setIsMovie] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (data.title && data.release_date) {
            setIsMovie(true)
        }
    }, [data.title, data.release_date])

    return (
        <div className='card-overlay'>
            <Button linkTo={`/contents/${isMovie ? 'movie' : 'tv'}/${data.id}`}>See details</Button>
            <div className='favorite-container'>
                <Button type={ButtonTypes.noBorder} onClick={() => { setIsFavorite(!isFavorite) }}>
                    <img src={isFavorite ? favoriteFillSvg : favoriteEmptySvg} alt='favoriteEmptySvg' />
                </Button>
            </div>
        </div>
    )
}

export default CardOverlay