import './tooltip.scss'

interface TooltipProps {
    children: JSX.Element
    onMouseOver?: (event: React.MouseEvent<HTMLDivElement>) => void
    onMouseOut?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Tooltip = ({ children, onMouseOver, onMouseOut }: TooltipProps) => {
    return (
        <div className='tooltip-container' onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            {children}
        </div>
    )
}

export default Tooltip