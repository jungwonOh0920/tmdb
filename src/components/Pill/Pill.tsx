import React, { useState } from 'react'
import classNames from 'classnames'
import './pill.scss'

interface PillPropTypes {
    children: string,
    selectable?: boolean
}

const Pill = ({ children, selectable }: PillPropTypes) => {
    const [isSelected, setIsSelected] = useState(false)

    const pillContainerClasses = classNames(
        'pill-container',
        { 'selectable': selectable },
        { 'selected': selectable && isSelected }
    )

    return (
        <div className={pillContainerClasses} onClick={() => setIsSelected(!isSelected)}>{children}</div>
    )
}

export default Pill

Pill.defaultProps = {
    selectable: false
}