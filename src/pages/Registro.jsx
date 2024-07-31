import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import testApi from "../api/testApi";

const Registro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [createMsg, setCreateMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    registrarUsuario();
  };

  const registrarUsuario = () => {
    if (!name || !email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
    }

    const validarEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const resultadoValidacionEmail = validarEmail.test(email);

    if (!resultadoValidacionEmail) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email inválido",
      });
    }

    const validarPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const resultadoValidacionPass = validarPass.test(password);

    if (!resultadoValidacionPass) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No es un La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. valido",
      });
    } else if (password !== confirmPass) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    }

    // setUsuario([name, ...usuario]);
    // localStorage.setItem("usuarios", JSON.stringify(usuario));

    registrarUsuarioBack(name, email, password);
  };

  const registrarUsuarioBack = async (name, email, password) => {
    try {
      const resp = await testApi.post("/auth/crearUsuario", {
        name,
        email,
        password,
      });

      setCreateMsg(resp.data.msg);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: createMsg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setErrorMsg(error.response.data.msg);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row my-4">
          <div className="col-10 offset-1 col-md-4 offset-md-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
