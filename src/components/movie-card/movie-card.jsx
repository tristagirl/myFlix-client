import React from 'react';
<<<<<<< Updated upstream
=======
import PropTypes from 'prop-types';
import '.movie-cards.scss'
>>>>>>> Stashed changes

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;  }
}