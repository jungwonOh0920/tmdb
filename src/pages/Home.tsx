import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import CardSlider from '../components/CardSlider/CardSlider'
import Tabs from '../components/Tabs/Tabs'

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
  const [upcomingData, setupcomingData] = useState<DataType>();
  // fetch API
  useEffect(() => {
    const api_key = process.env.REACT_APP_TMDB_API_KEY;
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`

    axios.get(popularUrl).then((res) => {
      setPopularData(res.data);
    });

    axios.get(upcomingUrl).then((res) => {
      setupcomingData(res.data);
    });

  }, []);

  const PopularList = () => (
    <CardSlider>
      {popularData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )

  const PopularList2 = () => (
    <CardSlider>
      {upcomingData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )



  return (
    <div>
      <Tabs>
        {PopularList()}
        {PopularList2()}
      </Tabs>
    </div>
  );
}

export default Home;
