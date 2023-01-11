import { useEffect, useState, PropsWithChildren } from "react"
import eventBus from "../../assets/utilities/EventBus"
import Header from "../Header/Header"
import './layout.scss'

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleResize = () => {
    setWidth(window.innerWidth)
    eventBus.dispatch('adjustWidth', width)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return (
    <div className="layout">
      <Header />
      <main className="main w-full px-20 h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
