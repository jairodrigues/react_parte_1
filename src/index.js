import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './home';
import AutorBox from './components/Wrapper/AutorBox'
import LivroBox from './components/Wrapper/LivroBox';
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import FormularioLivro from './components/Formularios/FormularioLivro';


ReactDOM.render(
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/autor" component={AutorBox}/>
          <Route path="/livro" component={LivroBox}/>
        </Switch>
      </App>
    </Router>,
  document.getElementById('root')
);
registerServiceWorker();
