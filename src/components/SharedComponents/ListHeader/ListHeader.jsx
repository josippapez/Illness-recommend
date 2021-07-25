import React from 'react';
import PropTypes from 'prop-types';

const ListHeader = props => {
  const toggleSorting = column => {
    props.setHeaders(
      props.headers.map(header => {
        if (header.isSorted === undefined) {
          return { ...header };
        } else if (header.header !== column.header) {
          return { ...header, isSorted: false, isSortedDesc: false };
        } else {
          if (!header.isSorted) {
            return { ...header, isSorted: true, isSortedDesc: true };
          } else {
            return { ...header, isSortedDesc: !header.isSortedDesc };
          }
        }
      })
    );
    props.sortDataByKey(column.headerKey, !column.isSortedDesc);
  };

  const sortImage = header => {
    if (header.isSorted === undefined) {
      return '';
    }
    if (!header.isSorted) {
      return '⇵';
    }
    return header.isSortedDesc ? '⌄' : '⌃';
  };

  return (
    <thead className="list-table__table-header">
      <tr className="list-table__table-header__row">
        {props.headers &&
          props.headers.map(header =>
            header.role !== undefined ? (
              header.role === props.role && (
                <th
                  className="list-table__table-header__row__header"
                  id={header.headerKey}
                  key={header.header}
                  onClick={() => {
                    if (header.isSorted !== undefined) {
                      toggleSorting(header);
                    }
                  }}
                >
                  {header.header}
                  {<span>{sortImage(header)}</span>}
                </th>
              )
            ) : (
              <th
                className="list-table__table-header__row__header"
                id={header.headerKey}
                key={header.header}
                onClick={() => {
                  if (header.isSorted !== undefined) {
                    toggleSorting(header);
                  }
                }}
              >
                {header.header}
                {<span>{sortImage(header)}</span>}
              </th>
            )
          )}
      </tr>
    </thead>
  );
};

ListHeader.propTypes = {
  setHeaders: PropTypes.func,
  headers: PropTypes.array,
  sortDataByKey: PropTypes.func,
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ListHeader;
