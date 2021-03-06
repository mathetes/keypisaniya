import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import Dashboard from './containers/DashboardPage';
import Evolution from './containers/EvoPage';
import Fixed from './containers/FixedPage';
import Example from './containers/ExamplePage';
import EasyDemo from './containers/EasyPage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="evo" component={Evolution}/>
      <Route path="fixed" component={Fixed}/>
      <Route path="example" component={Example}/>
      <Route path="easy" component={EasyDemo}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
