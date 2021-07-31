import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './MedicationInfoModal.scss';
import Modal from '../../../SharedComponents/Modal/Modal';
import DataDisplay from '../../../SharedComponents/DataDisplay/DataDisplay';
import { Dropdown } from '../../../SharedComponents/Dropdown/Dropdown';
import {
  createUserDetails,
  deleteAlergiesUserInfoRelation,
  fetchUserInfoById,
  getAllAlergies,
  removeUserById,
  updateUserDetails,
} from '../../../../store/actions';

const MedicationInfoModal = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userInfo);
  const alergies = useSelector(state => state.alergies.alergies);

  const [userDetailsInfo, setUserDetailsInfo] = useState({
    id: props.userId,
    age: null,
    alergies: [],
    pregnantOrBreastFeed: false,
    weight: null,
  });
  const [selectedAlergie, setselectedAlergie] = useState(null);
  const [alergyDropdownTitle, setAlergyDropdownTitle] = useState('Odaberi');

  useEffect(() => {
    dispatch(getAllAlergies());
    if (props.userId) {
      dispatch(fetchUserInfoById(props.userId));
    }
    return () => {
      props.setUserId(null);
    };
  }, []);

  useEffect(() => {
    if (userDetails.data) {
      setUserDetailsInfo(userDetails.data);
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails.status === 201 || userDetails.status === 200) {
      props.setShowMedicationInfoModal(false);
    }
  }, [userDetails]);

  return (
    <Modal closeModal={() => props.setShowMedicationInfoModal(false)}>
      <div className="user-info-modal">
        <div className="user-info-modal__header">
          <div className="header-info-image"></div>
          <div className="user-info-modal__header__header-text">
            <div className="header-main-text">Pregled detalja korisnika</div>
          </div>
          <div
            className="header-close-icon"
            onClick={() => props.setShowMedicationInfoModal(false)}
          ></div>
        </div>
        <div className="user-info-modal__body">
          <DataDisplay
            dataHeader="Dob (g)"
            displayInColumn
            headerBolded
            removeTopSeparator
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="number"
                min="0"
                value={userDetailsInfo.age ? userDetailsInfo.age : ''}
                onChange={e => {
                  console.log(e.target.valueAsNumber);
                  setUserDetailsInfo({
                    ...userDetailsInfo,
                    age: e.target.value,
                  });
                }}
              />
            }
          />
          {userDetails.error &&
            userDetails.error.find(error => error.field === 'age') && (
            <div className="error">
              {userDetails.error.find(error => error.field === 'age').message}
            </div>
          )}
          <DataDisplay
            dataHeader="Težina (kg)"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="number"
                min="0"
                value={userDetailsInfo.weight ? userDetailsInfo.weight : ''}
                onChange={e => {
                  setUserDetailsInfo({
                    ...userDetailsInfo,
                    weight: e.target.value,
                  });
                }}
              />
            }
          />
          {userDetails.error &&
            userDetails.error.find(error => error.field === 'weight') && (
            <div className="error">
              {
                userDetails.error.find(error => error.field === 'weight')
                  .message
              }
            </div>
          )}
          <DataDisplay
            dataHeader="Dojenje ili trudnoća?"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  min={0}
                  checked={
                    userDetailsInfo.pregnantOrBreastFeed
                      ? userDetailsInfo.pregnantOrBreastFeed
                      : false
                  }
                  onChange={e => {
                    setUserDetailsInfo({
                      ...userDetailsInfo,
                      pregnantOrBreastFeed: e.target.checked,
                    });
                  }}
                />
              </div>
            }
          />
          <DataDisplay
            dataHeader="Alergije"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <div>
                <Dropdown
                  customclass="alergies-dropdown"
                  handleSelect={item => {
                    if (item === 'Odaberi') {
                      setselectedAlergie(null);
                    } else if (item.id) {
                      setUserDetailsInfo({
                        ...userDetailsInfo,
                        alergies: [...userDetailsInfo.alergies, item],
                      });
                    }
                  }}
                  list={
                    alergies
                      ? [
                        ...alergies.filter(alergy =>
                          userDetailsInfo.alergies.length > 0
                            ? !userDetailsInfo.alergies.find(
                              userInfoAlergy =>
                                userInfoAlergy.id === alergy.id
                            )
                            : alergy
                        ),
                      ]
                      : []
                  }
                  headerTitle={alergyDropdownTitle}
                  defaultHeaderOption="Odaberi"
                />
                {userDetailsInfo.alergies &&
                  userDetailsInfo.alergies.length > 0 && (
                  <>
                    <div className="alergy-list-display-title">
                        Odabrane alergije:
                    </div>
                    <div className="alergy-list-display">
                      <div className="name">Naziv</div>
                      <div className="actions">Akcije</div>
                    </div>
                  </>
                )}
                {userDetailsInfo.alergies &&
                  userDetailsInfo.alergies.length > 0 &&
                  userDetailsInfo.alergies.map(alergy => (
                    <div className="alergy-list-display" key={alergy.id}>
                      <div className="alergy-list-display__subject-name name">
                        {alergy.name}
                      </div>

                      <div className="actions">
                        <button
                          className="delete"
                          onClick={() => {
                            setUserDetailsInfo({
                              ...userDetailsInfo,
                              alergies: [
                                ...userDetailsInfo.alergies.filter(
                                  savedAlergy => savedAlergy.id !== alergy.id
                                ),
                              ],
                            });
                          }}
                        >
                          Obriši
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            }
          />
        </div>
        <div className="footer">
          <button
            className="footer__remove-button"
            onClick={() => dispatch(removeUserById(userDetailsInfo.id))}
          >
            Obriši korisnika
          </button>
          <button
            className="footer__send-button"
            onClick={() => {
              if (userDetails.data) {
                dispatch(updateUserDetails(userDetailsInfo));
              } else {
                dispatch(createUserDetails(userDetailsInfo));
              }
            }}
          >
            Spremi
          </button>
        </div>
      </div>
    </Modal>
  );
};

MedicationInfoModal.propTypes = {
  setShowMedicationInfoModal: PropTypes.func,
  setUserId: PropTypes.func,
  userId: PropTypes.number,
};

export default MedicationInfoModal;
