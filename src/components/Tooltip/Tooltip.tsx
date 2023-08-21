import './tooltip.scss'
import { useAppSelector } from '../../hooks'

const Tooltip = () => {
    const favs: string[] = useAppSelector((state) => state.favorites.movies)
    console.log('favs: ', favs)

    return (
        <div className='tooltip-container'>
            {favs ? favs.map((movieId) => {
                return <p key={movieId}>{movieId}</p>
            }) : null}
            <p>still working on it...</p></div>
    )
}

export default Tooltip