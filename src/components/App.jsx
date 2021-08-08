import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Routes from './Routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './SharedComponents/Notification/Notification';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

function App() {
  const theme = useSelector(state => state.theme);
  return (
    <Router>
      <div
        className={classNames({
          'navigation-setup': true,
          darkTheme: theme.darkTheme,
        })}
      >
        <Notification />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute component={Routes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
