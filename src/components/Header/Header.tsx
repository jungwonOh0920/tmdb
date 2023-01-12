import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAuth,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import Logo from "../../assets/tmdb-logo.svg";
import Button from "../Button/Button";
import "./header.scss";

function Header() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("user updated: ", user);
  }, [user]);

  const onClick = () => {
    <NavLink to="profile">
      {isAuthenticated ? user?.displayName : "Sign In"}
    </NavLink>;
  };

<<<<<<< Updated upstream
            <div className='header-inner-container max-w-7xl'>
                <div className='header-contents'>
                    <div className='w-40'>
                        <img src={Logo} alt='logo' />
                    </div>
                    <ul className='flex place-content-around'>
                        <li className='p-4'><NavLink to='/'>Movies</NavLink></li>
                        <li className='p-4'><NavLink to='tv-shows'>TV Shows</NavLink></li>
                        <li className='p-4'><NavLink to='about'>About</NavLink></li>
                    </ul>
                </div>
                <button className='p-4'><NavLink to='profile'>{isAuthenticated ? user?.displayName : 'Sign In'}</NavLink></button>
            </div>
=======
  return (
    <div className="header-container">
      <div className="header-inner-container max-w-7xl">
        <div className="header-contents">
          <div className="w-40 px-4">
            <img src={Logo} alt="logo" />
          </div>
          <ul className="flex place-content-around">
            <li className="p-4">
              <NavLink to="/">Movies</NavLink>
            </li>
            <li className="p-4">
              <NavLink to="tv-shows">TV Shows</NavLink>
            </li>
            <li className="p-4">
              <NavLink to="about">About</NavLink>
            </li>
          </ul>
>>>>>>> Stashed changes
        </div>

        <Button
          className="p-4"
          linkTo="profile"
          children={isAuthenticated ? user?.displayName : "Sign In"}
        />
      </div>
    </div>
  );
}

export default Header;
