import React, { useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark border-bottom box-shadow mb-3">
        <Container>
          <NavbarBrand tag={Link} className="text-light text-uppercase" to="/">Databáze letů</NavbarBrand>
          <NavbarToggler onClick={toggle} color="primary" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/flight/list">Lety</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/pilot/order">Pořadí pilotů</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/pilot/list">Piloti</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/statistics">Statistiky</NavLink>
              </NavItem>
              <LoginMenu>
              </LoginMenu>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu;
