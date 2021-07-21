import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import AdminHomepage from './AdminHomepage/AdminHomepage';
import Home from './UserHomepage/Home';
import UserHomepage from './UserHomepage/UserHomepage';

const Routes = () => {
  const user = useSelector(state => state.user);

  const isAdmin = user => {
    if (user.role === 'admin') {
      return true;
    }
    return false;
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={isAdmin(user) ? AdminHomepage : UserHomepage}
      />
      {!isAdmin(user) ? (
        <Route exact path="/home" component={Home} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
};

export default Routes;
