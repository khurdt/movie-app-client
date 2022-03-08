import React from 'react';
import axios from 'axios';
import '../movie-view/movie-view.scss';
import heartLogo from '../../images/heart.png';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  constructor(props) { //the place to initialize a state's values or data in memory before rendering component
    super(props); //initializes component's state and enables this.state
    this.state = {
      favoriteMovies: []
    }
  }
  //getting jwt and user for authorizations and calling getUser ASAP
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }
  //getting user details to add to contructor or current state variables
  getUserDetails = (token) => {
    const username = localStorage.getItem('user');
    axios.get(`https://kh-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.favoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onRemoveFavorite = () => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addFavorite = () => {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, { 'jwt': token }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {

    const { movie, onBackClick } = this.props;

    let tempArray = this.state.favoriteMovies;
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
        <Card className='m-auto movie-view' style={{ maxWidth: '698px', height: '100vh', backgroundColor: '#1E2127', color: 'white' }}>
          <Card.Img style={{ maxWidth: '698px', height: '26vh', objectFit: 'cover', objectPosition: '0 0' }} src={movie.imagePath} crossOrigin='anonymous' />
          <Card.Text className='ml-3 mt-2'>{movie.genre.name}</Card.Text>
          <Row>
            <Col>
              <Card.Title className='m-3'>{movie.title}</Card.Title>
            </Col>
            <Col>
              {isFavorite ? (
                <Card.Img
                  className='heart-visible mt-3'
                  onClick={this.onRemoveFavorite}
                  style={{ width: '20px', height: '20px' }}
                  src={heartLogo} alt='heart logo' />
              ) : (
                <Card.Img
                  className='heart mt-3'
                  onClick={this.addFavorite}
                  style={{ width: '20px', height: '20px' }}
                  src={heartLogo} alt='heart logo' />
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

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     imagePath: PropTypes.string.isRequired,
//     genre: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired
//     }),
//     director: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       birth: PropTypes.string.isRequired,
//       death: PropTypes.string,
//     })
//   }).isRequired
// };

