import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './components/Home';
import AIAgent from './components/AIAgent';
import AlertsCenter from './components/AlertsCenter';
import Simulations from './components/Simulations';
import Recommendations from './components/Recommendations';
import CloudMigration from './components/CloudMigration';

function App() {
  const [activePage, setActivePage] = useState('home-dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'home-dashboard':
        return <Home />;
      case 'ai-agent':
        return <AIAgent />;
      case 'alerts-center':
        return <AlertsCenter />;
      case 'simulations':
        return <Simulations />;
      case 'recommendations':
        return <Recommendations />;
      case 'cloud-migration':
        return <CloudMigration />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-container">
        <Topbar />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
