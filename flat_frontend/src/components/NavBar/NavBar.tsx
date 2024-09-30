import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/logo.png";

const AppNavbar = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = () => {
    setWalletConnected(true);
  };

  return (
    <Navbar bg="white" expand="md" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            Fuelart
            {/* <img
              alt=""
              src={logo}
              height="50"
              className="d-inline-block align-top"
            /> */}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Offcanvas id="navbar" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="navbar">Company Name</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="explore">
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="p2p">
                P2P
              </Nav.Link>
              <Nav.Link as={Link} to="create">
                Create
              </Nav.Link>
              {/* <Nav.Link as={Link} to="launchpad">
                Launchpad
              </Nav.Link> */}
            </Nav>
            <Button onClick={connectWallet} className="ms-2" variant="success">
              Connect wallet
            </Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
