import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import Mixed from './containers/MixPage';
import Dashboard from './containers/DashboardPage';
import Evolution from './containers/EvoPage';
import Fixed from './containers/FixedPage';
import Resize from './containers/ResizingPage';
import Toggling from './containers/TogglingPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="evo" component={Evolution}/>
      <Route path="fixed" component={Fixed}/>
      <Route path="resizing" component={Resize}/>
      <Route path="toggling" component={Toggling}/>
      <Route path="mixed" component={Mixed}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
