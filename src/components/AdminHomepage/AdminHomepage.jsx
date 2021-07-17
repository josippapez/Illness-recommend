import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logOutAndWipeLocalStorage } from '../../interceptor';

const AdminHomepage = props => {
  const dispatch = useDispatch();
  return (
    <div>
      test
      <button onClick={() => {
        dispatch(logOutAndWipeLocalStorage());
      }}>Odjava</button>
    </div>
  );
};

AdminHomepage.propTypes = {

};

export default AdminHomepage;
