import { render } from 'react-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, { addMovie, getMovies, moviesReducer } from './store';
import axios from 'axios';
import Nav from './Nav';

class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   movies: [],
    // };
  }

  async componentDidMount() {
    //   const movies = (await axios.get('api/movies')).data;
    this.setState({ movies });
  }

  render() {
    const { add, allMovies } = this.props;
    const { movies } = this.props.moviesReducer;

    console.log('PROPS!!! ~~~~>', movies);

    // console.log('MOVIEZZZZZZ BROOO ------>', movie);

    // LOUIS >>>>>>

    //NOTES: NEED TO FIND MASTER MOVIES ARRAY AND MAP OVER THAT...

    //     return (
    //       <div className="app">
    //         <Nav />
    //         <h1>Create a Movie! {movie.length}</h1>
    //         <div>
    //           {movie.map((movie) => {
    //             return (
    //               <h3 key={movie.data.id}>
    //                 {_movie.data.name}
    //                 {/* <button onClick={() => byeMovie(movie.data.id)}>X</button> */}
    //               </h3>
    //             );
    //           })}
    //         </div>
    //         <button onClick={add}>Create Random Movie</button>
    //       </div>
    //     );
    //   }
    // }

    return (
      <div className="app">
        <Nav />
        <ul>
          {movies.map((movie) => {
            return (
              <a href="#" key={movie.id}>
                <li key={movie.id}>
                  {movie.name} ({movie.rating} stars)
                </li>
              </a>
            );
          })}
        </ul>
        <button onClick={add}>ADD MOVIE!</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch(addMovie());
    },
    allMovies: () => {
      dispatch(getMovies());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
