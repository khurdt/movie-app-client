import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import Menu from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view.jsx';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { isJwtExpired } from 'jwt-check-expiration';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data in memory before rendering component
    super(); //initializes component's state and enables this.state
    this.state = {
      userData: {}
    };
    this.removeFavorite = this.removeFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.callDispatch = this.callDispatch.bind(this);
  }

  //code executed right after the component is added to the DOM
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null && !(isJwtExpired(accessToken))) {
      this.props.setUser(localStorage.getItem('user'))
      this.getUserData(accessToken);
      this.getMovies(accessToken);
    } else {
      localStorage.clear();
    }
  }

  callDispatch() {
    let accessToken = localStorage.getItem('token');
    this.getUserData(accessToken);
  }

  //When a user successfully logs in, this function updates the 'user' property from null to particular user
  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.props.setUser(authData.user.username);
    this.getUserData(authData.token);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://kh-movie-app.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getUserData(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://kh-movie-app.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log('userData', response.data)
        this.setState({ userData: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  removeFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response);
        this.callDispatch();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  addFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(`https://kh-movie-app.herokuapp.com/users/${username}/movies/${movie._id}`, { 'jwt': token }, {
      headers: { Authorization: `Bearer ${token}` },
    }
    )
      .then((response) => {
        console.log(response);
        this.callDispatch();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movies, user } = this.props;
    const { userData } = this.state;
    //sets up event listener and renders Movie View
    return (
      <Router>
        <Menu user={user} />
        <Container fluid style={{ width: '100%', height: 'max-content', backgroundColor: '#1B1D24', margin: '0', padding: '0' }}>
          <Row className='justify-content-md-center'>
            <Route exact path='/' render={() => {
              //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
              if (!user) return <Redirect to='/login' />
              if (movies.length === 0) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              if (userData.favoriteMovies === undefined) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              //Before the movies have been loaded
              return <MoviesList movies={movies} userData={userData} addFavorite={this.addFavorite} removeFavorite={this.removeFavorite} />
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
              if (movies.length === 0) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              return <Col md={8}>
                <MovieView movie={movies.find(movie => movie._id === match.params.id)} userData={userData}
                  addFavorite={this.addFavorite} removeFavorite={this.removeFavorite}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/genres/:name' render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.genre.name === match.params.name)}
                  movies={movies.filter(movie => movie.genre.name === match.params.name)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path='/directors/:name' render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              if (movies.length === 0) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.director.name === match.params.name)}
                  movies={movies.filter(movie => movie.director.name === match.params.name)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ history }) => {
              if (!this.state.userData) return <Redirect to='/' />
              if (movies.length === 0 || !this.state.userData) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
              return <Col>
                <ProfileView movies={movies} userData={userData} user={user}
                  removeFavorite={this.removeFavorite} callDispatch={this.callDispatch} pageHighlighting={this.pageHighlighting} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);