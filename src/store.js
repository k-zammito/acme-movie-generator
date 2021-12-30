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

const _deleteMovie = (id) => {
  return {
    type: DELETE_MOVIE,
    id,
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

//----------THUNKS----------

export const getMovies = () => {
  return async (dispatch) => {
    const movies = (await axios.get('/api/movies')).data;
    dispatch(_getMovies(movies));
  };
};

export const addMovie = () => {
  return async (dispatch) => {
    const movie = (await axios.post('/api/movies')).data;
    dispatch(_addMovie(movie));
  };
};

export const deleteMovie = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/movies/${id}`);
    dispatch(_deleteMovie(id));
  };
};

export const incrementRating = (movie) => {
  return async (dispatch) => {
    const updated = { ...movie, rating: movie.rating + 1 };
    movie = (await axios.put(`/api/movies/${movie.id}`, updated)).data;
    dispatch(_incrementRating(movie));
  };
};

export const decrementRating = (movie) => {
  return async (dispatch) => {
    const updated = { ...movie, rating: movie.rating - 1 };
    movie = (await axios.put(`/api/movies/${movie.id}`, updated)).data;
    dispatch(_decrementRating(movie));
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
      return state.filter((movie) => movie.id !== action.id);

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

//----------STORE----------

const reducer = combineReducers({
  moviesReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
