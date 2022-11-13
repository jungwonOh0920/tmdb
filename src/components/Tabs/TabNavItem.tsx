interface TabNavItemPropTypes {
    id: string,
    activeTab: string,
    title: string,
    setActiveTab(id: string): void
}



const TabNavItem = ({ id, activeTab, title, setActiveTab }: TabNavItemPropTypes) => {
    const handleClick = () => {
        setActiveTab(id)
    }

    return (
        <li onClick={handleClick} className={activeTab === id ? 'active' : ''}>
            {title}
        </li>
    )
}

export default TabNavItem