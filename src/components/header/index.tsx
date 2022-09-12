import React from 'react'
import { NavLink } from "react-router-dom";
import Logo from '../../assets/tmdb-logo.svg';

function index() {
    return (
        <div className='w-full bg-transparent px-4 border-b border-indigo-500'>
            <div className='max-w-7xl flex item-center mx-auto bg-red-500'>
                <div className='w-40 flex item-center px-4'>
                    <img src={Logo} alt='logo' />
                </div>
                <ul className='flex place-content-around'>
                    <li className='p-4'><NavLink to='/'>Movies</NavLink></li>
                    <li className='p-4'><NavLink to='tv-shows'>TV Shows</NavLink></li>
                    <li className='p-4'><NavLink to='about'>About</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default index