interface TabContentPropTypes {
    id: string,
    activeTab: string,
    children: any
}

const TabContent = ({ id, activeTab, children }: TabContentPropTypes) => {
    return (
        activeTab === id ?
            <div className='tabContent'>
                {children}
            </div>
            : null
    )
}



export default TabContent