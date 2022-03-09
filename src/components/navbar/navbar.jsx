import React, { useState } from 'react';
import './navbar-view.scss';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button, Card } from 'react-bootstrap';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

export default function Menu({ user }) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };

    return (
        <>
            <Navbar style={{ backgroundColor: '#1E2127', height: '56px', margin: '0', padding: '0', zIndex: '100' }} expand='lg'>
                <Navbar.Brand style={{ color: '#1266F1', fontSize: '20px', padding: '10px' }} href='/'>myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto' style={{ backgroundColor: '#1E2127', padding: '5px' }}>
                        {isAuth() && (
                            <Button style={{ color: 'white' }} onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link style={{ color: 'white' }} href='/'>Login</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link style={{ color: 'white' }} href='/register'>Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {isAuth() && (
                <Navbar className='submenu' style={{ backgroundColor: '#1E2127' }} expand='lg'>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='mr-auto'>
                            {isAuth() && (
                                <Nav.Link style={{ color: 'white' }} href='/'>Movies</Nav.Link>
                            )}
                            {isAuth() && (
                                <Nav.Link style={{ color: 'white' }} href={`/users/${user}`}>{user}</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </>
    );
}