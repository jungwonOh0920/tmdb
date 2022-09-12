import Header from '../Header'

const index = ({ children }: any) => {
    return (
        <div className='min-h-screen bg-gradient-to-r from-cyan-700 to-blue-700'>
            <Header />
            <main className='max-w-7xl w-full mx-auto pt-4 bg-orange-900'>{children}</main>
        </div>
    )
}

export default index