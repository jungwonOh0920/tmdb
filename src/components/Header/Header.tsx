import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../../assets/tmdb-logo.svg"
import Button from "../Button/Button"
import { Context } from '../Layout/Layout'
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from '../../firebase.config'
import "./header.scss";

function Header() {
  const [avatar, setAvatar] = useState('')
  const [initial, setInitial] = useState('')
  const contextUser: any = useContext(Context)

  useEffect(() => {
    const getURL = async () => {
      // Create a reference to the avatars collection
      const avatarsRef = collection(db, 'avatars')

      // Create q query against the collection.
      const q = query(avatarsRef, where('userRef', '==', contextUser.uid))

      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((d) => {
          setAvatar(d.data().avatar)
        })
      } catch (error) {
        console.log('err: ', error)
      }

    }

    if (contextUser) {
      getURL()
    }
  }, [])

  useEffect(() => {
    if (avatar == '' && contextUser) {
      setInitial(contextUser.displayName[0])
    }
  }, [avatar])

  return (
    <div className="header-container">
      <div className="header-inner-container max-w-7xl">
        <div className="header-contents">
          <div className="w-40 px-4">
            <img src={Logo} alt="logo" />
          </div>
          <ul className="header-list">
            <li><NavLink to="/">Movies</NavLink></li>
            <li><NavLink to="tv-shows">TV Shows</NavLink></li>
            <li><NavLink to="about">About</NavLink></li>
          </ul>
        </div>
        {
          contextUser ? (
            <Button linkTo="profile" className="flex items-center">
              {
                avatar ? <img src={avatar} alt='avatar' className='avatar-img' /> :
                  <div className='initial-container'>{initial}</div>
              }
            </Button>
          )
            :
            <Button
              className="p-4"
              linkTo="profile"
              children='Sign In'
            />
        }
      </div>
    </div>
  );
}

export default Header;
