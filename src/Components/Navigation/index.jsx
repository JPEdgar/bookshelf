import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";

import SearchBar from "./SearchBar";
import MenuDropdown from "./MenuDropdown";

import { useAuthContext } from "../../hooks";

const Navigation = () => {
  const { authState } = useAuthContext();

  return (
    <>
      <Navbar
        sticky="top"
        bg="light"
        variant="light"
        collapseOnSelect
        expand="md"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
              alt=""
              src="https://picsum.photos/200"
              width="30"
              height="30"
              className="d-inline-block align-top me-1"
            />
            Digital Bookshelf
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            {authState.email ? (
              <MenuDropdown />
            ) : (
              <>
                <span>
                  <Nav.Link as={Link} to="login">
                    Log In
                  </Nav.Link>
                </span>
                <span className="ms-2">
                  <Nav.Link as={Link} to="signup">
                    Sign Up
                  </Nav.Link>
                </span>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
