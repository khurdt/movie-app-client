import React, { useState } from 'react';
import axios from 'axios';
import './login-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Menu from '../navbar/navbar';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //sends a request to the server for authentication
      axios.post('https://kh-movie-app.herokuapp.com/login', {
        username: username,
        password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <body className='body'>
      <Menu />
      <Container fluid className='container'>
        <Form style={{ maxWidth: '750px', marginTop: '10%' }}>
          <Row>
            <Col xs={{ span: 12, offset: 0 }} sm={{ span: 10, offset: 1, }} md={{ span: 8, offset: 2 }} lg={{ span: 7, offset: 4 }} xl={{ span: 7, offset: 5 }} style={{ backgroundColor: '#1E2127' }} className='login-body'  >
              <Row>
                <Col>
                  <h2 className='greeting'>Welcome to myFlix</h2>
                  <h5 className='log-in-greeting'>Log in to your account</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className='mb-3 mt-3 mr-5 ml-5' controlId='formUsername'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control className='bg' placeholder='Enter your username' type='text' onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p style={{ color: 'red', padding: '1px' }}>{usernameErr}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='mr-5 ml-5'>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control placeholder='Enter your password' type='password' onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p style={{ color: 'red', padding: '1px' }}>{passwordErr}</p>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mb-3' >
                <Col></Col>
                <Col></Col>
                <Col>
                  <Button style={{ width: '105px' }} className='log-button mr-5' type='submit' onClick={
                    handleSubmit}>Submit</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container >
    </body>
  );
}

LoginView.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};