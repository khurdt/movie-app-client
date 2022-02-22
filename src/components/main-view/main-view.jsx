import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data in memory before rendering component
    super(); //initializes component's state and enables this.state
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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

  //When a user successfully logs in, this function updates the 'user' property from null to particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;
    //sets up event listener and renders Movie View

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={<RegistrationView />} />;

    if (movies.length <= 2) return <div className='main-view' />;

    return (
      <>
        <div className='main-view'>
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie ? //this is the same as the if statement
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            : //this means else
            movies.map(movie => (
              <MovieCard key={movie._id} //helps React better distinguish between similar elements in list
                movie={movie} //returns data of movie to Movie Card
                //passing this eventlistener to MovieCard
                onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
            ))
          }
        </div>
      </>
      //event listener selects movie from map and resets state and pushes selected movie to movie view
    );
  }
}


//export default MainView;