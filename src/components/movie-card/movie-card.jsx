import React from 'react';
import './movie-card.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card className='mt-5 ml-5 movie-card' style={{ maxWidth: '400px', height: '725px', color: 'white', backgroundColor: '#1E2127' }}>
        <Card.Title style={{ fontSize: '20px' }} className='m-4'>{movie.title}</Card.Title>
        <Card.Img className='m-auto' style={{ maxWidth: '326px', height: '481px' }} src={movie.imagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Text className='overflow-hidden ml-2' style={{ height: '50px' }}>{movie.description}</Card.Text>
          <Card.Footer>
            <Button onClick={() => onMovieClick(movie)} variant='link'>Read More</Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
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
  onMovieClick: PropTypes.func.isRequired
};