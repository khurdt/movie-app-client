import React, { useState } from 'react';
import '../login-view/login-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export function RegistrationView(props) {
  const user = 'user';
  const [username, newUsername] = useState('');
  const [password, newPassword] = useState('');
  const [email, newEmail] = useState('');
  const [birthday, newBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  }

  return (
    <body className='body'>
      <Container className='container'>
        <Form style={{ maxWidth: '750px', marginTop: '3%' }}>
          <Col xs={{ span: 12, offset: 0 }} sm={{ span: 10, offset: 1, }} md={{ span: 8, offset: 2 }} lg={{ span: 7, offset: 4 }} xl={{ span: 7, offset: 5 }} style={{ backgroundColor: '#1E2127' }} className='login-body'  >
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
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='mr-5 ml-5'>
                <Form.Group className='mb-3' controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control placeholder='Enter your password' type='password' onChange={e => newPassword(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3 mr-5 ml-5' controlId='formUsername'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control className='bg' placeholder='Enter your email' type='email' onChange={e => newEmail(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3 mr-5 ml-5' controlId='formUsername'>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control className='bg' placeholder='Enter your birthday' type='text' onChange={e => newBirthday(e.target.value)} />
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
                  <Button className='reg-button' type='button' onClick={() => { props.onRegister(user); }}>
                    Log in here
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </Card.Footer>
          </Col>
        </Form>
      </Container >
    </body >
  )
}

RegistrationView.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // birthday: PropTypes.string.isRequired,
  onRegister: PropTypes.func.isRequired
};