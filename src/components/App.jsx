import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Routes from './Routes';
import Navbar from './SharedComponents/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className='navigation-setup'>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute component={Routes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
