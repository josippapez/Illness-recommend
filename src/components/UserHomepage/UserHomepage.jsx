import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserHompeage.scss';
import { useDispatch, useSelector } from 'react-redux';

const UserHomepage = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userInfo);

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
