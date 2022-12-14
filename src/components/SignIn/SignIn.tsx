import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './signIn.scss'

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const navigate = useNavigate()

    const signIn = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='sign-in-container'>
            <header>
                <p>Welcome Back!</p>
            </header>
            <form onSubmit={signIn}>
                <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    value={password}
                    onChange={onChange}
                />
                <button>Sign In</button>
            </form>
            <NavLink to='/signup'>Sign Up Instead</NavLink>
        </div>
    )
}

export default SignIn