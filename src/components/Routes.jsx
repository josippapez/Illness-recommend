import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import AdminHomepage from './AdminHomepage/AdminHomepage';

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={AdminHomepage} />
    </Switch>
  );
};

Routes.propTypes = {};

export default Routes;
