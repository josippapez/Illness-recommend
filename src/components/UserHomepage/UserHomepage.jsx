import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';
import { getAllUsers } from '../../store/actions/usersActions';
import { useDispatch } from 'react-redux';

const UserHomepage = props => {
  const dispatch = useDispatch();
  return (
    <div>
      User
      <button
        onClick={() => {
          logOutAndWipeLocalStorage();
        }}
      >
        Odjava
      </button>
      <button
        onClick={() => {
          dispatch(getAllUsers());
        }}
      >
        dohvati sve usere
      </button>
    </div>
  );
};

UserHomepage.propTypes = {};

export default UserHomepage;
