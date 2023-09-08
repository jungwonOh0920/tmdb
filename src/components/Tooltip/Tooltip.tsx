import './tooltip.scss'
import { useAppSelector } from '../../hooks'

const Tooltip = () => {
    const favs: string[] = useAppSelector((state) => state.favorites.movies)

    return (
        <div className='tooltip-container'>
            <p>Your Favorites here. still working on it :)</p>
            {favs ? favs.map((movieId) => {
                return <p key={movieId}>{movieId}</p>
            }) : null}
        </div>
    )
}

export default Tooltip