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
import RequireAuth from './components/authentication/require_authentication';

/* eslint-disable new-cap */

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HeroContainer} />
    <Route path="/donor" component={RequireAuth(DonorProfile)}>
      <Route path="newdonation" component={RequireAuth(InventoryForm)} />
    </Route>
    <Route path="/signup" component={WrapRole(Signup)} />
    <Route path="/user" component={RequireAuth(UserProfile)} />
    <Route path="/login" component={Login} />
  </Route>
);
