import React, { useState } from 'react'
import './accordion.scss'

interface AccordionProp {
    title: string,
    content: string
}

const Accordion = (props: AccordionProp) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className='accordion-container'>
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{props.title}</div>
                <div>{isActive ? <span>&#9650;</span> : <span>&#9660;</span>}</div>
            </div>
            {isActive && <div className="accordion-content">{props.content}</div>}
        </div>
    )
}

export default Accordion