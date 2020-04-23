import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Person from './components/Person';
import { BrowserRouter } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
    withRouter
  } from "react-router-dom";

  import Manager from "./components/Manager";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Switch>
      <Route exact path ="/" component={Home}  />
      <Route exact path ="/Manager" component={Manager}  />
      <Route exact path="/Person" component={Person} />
      </Switch>
      </header>
    </div>
    </Router>
  );
}

export default withRouter(App);
