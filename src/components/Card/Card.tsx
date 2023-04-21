import { useState } from "react"
import Rate from './Rate'
import CardOverlay from './CardOverlay'
import './card.scss'

interface CardType {
  data: any
}

const Card = (props: CardType) => {
  const [isHovered, setIsHovered] = useState(false)

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
        {isHovered && <CardOverlay data={props.data} />}
        <Rate rate={props.data.vote_average} />
      </div>
      <div>
        <p className='truncate'>{props.data.title || props.data.name}</p>
        <span className='text-xs'>{props.data.release_date}</span>
      </div>
    </div>
  );
};

export default Card;
