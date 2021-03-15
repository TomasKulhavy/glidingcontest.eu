import React, { useState, useContext, useEffect } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FlightDataContext, SET_ACCESS_TOKEN, ADD_PILOTID } from "../../providers/FlightDataContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSignOutAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import './NavMenu.css';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [{accessToken}, dispatch] = useContext(FlightDataContext);
  const toggle = () => setIsOpen(!isOpen);

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  function renderUser()
  {
    let tokenData;
    
    if(accessToken !== null)
    {
      tokenData = parseJwt(accessToken)
      return (
        <NavItem>
          <NavLink tag={Link} className="text-light" onClick={() =>
            dispatch({
              type: ADD_PILOTID,
              pilotId: tokenData.sub
            })} tag={Link} to="/pilot/flights">
            <FontAwesomeIcon icon={faUserAlt} className="font-size-xl mr-2 mt-1" />
            {tokenData.sub}
          </NavLink>
        </NavItem>
      )
    }
  }

  function renderFeedback()
  {
    let tokenData;
    if(accessToken !== null)
    {
      tokenData = parseJwt(accessToken)
      if(tokenData.sub === "TomasLKLB")
      {
        return (
          <NavItem>
            <NavLink tag={Link} className="text-light" to="/feedback/review">
              Feedback
            </NavLink>
          </NavItem>
        )
      }
    }
  }
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3">
        <Container>
          <NavbarBrand tag={Link} className="text-light text-uppercase" to="/">Databáze letů</NavbarBrand>
          <NavbarToggler onClick={toggle} />
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
              {renderFeedback()}
              {
                accessToken
                ?
                  <Nav navbar>
                    {renderUser()}
                    <NavItem>
                      <NavLink tag={Link} className="text-light" to="/flight/upload">
                        <FontAwesomeIcon icon={faUpload} className="font-size-xl mr-2 mt-1" />
                        Nahrát let
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={e => { dispatch({ type: SET_ACCESS_TOKEN, payload: null }) }}
                        tag={Link} className="text-light" to="/">
                        <FontAwesomeIcon icon={faSignOutAlt} className="font-size-xl mr-2 mt-1" />
                        Odhlásit se
                      </NavLink>
                    </NavItem>
                  </Nav>
                  :
                  <Nav navbar>
                    <NavItem>
                      <NavLink tag={Link} className="text-light" to="/register">Registrovat se</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-light" to="/login">Přihlásit se</NavLink>
                    </NavItem>
                  </Nav>
              }
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavMenu;
