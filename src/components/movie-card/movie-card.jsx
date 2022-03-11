import React from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Card className='mt-2 mb-5 ml-auto mr-auto movie-card' style={{ maxWidth: '400px', height: '725px', color: 'white', backgroundColor: '#1E2127' }}>
        <Card.Title style={{ fontSize: '20px' }} className='m-4'>{movie.title}</Card.Title>
        <Card.Img className='m-auto' style={{ maxWidth: '326px', height: '481px' }} src={movie.imagePath} crossOrigin='anonymous' />
        <Card.Body>
          <Card.Text className='overflow-hidden ml-2' style={{ height: '50px' }}>{movie.description}</Card.Text>
          <Card.Footer>
            <Row>
              <Col>
                <Link to={`/movies/${movie._id}`}>
                  <Button style={{ fontSize: '15px' }} variant='link'>Read More</Button>
                </Link>
              </Col>
            </Row>
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
  }).isRequired
};