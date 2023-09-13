import { useState } from 'react'
import { NavLink } from "react-router-dom";
import Tooltip from '../Tooltip/Tooltip';
import classNames from "classnames";
import "./button.scss";
import Snippet from '../Snippet/Snippet';

export enum ButtonTypes {
  gradientFill,
  noBorder,
  circle,
  avatar
}

export enum ButtonSizes {
  small = 'small',
  medium = 'medium',
}

interface ButtonProps {
  linkTo?: string;
  children?: JSX.Element | string | null;
  type?: ButtonTypes
  size?: ButtonSizes
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const buttonClasses = classNames(
    'button',
    { 'medium-size': props.size === ButtonSizes.medium },
    { 'small-size': props.size === ButtonSizes.small },
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
      </NavLink>
      {
        isHovered && props.type === ButtonTypes.avatar ? <Tooltip>
          <h2>My movies</h2>
          <Snippet />
        </Tooltip > : ''
      }
    </div>
  ) : (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
