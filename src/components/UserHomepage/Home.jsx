import React from 'react';
import PropTypes from 'prop-types';
import { logOutAndWipeLocalStorage } from '../../interceptor';

const Home = props => {
  return (
    <div>
      hgsdgsdfsdfsdf
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

Home.propTypes = {};

export default Home;
