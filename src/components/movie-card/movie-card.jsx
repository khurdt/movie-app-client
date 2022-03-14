import React from 'react';
import './movie-card.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import heartLogo from '../../images/heart.png';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function MovieCard(props) {
  const { movie, userData, componentDidMount } = props;

  if (userData.favoriteMovies === undefined) {
    return null;
  }

  onRemoveFavorite = function () {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addFavorite = function () {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`, { 'jwt': token }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let tempArray = userData.favoriteMovies;
  let isFavorite = false;
  if (tempArray.includes(movie._id)) {
    isFavorite = true;
  } else {
    isFavorite = false;
  };

  return (
    <Card className='mt-2 mb-5 ml-auto mr-auto movie-card' style={{ color: 'white', backgroundColor: '#1E2127' }}>
      <Link className='m-auto pt-3 little-img' to={`/movies/${movie._id}`}>
        <Card.Img className='m-auto img' src={movie.imagePath} crossOrigin='anonymous' />
      </Link>
      <Card.Text className='m-4 title'>{movie.title}</Card.Text>
      <Link className='m-auto big-img' to={`/movies/${movie._id}`}>
        <Card.Img className='m-auto' style={{ maxHeight: '480px' }} src={movie.imagePath} crossOrigin='anonymous' />
      </Link>
      <Card.Body>
        <Card.Text className='overflow-hidden ml-2 desc-display' style={{ height: '50px' }}>{movie.description}</Card.Text>
        <Card.Footer className='footer-display'>
          <Row>
            <Col>
              <Link to={`/movies/${movie._id}`}>
                <Button style={{ fontSize: '15px' }} variant='link'>Show More</Button>
              </Link>
            </Col>
            <Col>
              {isFavorite ? (
                <Card.Img
                  className='heart-visible mt-2'
                  onClick={this.onRemoveFavorite}
                  style={{ width: '20px', height: '20px' }}
                  src={heartLogo} alt='heart logo' />
              ) : (
                <Card.Img
                  className='heart mt-2'
                  onClick={this.addFavorite}
                  style={{ width: '20px', height: '20px' }}
                  src={heartLogo} alt='heart logo' />
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }).isRequired,
  componentDidMount: PropTypes.func.isRequired
};