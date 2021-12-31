import React from 'react';
import MovieButton from './MovieButton';

const Nav = (props) => {
  return (
    <nav>
      <h3>ACME Movies</h3>
      <MovieButton />
      <h4>Movie Count({props.movies.length})</h4>
    </nav>
  );
};

export default Nav;
