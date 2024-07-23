import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="ui menu">
      <Link to="/" className="item">
        Inicio
      </Link>
      {location.pathname === '/' && (
        <Link to="/employees/new" className="item">
          Nuevo empleado
        </Link>
      )}

    </div>
  );
};

export default Navbar;
