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
              <Link to="/employees" className="nav-link">Inicio</Link>
            </li>
            {location.pathname === '/employees' && (
              <li className="nav-item">
                <Link to="/employees/new" className="nav-link">Nuevo empleado</Link>
              </li>
            )}
          </ul>
      </div>
    </nav>

  );
};

export default Navbar;
