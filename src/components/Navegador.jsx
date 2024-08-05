import React, { useEffect, useState } from "react";
import logoSMnegro from "../assets/image/logoSMnegro.jpeg";
import { Link, NavLink } from "react-router-dom";
import "../css/navegador.css";
import Swal from "sweetalert2";

const Navegador = () => {
  const [tokenStatus, setTokenStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setTokenStatus(true);
    }
  }, []);

  const cerrarSesion = () => {
    Swal.fire({
      title: "Cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesión!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Cerraste sesión",
          icon: "success",
        });

        localStorage.removeItem("token");
        location.replace("/");
      }
    });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img src={logoSMnegro} alt="logo sm " className="logo_nav" />
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Inicio
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Vehículos
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink className="dropdown-item" to="/">
                          Nuevos
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/">
                          Usados
                        </NavLink>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link " aria-current="page" to="/">
                      Quienes somos
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link " aria-current="page" to="/">
                      Contacto
                    </NavLink>
                  </li>
                </ul>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-warning me-2"
                    type="submit"
                  >
                    Buscar
                  </button>
                </form>

                <div>
                  {tokenStatus ? (
                    <NavLink to="/">
                      <button
                        className="btn btn-warning me-3"
                        onClick={cerrarSesion}
                      >
                        Cerrar Sesión
                      </button>
                    </NavLink>
                  ) : (
                    <NavLink to="/login">
                      <button className="btn btn-warning me-2">Inicio</button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navegador;
