import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import WCLogo from "./resources/images/winechain.png";
import "./resources/styles/HeaderStyles.css";

export default class Header extends Component {

    render() {
        return (
              <Navbar expand="md">
                      <Nav className="mr-auto" navbar>
                          <NavItem>
                              <NavLink href="/" className='nav-font'>Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/listing" className="nav-font">Coins</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="/about" className="nav-font">About Us</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink href="https://github.com/elavertu9/WineChain" className="nav-font">GitHub</NavLink>
                          </NavItem>
                      </Nav>
                  <NavbarBrand href="/"><img src={WCLogo} alt="WineChain" width="150px"/></NavbarBrand>
              </Navbar>
        );
    }

}