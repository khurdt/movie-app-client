import React, { useState } from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
    constructor() { //the place to initialize a state's values or data in memory before rendering component
        super(); //initializes component's state and enables this.state
        this.state = {
            username: undefined,
            password: undefined,
            email: undefined,
            birthday: undefined,
            favoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    getUser = (token) => {
        const username = localStorage.getItem('user');
        axios.get(`https://kh-movie-app.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favoriteMovies: response.data.favoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // validate = () => {
    //     let isReq = true;
    //     if (!this.state.username) {
    //         isReq = false;
    //     } else if (this.state.username.length < 2) {
    //         isReq = false;
    //     }
    //     if (!this.state.password) {
    //         isReq = false;
    //     } else if (this.state.password.length < 6) {
    //         isReq = false;
    //     }
    //     if (!this.state.email) {
    //         isReq = false
    //     } else if (this.state.email.indexOf('@') === -1) {
    //         isReq = false
    //     }
    //     return isReq;
    // }

    alertForPassword = (e) => {
        e.preventDefault();
        alert('password required');
    }

    updateUser = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        // const isReq = validate();
        // if (isReq) {
        axios.put(`https://kh-movie-app.herokuapp.com/users/${username}`, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday,
            favoriteMovies: this.state.favoriteMovies
        },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favoriteMovies: response.data.favoriteMovies
                });
                localStorage.setItem('user', this.state.username);
                alert('profile updated');
                window.open(`/users/${username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((response) => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    onDeleteAccount() {
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

    setUsername(value) {
        this.setState({
            username: value,
        });
    }
    setPassword(value) {
        this.setState({
            password: value,
        })
    }
    setEmail(value) {
        this.setState({
            email: value,
        })
    }
    setBirthday(value) {
        this.setState({
            birthday: value,
        })
    }

    render() {
        const { movies, onBackClick } = this.props;
        const { favoriteMovies, username, password, email, birthday } = this.state;

        if (!username) {
            return null;
        }
        let passwordNotEmpty = false;
        if (this.state.password === undefined) {
            passwordNotEmpty = false;
        } else {
            passwordNotEmpty = true;
        }

        return (
            <Container fluid className='movie-view-container' >
                <Row className='mb-4 mt-3'>
                    <Col>
                        <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
                    </Col>
                </Row>
                <Card className='m-auto movie-view' style={{ maxWidth: '1128px', backgroundColor: '#1E2127', color: 'white' }}>
                    <Card.Title style={{ fontSize: '30px' }} className='m-3'>Personal Info</Card.Title>
                    <Row>
                        <Col className='m-3'>
                            <Form onSubmit={(e) => this.editUser(e, this.username, this.password, this.email, this.birthday)}>
                                <Form.Group className='m-1'>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        placeholder='Enter New Username'
                                        value={this.state.username}
                                        onChange={(e) => this.setUsername(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className='m-1'>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='password'
                                        placeholder='Required for Update'
                                        onChange={(e) => this.setPassword(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className='m-1'>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        placeholder='Enter New Email'
                                        value={this.state.email}
                                        onChange={(e) => this.setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className='m-1'>
                                    <Form.Label>Birthday: {this.state.birthday}</Form.Label>
                                    <Form.Control
                                        type='date'
                                        name='birthday'
                                        placeholder='Enter New Birthday'
                                        onChange={(e) => this.setBirthday(e.target.value)} required />
                                </Form.Group>
                                {passwordNotEmpty ? (
                                    <Button className='m-3' variant='success' type='submit' onClick={this.updateUser}>Update</Button>
                                ) : (
                                    <Button className='m-3' variant='success' type='submit' onClick={this.alertForPassword}>Update</Button>
                                )}
                                <Button className='m-3' variant='danger' onClick={() => this.onDeleteAccount()}>Delete Account</Button>
                            </Form>
                        </Col>
                        <Col className='m-1'>
                            <Card style={{ backgroundColor: '#1B1D24', color: 'white' }}>
                                <Card.Title className='m-1'>Favorite Movies</Card.Title>
                                <Row className='m-auto'>
                                    {favoriteMovies.length === 0 && (
                                        <div className='text-center'>No Favorite Movies :(</div>
                                    )}
                                    {favoriteMovies.length > 0 && movies.map((movie) => {
                                        if (
                                            movie._id === favoriteMovies.find((m) => m === movie._id)
                                        ) {
                                            return (
                                                <Card className='m-1 little-card' style={{ maxWidth: '200px', backgroundColor: '#1E2127', color: 'white' }}>
                                                    <Card.Img className='m-auto' style={{ maxWidth: '140px', height: '207px' }} src={movie.imagePath} crossOrigin='anonymous' />
                                                    <Card.Text style={{ fontSize: '12px' }} className='m-2 text-center' >{movie.title}</Card.Text>
                                                    <Link className='m-auto' to={`/movies/${movie._id}`}>
                                                        <Button size='sm' variant='danger' value={movie._id}
                                                            onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
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
}