import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import './Search.scss';

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={e => {
          e.preventDefault();
          if (props.setSearchQuery) {
            if (searchTerm === '') {
              props.setSearchQuery(null);
              dispatch(props.fetchData());
            } else {
              props.setSearchQuery(searchTerm);
              dispatch(props.fetchDataByName(searchTerm));
            }
          }
        }}
      >
        <input
          type="text"
          disabled={props.disabled}
          placeholder="Pretraživanje"
          className="search-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <small className="search-by-text">{props.searchingByInfo}</small>
    </div>
  );
};

Search.propTypes = {
  fetchDataByName: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func,
  searchingByInfo: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Search;
