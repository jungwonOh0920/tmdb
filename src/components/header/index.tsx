import React from 'react'
import { NavLink } from "react-router-dom";

function index() {
    return (
        <div>
            <li><NavLink to='movies'>Movies</NavLink></li>
            <li><NavLink to='tv-shows'>TV Shows</NavLink></li>
            <li><NavLink to='about'>About</NavLink></li>
        </div>
    )
}

export default index