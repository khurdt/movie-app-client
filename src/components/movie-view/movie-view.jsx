import React from 'react';
import './movie-view.scss';
import { Button } from '../button/button';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div>
        <button className='back-button' onClick={() => { onBackClick(null); }}>Back</button>
        <div className='movie-view'>
          <div className='movie-item'>
            <span className='value'>{movie.title}</span>
          </div>
          <div className='movie-item'>
            <img src={movie.imagePath} crossOrigin="anonymous" />
          </div>
          <div className='movie-item'>
            <span className='label'>Description: </span>
            <span className='value'>{movie.description}</span>
          </div>
          <div className='movie-item'>
            <span className='label'>Director: </span>
            <span className='value'>{movie.director.name}</span>
          </div>
          <div className='movie-item'>
            <span className='label'>Genre: </span>
            <span className='value'>{movie.genre.name}</span>
          </div>
          <Button label='Click me!' />
        </div>
      </div>
    );
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
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
      death: PropTypes.string,
    })
  }).isRequired
};