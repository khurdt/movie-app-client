import React, { useState } from 'react';
// import './login-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <Container>
      <Form className='form'>
        <Row>
          <Col xs={{ span: 6, offset: 3 }} md={{ span: 8, offset: 5 }} lg={{ span: 8, offset: 5 }} className='login-body'  >
            <Row>
              <Col>
                <Form.Group className='mb-3 mt-3' controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control placeholder='Enter your username' type='text' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col >
                <Form.Group className='mb-3' controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control placeholder='Enter your password' type='password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3' >
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col md={{ order: 'last' }}>
                <Button className='log-button' variant='primary' type='submit' onClick={
                  handleSubmit}>Submit</Button>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col></Col>
              <Col>
                <Button className='reg-button' variant='secondary' type='button' onClick={() => { props.onRegister(null); }}>
                  Register Here
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};