import './card.scss'
import './rate.scss'

interface Props {
    rate: number;
}

const Rate = ({ rate }: Props) => {

    const getPercentage = (num: number): number => {
        return num * 10
    }

    return (
        <div className="rate-container">
            <div className={`c100 p${getPercentage(rate)} small ${getPercentage(rate) < 70 && 'orange'}`}>
                <span>{getPercentage(rate)}%</span>
                <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                </div>
            </div>
        </div>
    );
};

export default Rate;
