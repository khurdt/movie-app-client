import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data in memory before rendering component
    super(); //initializes component's state and enables this.state
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: 'user',
    };
  }

  //code executed right after the component is added to the DOM
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //this changes selectedMovie from null to the new movie clicked on
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  //When a user successfully logs in, this function updates the 'user' property from null to particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      //allowing the new user to have attached JWT which will be stored.
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://kh-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;
    //sets up event listener and renders Movie View

    if (!user && !register) return <RegistrationView onRegister={register => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)} />;

    if (movies.length <= 2) return <div className='main-view' />;

    return (
      // <Router>
      //   <Row className="main-view justify-content-md-center">
      //     <Route exact path="/" render={() => {
      //       return movies.map(m => (
      //         <Col md={3} key={m._id}>
      //           <MovieCard movie={m} />
      //         </Col>
      //       ))
      //     }} />
      //     <Route path="/movies/:movieId" render={({ match }) => {
      //       return <Col md={8}>
      //         <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
      //       </Col>
      //     }} />

      //   </Row>
      // </Router>
      <BrowserRouter>
        <Navbar style={{ backgroundColor: '#1E2127' }} expand='lg'>
          <Container>
            <Navbar.Brand style={{ color: '#1266F1', fontSize: '30px' }} href='movies'>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link style={{ color: 'white' }} onClick={() => { this.getMovies(token); }}>Movies</Nav.Link>
              </Nav>
              <Nav className='ml-auto'>
                <Nav.Link style={{ color: 'white' }} onClick={() => { this.onLoggedOut(); }}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid style={{ width: '100%', height: 'max-content', backgroundColor: '#1B1D24' }}>
          <Routes>
            <Row className='justify-content-md-center'>
              <Route exact path='/' render={() => {
                return (
                  movies.map(m => (
                    <Col md={4} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ))
                );
              }} />
            </Row>
            <Row className='justify-content-md-center'>
              <Route exact path='/movies/:movieId' render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                  </Col>
                );
              }} />
            </Row>
          </Routes>
        </Container>
        event listener selects movie from map and resets state and pushes selected movie to movie view
      </BrowserRouter>
    );
  }
}


//export default MainView;