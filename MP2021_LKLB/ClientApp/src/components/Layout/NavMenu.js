import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark border-bottom box-shadow mb-3">
        <Container>
          <NavbarBrand tag={Link} className="text-light" to="/">Databáze letů</NavbarBrand>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
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
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/photogallery">Fotogalerie</NavLink>
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
