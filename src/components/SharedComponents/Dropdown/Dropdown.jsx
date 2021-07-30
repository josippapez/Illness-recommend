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
  const [selectedInput, setSelectedInput] = useState(null);
  const {
    list,
    handleSelect,
    headerTitle,
    multiselect,
    defaultHeaderOption,
    itemsSelected,
    customclass,
    fetchSuggestions,
    fetchNewPage,
    pages,
    suggestionPlaceholder,
    disabledInputSuggestion,
  } = props;

  const selectItem = item => {
    handleSelect(item);
  };

  useEffect(() => {
    if (props.inputSuggestions && headerTitle !== defaultHeaderOption) {
      setSelectedInput(headerTitle);
    }
  }, [headerTitle]);

  useEffect(() => {
    let timeout;
    if (props.inputSuggestions) {
      if (filterInput !== '') {
        timeout = setTimeout(() => {
          fetchSuggestions(filterInput);
          setLoading(false);
        }, 500);
      } else {
        fetchSuggestions(filterInput);
        setLoading(false);
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [filterInput]);
  console.log(list);
  return (
    <div className='dropdown'>
      <div className='dropdown__wrapper'>
        <div
          className={classNames({
            dropdown__wrapper__header: true,
            default: headerTitle === defaultHeaderOption,
          })}
        >
          {!props.inputSuggestions ? (
            <div
              className={classNames(customclass, {
                dropdown__wrapper__header__box: true,
              })}
              onClick={() => setDropdownOpened(!dropdownOpened)}
            >
              <div className='dropdown__wrapper__header__box__title'>
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
              disabled={disabledInputSuggestion}
              placeholder={suggestionPlaceholder}
              onClick={() => setDropdownOpened(!dropdownOpened)}
              value={
                selectedInput ? selectedInput : filterInput ? filterInput : ''
              }
              onChange={e => {
                if (selectedInput) setSelectedInput(null);
                setFilterInput(e.target.value);
                setDropdownOpened(true);
                if (e.target.value !== '') {
                  setLoading(true);
                }
              }}
            />
          )}
        </div>
        {dropdownOpened &&
          (list.length > 0 ? (
            <div className='dropdown__wrapper__menu'>
              <div
                className={classNames(customclass, {
                  dropdown__wrapper__menu__item: true,
                })}
                onClick={e => {
                  e.preventDefault();
                  selectItem(defaultHeaderOption);
                  setDropdownOpened(false);
                  if (props.inputSuggestions) {
                    setSelectedInput(null);
                    setFilterInput(null);
                  }
                }}
              >
                <div className='dropdown__wrapper__menu__item__name-default'>
                  Obriši odabir
                </div>
                {multiselect && itemsSelected && itemsSelected.length === 0 && (
                  <img
                    className='dropdown__wrapper__menu__item__selected'
                    src={check}
                  />
                )}
              </div>
              {loading && (
                <div className='loader-small dropdown__wrapper__menu__item' />
              )}
              {list.map((item, index) =>
                props.inputSuggestions ? (
                  !loading && (
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
                        if (props.inputSuggestions) {
                          setSelectedInput(item.name);
                        }
                        if (multiselect) {
                          selectItem(item);
                        } else {
                          handleSelect(item);
                          setDropdownOpened(false);
                        }
                      }}
                    >
                      <div className='dropdown__wrapper__menu__item__name'>
                        {item.name}
                      </div>
                      {multiselect &&
                        _.find(
                          itemsSelected,
                          selected => selected.key === item.key
                        ) && (
                        <img
                          className='dropdown__wrapper__menu__item__selected'
                          src={check}
                        />
                      )}
                    </div>
                  )
                ) : (
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
                    }}
                  >
                    <div className='dropdown__wrapper__menu__item__name'>
                      {item.name}
                    </div>
                    {multiselect &&
                      _.find(
                        itemsSelected,
                        selected => selected.key === item.key
                      ) && (
                      <img
                        className='dropdown__wrapper__menu__item__selected'
                        src={check}
                      />
                    )}
                  </div>
                )
              )}
              {!loading && props.inputSuggestions && pages.totalPages > 1 && (
                <div className='dropdown__wrapper__menu__item'>
                  <button
                    disabled={pages.page === 1}
                    className='previous'
                    onClick={() => fetchNewPage(pages.page - 1, filterInput)}
                  >
                    ◄
                  </button>
                  <button
                    disabled={pages.page === pages.totalPages}
                    className='next'
                    onClick={() => fetchNewPage(pages.page + 1, filterInput)}
                  >
                    ►
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='dropdown__wrapper__menu'>
              <div className={classNames(customclass)}>
                <div className='dropdown__wrapper__menu__item__name-default'>
                  {loading ? (
                    <div className='loader-small' />
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
  inputSuggestions: PropTypes.bool,
  fetchSuggestions: PropTypes.func,
  fetchNewPage: PropTypes.func,
  pages: PropTypes.object,
  disabledInputSuggestion: PropTypes.bool,
  suggestionPlaceholder: PropTypes.string,
};
