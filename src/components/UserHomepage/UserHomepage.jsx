import React from 'react';
import PropTypes from 'prop-types';
import './UserHompeage.scss';

const UserHomepage = props => {
  return (
    <div className="user-homepage">
      <div className="user-homepage__main-text">
        Dobrodošli, {props.user.name}!
      </div>
    </div>
  );
};

UserHomepage.propTypes = {
  user: PropTypes.object,
};

export default UserHomepage;
