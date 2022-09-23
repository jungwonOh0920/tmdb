import React, { ReactNode } from "react";
import { ResultType, DataType } from "../../pages/Home";

interface Props {
  data: ResultType;
}
const index = ({ data }: Props) => {
  console.log("dat123a: ", data);
  const api_key = process.env.REACT_APP_TMDB_API_KEY;

  return (
    <div className="w-40">
      <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
      {/* <img
        src={`https://api.themoviedb.org/3/movie/1/images?api_key=${api_key}&language=en-US`}
      /> */}
      <p>{data.original_title}</p>
    </div>
  );
};

export default index;
