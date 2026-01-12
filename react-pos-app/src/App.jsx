import { useState } from 'react';
import { Sidebar, Navbar } from './components';
import { Dashboard, Products, POS } from './pages';
import './styles/global.css';

function App() {
  const [activePage, setActivePage] = useState('pos');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50">
      {activePage !== 'pos' && (
        <>
          <Sidebar activePage={activePage} onNavigate={setActivePage} isOpen={sidebarOpen} />

          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex-1 overflow-y-auto p-8 w-full">
              {activePage === 'dashboard' && <Dashboard />}
              {activePage === 'products' && <Products />}
            </div>
          </main>
        </>
      )}
      {activePage === 'pos' && <POS onSwitchToAdmin={() => setActivePage('dashboard')} />}
    </div>
  );
}

export default App;
