import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

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
        <Navbar style={{ backgroundColor: '#1E2127' }} expand='lg'>
            <Container>
                <Navbar.Brand style={{ color: '#1266F1', fontSize: '30px' }} href='/'>myFlix</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto'>
                        {isAuth() && (
                            <Nav.Link style={{ color: 'white' }}>{user}</Nav.Link>
                        )}
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
            </Container>
        </Navbar>
    );
}