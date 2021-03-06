import React from 'react';
import '../movie-view/movie-view.scss';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {
    const { genre, movies, onBackClick } = this.props;

    return (
      <Container fluid className='movie-view-container'>
        <Row className='mb-4 mt-3'>
          <Col>
            <Button type='button' onClick={() => { onBackClick() }}>Return</Button>
          </Col>
        </Row>
        <Card className='m-auto movie-view' style={{ maxWidth: '698px', backgroundColor: '#1E2127', color: 'white' }}>
          <Card.Text className='ml-3 mt-2' style={{ fontSize: '30px' }}>
            {genre.genre.name}
          </Card.Text>
          <Card.Text className='m-3'>
            {genre.genre.description}
          </Card.Text>
          <Card.Footer className='p-3 ml-3'>
            <Card.Text>Other {genre.genre.name} Movies</Card.Text>
            <Row>
              {movies.map(movie => (
                <Card key={movie._id} className='m-1 little-card' style={{ backgroundColor: '#1E2127', color: 'white' }}>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img className='m-auto' style={{ maxWidth: '140px', height: '207px' }} src={movie.imagePath} crossOrigin='anonymous' />
                  </Link>
                  <Card.Text style={{ fontSize: '12px' }} className='m-2' >{movie.title}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant='link'>Read More</Button>
                  </Link>
                </Card>
              ))}
            </Row>
          </Card.Footer>
        </Card>
      </Container >
    );
  }
}

GenreView.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};