import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './UserInfoModal.scss';
import Modal from '../../../SharedComponents/Modal/Modal';
import DataDisplay from '../../../SharedComponents/DataDisplay/DataDisplay';
import { Dropdown } from '../../../SharedComponents/Dropdown/Dropdown';
import {
  createPatientDetails,
  fetchUserInfoById,
  getAllAlergies,
  removeUserById,
  updatePatientDetails,
  updateUserDetails,
  userInfoFetched,
  /*   userInfoFetched, */
} from '../../../../store/actions';
import AlertModal from '../../../SharedComponents/AlertModal/AlertModal';

const UserInfoModal = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userInfo);
  const alergies = useSelector(state => state.alergies.alergies);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isTryingToDelete, setIsTryingToDelete] = useState(false);
  const [userDetailsInfo, setUserDetailsInfo] = useState({
    id: props.userId,
    name: null,
    email: null,
    role: null,
  });

  useEffect(() => {
    dispatch(getAllAlergies());
    if (props.userId) {
      dispatch(fetchUserInfoById(props.userId));
    }
    return () => {
      props.setUserId(null);
      dispatch(
        userInfoFetched({
          data: {
            id: null,
            name: null,
            email: null,
            role: null,
          },
        })
      );
    };
  }, []);

  useEffect(() => {
    if (userDetails.data) {
      setUserDetailsInfo(userDetails.data);
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails.status === 201 || userDetails.status === 200) {
      props.setShowUserInfoModal(false);
    }
  }, [userDetails]);

  const checkForClosingModal = () => {
    if (userDetails.data && userDetails.data !== userDetailsInfo) {
      setShowAlertModal(true);
    } else if (
      !userDetails.data &&
      (userDetailsInfo.name || userDetailsInfo.email || userDetailsInfo.role)
    ) {
      setShowAlertModal(true);
    } else {
      props.setShowUserInfoModal(false);
    }
  };

  return (
    <Modal closeModal={() => checkForClosingModal()}>
      <div className="user-info-modal">
        <div className="user-info-modal__header">
          <div className="header-info-image"></div>
          <div className="user-info-modal__header__header-text">
            <div className="header-main-text">Pregled detalja korisnika</div>
          </div>
          <div
            className="header-close-icon"
            onClick={() => checkForClosingModal()}
          ></div>
        </div>
        <div className="user-info-modal__body">
          <DataDisplay
            dataHeader="Ime i prezime"
            displayInColumn
            headerBolded
            removeTopSeparator
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="text"
                value={userDetailsInfo.name ? userDetailsInfo.name : ''}
                onChange={e => {
                  setUserDetailsInfo({
                    ...userDetailsInfo,
                    name: e.target.value,
                  });
                }}
              />
            }
          />
          {userDetails.error &&
            userDetails.error.find(error => error.field === 'name') && (
            <div className="error">
              {
                userDetails.error.find(error => error.field === 'name')
                  .message
              }
            </div>
          )}
          <DataDisplay
            dataHeader="Email"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="text"
                value={userDetailsInfo.email ? userDetailsInfo.email : ''}
                onChange={e => {
                  setUserDetailsInfo({
                    ...userDetailsInfo,
                    email: e.target.value,
                  });
                }}
              />
            }
          />
          {userDetails.error &&
            userDetails.error.find(error => error.field === 'email') && (
            <div className="error">
              {
                userDetails.error.find(error => error.field === 'email')
                  .message
              }
            </div>
          )}
          <DataDisplay
            dataHeader="Rola"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <div>
                <Dropdown
                  customclass="role-dropdown"
                  addButtonShouldBeShown={false}
                  handleSelect={item => {
                    if (item.id) {
                      setUserDetailsInfo({
                        ...userDetailsInfo,
                        role: item.name,
                      });
                    }
                  }}
                  list={[
                    { id: 1, name: 'user' },
                    { id: 2, name: 'admin' },
                  ]}
                  headerTitle={userDetailsInfo.role}
                  defaultHeaderOption="Odaberi"
                />
              </div>
            }
          />
        </div>
        <div className="footer">
          <button
            className="footer__remove-button"
            onClick={() => {
              setIsTryingToDelete(true);
              setShowAlertModal(true);
            }}
          >
            Obriši korisnika
          </button>
          <button
            className="footer__send-button"
            onClick={() => {
              if (userDetails.data) {
                dispatch(updateUserDetails(userDetailsInfo));
              }
            }}
          >
            Spremi
          </button>
        </div>
        {showAlertModal && (
          <AlertModal
            alertInfotext={
              isTryingToDelete
                ? 'Želite li obrisati ovog korisnika?'
                : 'Jeste li sigurni da želite zatvoriti prozor? Imate ne spremljene promjene!'
            }
            confirmOptions={() => {
              setShowAlertModal(false);
              if (isTryingToDelete) {
                dispatch(removeUserById(userDetailsInfo.id));
              } else {
                props.setShowUserInfoModal(false);
              }
            }}
            declineOptions={() => {
              setShowAlertModal(false);
              setIsTryingToDelete(false);
            }}
          />
        )}
      </div>
    </Modal>
  );
};

UserInfoModal.propTypes = {
  setShowUserInfoModal: PropTypes.func,
  setUserId: PropTypes.func,
  userId: PropTypes.number,
};

export default UserInfoModal;
