import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Navigation.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">Noxe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Link to="/home">Home</Link>
            <Link to="/movies">movies</Link>
            <Link to="/people">people</Link>
            <Link to="/tv">tv</Link>
            <Link to="/login">login</Link>
            <Link to="/">register</Link>
          </Nav>

          <div className="social-media">
            <i className="fab mx-1 fa-facebook"></i>
            <i className="fab mx-1 fa-instagram"></i>
            <i className="fab mx-1 fa-twitter"></i>
            <i className="fab mx-1 fa-spotify"></i>
            <i className="fab mx-1 fa-youtube"></i>
          </div>

          <Nav className="me-auto">
            <Link to="login">Login</Link>
            <Link to="/">register</Link>
            <Link>LogOut</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
