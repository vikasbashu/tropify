import React,{useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from "../context/Firebase";
import { OptionsDropdown } from "./OptionsDropdown";

export const MyNavBar = (props) => {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const resp = firebase.userLoginStatus();
    if(resp){
      setUser(resp);
    }
  }, [firebase]);
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Tropify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/addNew">Add Listing</Nav.Link>
            <Nav.Link href="/support">Support</Nav.Link>
          </Nav>
          <Nav>
          {user ? <OptionsDropdown title={user.displayName || user.email} {...user}/> : <Nav.Link href="/login">Sign In</Nav.Link>}
            
            {/* {user && <Nav.Link href="/login">{`Hi ${user.displayName || user.email},`}</Nav.Link>}
           */}
          </Nav>
        </Container>
      </Navbar>
    );
}