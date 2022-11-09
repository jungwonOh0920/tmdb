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
      </div>
      <Rate rate={data.vote_average} />
      <p className='truncate'>{data.original_title}</p>
      <p>{data.release_date}</p>
    </div>
  );
};

export default Card;
