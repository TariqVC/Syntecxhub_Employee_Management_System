import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">👥</span>
        <span className="brand-name">EmpManager</span>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
          🏠 Dashboard
        </Link>
        <Link to="/employees" className={isActive('/employees') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
          👥 Manage Employees
        </Link>
        <Link to="/departments" className={isActive('/departments') ? 'active' : ''} onClick={() => setMenuOpen(false)}>
          🏢 Departments
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;