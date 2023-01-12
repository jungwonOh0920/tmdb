import { NavLink } from "react-router-dom";

import "./button.scss";

interface Props {
  className?: string;
  linkTo?: string;
  children?: JSX.Element | string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
