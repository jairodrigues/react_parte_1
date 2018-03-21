import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './home';
import AutorBox from './components/AutorBox'

import registerServiceWorker from './registerServiceWorker'
import {Router,Route, browserHistory, IndexRoute} from 'react-router'

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro"/>
        </Route>
    </Router>),
    document.getElementById('root'));
registerServiceWorker();
