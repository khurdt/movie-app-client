import React from 'react';
import axios from 'axios';
import Menu from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data in memory before rendering component
    super(); //initializes component's state and enables this.state
    this.state = {
      movies: [],
      user: null
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
    const { movies, user } = this.state;
    //sets up event listener and renders Movie View
    return (
      <Router>
        <Menu user={user} />
        <Container fluid style={{ width: '100%', height: 'max-content', backgroundColor: '#1B1D24' }}>
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if (!user) return <Redirect to='/login' />
              //Before the movies have been loaded
              if (movies.length === 0) return <div className='main-view' />
              return movies.map(m => (
                <Col className='m-0' sm={6} md={5} lg={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path='/login' render={() => {
              if (user) {
                return <Redirect to='/' />
              }
              return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />
            }} />

            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />
              return <RegistrationView />
            }} />

            <Route path="/movies/:id" render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.id)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/genres/:name' render={({ match }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/directors/:name' render={({ match }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className='main-view' />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.director.name === match.params.name).director}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user) return <Redirect to='/' />
              return <Col>
                <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/user-update/${user}`} render={({ match, history }) => {
              if (!user) return <Redirect to='/' />
              return <Col>
                <UserUpdate user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}

//export default MainView;

{/* <Row className="main-view justify-content-md-center">
<Route exact path="/" render={() => {
  return movies.map(m => (
    <Col md={3} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ))
}} />
<Route path="/movies/:movieId" render={({ match }) => {
  return <Col md={8}>
    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
  </Col>
}} />
</Row> */}

{/* <BrowserRouter>
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
      </BrowserRouter> */}