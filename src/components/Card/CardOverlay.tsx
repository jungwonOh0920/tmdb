import React from 'react'
import { useState, useEffect } from "react"
import './card.scss'

function CardOverlay({ data }: any) {
    useEffect(() => {
        console.log('data: ', data);
    }, [])
    return (
        <div className='card-overlay'>
            <p>{data.name}</p>
        </div>
    )
}

export default CardOverlay