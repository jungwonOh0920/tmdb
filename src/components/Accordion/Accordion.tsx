import React, { useState } from 'react'
import classNames from "classnames";
import './accordion.scss'

interface AccordionProp {
    title: string,
    content: string
}

const Accordion = (props: AccordionProp) => {
    const [isActive, setIsActive] = useState(false)
    const contentClasses = classNames(
        { 'activated': isActive },
        { 'deactivated': !isActive }
    )

    return (
        <div className='accordion-container'>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <h2 className='mb-1'>{props.title}</h2>
                <div>{isActive ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
            </div>
            <div className={contentClasses}>{props.content}</div>
        </div>
    )
}

export default Accordion