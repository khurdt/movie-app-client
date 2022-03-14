import React, { useState } from 'react';
import '../login-view/login-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Menu from '../navbar/navbar';

export function RegistrationView() {
  const [username, newUsername] = useState('');
  const [password, newPassword] = useState('');
  const [email, newEmail] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username Required' })
      isReq = false;
    } else if (username.length < 2) {
      setValues({ ...values, usernameErr: 'Username must be 2 characters long' })
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: 'Password Required' })
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: 'Password must be 6 characters long' })
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required' })
      isReq = false
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'invalid Email' })
      isReq = false
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://kh-movie-app.herokuapp.com/users', {
        username: username,
        password: password,
        email: email
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('registration successful, please log in!');
          window.open('/', '_self');
          //the second argument is necessary so that the page will open in the current tab
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
    }
  }

  return (
    <Container fluid className='body'>
      <Col className='pb-5'></Col>
      <Form className='ml-auto mr-auto pt-5' style={{ maxWidth: '450px', marginTop: '3%' }}>
        <Row>
          <Col style={{ backgroundColor: '#1E2127', color: 'white' }} className='login-body'>
            <Row>
              <Col>
                <h2 className='greeting'>Register for myFlix</h2>
                <h5 className='log-in-greeting'>create an account</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3 mt-3 mr-5 ml-5' controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control className='bg' placeholder='Enter your username' type='text' onChange={e => newUsername(e.target.value)} />
                  {values.usernameErr && <p style={{ color: 'red', padding: '1px' }}>{values.usernameErr}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='mr-5 ml-5'>
                <Form.Group className='mb-3' controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control placeholder='Enter your password' type='password' onChange={e => newPassword(e.target.value)} />
                  {values.passwordErr && <p style={{ color: 'red', padding: '1px' }}>{values.passwordErr}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3 mr-5 ml-5' controlId='formUsername'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control className='bg' placeholder='Enter your email' type='email' onChange={e => newEmail(e.target.value)} />
                  {values.emailErr && <p style={{ color: 'red', padding: '1px' }}>{values.emailErr}</p>}
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
  )
}
