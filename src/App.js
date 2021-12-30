import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteMovie,
  getMovies,
  incrementRating,
  decrementRating,
} from './store';
import Nav from './Nav';
import Stars from './Stars';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialState: '',
    };
  }

  componentDidMount() {
    this.setState({ initialState: 'There are no movies!' });
  }

  render() {
    const movies = this.props.moviesReducer;
    const { remove, addStar, removeStar } = this.props;
    const { initialState } = this.state;

    return (
      <div className="app">
        <Nav />
        <h1>Movie Count ({movies.length})</h1>
        {movies.length === 0 ? (
          <h2 className="initialState">{initialState}</h2>
        ) : (
          <div className="container">
            {movies.map((movie) => {
              return (
                <div key={movie.id} className="movie">
                  <h4 className={'movieText'}>
                    {movie.name}
                    {/* <button onClick={() => remove(movie.id)}>X</button> */}
                    <HighlightOffIcon
                      fontSize="small"
                      onClick={() => remove(movie.id)}
                    />
                    <div>
                      [Rating: {movie.rating} Stars]
                      {/* <Stars rating={movie.rating} /> */}
                      <button
                        onClick={
                          movie.rating >= 5
                            ? () =>
                                alert('Movie ratings cannot be higher than 5')
                            : () => addStar(movie)
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={
                          movie.rating <= 1
                            ? () =>
                                alert('Movie ratings cannot be lower than 1')
                            : () => removeStar(movie)
                        }
                      >
                        -
                      </button>
                    </div>
                  </h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (id) => {
      dispatch(deleteMovie(id));
    },
    allMovies: () => {
      dispatch(getMovies());
    },
    addStar: (movie) => {
      dispatch(incrementRating(movie));
    },
    removeStar: (movie) => {
      dispatch(decrementRating(movie));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
