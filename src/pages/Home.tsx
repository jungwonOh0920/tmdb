import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card/index";
import CardSlider from '../components/CardSlider'

export interface PopularItemType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type DataType = {
  page: number;
  results: PopularItemType[];
  total_pages: number;
  total_results: number;
};

function Home() {
  const [popularData, setPopularData] = useState<DataType>();

  React.useEffect(() => {
    const api_key = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

    axios.get(url).then((res) => {
      setPopularData(res.data);
    });
  }, []);



  return (
    <div>
      <CardSlider>
        {popularData?.results.map((d, index) => <Card data={d} key={index} />)}
      </CardSlider>
      {/* <br /> */}
      {/* <CardSlider>
        {popularData?.results.map((d, index) => <Card data={d} key={index} />)}
      </CardSlider> */}
    </div>
  );
}

export default Home;
