import { useEffect, useState } from 'react'
import classNames from 'classnames'
import './tooltip.scss'

export enum ToolTipPosition {
    bottom,
    top,
    left,
    right
}

interface TooltipType {
    children: JSX.Element
    content: String
    position?: ToolTipPosition
    delay?: number
}

const NewTooltip = ({ children, content, position, delay }: TooltipType) => {
    let timeout: ReturnType<typeof setTimeout>
    const [isActive, setIsActive] = useState(false)

    const tooltipClasses = classNames('tooltip-tip',
        { 'top': position == ToolTipPosition.top },
        { 'bottom': position == ToolTipPosition.bottom },
        { 'left': position == ToolTipPosition.left },
        { 'right': position == ToolTipPosition.right },
    )

    useEffect(() => { console.log(position); }, [position])
    const handleMouseEnter = () => {
        timeout = setTimeout(() => {
            setIsActive(true)
        }, delay || 400)
    }

    const handleMouseLeave = () => {
        clearInterval(timeout)
        setIsActive(false)
    }

    return (
        <div className='new-tooltip-container' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {isActive && <div className={tooltipClasses}>{content}</div>}
        </div>
    )
}

export default NewTooltip