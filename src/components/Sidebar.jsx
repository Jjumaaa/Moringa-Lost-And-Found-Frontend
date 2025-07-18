import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBoxOpen, FaHome, FaSearch, FaPlusCircle, FaUser, FaHistory, FaGift, FaTasks, FaCheckCircle, FaChartBar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar, isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div
      className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="sidebar-header">
        <FaBoxOpen className="text-2xl" />
        {!isCollapsed && <span className="logo-text">FindIt</span>}
      </div>
      <div className="sidebar-content">
        <nav>
          <div className="sidebar-section">
            <div className="sidebar-section-title">Main</div>
            <NavLink to="/" className="nav-item" activeClassName="active-nav">
              <FaHome className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Dashboard</span>}
            </NavLink>
            <NavLink to="/browse" className="nav-item" activeClassName="active-nav">
              <FaSearch className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Browse Items</span>}
            </NavLink>
            <NavLink to="/report" className="nav-item" activeClassName="active-nav">
              <FaPlusCircle className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Report Item</span>}
            </NavLink>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-section-title">User</div>
            <NavLink to="/profile" className="nav-item" activeClassName="active-nav">
              <FaUser className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">My Profile</span>}
            </NavLink>
            <NavLink to="/reports" className="nav-item" activeClassName="active-nav">
              <FaHistory className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">My Reports</span>}
            </NavLink>
            <NavLink to="/rewards" className="nav-item" activeClassName="active-nav">
              <FaGift className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Rewards</span>}
            </NavLink>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-section-title">Admin</div>
            <NavLink to="/inventory" className="nav-item" activeClassName="active-nav">
              <FaTasks className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Inventory</span>}
            </NavLink>
            <NavLink to="/approvals" className="nav-item" activeClassName="active-nav">
              <FaCheckCircle className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Approvals</span>}
            </NavLink>
            <NavLink to="/reports-admin" className="nav-item" activeClassName="active-nav">
              <FaChartBar className="nav-icon" />
              {!isCollapsed && <span className="sidebar-text">Reports</span>}
            </NavLink>
          </div>
        </nav>
      </div>
      <div className="sidebar-footer">
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          {!isCollapsed && <span className="sidebar-text">{isCollapsed ? 'Expand' : 'Collapse'}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;