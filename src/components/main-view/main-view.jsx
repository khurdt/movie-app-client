import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data
    super(); //initializes component's state and enables this.state
    this.state = {
      movies: [
        { _id: 1, title: 'Inception', description: 'desc1', imagePath: '...' },
        { _id: 2, title: 'Shawshank Redemption', description: 'desc2', imagePath: '...' },
        { _id: 3, title: 'Gladiator', description: 'desc3', imagePath: '...' }
      ],
      selectedMovie: null
    };
  }
  //this changes selectedMovie from null to the new movie clicked on
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    //sets up event listener and renders Movie View
    if (selectedMovie) return <MovieView movie={selectedMovie} />

    if (movies.length === 0) return <div className='main-view'>The list is empty</div>;

    return (
      <div className='main-view'>
        {movies.map(movie => <MovieCard
          key={movie._id} //helps React better distinguish between similar elements in list
          movie={movie} //returns data of movie to Movie Card
          //passing this eventlistener to MovieCard
          onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
      </div>
      //event listener selects movie from map and resets state and pushes selected movie to movie view
    );
  }
}


//export default MainView;