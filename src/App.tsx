import { Outlet } from 'react-router-dom';
import Header from './components/partials/Header';

const App: React.FC = ():React.JSX.Element => {
  
  return (
    <>
      <div className="bg-[#F9F9FA] max-h-16">
        <Header />
        <main className="flex mx-auto" 
            style={{ justifyContent: "center" }}>
              <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
