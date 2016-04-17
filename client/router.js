import React from 'react';
import { Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';
import UserProfile from './components/user/user_profile';
import Login from './components/login/login';
import HeroContainer from './components/navbar/hero';
import Signup from './components/signup/signup';
import WrapRole from './components/authentication/wrap_role';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HeroContainer} />
    <Route path='/donors' component={DonorProfile} />
    <Route path='/signup' component={WrapRole(Signup)} />
    <Route path='/user' component={UserProfile} />
    <Route path='/login' component={Login} />
  </Route>
);
