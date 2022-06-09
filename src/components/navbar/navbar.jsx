import React from 'react';
import './navbar-view.scss';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageActive: ''
    };
  }

  componentDidMount() {
    if (window.location.href.includes('user')) { this.setState({ pageActive: 'user' }) }
    else if (window.location.href.includes('login')) { this.setState({ pageActive: 'login' }) }
    else if (window.location.href.includes('register')) { this.setState({ pageActive: 'register' }) }
    else { this.setState({ pageActive: 'home' }) };
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
      color: 'white',
      borderBottom: (!(window.location.href.includes('user' || 'login' || 'register'))) ? '2px solid #1266F1' : '2px solid #1E2127'
    };
    let userIcon = {
      color: 'white',
      borderBottom: (pageActive === 'user' || window.location.href.includes('users')) ? '2px solid #1266F1' : '2px solid #1E2127'
    };
    let loginIcon = {
      color: 'white',
      borderBottom: (pageActive === 'login' || window.location.href.includes('login')) ? '2px solid #1266F1' : '2px solid #1E2127'
    };
    let registerIcon = {
      color: 'white',
      borderBottom: (pageActive === 'register' || window.location.href.includes('register')) ? '2px solid #1266F1' : '2px solid #1E2127'
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
              <Nav.Link className='text-center' as={Link} onClick={() => { this.setState({ pageActive: 'login' }) }} style={loginIcon} to='/'>Login</Nav.Link>
            )}
            {!isAuth && (
              <Nav.Link className='text-center' as={Link} onClick={() => { this.setState({ pageActive: 'register' }) }} style={registerIcon} to='/register'>Register</Nav.Link>
            )}
          </Nav>
        </Navbar>
        {isAuth && (
          <Navbar className='submenu' style={{ backgroundColor: '#1E2127' }} expand='lg'>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                {isAuth && (
                  <div>
                    <Nav.Link className='text-center' style={homeIcon} onClick={() => { this.setState({ pageActive: 'home' }) }} href='/'>Movies</Nav.Link>
                  </div>
                )}
                {isAuth && (
                  <div>
                    <Nav.Link className='text-center' as={Link} style={userIcon} onClick={() => { this.setState({ pageActive: 'user' }) }} to={`/users/${user}`}>{user}</Nav.Link>
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