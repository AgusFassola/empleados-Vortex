import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item">
        Inicio
      </Link>
      <br></br>
      <Link to="/create" className="item">
        Nuevo empleado
      </Link>
    </div>
  );
};

export default Navbar;
