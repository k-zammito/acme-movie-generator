import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//----------ACTIONS-----------

const GET_MOVIES = 'GET_MOVIES';
const ADD_MOVIE = 'ADD_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';
const INCREMENT_RATING = 'INCREMENT_RATING';
const DECREMENT_RATING = 'DECREMENT_RATING';

//----------ACTION CREATORS----------

const _getMovies = (movies) => {
  return {
    type: GET_MOVIES,
    movies,
  };
};

const _addMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    movie,
  };
};

const _deleteMovie = (movie) => {
  return {
    type: DELETE_MOVIE,
    movie,
  };
};
const _incrementRating = (movie) => {
  return {
    type: INCREMENT_RATING,
    movie,
  };
};
const _decrementRating = (movie) => {
  return {
    type: DECREMENT_RATING,
    movie,
  };
};

//----------REDUCER----------

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MOVIES:
      return action.movies;
    case ADD_MOVIE:
      return [...state, action.movie];
    case DELETE_MOVIE:
      return state.filter((movie) => movie.id !== action.movie.id);
    case INCREMENT_RATING:
      return state.map((movie) =>
        movie.id === action.movie.id ? action.movie : movie
      );
    default:
      return state.map((movie) =>
        movie.id === action.movie.id ? action.movie : movie
      );
  }
};

//----------THUNKS----------

export const getMovies = () => {
  return async (dispatch) => {
    const movies = (await axios.get('/api/movies')).data;
    dispatch(_getMovies());
  };
};

export const addMovie = () => {
  return async (dispatch) => {
    const movie = (await axios.post('/api/movies')).data;
    dispatch(_addMovie(movie));
  };
};

export const deleteMovie = (movie) => {
  return async (dispatch) => {
    await axios.delete(`/api/movies/${movie.id}`);
    dispatch(_deleteMovie(movie));
  };
};

export const incrementRating = (movie) => {
  return async (dispatch) => {
    movie = (
      await axios.put(`/api/movies/${movie.id}`, { rating: movie.rating + 1 })
    ).data;
    dispatch(_incrementRating(movie));
  };
};

export const decrementRating = (movie) => {
  return async (dispatch) => {
    movie = (
      await axios.put(`/api/movies/${movie.id}`, { rating: movie.rating - 1 })
    ).data;
    dispatch(_decrementRating(movie));
  };
};

//----------STORE----------

const reducer = combineReducers({
  moviesReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
