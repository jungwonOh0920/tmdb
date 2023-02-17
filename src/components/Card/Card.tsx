import Rate from './Rate'
import './card.scss'

const Card = ({ data }: any) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt='poster' />
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
