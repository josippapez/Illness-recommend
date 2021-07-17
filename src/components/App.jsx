import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Routes from './Routes';

function App() {
  const user = useSelector(state => state.user);

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
