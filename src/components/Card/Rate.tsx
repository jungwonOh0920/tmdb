import { useEffect } from "react";
import { PopularItemType, DataType } from "../../pages/Home";
import './card.scss'

interface Props {
    rate: number;
}

const Rate = ({ rate }: Props) => {

    const getPercentage = (num: number): string => {
        return `${num * 10}%`
    }

    return (
        <div className="rate-container">
            <span>{getPercentage(rate)}</span>
        </div>
    );
};

export default Rate;
