import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Container, Row, Col } from 'react-bootstrap';

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
    axios.get('https://kh-movie-app.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;
    //sets up event listener and renders Movie View

    if (!user && !register) return <RegistrationView onRegister={register => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)} />;

    if (movies.length <= 2) return <div className='main-view' />;

    return (
      <Container fluid style={{ width: '100%', height: 'max-content', backgroundColor: '#1B1D24' }}>
        <div className='main-view'>
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie ? (//this is the same as the if statement
            <Row className='justify-content-md-center'>
              <Col md={8} >
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
            : (//this means else
              <Row className='justify-content-md-center'>
                {movies.map(movie => (
                  <Col md={4}>
                    <MovieCard key={movie._id} movie={movie} //returns data of movie to Movie Card // id helps React better distinguish between similar elements in list
                      //passing this eventlistener to MovieCard
                      onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                  </Col>
                ))
                }
              </Row>
            )
          }
        </div>
      </Container>
      //event listener selects movie from map and resets state and pushes selected movie to movie view
    );
  }
}


//export default MainView;