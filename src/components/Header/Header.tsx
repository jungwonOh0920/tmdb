import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../../assets/tmdb-logo.svg"
import Button, { ButtonTypes } from "../Button/Button"
import { Context } from '../Layout/Layout'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../firebase.config'
import eventBus from "../../assets/utilities/EventBus"
import "./header.scss"

function Header() {
  const [avatar, setAvatar] = useState('')
  const [initial, setInitial] = useState('')
  const contextUser: any = useContext(Context)

  useEffect(() => {
    const getAvatar = async () => {
      const userRef = doc(db, 'users', contextUser.uid)

      try {
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const avatar: string = userSnap.data().avatar
          setAvatar(avatar)
        }
        else { console.log('user avatar not exist') }
      } catch (error) {
        console.log(error)
      }
    }

    if (contextUser) {
      getAvatar()
    }
    eventBus.on('updateAvatar', (imgSrc: string) => {
      setAvatar(imgSrc)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (avatar === '' && contextUser && contextUser.displayName) {
      setInitial(contextUser.displayName[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar])

  return (
    <div className="header-container">
      <div className="header-inner-container max-w-7xl">
        <div className="header-contents">
          <div className="logo-container">
            <NavLink to='/'><img src={Logo} alt="logo" /></NavLink>
          </div>
          <ul className="header-list">
            <li><NavLink to="/">Movies</NavLink></li>
            <li><NavLink to="tv-shows">TV Shows</NavLink></li>
            <li><NavLink to="about">About</NavLink></li>
          </ul>
        </div>
        <div className={'profile-action-link'}>
          {
            contextUser ? (
              <Button linkTo="profile" type={ButtonTypes.avatar}>
                {
                  avatar ? <img src={avatar} alt='avatar' className='avatar-img' /> :
                    <div className='initial-container'>{initial}</div>
                }
              </Button>
            )
              :
              <Button linkTo="profile">Sign in</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
