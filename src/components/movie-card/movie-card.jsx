import React from 'react';
import './movie-card.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Heart } from 'react-feather';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function MovieCard(props) {
  const { movie, userData, addFavorite, removeFavorite } = props;

  if (userData.favoriteMovies === undefined) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>

  let tempArray = userData.favoriteMovies;
  let isFavorite = false;
  if (tempArray.includes(movie._id)) {
    isFavorite = true;
  } else {
    isFavorite = false;
  };

  return (
    <div className='m-2'>
      <Card className='m-auto movie-card' style={{ color: 'white', backgroundColor: '#1E2127' }}>
        <Link className='m-auto pt-3 little-img' to={`/movies/${movie._id}`}>
          <Card.Img className='m-auto img' src={movie.imagePath} crossOrigin='anonymous' />
        </Link>
        <Link style={{ color: 'white' }} to={`/movies/${movie._id}`}>
          <Card.Text className='title'>{movie.title}</Card.Text>
        </Link>
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
                  <Heart
                    color='red'
                    className='heart-visible mt-2'
                    onClick={(e) => removeFavorite(e, movie)}
                    style={{ width: '20px', height: '20px' }}
                    alt='heart logo' />
                ) : (
                  <Heart
                    color='red'
                    className='heart mt-2'
                    onClick={(e) => addFavorite(e, movie)}
                    style={{ width: '20px', height: '20px' }}
                    alt='heart logo' />
                )}
              </Col>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card >
    </div>
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
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func
};