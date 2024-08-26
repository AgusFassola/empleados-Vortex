import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/employees" className="navbar-brand">
          Vortex
        </Link>
        {token && (
          <>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/employees" className="nav-link">
                  Inicio
                </Link>
              </li>
              {location.pathname === "/employees" && (
                <li className="nav-item">
                  <Link to="/employees/new" className="nav-link">
                    Nuevo empleado
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                  <button className="btn btn-outline-light"
                  onClick={handleLogout}
                  >Cerrar Sesión</button>
              </li>
            </ul>
          </div> 
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
