import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';
import { useDispatch } from 'react-redux';
import { getAllUsers, removeUserById } from '../../store/actions/usersActions';

const AdminHomepage = props => {
  const dispatch = useDispatch();
  return (
    <div>
      Admin
      <button
        onClick={() => {
          dispatch(getAllUsers());
        }}
      >
        dohvati sve usere
      </button>
      <button
        onClick={() => {
          dispatch(getAllUsers());
        }}
      >
        dohvati
      </button>
    </div>
  );
};

AdminHomepage.propTypes = {};

export default AdminHomepage;
