import './tooltip.scss'
import { useAppSelector } from '../../hooks'

const Tooltip = () => {
    const count = useAppSelector((state) => state.counter.value)

    return (
        <div className='tooltip-container'>{count} <p>still working on it...</p></div>
    )
}

export default Tooltip