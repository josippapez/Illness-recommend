import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';
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
    </div>
  );
};

UserHomepage.propTypes = {};

export default UserHomepage;
