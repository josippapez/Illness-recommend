import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import AdminHomepage from './AdminHomepage/AdminHomepage';
import MedicationListPage from './AdminHomepage/MedicationsListPage/MedicationListPage';
import UsersListPage from './AdminHomepage/UsersListPage/UsersListPage';
import Home from './UserHomepage/Home';
import UserHomepage from './UserHomepage/UserHomepage';

const Routes = () => {
  const user = useSelector(state => state.user);
  const adminRoutes = [
    { route: '/users', component: UsersListPage },
    { route: '/medications', component: MedicationListPage },
  ];
  const userRoutes = [{ route: '/home', component: Home }];
  const isAdmin = user => {
    return user.role === 'admin';
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={isAdmin(user) ? AdminHomepage : UserHomepage}
      />
      {isAdmin(user) ? (
        adminRoutes.find(route => route.route === location.pathname) ? (
          <Route
            path={location.pathname}
            component={
              adminRoutes.find(route => route.route === location.pathname)
                .component
            }
          />
        ) : (
          <Redirect to="/" />
        )
      ) : userRoutes.find(route => route.route === location.pathname) ? (
        <Route
          path={location.pathname}
          component={
            userRoutes.find(route => route.route === location.pathname)
              .component
          }
        />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  );
};

export default Routes;
