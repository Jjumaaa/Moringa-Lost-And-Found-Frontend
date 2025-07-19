import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ReportModal from './components/ReportModal';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css';
import logo from './assets/logo.png';

function AppContent() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication status on mount (e.g., from localStorage or token)
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token on backend if needed
    }
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      <div className="logo">
        <img src={logo} alt="Lost & Found Logo" />
      </div>
      {isAuthenticated ? (
        <>
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
                element={role === 'admin' ? <Dashboard openModal={openModal} isAdmin={true} /> : <Dashboard openModal={openModal} />}
              />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
            </Routes>
            {isModalOpen && <ReportModal closeModal={closeModal} />}
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;