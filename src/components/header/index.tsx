import React from 'react'
import { NavLink } from "react-router-dom";

function index() {
    return (
        <ul className='w-full flex bg-teal-200'>
            <li><NavLink to='movies'>Movies</NavLink></li>
            <li><NavLink to='tv-shows'>TV Shows</NavLink></li>
            <li><NavLink to='about'>About</NavLink></li>
        </ul>
    )
}

export default index