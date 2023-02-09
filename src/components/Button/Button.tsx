import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./button.scss";

export enum buttonTypes {
  gradientFill,
  noBorder,
  circle,
  avatar
}

interface Props {
  linkTo?: string;
  children?: JSX.Element | string | null;
  type?: buttonTypes
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => {
  const buttonClasses = classNames(
    'button',
    { 'nav-link': props.linkTo },
    { 'gradient-fill': props.type == buttonTypes.gradientFill },
    { 'circle': props.type == buttonTypes.circle },
    { 'avatar': props.type == buttonTypes.avatar }
  )

  return props.linkTo ? (
    <NavLink className={buttonClasses} to={props.linkTo}>
      {props.children}
    </NavLink>
  ) : (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
