import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Text } from 'react-bootstrap';
import iconPlanta from '../../assets/planta.png'
import { BsCart } from 'react-icons/bs';
import CartNavLink from "../CartNavLink";
import { ShoppingComp } from "../ShoppingComp";


const NavbarComp = () => {

  const navigate = useNavigate()
  const [modeBlack, setModeBlack] = useState('dark');

  const handleMode = (e) => {
    const mode = modeBlack === "dark" ? "light" : "dark";
    const modeBody = mode === "dark" ? "white" : "black";
    setModeBlack(mode)
    document.body.style.backgroundColor = modeBody;
  };

  return (
    <Navbar bg={modeBlack} variant={modeBlack} expand="lg" fixed='top' >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/')}>
          <img
            alt=""
            src={iconPlanta}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Plantas</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate('/Products')}>Plantas</Nav.Link>
            <Nav.Link onClick={() => navigate('/IdentifyPlant')}>Identificar Planta</Nav.Link>
          </Nav>
          <ShoppingComp/>
          <Form className="d-flex">
            <Form.Check
              type="switch"
              id="custom-switch"
              className="me-2 mt-2"
              onClick={handleMode}
            />

          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;