import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './AddButton.scss';

const AddButton = props => {
  return (
    <div
      className={classNames(props.customClassName, 'add-component')}
      onClick={() => props.setShowModal(true)}
    >
      <div className='add-image-in-add-component'></div>
      <button className='add-button-in-add-component'>{props.text}</button>
    </div>
  );
};

AddButton.propTypes = {
  setShowModal: PropTypes.func,
  customClassName: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default AddButton;
