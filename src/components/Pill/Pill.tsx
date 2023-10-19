import { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import './pill.scss'

interface PillPropTypes {
    children: string,
    selectable?: boolean,
    onClickHandler: (genre: string) => void
}

const Pill = ({ children, selectable, onClickHandler }: PillPropTypes) => {
    const [isSelected, setIsSelected] = useState(false)

    const pillContainerClasses = classNames(
        'pill-container',
        { 'selectable': selectable },
        { 'selected': selectable && isSelected }
    )

    // const memoizedOnClickHandler = useCallback(onClickHandler, [onClickHandler]);

    const handleClick = () => {
        // setIsSelected(!isSelected)
        // TODO: state is not changing when I call the following function.
        onClickHandler(children)
    }

    useEffect(() => {
        console.log('isSelected called: ', isSelected);
    }, [isSelected])

    return (
        <div className={pillContainerClasses} onClick={handleClick}>{children}</div>
    )
}

export default Pill

Pill.defaultProps = {
    selectable: false
}