import React, { useState } from 'react'
import './tooltip.scss'

export enum ToolTipPosition {
    top,
    bottom,
    left,
    right
}

interface TooltipType {
    children: JSX.Element
    content: String
    position: ToolTipPosition
    delay?: number
}

const NewTooltip = ({ children, content, delay }: TooltipType) => {
    let timeout: ReturnType<typeof setTimeout>
    const [isActive, setIsActive] = useState(false)

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
            {isActive && <div className='tooltip-tip bottom'>{content}</div>}
        </div>
    )
}

export default NewTooltip