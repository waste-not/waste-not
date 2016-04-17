import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Router, hashHistory } from 'react-router';
import router from './router';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const store = createStoreWithMiddleware(reducers);


render((
  <Provider store = { store }>
    <Router history={hashHistory} routes={router} />
  </Provider>),
  document.getElementById('app'));
