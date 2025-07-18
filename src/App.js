import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ReportModal from './components/ReportModal';
import './styles/App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          

          <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
          <div className={`main-content ${isSidebarCollapsed ? 'main-content-expanded' : ''}`}>
            <Header toggleMobileMenu={toggleMobileMenu} />
            <Routes>
              <Route
                path="/"
                element={<Dashboard openModal={openModal} />}
              />
            </Routes>
            {isModalOpen && <ReportModal closeModal={closeModal} />}
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;