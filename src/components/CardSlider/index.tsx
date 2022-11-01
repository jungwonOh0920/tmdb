import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'

interface CardSliderProps {
    children: JSX.Element[] | undefined
}

const index = (prop: CardSliderProps) => {
    return (
        <div className='w-full mt-4 bg-red-400 relative px-14'>
            <div className='absolute left-0 top-0 w-10 h-full flex justify-center items-center bg-transparent'>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div className='flex space-x-4 overflow-x-auto'>
                {prop.children}
            </div>
            <div className='absolute right-0 top-0 w-10 h-full flex justify-center items-center bg-transparent'>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </div>
    )
}

export default index