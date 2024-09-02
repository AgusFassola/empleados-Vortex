import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar  navbar-dark bg-dark">
      <div className="container">
        <Link to="/employees" className="navbar-brand">
          Vortex
        </Link>
        {token && (
          <>
            <ul className="navbar-nav me-auto">
           {/*  {location.pathname !== "/employees" && ( */}
                <li className="nav-item">
                  <Link to="/employees" className="nav-link">
                    Empleados
                  </Link>
                </li>
              {/* )} */}

            <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Usuarios
                </Link>
              </li>
              
              <li className="nav-item">
                <Link to="/positions" className="nav-link">
                  Puestos
                </Link>
              </li>
              
            </ul>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                  <button className="btn btn-outline-light"
                  onClick={handleLogout}
                  >Cerrar Sesión</button>
              </li>
            </ul>
          
          </>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
