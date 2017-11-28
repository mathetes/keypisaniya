/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import 'purecss/_base.scss';
import 'purecss/_buttons.scss';
import 'purecss/_forms.scss';
import 'purecss/_grids.scss';
import 'purecss/_grids-responsive.scss';
import 'purecss/_menus.scss';
import 'purecss/_tables.scss';




injectTapEventPlugin();

render(
    <Router routes={routes} history={browserHistory} />, document.getElementById('app')
);
