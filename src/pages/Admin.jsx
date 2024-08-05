import React, { useState, useEffect } from "react";
import Navegador from "../components/Navegador";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import testApi from "../api/testApi";

const Admin = () => {
  const [cargarUsuarios, setCargarUsuarios] = useState([]);
  const handleClose = () => setShowEditar(false);
  const [showEditar, setShowEditar] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState({});

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

  const editarUsuario = (usuario) => {
    setShowEditar(true);

    setUsuarioEditar(usuario);
  };

  const handleChangeEditar = (propiedad, valor) => {
    setUsuarioEditar({
      ...usuarioEditar,
      [propiedad]: valor,
    });
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();

    //Validar campos

    editarUsuarioDB(usuarioEditar);
  };

  const editarUsuarioDB = async ({ name, email, rol, _id }) => {
    try {
      const resp = await testApi.put("/admin/editarUsuario", {
        name,
        email,
        rol,
        _id,
      });

      listaUsuariosBack();

      setShowEditar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const resp = await testApi.delete(`/admin/eliminarUsuario/${id}`);
      listaUsuariosBack();
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
                        <button
                          className="btn btn-warning"
                          onClick={() => editarUsuario(usuario)}
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => eliminarUsuario(usuario._id)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <div>
          <Modal show={showEditar} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={usuarioEditar.name}
                    onChange={(e) => handleChangeEditar("name", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={usuarioEditar.email}
                    onChange={(e) =>
                      handleChangeEditar("email", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    type="text"
                    value={usuarioEditar.rol}
                    onChange={(e) => handleChangeEditar("rol", e.target.value)}
                  />
                </Form.Group>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmitEditar}
                  >
                    Guardar cambios
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Admin;
