import { useAppSelector } from '../../hooks'
import { VideoType } from '../../pages/Home'
import './snippet.scss'

const Snippet = () => {
    const favs: VideoType[] = useAppSelector((state) => state.favorites.movies)

    return (
        <div>
            {favs ? favs.map((movie, idx) => {
                return <div key={idx}>
                    <img src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} alt={movie.title} />
                    <p>{movie.title}</p>
                    <p>{movie.poster_path}</p>
                </div>
            }) : ''}
        </div>
    )
}

export default Snippet