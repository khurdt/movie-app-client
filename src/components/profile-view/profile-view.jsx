import React, { useState } from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class ProfileView extends React.Component {
    render() {
        const { user, movies, onBackClick } = this.props;

        console.log({ user }.favoriteMovies);

        return (
            <Container fluid className='movie-view-container'>
                <Row className='mb-4 mt-3'>
                    <Col>
                        <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
                    </Col>
                </Row>
                <Card className='m-auto movie-view' style={{ maxWidth: '1128px', height: '789px', backgroundColor: '#1E2127', color: 'white' }}>
                    <Card.Title style={{ fontSize: '30px' }} className='m-3'>Personal Info</Card.Title>
                    <Row>
                        <Col className='m-3'>
                            <Card.Text>Username: {user}</Card.Text>
                            <Card.Text></Card.Text>
                        </Col>
                        <Col>
                            <Card style={{ backgroundColor: '#1B1D24', color: 'white' }}>
                                {/* {user.favoriteMovies.map(movie => (
                                    <Card className='m-1 little-card' style={{ backgroundColor: '#1E2127', color: 'white' }}>
                                        <Card.Img className='m-auto' style={{ maxWidth: '140px', height: '207px' }} src={movie.imagePath} crossOrigin='anonymous' />
                                        <Card.Text style={{ fontSize: '12px' }} className='m-2' >{movie.title}</Card.Text>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button variant='link'>Read More</Button>
                                        </Link>
                                    </Card>
                                ))} */}
                            </Card>
                        </Col>
                    </Row>
                </Card >
            </Container >
        );
    }
}