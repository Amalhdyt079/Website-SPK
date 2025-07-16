import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/hero/logo1.png";


function NavbarComp() {
  return (
    <div className="sticky-top">
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand className="fw-bold fs-4 text-uppercase brand-left d-flex align-items-center">
            <img src={logo} alt="logo" style={{ width: "80px" }}
            /> JOGJAKU
            {/* <h4> Objek Wisata </h4> */}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="mx-2">
                Beranda
              </Nav.Link>
              <Nav.Link as={Link} to="/criteria" className="mx-2">
                Kriteria
              </Nav.Link>
              <Nav.Link as={Link} to="/alternative" className="mx-2">
                Wisata
              </Nav.Link>
              <Nav.Link as={Link} to="/hasilspk" className="mx-2">
                Rekomendasi Wisata
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* <Nav.Link as={Link} to="/service" className="mx-2">
                Service
              </Nav.Link>
              <Nav.Link as={Link} to="/faq" className="mx-2">
                FAQ
              </Nav.Link> */}
        </Container>
      </Navbar >
    </div >
  );
}

export default NavbarComp;
