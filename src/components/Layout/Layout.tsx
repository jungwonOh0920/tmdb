import { useEffect, useState, createContext } from 'react'
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth'
import Header from '../Header/Header'
import './layout.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    user ? showToastMessage(true) : showToastMessage(false)
  }, [user])

  const showToastMessage = (signedIn: boolean) => {
    toast.success(`Logged ${signedIn ? 'in' : 'out'}!`, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="layout">
      <Context.Provider value={user}>
        <Header />
        <main className="main">
          {children}
        </main>
        <ToastContainer />
      </Context.Provider>
    </div>
  );
};
export { Context }
export default Layout;
