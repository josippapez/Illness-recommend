import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './UserInfoModal.scss';
import Modal from '../../../SharedComponents/Modal/Modal';
import DataDisplay from '../../../SharedComponents/DataDisplay/DataDisplay';
import { Dropdown } from '../../../SharedComponents/Dropdown/Dropdown';
import { fetchUserInfoById, getAllAlergies } from '../../../../store/actions';

const UserInfoModal = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userInfo);
  const alergies = useSelector(state => state.alergies.alergies);

  const [userDetailsInfo, setUserDetailsInfo] = useState({
    age: null,
    alergies: null,
    pregnantOrBrestFeed: null,
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

  console.log(userDetailsInfo, alergies);
  return (
    <Modal closeModal={() => props.setShowUserInfoModal(false)}>
      <div className="user-info-modal">
        <div className="user-info-modal__header">
          <div className="header-info-image"></div>
          <div className="user-info-modal__header__header-text">
            <div className="header-main-text">Pregled detalja korisnika</div>
          </div>
          <div
            className="header-close-icon"
            onClick={() => props.setShowUserInfoModal(false)}
          ></div>
        </div>
        <div className="user-info-modal__body">
          <DataDisplay
            dataHeader="Dob"
            displayInColumn
            headerBolded
            removeTopSeparator
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="number"
                min={0}
                value={userDetailsInfo.age ? userDetailsInfo.age : ''}
                onChange={e => {
                  setUserDetailsInfo({
                    ...userDetailsInfo,
                    age: e.target.value,
                  });
                }}
              />
            }
          />
          <DataDisplay
            dataHeader="Težina"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <input
                type="number"
                min={0}
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
          <DataDisplay
            dataHeader="Dojenje ili trudnoća?"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <div>
                <input
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
                      pregnantOrBreastFeed: e.target.value,
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
                {userDetailsInfo.alergies && (
                  <DataDisplay
                    dataHeader="Popis alergija"
                    headerBolded
                    displayInColumn
                    dataSeparatorTopSpacing={4}
                    data={
                      <Dropdown
                        customclass="alergies-dropdown"
                        /* handleSelect={item => {
                          setAlergyDropdownTitle(item.name ? item.name : item);
                          setselectedAlergie(item.id ? item.id : item);
                          if (item === "Odaberi") {
                            setselectedAlergie(null);
                          } else {
                            const companySlot = userDetailsInfo.alergies.find(
                              alergy => alergy.id === item.id
                            );
                            if (companySlot) {
                              setCompanySlotsConfiguration({
                                slots: companySlot.slots,
                                academicYear: companySlot.academicYear,
                                alreadyExists: true,
                                slotId: companySlot.id,
                              });
                            } else {
                              setCompanySlotsConfiguration({
                                slots: null,
                                academicYear: "",
                              });
                            }
                          }
                        }} */
                        list={[
                          ...alergies.filter(
                            alergy =>
                              userDetailsInfo.alergies &&
                              !userDetailsInfo.alergies.find(
                                userInfoAlergy =>
                                  userInfoAlergy.id === alergy.id
                              )
                          ),
                        ]}
                        headerTitle={alergyDropdownTitle}
                        defaultHeaderOption="Odaberi predmet"
                      />
                    }
                  />
                )}
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
                  userDetailsInfo.alergies.map(
                    alergy =>
                      alergy.id !== selectedAlergie && (
                        <div className="alergy-list-display" key={alergy.id}>
                          <div className="alergy-list-display__subject-name name">
                            {alergy.name}
                          </div>

                          <div className="actions">
                            <button className="delete" onClick={() => {}}>
                              Obriši
                            </button>
                          </div>
                        </div>
                      )
                  )}
              </div>
            }
          />
        </div>
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
