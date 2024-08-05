import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import testApi from "../api/testApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUsuario();
  };

  const loginUsuario = () => {
    if (!email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
    }

    loginBack(email.toLowerCase(), password);
  };

  const loginBack = async (email, password) => {
    try {
      const resp = await testApi.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", resp.data.token);

      Swal.fire({
        position: "center",
        icon: "success",
        title: resp.data.msg,
        showConfirmButton: false,
        timer: 3000,
      });

      location.replace("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };
  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <div className="row my-4">
          <div className="col-10 offset-1 col-md-4 offset-md-4">
            <Form onSubmit={handleSubmit}>
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

export default Login;
