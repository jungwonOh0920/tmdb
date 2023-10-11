import { useState } from 'react'
import Button, { ButtonTypes } from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './slider-menu.scss'

const SliderMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='flex'>
            <Button type={ButtonTypes.noBorder} onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                <FontAwesomeIcon icon={faBars} title='hello' />
            </Button>
            <div className={isMenuOpen ? 'menu-list open' : 'menu-list'}>
                Menu List comes here...
            </div>
        </div>
    )
}

export default SliderMenu