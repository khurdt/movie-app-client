import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function ProfileView(props) {
    const { movies, onBackClick, userData, removeFavorite, callDispatch } = props;
    useEffect(() => {
        setUsername(props.userData.username);
        setEmail(props.userData.email);
        if (props.userData.birthday !== undefined) {
            setBirthday(props.userData.birthday);
        } else {
            setBirthday('');
        }
    }, [props.userData.username]); //if username changes then useEffect will render

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [updateSuccess, setUpdateSuccess] = useState('');
    const [updateFail, setUpdateFail] = useState('');

    const userInfo = {
        username: username,
        password: password,
        email: email,
        birthday: birthday
    }

    const formattedBirthday = birthday.slice(0, 10);

    if (userData.username === undefined) return <div className='load'></div>

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
        if (!email) {
            setEmailErr('Email Required');
            isReq = false
        } else if (email.indexOf('@') === -1) {
            setEmailErr('invalid Email');
            isReq = false
        }
        return isReq;
    }

    const updateUser = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const isReq = validate();
        if (isReq) {
            axios.put(`https://kh-movie-app.herokuapp.com/users/${username}`, userInfo,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    localStorage.setItem('user', username);
                    callDispatch();
                    setUpdateSuccess('update successfull!');
                })
                .catch(function (error) {
                    console.log(error);
                    setUpdateFail('update failed');

                });
        }
    };

    const onDeleteAccount = () => {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://kh-movie-app.herokuapp.com/users/${username}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert('user unregisterd');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (updateSuccess !== '' || updateFail !== '' || usernameErr !== '' || passwordErr !== '' || emailErr !== '') {
        setTimeout(
            () => {
                setUpdateSuccess('')
                setUpdateFail('')
                setUsernameErr('')
                setPasswordErr('')
                setEmailErr('')
            },
            5000
        );
    }

    return (
        <Container fluid className='movie-view-container' >
            <Row className='mb-4 mt-3'>
                <Col>
                    <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
                </Col>
            </Row>
            <Card className='m-auto movie-view profile-card' style={{ maxWidth: '1128px', backgroundColor: '#1E2127', color: 'white' }}>
                <Card.Title style={{ fontSize: '30px' }} className='m-3'>Personal Info</Card.Title>
                <Row>
                    <Col className='m-3' xs={10} md={4}>
                        {updateSuccess && <p style={{ color: 'green', padding: '1px' }}>{updateSuccess}</p>}
                        {updateFail && <p style={{ color: 'red', padding: '1px' }}>{updateFail}</p>}
                        <Form>
                            <Form.Group className='m-1'>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='username'
                                    placeholder='Enter New Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} required />
                                {usernameErr && <p style={{ color: 'red', padding: '1px' }}>{usernameErr}</p>}
                            </Form.Group>
                            <Form.Group className='m-1'>
                                <Form.Label>New Password:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='password'
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)} required />
                                {passwordErr && <p style={{ color: 'red', padding: '1px' }}>{passwordErr}</p>}
                            </Form.Group>
                            <Form.Group className='m-1'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='email'
                                    placeholder='Enter New Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} required />
                                {emailErr && <p style={{ color: 'red', padding: '1px' }}>{emailErr}</p>}
                            </Form.Group>
                            <Form.Group className='m-1'>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='birthday'
                                    value={formattedBirthday}
                                    placeholder='Enter New Birthday'
                                    onChange={(e) => setBirthday(e.target.value)} required></Form.Control>
                            </Form.Group>
                            <Button className='m-3' variant='success' type='submit' onClick={(e) => updateUser(e)}>Update</Button>
                            <Button className='m-3' variant='danger' onClick={() => onDeleteAccount()}>Delete Account</Button>
                        </Form>
                    </Col>
                    <Col className='m-1'>
                        <Card style={{ backgroundColor: '#1B1D24', color: 'white' }}>
                            <Card.Title className='m-1'>Favorite Movies</Card.Title>
                            <Row className='m-auto'>
                                {userData.favoriteMovies.length === 0 && (
                                    <div style={{ height: '50vh' }} className='text-center'>No Favorite Movies</div>
                                )}
                                {userData.favoriteMovies.length > 0 && movies.map((movie) => {
                                    if (
                                        movie._id === userData.favoriteMovies.find((m) => m === movie._id)
                                    ) {
                                        return (
                                            <Card key={movie._id} className='m-1 little-card' style={{ maxWidth: '200px', backgroundColor: '#1E2127', color: 'white' }}>
                                                <Card.Img className='m-auto' style={{ maxWidth: '140px', height: '207px' }} src={movie.imagePath} crossOrigin='anonymous' />
                                                <Card.Text style={{ fontSize: '12px' }} className='m-2 text-center' >{movie.title}</Card.Text>
                                                <Link className='m-auto' to={`/movies/${movie._id}`}>
                                                    <Button size='sm' variant='danger' value={movie._id}
                                                        onClick={(e) => removeFavorite(e, movie)}>Remove</Button>
                                                </Link>
                                            </Card>
                                        )
                                    }
                                })}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Card >
        </Container >
    );
}

ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,
    userData: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
        birthday: PropTypes.string,
        favoriteMovies: PropTypes.array,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    callDispatch: PropTypes.func.isRequired
};