import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';
import UserProfile from './components/user/user_profile';
import Login from './components/login/login';
import HeroContainer from './components/navbar/hero';
import Signup from './components/signup/signup';
import WrapRole from './components/authentication/wrap_role';
import InventoryForm from './components/donor/inventory_form';

/* eslint-disable new-cap */

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HeroContainer} />
    <Route path="/donor" component={DonorProfile}>
      <Route path="newdonation" component={InventoryForm} />
    </Route>
    <Route path="/signup" component={WrapRole(Signup)} />
    <Route path="/user" component={UserProfile} />
    <Route path="/login" component={Login} />
  </Route>
);
