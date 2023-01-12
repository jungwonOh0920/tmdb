import { MouseEvent, Component } from "react";
import { NavLink } from "react-router-dom";

import "./button.scss";

interface Props {
  // buttonText: string;
  //   buttonText?: string | null;
  className?: string;
  linkTo?: string;
  children?: JSX.Element | string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  //   onClick?: () => void ;
}

const Button = ({ children, className, linkTo, onClick }: Props) => {
  return linkTo ? (
    <NavLink className={className} to={linkTo}>
      {children}
    </NavLink>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
