import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoSMnegro from "../assets/image/logoSMnegro.jpeg";
import "../css/navegador.css";

const Navegador = () => {
  return (
    <div>
      <Navbar expand="lg" data-bs-theme="dark" className="back_nav">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logoSMnegro} alt="" className="logo_nav " />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Inicio</Nav.Link>
              <NavDropdown title="Vehiculos" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Nuevos</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Usados</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2">Contacto</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>

        <div>
          <button className="btn btn-default"></button>
        </div>
      </Navbar>
    </div>
  );
};

export default Navegador;
