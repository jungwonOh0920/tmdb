import { useState } from "react"
import Rate from '../Rate/Rate'
import CardOverlay from './CardOverlay'
import Button, { ButtonTypes } from '../Button/Button'
import './card.scss'
import favoriteEmptySvg from '../../assets/images/favorite-empty.svg'
import favoriteFillSvg from '../../assets/images/favorite-fill.svg'
import { useAppDispatch } from '../../hooks'
import { decrement, increment } from '../../reducers/myMovies/counterSlice'

interface CardType {
  data: any
}

const Card = (props: CardType) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    setIsFavorite(!isFavorite)

    if (!isFavorite) {
      dispatch(increment())
    } else {
      dispatch(decrement())
    }
  }

  return (
    <div className="card-container">
      <div
        className="image-container"
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${props.data.poster_path}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'https://placeimg.com/200/300/any'
          }}
          alt='poster'
        />
        {isHovered &&
          <div className='card-overlay-wrapper'>
            <CardOverlay data={props.data} />
            <div className='favorite-container'>
              <Button type={ButtonTypes.noBorder} onClick={handleClick}>
                <img src={isFavorite ? favoriteFillSvg : favoriteEmptySvg} alt='favoriteEmptySvg' />
              </Button>
            </div>
          </div>}
        <div className='rate-container'>
          <Rate rate={props.data.vote_average} />
        </div>
      </div>
      <div>
        <p className='truncate'>{props.data.title || props.data.name}</p>
        <span className='text-xs'>{props.data.release_date}</span>
      </div>
    </div>
  );
};

export default Card;
