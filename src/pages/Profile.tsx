import React from 'react'
import { useEffect, useState } from "react"
import { getAuth, User as FirebaseUser, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import SignIn from '../components/SignIn/SignIn'

function Profile() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<FirebaseUser | null>(null)

    const auth = getAuth()

    useEffect(() => {
        const listener = onAuthStateChanged(auth, async (user) => {
            setIsAuthenticated(!!user);
        });

        return () => {
            listener();
        };
    }, [])

    useEffect(() => {
        setUser(auth.currentUser)
    }, [isAuthenticated])

    useEffect(() => {
        console.log('user updated: ', user)
    }, [user])

    const navigate = useNavigate()

    const logout = () => {
        auth.signOut()

        navigate('/')
    }

    return (
        <div className='profile'>
            {isAuthenticated ? user?.displayName : <SignIn />}
            <br />
            {
                isAuthenticated &&
                <button onClick={logout} className='logout-btn'>Log out</button>
            }

        </div>
    )
}

export default Profile