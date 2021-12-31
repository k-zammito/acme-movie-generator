import React from 'react';
import MovieButton from './MovieButton';

const Nav = (props) => {
  console.log('NAV -->', props.movies);
  return (
    <nav>
      <h3>ACME Movies</h3>
      <MovieButton />
      <h4>Movie Count ({props.movies.length})</h4>
      <h4>
        Average Rating (
        {props.movies.length === 0
          ? 0
          : Math.round(
              (props.movies
                .map((movie) => movie.rating)
                .reduce((a, b) => a + b, 0) /
                props.movies.length) *
                10
            ) / 10}
        )
      </h4>
    </nav>
  );
};

export default Nav;
