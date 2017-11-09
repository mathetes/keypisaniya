import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import Dashboard from './containers/DashboardPage';
import Word from "./containers/WordPage";
import Keyparams from "./containers/KeyparamsPage";

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="keyparams" component={Keyparams}/>
        <Route path="word" component={Word}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
