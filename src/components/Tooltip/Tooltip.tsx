import './tooltip.scss'

interface TooltipProps {
    children: JSX.Element
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Tooltip = ({ children, onMouseEnter, onMouseLeave }: TooltipProps) => {
    return (
        <div className='tooltip-container' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </div>
    )
}

export default Tooltip