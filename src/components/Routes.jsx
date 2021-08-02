import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import AdminHomepage from './AdminHomepage/AdminHomepage';
import MedicationListPage from './AdminHomepage/MedicationsListPage/MedicationListPage';
import UsersListPage from './AdminHomepage/UsersListPage/UsersListPage';
import UserDetailsPage from './UserHomepage/UserDetailsListPage/UserDetailsPage';
import UserHomepage from './UserHomepage/UserHomepage';

const Routes = () => {
  const user = useSelector(state => state.user);
  const adminRoutes = [
    { route: '/users', component: <UsersListPage /> },
    { route: '/medications', component: <MedicationListPage /> },
  ];
  const userRoutes = [
    { route: '/user-details', component: <UserDetailsPage userId={user.id} /> },
  ];
  const isAdmin = user => {
    return user.role === 'admin';
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          isAdmin(user) ? (
            <AdminHomepage user={user} />
          ) : (
            <UserHomepage user={user} />
          )
        }
      />
      {isAdmin(user) ? (
        adminRoutes.find(route => route.route === location.pathname) ? (
          <Route
            path={location.pathname}
            render={() =>
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
          render={() =>
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
