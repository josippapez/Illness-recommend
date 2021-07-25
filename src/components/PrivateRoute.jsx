/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import token from 'jsonwebtoken';

import {
  logOutAndWipeLocalStorage,
  refreshAuthentication,
} from '../interceptor';
import Cookies from 'js-cookie';

const PrivateRoute = props => {
  const [response, setResponse] = useState(null);
  const [alreadyFetched, setAlreadyFetched] = useState(null);

  useEffect(() => {
    renderFunc();
  }, []);

  const renderFunc = async () => {
    let expiredToken;
    const expiredTokenCookie = Cookies.get('Accesstoken');
    const refreshTokenCookie = Cookies.get('Refreshtoken');
    if (expiredTokenCookie) {
      expiredToken = token.decode(expiredTokenCookie).exp;
    } else {
      logOutAndWipeLocalStorage();
      return;
    }
    if (expiredToken && expiredToken > moment.utc().unix()) {
      setResponse(true);
      setAlreadyFetched(false);
    } else if (!alreadyFetched && refreshTokenCookie) {
      const response = await refreshAuthentication();
      if (response.status !== 200) {
        logOutAndWipeLocalStorage();
      }
      const newToken = Cookies.get('Accesstoken');
      const decodedToken = token.decode(newToken);
      if (decodedToken == null || decodedToken.exp <= moment.utc().unix()) {
        logOutAndWipeLocalStorage();
      }
      setAlreadyFetched(true);
      renderFunc();
    } else {
      logOutAndWipeLocalStorage();
    }
  };

  return response ? (
    <div className='page-container'>
      <div className="navbar-container"></div>
      <div className="page-content">
        <Route {...props} />
      </div>
    </div>
  ) : response === false ? (
    <Redirect to="/login" />
  ) : null;
};

export default PrivateRoute;
