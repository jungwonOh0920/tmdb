import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

interface CardSliderProps {
    title: string
}

const index = (props: CardSliderProps) => {
    return (
        <div className='flex'>
            <FontAwesomeIcon icon={faAngleLeft} />
            {props.title}
            <FontAwesomeIcon icon={faAngleRight} />
        </div>
    )
}

export default index