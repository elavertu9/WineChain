import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarText} from 'reactstrap';
import WCLogo from "./resources/images/winechain.png";
import "./resources/styles/HeaderStyles.css";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
              <Navbar expand="md">
                      <Nav className="mr-auto" navbar>
                          <NavItem>
                              <NavLink href="/listing" className="nav-font">Wine Listing</NavLink>
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