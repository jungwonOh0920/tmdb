import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./button.scss";

export enum buttonTypes {
  secondary,
  noBorder,
  circle
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
    { 'secondary': props.type == buttonTypes.secondary }
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
