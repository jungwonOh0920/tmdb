import { useState } from "react"
import Avatar from './Avatar'
import { avatarSrc } from '../../assets/avatarSrc'
import './avatars.scss'

interface AvatarsProp {
    userName?: string | null
    sendAvatarIdx: (idx: number) => void
}

function Avatars(props: AvatarsProp) {
    const fullName = props.userName
    const firstName = fullName && fullName.split(' ')[0]
    const imgSrc = avatarSrc

    const getAvatarIdx = (idx: number) => {
        props.sendAvatarIdx(idx)
    }

    return (
        <div className='avatars'>
            {props.userName && <h1>Hi, {firstName}</h1>}
            <h2>Choose your avatar</h2>
            <div className='avatar-selection'>
                {
                    imgSrc.map((obj, idx) => (
                        <div
                            onMouseEnter={() => getAvatarIdx(idx)}
                            onMouseLeave={() => props.sendAvatarIdx(-1)}
                        >
                            <Avatar img={obj.img} key={idx} idx={idx} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Avatars