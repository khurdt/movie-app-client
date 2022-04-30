import React from 'react';
import './navbar-view.scss';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageActive: 'home'
        };
    }

    onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    }

    render() {
        const { pageActive } = this.state;
        const { user } = this.props;

        const isAuth = localStorage.getItem('token');

        let homeIcon = {
            textDecorationColor: '#1266F1',
            textDecorationThickness: 'solid',
            color: 'white',
            textDecorationLine: (!(window.location.href.includes('user'))) && 'underline'
        }
        let userIcon = {
            textDecorationColor: '#1266F1',
            textDecorationThickness: 'solid',
            color: 'white',
            textDecorationLine: (pageActive === 'user' || window.location.href.includes('users')) && 'underline'
        };
        return (
            <>
                <Navbar style={{ backgroundColor: '#1E2127', height: '56px', margin: '0', padding: '0', zIndex: '100' }}>
                    <Navbar.Brand style={{ color: '#1266F1', fontSize: '20px', padding: '10px' }} href='/'>myFlix</Navbar.Brand>
                    <Nav className='ml-auto' style={{ backgroundColor: '#1E2127', padding: '5px' }}>
                        {isAuth && (
                            <Button style={{ color: 'white' }} onClick={() => { this.onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth && (
                            <Nav.Link style={{ color: 'white' }} href='/'>Login</Nav.Link>
                        )}
                        {!isAuth && (
                            <Nav.Link style={{ color: 'white' }} href='/register'>Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar>
                {isAuth && (
                    <Navbar className='submenu' style={{ backgroundColor: '#1E2127' }} expand='lg'>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='mr-auto'>
                                {isAuth && (
                                    <div style={{ border: '1px', borderColor: 'blue' }}>
                                        <Nav.Link style={homeIcon} onClick={() => { this.setState({ pageActive: 'home' }) }} href='/'>Movies</Nav.Link>
                                    </div>
                                )}
                                {isAuth && (
                                    <div style={userIcon}>
                                        <Nav.Link as={Link} style={userIcon} onClick={() => { this.setState({ pageActive: 'user' }) }} to={`/users/${user}`}>{user}</Nav.Link>
                                    </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )}
            </>
        );
    }
}

export default Menu;