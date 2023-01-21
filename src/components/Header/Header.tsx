import { NavLink } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../assets/tmdb-logo.svg";
import Button from "../Button/Button";
import { Context } from '../Layout/Layout'
import "./header.scss";

function Header() {
  const contextUser: any = useContext(Context)

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
        </div>

        <Button
          className="p-4"
          linkTo="profile"
          children={contextUser ? contextUser.displayName : "Sign In"}
        />
      </div>
    </div>
  );
}

export default Header;
