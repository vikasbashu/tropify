import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const MyNavBar = (props) => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Tropify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/addNew">Add Listing</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
            <Nav.Link href="/book/orders">My Orders</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}