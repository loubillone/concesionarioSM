import React, { useState, useEffect } from "react";
import Navegador from "../components/Navegador";
import Table from "react-bootstrap/Table";
import testApi from "../api/testApi";

const Admin = () => {
  const [cargarUsuarios, setCargarUsuarios] = useState([]);
  useEffect(() => {
    listaUsuariosBack();
  }, []);

  const listaUsuariosBack = async () => {
    try {
      const resp = await testApi.get("/admin/listaUsuarios");

      setCargarUsuarios(resp.data.listaUsuarios);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navegador />

      <div className="container my-3">
        <h2>Administrador</h2>
        <div className="row my-4">
          <div className="col">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Eliminar</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {cargarUsuarios.map((usuario) => {
                  return (
                    <tr key={usuario._id}>
                      <td>{usuario._id}</td>
                      <td>{usuario.name}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.rol}</td>
                      <td>
                        <button class="btn btn-danger me-2">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-warning">
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
