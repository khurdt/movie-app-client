import React, { useState } from 'react';
import axios from 'axios';
import './login-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <body className='body'>
      <Container className='container'>
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
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='mr-5 ml-5'>
                  <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control placeholder='Enter your password' type='password' onChange={e => setPassword(e.target.value)} />
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
              <Card.Footer>
                <Row className='mb-3'>
                  <Col></Col>
                  <Col>
                    <Button className='reg-button' type='button' onClick={() => { props.onRegister(null); }}>
                      Register Here
                    </Button>
                  </Col>
                  <Col></Col>
                </Row>
              </Card.Footer>
            </Col>
          </Row>
        </Form>
      </Container >
    </body >
  );
}

LoginView.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};