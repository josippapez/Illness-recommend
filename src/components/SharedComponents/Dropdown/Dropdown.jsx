import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ArrowDown from '../../../styles/assets/images/ArrowDown.svg';
import check from '../../../styles/assets/images/check.svg';
import './Dropdown.scss';

export const Dropdown = props => {
  const [loading, setLoading] = useState(false);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [filterInput, setFilterInput] = useState(null);
  const [listIncludesFilter, setListIncludesFilter] = useState(false);
  const {
    list,
    handleSelect,
    headerTitle,
    multiselect,
    defaultHeaderOption,
    itemsSelected,
    customclass,
    inputNewDataPlaceholder,
    disabledInput,
    fullWidth,
  } = props;

  const selectItem = item => {
    handleSelect(item);
  };

  return (
    <div className="dropdown" style={{ width: fullWidth && '100%' }}>
      <div className="dropdown__wrapper" style={{ width: fullWidth && '100%' }}>
        <div
          className={classNames({
            dropdown__wrapper__header: true,
            default: headerTitle === defaultHeaderOption,
          })}
        >
          {!props.inputNewData ? (
            <div
              className={classNames(customclass, {
                dropdown__wrapper__header__box: true,
              })}
              style={{ width: fullWidth && '100%' }}
              onClick={() => setDropdownOpened(!dropdownOpened)}
            >
              <div className="dropdown__wrapper__header__box__title">
                {headerTitle !== defaultHeaderOption
                  ? headerTitle
                  : defaultHeaderOption}
              </div>
              <img
                className={classNames({
                  dropdown__wrapper__header__box__caret: true,
                  opened: dropdownOpened,
                })}
                src={ArrowDown}
              />
            </div>
          ) : (
            <input
              className={classNames(customclass, {
                dropdown__wrapper__header__box: true,
                'suggestion-input': true,
              })}
              disabled={disabledInput}
              placeholder={inputNewDataPlaceholder}
              onClick={() => setDropdownOpened(!dropdownOpened)}
              value={filterInput ? filterInput : ''}
              onChange={e => {
                setFilterInput(e.target.value);
                setDropdownOpened(true);
              }}
            />
          )}
        </div>
        {dropdownOpened &&
          (list.length > 0 ? (
            <div
              className="dropdown__wrapper__menu"
              style={{ width: fullWidth && '100%' }}
            >
              <div
                className={classNames(customclass, {
                  dropdown__wrapper__menu__item: true,
                })}
                onClick={e => {
                  e.preventDefault();
                  selectItem(defaultHeaderOption);
                  setDropdownOpened(false);
                  if (props.inputNewData) {
                    setFilterInput(null);
                  }
                }}
              >
                <div className="dropdown__wrapper__menu__item__name-default">
                  Obriši odabir
                </div>
                {multiselect && itemsSelected && itemsSelected.length === 0 && (
                  <img
                    className="dropdown__wrapper__menu__item__selected"
                    src={check}
                  />
                )}
              </div>
              {list.map(
                (item, index) =>
                  (filterInput
                    ? item.name
                      .toLowerCase()
                      .includes(filterInput.toLowerCase())
                    : true) && (
                    <div
                      className={classNames(
                        customclass,
                        {
                          dropdown__wrapper__menu__item: true,
                          selected: _.find(
                            itemsSelected,
                            selected => selected.key === item.key
                          ),
                        },
                        index
                      )}
                      key={item.id}
                      onClick={e => {
                        e.preventDefault();
                        if (multiselect) {
                          selectItem(item);
                        } else {
                          handleSelect(item);
                          setDropdownOpened(false);
                        }
                        if (props.inputNewData) {
                          setFilterInput(null);
                        }
                      }}
                    >
                      <div className="dropdown__wrapper__menu__item__name">
                        {item.name}
                      </div>
                      {multiselect &&
                        _.find(
                          itemsSelected,
                          selected => selected.key === item.key
                        ) && (
                        <img
                          className="dropdown__wrapper__menu__item__selected"
                          src={check}
                        />
                      )}
                    </div>
                  )
              )}
            </div>
          ) : (
            <div
              className="dropdown__wrapper__menu"
              style={{ width: fullWidth && '100%' }}
            >
              <div className={classNames(customclass)}>
                <div className="dropdown__wrapper__menu__item__name-default">
                  {loading ? (
                    <div className="loader-small" />
                  ) : (
                    'Lista je prazna...'
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()),
  handleSelect: PropTypes.func.isRequired,
  headerTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  setHeaderTitle: PropTypes.func,
  multiselect: PropTypes.bool,
  defaultHeaderOption: PropTypes.string.isRequired,
  itemsSelected: PropTypes.arrayOf(PropTypes.shape()),
  customclass: PropTypes.string,
  inputNewData: PropTypes.bool,
  disabledInput: PropTypes.bool,
  inputNewDataPlaceholder: PropTypes.string,
  fullWidth: PropTypes.bool,
};
