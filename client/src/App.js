import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import WineListing from "./components/WineListing";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';

library.add(faGlobe);

function App() {
  return (
      <Router>
        <div>
          <Header></Header>
        </div>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/listing' component={WineListing}/>
        </Switch>
      </Router>
  );
}

export default App;
