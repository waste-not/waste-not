import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';

export default (
  <Route path='/' component={App}>
    <Route path='/retail' component={DonorProfile} />
  </Route>
);
