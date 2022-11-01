import Header from "../Header";

const index = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 to-blue-800">
      <Header />
      <main className="max-w-7xl w-full mx-auto pt-4">
        {children}
      </main>
    </div>
  );
};

export default index;
