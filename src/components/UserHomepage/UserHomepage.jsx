import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';

const UserHomepage = props => {
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
