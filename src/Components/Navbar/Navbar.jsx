import { useState } from "react";
import { Button,Container,Form,Nav,Navbar,NavDropdown,Text } from 'react-bootstrap';
import iconPlanta from '../../assets/planta.png'

const NavbarComp = () => {

    const [modeBlack, setModeBlack] = useState('dark');
    
    const handleMode = (e) => {
      const mode = modeBlack === "dark" ? "light" : "dark";
      const modeBody = mode === "dark" ? "white" : "black";
      setModeBlack(mode)  
      document.body.style.backgroundColor = modeBody;
    };

    return (
        <Navbar bg={modeBlack} variant={modeBlack} expand="lg" >
          <Container fluid>
            <Navbar.Brand href="#">
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
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/identifyPlant">Identificar Planta</Nav.Link>
              </Nav>
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