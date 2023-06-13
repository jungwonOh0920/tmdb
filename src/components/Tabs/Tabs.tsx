import { useState, useEffect } from 'react'
import TabContent from './TabContent'
import TabNavItem from './TabNavItem'
import './tabs.scss'

type TabsPropTypes = {
    children: JSX.Element[] | JSX.Element
    titles: string[]
}

const Tabs = ({ children, titles }: TabsPropTypes) => {
    const [activeTab, setActiveTab] = useState('tab1')
    const [isSingleTab, setIsSingleTab] = useState(false)

    return (
        <div className='tabs-container'>
            <ul className='menu-nav'>
                {
                    titles.map((title, index) => {
                        return (
                            <TabNavItem
                                id={`tab${index + 1}`}
                                title={title}
                                activeTab={activeTab}
                                isSingleTab={isSingleTab}
                                setActiveTab={setActiveTab}
                                key={index}
                            />
                        )
                    })
                }
            </ul>
            <div className='outlet'>
                {
                    <>
                        {
                            children instanceof Array ?
                                children.map((content, index) => {
                                    return <TabContent id={`tab${index + 1}`} activeTab={activeTab} key={index}>
                                        {children[index]}
                                    </TabContent>
                                })
                                : <p>single tab</p>
                        }
                    </>
                }
            </div>
        </div >
    )
}

export default Tabs