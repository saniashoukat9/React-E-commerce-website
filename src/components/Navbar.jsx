import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ cartCount }) {
  const [expanded, setExpanded] = useState(false);
  
  const handleNavClick = () => setExpanded(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top app-navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold" onClick={handleNavClick}>
          TechNest
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          aria-controls="main-nav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="main-nav" className={`collapse navbar-collapse${expanded ? ' show' : ''}`}>
          <div className="navbar-nav ms-auto align-items-lg-center">
            <NavLink
              to="/"
              end
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Cart{' '}
              <span className="badge rounded-pill text-bg-warning text-dark">
                {cartCount}
              </span>
            </NavLink>
            <NavLink
              to="/auth"
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Login
            </NavLink>
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              Admin
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
