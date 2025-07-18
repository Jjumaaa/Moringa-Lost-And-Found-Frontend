import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FaBars, FaBell, FaChevronDown } from 'react-icons/fa';

const Header = ({ toggleMobileMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button onClick={toggleMobileMenu} className="mobile-menu-btn">
            <FaBars className="text-xl" />
          </button>
          <h1>Lost & Found Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="notification">
            <FaBell />
            <span className="notification-badge"></span>
          </div>
          <div className="dropdown" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className="dropdown-toggle">
              <div className="avatar">{user?.name?.charAt(0) || 'JD'}</div>
              <span className="user-name">{user?.name || 'John Doe'}</span>
              <FaChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;