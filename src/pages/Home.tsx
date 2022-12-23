import React, { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card/Card"
import CardSlider from '../components/CardSlider/CardSlider'
import Tabs from '../components/Tabs/Tabs'
import Hero from '../components/Hero/Hero'


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
  const [isLoading, setIsLoading] = useState(false)

  const [onTVData, setonTVData] = useState<DataType>()
  const [popularData, setPopularData] = useState<DataType>()
  const [upcomingData, setUpcomingData] = useState<DataType>()
  const [forRentData, setForRentData] = useState<DataType>()

  // fetch API
  useEffect(() => {
    setIsLoading(true)

    const api_key = process.env.REACT_APP_TMDB_API_KEY;

    const onTVUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`

    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`

    const forRentUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=rent`

    axios.get(onTVUrl).then((res) => {
      setTimeout(() => {
        setonTVData(res.data)
      }, 2000)
    })

    axios.get(popularUrl).then((res) => {
      setPopularData(res.data);
    })

    axios.get(upcomingUrl).then((res) => {
      setUpcomingData(res.data);
    })

    axios.get(forRentUrl).then((res) => {
      setForRentData(res.data);
    })

  }, []);

  useEffect(() => {
    if (onTVData && popularData && upcomingData && forRentData) {
      setIsLoading(false)
    }
  }, [onTVData, popularData, upcomingData, forRentData])

  const titles = ['On TV', 'Popular', 'Upcoming', 'For Rent']

  const onTVList = () => (
    <CardSlider isLoading={isLoading}>
      {onTVData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )

  const PopularList = () => (
    <CardSlider isLoading={isLoading}>
      {popularData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )

  const upcomingList = () => (
    <CardSlider isLoading={isLoading}>
      {upcomingData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )

  const forRentList = () => (
    <CardSlider isLoading={isLoading}>
      {forRentData?.results.map((d, index) => <Card data={d} key={index} />)}
    </CardSlider>
  )

  return (
    <>
      <section>
        <Hero tvData={onTVData?.results} />
      </section>
      <section className="mt-4">
        <Tabs titles={titles} >
          {onTVList()}
          {PopularList()}
          {upcomingList()}
          {forRentList()}
        </Tabs>
      </section>
    </>
  );
}

export default Home;
