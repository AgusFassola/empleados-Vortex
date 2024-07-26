import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className='navbar'>
      <div className="container">
      <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            {location.pathname === '/' && (
              <li className="nav-item">
                <Link to="/employees/new" className="nav-link">Nuevo empleado</Link>
              </li>
            )}
            <li className='nav-item'>
              <Link className='nav-link' to="/login">Login</Link>
            </li>
          </ul>
      </div>
    </nav>

  );
};

export default Navbar;
