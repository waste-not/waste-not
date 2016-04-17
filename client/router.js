import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';
import UserProfile from './components/user/user_profile';
import NewUser from './components/user/user_signup';
import Login from './components/user/login';
import HeroContainer from './components/navbar/hero';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HeroContainer} />
    <Route path='/donors' component={DonorProfile} />
    <Route path='/newuser' component={NewUser} />
    <Route path='/user' component={UserProfile} />
    <Route path='/login' component={Login} />
  </Route>
);
