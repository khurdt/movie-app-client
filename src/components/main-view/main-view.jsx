import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() { //the place to initialize a state's values or data
    super(); //initializes component's state and enables this.state
    this.state = {
      movies: [
        { _id: 1, title: 'Inception', description: 'desc1', imagePath: '...', director: 'Christopher Nolan', genre: 'Action' },
        { _id: 2, title: 'Shawshank Redemption', description: 'desc2', imagePath: '...', director: 'Frank Darabont', genre: 'Drama' },
        { _id: 3, title: 'Gladiator', description: 'desc3', imagePath: '...', director: 'Ridley Scott', genre: 'Action' }
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

    if (movies.length <= 2) return <div className='main-view'>The list is empty</div>;

    return (
      <div className='main-view'>
        {selectedMovie ? //this is the same as the if statement
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : //this means to add another function
          movies.map(movie => (
            <MovieCard key={movie._id} //helps React better distinguish between similar elements in list
              movie={movie} //returns data of movie to Movie Card
              //passing this eventlistener to MovieCard
              onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
      //event listener selects movie from map and resets state and pushes selected movie to movie view
    );
  }
}


//export default MainView;