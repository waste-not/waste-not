import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DonorProfile from './components/donor/donor_profile';
import OrganizationProfile from './components/organization/organization_profile';

export default (
  <Route path='/' component={App}>
    <Route path='/retail' component={DonorProfile} />
    <Route path='/organization' component={OranizationProfile} />
  </Route>
);
