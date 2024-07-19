import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/new" className="item">
        Add Employee
      </Link>
    </div>
  );
};

export default Navbar;
