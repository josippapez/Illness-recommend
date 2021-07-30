import React from 'react';
import reactDom from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.scss';
const Modal = props => {
  return reactDom.createPortal(
    <div className={props.className ? `modal ${props.className}` : 'modal'}>
      <div className='overlay' onClick={props.closeModal}>
        <div className='overlay__children' onClick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  noAccidentalClose: PropTypes.bool,
};

export default Modal;
