import React from 'react'
import './avatars.scss'

interface AvatarsProp {
    userName?: string | null
}

function Avatars(props: AvatarsProp) {
    const fullName = props.userName
    const firstName = fullName && fullName.split(' ')[0]
    return (
        <div className='avatars'>
            {props.userName && <h1>Hi, {firstName}</h1>}
            <h2>Choose your avatar</h2>
            <div className='avatar-selection'>
                <div className="img-container">
                    <img src='https://imageservice.disco.peacocktv.com/pcms/40207861-1c43-47a6-ab90-5efd8ea3628e/AGG_SOURCE/400?territory=US&proposition=NBCUOTT&language=eng' />
                </div>
                <div className="img-container">
                    <img src='https://imageservice.disco.peacocktv.com/pcms/f93cbdf6-d926-40f7-bf47-d04c7bf99d88/AGG_SOURCE/400?territory=US&proposition=NBCUOTT&language=eng' />
                </div>
                <div className="img-container">
                    <img src='https://imageservice.disco.peacocktv.com/pcms/a05218cf-4e65-4890-9340-6c38b644fdfe/AGG_SOURCE/400?territory=US&proposition=NBCUOTT&language=eng' />
                </div>
                <div className="img-container">
                    <img src='https://imageservice.disco.peacocktv.com/pcms/806defd6-ed05-47ac-bf3d-1f5b4a5431d8/AGG_SOURCE/400?territory=US&proposition=NBCUOTT&language=eng' />
                </div>
            </div>
        </div>
    )
}

export default Avatars