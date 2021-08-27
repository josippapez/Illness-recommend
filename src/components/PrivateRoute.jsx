/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import moment from 'moment';
import token from 'jsonwebtoken';

import {
  logOutAndWipeLocalStorage,
  refreshAuthentication,
} from '../interceptor';
import Cookies from 'js-cookie';
import Navbar from './SharedComponents/Navbar/Navbar';
import { useSelector } from 'react-redux';

const PrivateRoute = props => {
  const user = useSelector(state => state.user);
  const [response, setResponse] = useState(null);
  const [alreadyFetched, setAlreadyFetched] = useState(null);

  useEffect(() => {
    renderFunc();
  }, []);

  const renderFunc = async () => {
    let accessToken;
    const accessTokenCookie = Cookies.get('Accesstoken');
    const refreshTokenCookie = Cookies.get('Refreshtoken');
    if (accessTokenCookie) {
      accessToken = token.decode(accessTokenCookie).exp;
    }
    if (
      (refreshTokenCookie &&
        token.decode(refreshTokenCookie).exp <= moment.utc().unix()) ||
      !accessTokenCookie ||
      !user.id
    ) {
      logOutAndWipeLocalStorage();
      return;
    }
    if (accessToken && accessToken > moment.utc().unix()) {
      setResponse(true);
      setAlreadyFetched(false);
    } else if (!alreadyFetched && refreshTokenCookie) {
      const response = await refreshAuthentication();
      if (response.status !== 200) {
        logOutAndWipeLocalStorage();
        return;
      }
      const newToken = Cookies.get('Accesstoken');
      const decodedToken = token.decode(newToken);
      if (decodedToken == null || decodedToken.exp <= moment.utc().unix()) {
        logOutAndWipeLocalStorage();
        return;
      }
      setAlreadyFetched(true);
      renderFunc();
    }
  };

  return response ? (
    <>
      <Navbar />
      <div className="page-container">
        <div className="navbar-container"></div>
        <div className="page-content">
          <Route {...props} />
        </div>
      </div>
    </>
  ) : null;
};

export default PrivateRoute;
