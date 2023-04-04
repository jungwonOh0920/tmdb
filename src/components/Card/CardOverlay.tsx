import Button from '../Button/Button'
import './card.scss'

function CardOverlay({ data }: any) {
    return (
        <div className='card-overlay'>
            <Button linkTo={`/contents/${data.id}`}>See details</Button>
            <Button>Add to favorite</Button>
        </div>
    )
}

export default CardOverlay