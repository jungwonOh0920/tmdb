import { PopularItemType } from "../../pages/Home";
import Rate from './Rate'
import './card.scss'

interface Props {
  data: PopularItemType;
}

const Card = ({ data }: Props) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
        <Rate rate={data.vote_average} />
      </div>
      <div className='pt-5'>
        <p className='truncate'>{data.original_title}</p>
        <span className='text-xs'>{data.release_date}</span>
      </div>
    </div>
  );
};

export default Card;
