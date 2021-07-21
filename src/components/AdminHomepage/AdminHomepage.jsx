import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';

const AdminHomepage = props => {
  return (
    <div>
      Admin
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

AdminHomepage.propTypes = {};

export default AdminHomepage;
