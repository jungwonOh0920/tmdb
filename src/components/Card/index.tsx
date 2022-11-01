import React, { ReactNode } from "react";
import { PopularItemType, DataType } from "../../pages/Home";
import './card.css'

interface Props {
  data: PopularItemType;
}
const index = ({ data }: Props) => {
  return (
    <div className="card-container">
      <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
      <p className='truncate'>{data.original_title}</p>
    </div>
  );
};

export default index;
