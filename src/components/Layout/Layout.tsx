import { useEffect, useState, createContext } from 'react'
import eventBus from '../../assets/utilities/EventBus'
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth'
import { db } from '../../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import Header from '../Header/Header'
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import './layout.scss'

type Props = {
  children: JSX.Element
}
export interface UserInfoType {
  uid: string | null | undefined
  displayName: string | null | undefined
  email: string | null | undefined
  avatar: string | null | undefined
}

let Context: any

const Layout = ({ children }: Props) => {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [userInfo, setUserInfo] = useState<UserInfoType>()
  const [avatarSrc, setAvatarSrc] = useState<string | null>()
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  Context = createContext(user)

  const handleResize = () => {
    setWidth(window.innerWidth)
    eventBus.dispatch('adjustWidth', width)
  }

  const auth = getAuth()

  useEffect(() => {
    // setting user
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener()
    }
  }, [])

  useEffect(() => {
    setUser(auth.currentUser)
    setUserInfo({
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      avatar: isAuthenticated ? avatarSrc : undefined
    })
  }, [isAuthenticated])

  useEffect(() => {
    const getFirestoreAvatar = async () => {
      const docRef = doc(db, 'users', user!.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        if (docSnap.data().avatar) {
          console.log("avatar:", docSnap.data().avatar)
          setAvatarSrc(docSnap.data().avatar)
        } else {
          // checking custom avatar in storage
          const storage = getStorage()
          const storageAvatarRef = ref(storage, `images/${user!.uid}`)
          getDownloadURL(storageAvatarRef).then((url) => {
            console.log('url: ', url);
            setAvatarSrc(url)
          })
        }
      }
    }
    if (user) {
      // checking avatar in firestore then check in storage
      getFirestoreAvatar()
    }
  }, [user])

  useEffect(() => {
    user && setUserInfo({
      ...user,
      avatar: avatarSrc ? avatarSrc : ''
    })
  }, [avatarSrc])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return (
    <div className="layout">
      <Context.Provider value={userInfo}>
        <Header />
        <main className="main w-full px-20 h-full">
          {children}
        </main>
      </Context.Provider>

    </div>
  );
};
export { Context }
export default Layout;
