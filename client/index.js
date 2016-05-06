import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { Router, hashHistory } from 'react-router';
import routes from './router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { AUTH_USER } from './actions';

const createStoreWithMiddleware = compose(
  applyMiddleware(reduxThunk, promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, payload: { token, role: 'donor' } });
}

render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>),
  document.getElementById('app'));
