import React, { useState } from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Menu from '../navbar/navbar';


export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

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
        if (!Email) {
            setEmailErr('Password Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Invalid Email');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            //sends a request to the server for authentication
            axios.put('https://kh-movie-app.herokuapp.com/login', {
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
        <Container fluid className='movie-view-container'>
            <Row className='mb-4 mt-3'>
                <Col>
                    <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
                </Col>
            </Row>
            <Card className='m-auto movie-view' style={{ maxWidth: '1128px', height: '789px', backgroundColor: '#1E2127', color: 'white' }}>
                <Card.Title style={{ fontSize: '30px' }} className='m-3'>Personal Info</Card.Title>
                <Form style={{ maxWidth: '600px' }}>
                    <Form.Group className='m-3' controlId='formUsername'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control className='bg' placeholder='Enter your username' type='text' onChange={e => setUsername(e.target.value)} />
                        {usernameErr && <p style={{ color: 'red', padding: '1px' }}>{usernameErr}</p>}
                    </Form.Group>
                    <Card.Title className='m-3'>Password</Card.Title>
                    <Form.Group className='m-3' controlId='formPassword'>
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control placeholder='Enter your password' type='password' onChange={e => setPassword(e.target.value)} />
                        {passwordErr && <p style={{ color: 'red', padding: '1px' }}>{passwordErr}</p>}
                    </Form.Group>
                    <Button style={{ width: '105px' }} className='log-button m-5' type='submit' onClick={
                        handleSubmit}>Submit</Button>
                </Form >
            </Card >
        </Container >
    );
}