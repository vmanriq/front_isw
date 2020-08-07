import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

//import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Link to={"/"} className="navbar-brand">
                    Gestor de Camas
                </Link>

                <Nav className="mr-auto">
                    <NavDropdown title="Pabellon" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"/pabellon/list"} >Lista</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"/pabellon/addPabellon"} >Agregar Pabellon</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Pacientes" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={"#"} >Lista</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={"#"} >Agregar Paciente</NavDropdown.Item>
                    </NavDropdown>

                </Nav>

            </Navbar>
        );
    }

}