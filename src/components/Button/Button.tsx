import { useState } from 'react'
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./button.scss";

export enum ButtonTypes {
  gradientFill,
  noBorder,
  circle,
  avatar
}

interface ButtonProps {
  linkTo?: string;
  children?: JSX.Element | string | null;
  type?: ButtonTypes
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const buttonClasses = classNames(
    'button',
    { 'nav-link': props.linkTo },
    { 'gradient-fill': props.type === ButtonTypes.gradientFill },
    { 'circle': props.type === ButtonTypes.circle },
    { 'avatar': props.type === ButtonTypes.avatar },
    { 'no-border': props.type === ButtonTypes.noBorder }
  )

  return props.linkTo ? (
    <div className='relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink className={buttonClasses} to={props.linkTo}>
        {props.children}
        {
          isHovered && props.type === ButtonTypes.avatar ? <div style={{ position: 'absolute', right: '0', top: '40px', height: '148px', width: '80px', backgroundColor: 'red' }}>Test</div> : ''
        }
      </NavLink>
    </div>
  ) : (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
