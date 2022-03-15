import React from "react";
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};
function MoviesList(props) {
  const { movies, visibilityFilter, userData, addFavorite, removeFavorite } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  let foundMovie = true;
  if (filteredMovies.length === 0) {
    foundMovie = false;
  } else {
    foundMovie = true;
  }

  if (!movies) return <div className='load'><div className='m-auto pt-5'><div className='loading'></div></div></div>
  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {foundMovie ? (
        <div className='main-view' />
      ) : (
        <Col style={{ backgroundColor: '1B1D24', color: 'white', height: '100vh' }} md={12}>
          <div className='text-center mt-5' >No Movies Found</div>
        </Col>
      )}
      {filteredMovies.map(m => (
        <Col xs={6} sm={6} md={5} lg={4} key={m._id}>
          <MovieCard movie={m} userData={userData} addFavorite={addFavorite} removeFavorite={removeFavorite} />
        </Col>
      ))}
    </>
  );

}
export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }).isRequired,
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func
};