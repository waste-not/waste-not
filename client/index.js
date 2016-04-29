import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Router, hashHistory } from 'react-router';
import routes from './router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
  promise
)(createStore);

const store = createStoreWithMiddleware(reducers);

render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>),
  document.getElementById('app'));
