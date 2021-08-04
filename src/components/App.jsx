import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Routes from './Routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Notification from './SharedComponents/Notification/Notification';

function App() {
  return (
    <Router>
      <div className='navigation-setup'>
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
