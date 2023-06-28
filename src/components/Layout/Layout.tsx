import { useEffect, useState, createContext } from 'react'
import eventBus from '../../assets/utilities/EventBus'
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth'
import Header from '../Header/Header'
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
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  Context = createContext(user)

  const auth = getAuth()

  useEffect(() => {
    // setting user
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUser(auth.currentUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div className="layout">
      <Context.Provider value={user}>
        <Header />
        <main className="main">
          {children}
        </main>
      </Context.Provider>
    </div>
  );
};
export { Context }
export default Layout;
