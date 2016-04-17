import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';
import UserProfile from './components/user/user_profile';
import Login from './components/user/login';

export default (
  <Route path='/' component={App}>
    <Route path='/retail' component={DonorProfile} />
    <Route path='/user' component={UserProfile} />
    <Route path='/login' component={Login} />
  </Route>
);
