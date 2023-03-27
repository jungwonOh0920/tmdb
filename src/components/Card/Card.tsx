import { useState, useEffect } from "react"
import Rate from './Rate'
import './card.scss'
import CardOverlay from './CardOverlay';

const Card = ({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="card-container">
      <div className="image-container">
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'https://placeimg.com/200/300/any'
          }}
          alt='poster'
          onMouseEnter={() => { setIsHovered(true) }}
          onMouseLeave={() => setIsHovered(false)} />
        {isHovered && <CardOverlay data={data} />}
        <Rate rate={data.vote_average} />
      </div>
      <div className='pt-5'>
        <p className='truncate'>{data.original_title || data.name}</p>
        <span className='text-xs'>{data.release_date}</span>
      </div>
    </div>
  );
};

export default Card;
