import './tooltip.scss'

const Tooltip = ({ children }: any) => {
    return (
        <div className='tooltip-container'>
            {children}
        </div>
    )
}

export default Tooltip