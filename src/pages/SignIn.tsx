import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/signIn.scss'

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

    return (
        <div className='sign-in-container'>
            <header>
                <p>Welcome Back!</p>
            </header>
            <form>
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