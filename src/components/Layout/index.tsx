import Header from "../Header/Header";
import './layout.scss'

const index = ({ children }: any) => {
  return (
    <div className="layout">
      <Header />
      <main className="max-w-7xl w-full mx-auto pt-4">
        {children}
      </main>
    </div>
  );
};

export default index;
