import { useState } from 'react'
import TabContent from './TabContent'
import TabNavItem from './TabNavItem'
import './tabs.scss'

type TabsPropTypes = {
    children: JSX.Element[]
    titles: string[]

}

const Tabs = ({ children, titles }: TabsPropTypes) => {
    const [activeTab, setActiveTab] = useState('tab1')

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
                                setActiveTab={setActiveTab}
                                key={index}
                            />
                        )
                    })
                }
            </ul>
            <div className='outlet'>
                {
                    children.map((content, index) => (
                        <TabContent id={`tab${index + 1}`} activeTab={activeTab} key={index}>
                            {children[index]}
                        </TabContent>
                    ))
                }
            </div>
        </div >
    )
}

export default Tabs