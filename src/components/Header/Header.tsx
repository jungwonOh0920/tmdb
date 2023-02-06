import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../../assets/tmdb-logo.svg"
import Button from "../Button/Button"
import { Context } from '../Layout/Layout'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../firebase.config'
import eventBus from "../../assets/utilities/EventBus"
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "./header.scss"

function Header() {
  const [avatar, setAvatar] = useState('')
  const [initial, setInitial] = useState('')
  const contextUser: any = useContext(Context)
  const [testImage, setTestImage] = useState('')

  useEffect(() => {
    // const getTestImage = async () => {
    //   const storage = getStorage()
    //   const imageRef = ref(storage, `images/${contextUser.uid}`)

    //   getDownloadURL(imageRef).then((url) => {
    //     console.log('url: ', url);
    //     setTestImage(url)
    //   }).catch((err) => {
    //     console.log('error check: ', err)
    //   })
    // }

    // const getAvatar = async () => {
    //   const userRef = doc(db, 'users', contextUser.uid)

    //   try {
    //     const userSnap = await getDoc(userRef)

    //     if (userSnap.exists()) {
    //       const avatar: string = userSnap.data().avatar
    //       setAvatar(avatar)
    //     }
    //     else { console.log('user avatar not exist') }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // if (contextUser) {
    //   getAvatar()
    //   getTestImage()
    // }
    eventBus.on('updateAvatar', (imgSrc: string) => {
      setAvatar(imgSrc)
    })
  }, [])

  useEffect(() => {
    if (avatar == '' && contextUser && contextUser.displayName) {
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
                <img src={testImage} alt='test' className="avatar-img" />
              }
              {/* {
                avatar ? <img src={avatar} alt='avatar' className='avatar-img' /> :
                  <div className='initial-container'>{initial}</div>
              } */}
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
