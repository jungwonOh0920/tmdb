import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card/Card"
import CardSlider from '../components/CardSlider/CardSlider'
import Tabs from '../components/Tabs/Tabs'
import Hero from '../components/Hero/Hero'
import Accordion from "../components/Accordion/Accordion"
import HomeAccordionData from "../assets/HomeAccordionData"
import { useAppDispatch, useAppSelector } from '../hooks'
import { Context } from '../components/Layout/Layout'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase.config'
import {
  User as FirebaseUser,
} from 'firebase/auth'
import { INITIALIZE } from "../reducers/myMovies/favoritesSlice"

export interface VideoType {
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

export interface TVType {
  backdrop_path: string,
  first_air_date: string,
  genre_ids: [],
  id: number,
  name: string,
  origin_country: [],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

export type DataType = {
  page: number;
  results: Array<VideoType>;
  total_pages: number;
  total_results: number;
};

function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const [onTVData, setonTVData] = useState<DataType>()
  const [popularData, setPopularData] = useState<DataType>()
  const [upcomingData, setUpcomingData] = useState<DataType>()
  const [forRentData, setForRentData] = useState<DataType>()
  const [favorites, setFavorites] = useState<number[]>([])
  const contextUser: FirebaseUser | null = useContext(Context)
  const dispatch = useAppDispatch()

  const fetchFavorites = async () => {
    if (contextUser) {
      const userRef = doc(db, 'users', contextUser.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        setFavorites(userSnap.data().favorites)
        dispatch(INITIALIZE(userSnap.data().favorites))
      }

    }
  }

  // fetch API and check for user
  useEffect(() => {
    setIsLoading(true)
    fetchFavorites()

    const api_key = process.env.REACT_APP_TMDB_API_KEY;

    const onTVUrl = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`

    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`

    const forRentUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&watch_region=US&with_watch_monetization_types=rent`

    axios.get(onTVUrl).then((res) => {
      setonTVData(res.data)
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

  useEffect(() => {
    console.log(favorites);
  }, [favorites])

  const titles = ['Popular', 'Upcoming', 'For Rent']

  // const handleIsSelected = (id: number) => {
  //   console.log(favorites.includes(id));
  //   return favorites.includes(id)
  // }

  const popularList = () => (
    <CardSlider isLoading={isLoading}>
      {popularData?.results.map((d: VideoType, idx: number) => <Card data={d} key={idx} favs={favorites} />)}
    </CardSlider>
  )

  const upcomingList = () => (
    <CardSlider isLoading={isLoading}>
      {upcomingData?.results.map((d: VideoType, idx: number) => <Card data={d} key={idx} />)}
    </CardSlider>
  )

  const forRentList = () => (
    <CardSlider isLoading={isLoading}>
      {forRentData?.results.map((d: VideoType, idx: number) => <Card data={d} key={idx} />)}
    </CardSlider>
  )

  return (
    <div className='space-y-8'>
      <section>
        <Hero />
      </section>
      <section>
        <Tabs titles={titles} >
          {popularList()}
          {upcomingList()}
          {forRentList()}
        </Tabs>
      </section>
      <section>
        {
          HomeAccordionData.map(({ title, content }, idx) => (
            <Accordion title={title} content={content} key={idx} />
          ))
        }
      </section>
      <br />
    </div>
  );
}

export default Home;
