import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, {
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
    this.state = store.getState();
  }

  async componentDidMount() {
    this.setState({ initialState: 'There are no movies!' });
    store.dispatch(getMovies()); // THIS IS FOR WHEN YOU REFRESH TO KEEP MOVIES ON PAGE

    console.log('STATE ----->', this.state);
    console.log('PROPS ----->', this.props);
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log('updated!!!--->', prevProps.moviesReducer.sort());
  }

  render() {
    const movies = this.props.moviesReducer;
    const { remove, addStar, removeStar } = this.props;
    const { initialState } = this.state;

    return (
      <div className="app">
        <Nav movies={movies} />
        {movies.length === 0 ? (
          <h2 className="initialState">{initialState}</h2>
        ) : (
          <>
            <div className="container">
              {movies
                .sort((a, b) => b.rating - a.rating)
                .map((movie) => {
                  return (
                    <div key={movie.id} className="movie">
                      <HighlightOffIcon
                        fontSize="small"
                        onClick={() => remove(movie.id)}
                      />
                      <h4 className={'movieText'}>
                        {movie.name}

                        <div>
                          [Rating: {movie.rating} Stars]
                          {/* <Stars movie={movie} /> */}
                          <button
                            onClick={() =>
                              removeStar({
                                rating: movie.rating - 1,
                                id: movie.id,
                              })
                            }
                            disabled={movie.rating === 1 ? true : false}
                          >
                            -
                          </button>
                          <button
                            onClick={() =>
                              addStar({
                                rating: movie.rating + 1,
                                id: movie.id,
                              })
                            }
                            disabled={movie.rating === 5 ? true : false}
                          >
                            +
                          </button>
                        </div>
                      </h4>
                    </div>
                  );
                })}
            </div>
          </>
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
