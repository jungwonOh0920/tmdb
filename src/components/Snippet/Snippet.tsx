import React from 'react'
import { useAppSelector } from '../../hooks'

const Snippet = () => {
    const favs: string[] = useAppSelector((state) => state.favorites.movies)
    console.log('favs check: ', favs)
    return (
        <div>
            {/* {favs ? favs.map((movie) => {
                return <p>{ }</p>
            }) : ''} */}
        </div>
    )
}

export default Snippet