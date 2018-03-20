import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './home';

import registerServiceWorker from './registerServiceWorker'
import {Router,Route, browserHistory} from 'react-router'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" componet={App}>
          <IndexRoute component={Home}/>
          <Route path="/autor"/>
          <Route path="/livro"/>
        </Route>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
