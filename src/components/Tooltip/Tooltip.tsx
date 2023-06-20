import './tooltip.scss'
import { useAppSelector } from '../../hooks'

const Tooltip = () => {
    const count = useAppSelector((state) => state.counter.value)

    return (
        <div className='tooltip-container'>{count}</div>
    )
}

export default Tooltip