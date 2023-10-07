import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const OptionsDropdown = (props) => {
    return (
        <div>
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown id="nav-dropdown-dark-example" title={props.title} menuVariant="dark">
              <NavDropdown.Item href="/me">
                Profile
             </NavDropdown.Item>
              <NavDropdown.Item href="/book/orders">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Item href="/settings">
                Settings
            </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </div>
    );
}