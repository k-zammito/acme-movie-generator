import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
