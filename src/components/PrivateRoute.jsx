/* eslint-disable eqeqeq */
import React, { Component, useEffect, useState } from 'react';
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
    let refreshToken;
    const expiredTokenCookie = Cookies.get('Accesstoken');
    const refreshTokenCookie = Cookies.get('Refreshtoken');
    if (expiredTokenCookie) {
      expiredToken = token.decode(expiredTokenCookie).exp;
    }
    if (refreshTokenCookie) {
      refreshToken = token.decode(refreshTokenCookie);
    }
    if (refreshToken == null || refreshToken === '') {
      setResponse(false);
    }
    if (expiredToken > moment.utc().unix()) {
      setResponse(true);
      setAlreadyFetched(false);
    } else if (!alreadyFetched && refreshToken != null && refreshToken !== '') {
      const response = await refreshAuthentication(refreshToken);
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
    }
  };

  return response ? (
    <Route {...props} render={() => <Component {...props} />} />
  ) : response === false ? (
    <Redirect to="/login" />
  ) : null;
};

export default PrivateRoute;
