import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import AlertModal from '../../SharedComponents/AlertModal/AlertModal';
import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';
import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import './UserDetailsPage.scss';
import {
  fetchUserInfoById,
  getAllAlergies,
  updateUserDetails,
  userInfoFetched,
} from '../../../store/actions';

const UserDetailsPage = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userInfo);
  const alergies = useSelector(state => state.alergies.alergies);

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isTryingToDelete, setIsTryingToDelete] = useState(false);
  const [isTryingToCloseWhenEdited, setIsTryingToCloseWhenEdited] =
    useState(false);
  const [userDetailsInfo, setUserDetailsInfo] = useState({
    id: props.userId,
    age: null,
    alergies: [],
    pregnantOrBreastFeed: false,
    weight: null,
  });
  const [selectedAlergie, setselectedAlergie] = useState(null);
  const [alergyDropdownTitle, setAlergyDropdownTitle] =
    useState('Odaberi ili upiši');

  useEffect(() => {
    dispatch(getAllAlergies());
    if (props.userId && (!userDetails || !userDetails.data)) {
      dispatch(fetchUserInfoById(props.userId));
    }
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.data) {
      setUserDetailsInfo({ ...userDetailsInfo, ...userDetails.data });
    }
  }, [userDetails]);

  return (
    <div className="user-details-page">
      <div className="user-details-page__body">
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
                setUserDetailsInfo({
                  ...userDetailsInfo,
                  age: e.target.value,
                });
              }}
            />
          }
        />
        {/* {userDetails.error &&
          userDetails.error.find(error => error.field === 'age') && (
          <div className="error">
            {userDetails.error.find(error => error.field === 'age').message}
          </div>
        )} */}
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
        {/* {userDetails.error &&
          userDetails.error.find(error => error.field === 'weight') && (
          <div className="error">
            {
              userDetails.error.find(error => error.field === 'weight')
                .message
            }
          </div>
        )} */}
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
                defaultHeaderOption="Odaberi ili upiši"
              />
              {userDetailsInfo.alergies && userDetailsInfo.alergies.length > 0 && (
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
          className="footer__send-button"
          onClick={() => {
            dispatch(updateUserDetails(userDetailsInfo));
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
          }}
          declineOptions={() => {
            setShowAlertModal(false);
          }}
        />
      )}
    </div>
  );
};

UserDetailsPage.propTypes = {
  userId: PropTypes.number,
};

export default UserDetailsPage;
