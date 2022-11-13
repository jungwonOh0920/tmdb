import React, { useState, useEffect } from 'react'
import axios from "axios";
import CardSlider from '../CardSlider/CardSlider'
import TabContent from './TabContent'
import TabNavItem from './TabNavItem'
import './tabs.scss'

type TabsPropTypes = {
    children: JSX.Element[]
}

const Tabs = ({ children }: TabsPropTypes) => {
    const [activeTab, setActiveTab] = useState('tab1')

    return (
        <div className='tabs-container'>
            <ul className='menu-nav'>
                {/* TODO: should use map instead of hard corded */}
                <TabNavItem
                    id='tab1'
                    title='Popular'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabNavItem
                    id='tab2'
                    title='Upcoming'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </ul>
            <div className='outlet'>
                {
                    <>
                        <TabContent id='tab1' activeTab={activeTab} >
                            <p>{children[0]}</p>
                        </TabContent>
                        <TabContent id='tab2' activeTab={activeTab} >
                            <p>{children[1]}</p>
                        </TabContent>
                    </>
                }
            </div>
        </div>
    )
}

export default Tabs