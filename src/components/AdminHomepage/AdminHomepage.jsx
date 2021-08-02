import React from 'react';
import PropTypes from 'prop-types';
import './AdminHomepage.scss';

const AdminHomepage = props => {
  return (
    <div className="admin-homepage">
      <div className="admin-homepage__main-text">
        Dobrodošli, {props.user.name}!
      </div>
    </div>
  );
};

AdminHomepage.propTypes = {
  user: PropTypes.object,
};

export default AdminHomepage;
