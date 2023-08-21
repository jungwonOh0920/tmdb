import { useContext, useState } from "react"
import Rate from '../Rate/Rate'
import CardOverlay from './CardOverlay'
import Button, { ButtonTypes } from '../Button/Button'
import { VideoType } from '../../pages/Home'
import { ContentDataType } from '../../pages/ContentInfo'
import './card.scss'
import favoriteEmptySvg from '../../assets/images/favorite-empty.svg'
import favoriteFillSvg from '../../assets/images/favorite-fill.svg'
import { useAppDispatch } from '../../hooks'
import { ADD_A_FAV_MOVIE, DELETE_A_FAV_MOVIE } from '../../reducers/myMovies/favoritesSlice'
import { Context } from '../Layout/Layout'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from '../../firebase.config'
import {
  User as FirebaseUser,
} from 'firebase/auth'

interface CardPropType {
  data: VideoType | ContentDataType
}

const Card = ({ data }: CardPropType) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const contextUser: FirebaseUser | null = useContext(Context)
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    setIsFavorite(!isFavorite)

    if (!isFavorite) {
      // updates in FE states
      dispatch(ADD_A_FAV_MOVIE(data.id))

      // updates on Firebase
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)

        // Adding the movie to Favorite Array on Firebase
        await updateDoc(userRef, {
          favorites: arrayUnion(data.id)
        })
      }
    } else {
      // updates in FE states
      dispatch(DELETE_A_FAV_MOVIE(data.id))

      // updates on Firebase
      if (contextUser) {
        const userRef = doc(db, 'users', contextUser.uid)

        // Removing the movie to Favorite Array on Firebase
        await updateDoc(userRef, {
          favorites: arrayRemove(data.id)
        })
      }

    }
  }

  return (
    <div className="card-container">
      <div
        className="image-container"
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'https://placeimg.com/200/300/any'
          }}
          alt='poster'
        />
        {isHovered &&
          <div className='card-overlay-wrapper'>
            <CardOverlay data={data} />
            {
              contextUser ?
                <div className='favorite-container'>
                  <Button type={ButtonTypes.noBorder} onClick={handleClick}>
                    <img src={isFavorite ? favoriteFillSvg : favoriteEmptySvg} alt='favoriteEmptySvg' />
                  </Button>
                </div> : null
            }
          </div>}
        <div className='rate-container'>
          <Rate rate={data.vote_average} />
        </div>
      </div>
      <div>
        <p className='truncate'>{data.title}</p>
        <span className='text-xs'>{data.release_date}</span>
      </div>
    </div>
  );
};

export default Card;
