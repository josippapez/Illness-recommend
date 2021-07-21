import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Routes from './Routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
