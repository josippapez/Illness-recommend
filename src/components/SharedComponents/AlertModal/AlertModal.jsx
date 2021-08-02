import React from 'react';
import PropTypes from 'prop-types';

import './AlertModal.scss';
import Modal from '../Modal/Modal';

const AlertModal = props => {
  return (
    <Modal className='modal-for-alert'>
      <div className='modal-container-alert'>
        <div className='alert-modal'>
          <div className='alert-modal__icon-alert'></div>
          <div className='alert-modal__header-text'>
            <div className='header-main-text'>Oprez!</div>
            <div className='header-small-text'>{props.alertInfotext}</div>
          </div>
          <div className='button-container'>
            {!props.showOnlyConfirmOption && (
              <button
                className='alert-decline-button'
                onClick={props.declineOptions}
              >
                Ne
              </button>
            )}
            <button
              className='alert-confirm-button'
              onClick={props.confirmOptions}
            >
              {props.showOnlyConfirmOption ? 'U redu' : 'Da'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AlertModal.propTypes = {
  alertInfotext: PropTypes.string,
  confirmOptions: PropTypes.func,
  declineOptions: PropTypes.func,
  showOnlyConfirmOption: PropTypes.bool,
};

export default AlertModal;
