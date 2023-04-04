import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"

const ContentIntro = () => {
    let { userId } = useParams()
    let location = useLocation()

    useEffect(() => {
        console.log('location: ', location);
        console.log('userID: ', userId);
    }, [])

    return (
        <div>
            <h1>ContentIntro</h1>
            <p>{userId}</p>
        </div>
    )
}

export default ContentIntro