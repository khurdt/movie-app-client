import React from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import { Heart } from 'react-feather';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function MovieView(props) {
  const { movie, onBackClick, userData, addFavorite, removeFavorite } = props

  if (userData.favoriteMovies === undefined) {
    return null;
  }

  let tempArray = userData.favoriteMovies;
  let isFavorite = false;
  if (tempArray.includes(movie._id)) {
    isFavorite = true;
  } else {
    isFavorite = false;
  };

  return (
    <Container fluid className='movie-view-container'>
      <Row className='mb-4 mt-3'>
        <Col>
          <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
        </Col>
      </Row>
      <Card className='m-auto movie-view' style={{ maxWidth: '698px', height: '90vh', backgroundColor: '#1E2127', color: 'white' }}>
        <Card.Img style={{ maxWidth: '698px', height: '26vh', objectFit: 'cover', objectPosition: '0 0' }} src={movie.imagePath} crossOrigin='anonymous' />
        <Card.Text className='ml-3 mt-2'>{movie.genre.name}</Card.Text>
        <Row>
          <Col>
            <Card.Title className='m-3'>{movie.title}</Card.Title>
          </Col>
          <Col>
            {isFavorite ? (
              <Heart
                color='red'
                className='heart-visible mt-3'
                onClick={(e) => removeFavorite(e, movie)}
                style={{ width: '20px', height: '20px' }}
                alt='heart logo' />
            ) : (
              <Heart
                color='red'
                className='heart mt-3'
                onClick={(e) => addFavorite(e, movie)}
                style={{ width: '20px', height: '20px' }}
                alt='heart logo' />
            )}
          </Col>
        </Row>
        <Card.Text className='m-3'>{movie.description}</Card.Text>
        <Card.Footer className='p-3 ml-3'>
          <Row>
            <Col>
              <div><span className='label'>Director: </span></div>
              <Link to={`/directors/${movie.director.name}`}>
                <Button variant='link'>{movie.director.name}</Button>
              </Link>
            </Col>
            <Col>
              <div><span className='label'>Genre: </span></div>
              <Link to={`/genres/${movie.genre.name}`}>
                <Button variant='link'>{movie.genre.name}</Button>
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}
// keypressCallback(event) {
//   console.log(event.key);
// }
// componentDidMount() {
//   document.addEventListener('keypress', this.keypressCallback);
// }
// componentWillUnmount() {
//   document.removeEventListener('keypress', this.keypressCallback);
// }

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func
};
