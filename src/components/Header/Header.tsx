import { NavLink } from "react-router-dom";
import Logo from '../../assets/tmdb-logo.svg';
import './header.scss';

function Header() {
    return (
        <div className='header-container'>
            <div className='max-w-7xl flex item-center mx-auto'>
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

export default Header