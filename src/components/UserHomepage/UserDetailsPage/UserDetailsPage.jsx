import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';
import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import './UserDetailsPage.scss';
import {
  fetchUserInfoById,
  getAllAlergies,
  updateUserDetails,
} from '../../../store/actions';

const UserDetailsPage = props => {
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
      <DataDisplay
        dataHeader="Detaljni podaci korisnika"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        centerHeaderVertically
        TopSpacing={30}
        floatDataRight
        dynamicHeaderWidth
      />
      <div className="user-details-page__body">
        <DataDisplay
          dataHeader="Dob (g)"
          displayInColumn
          headerBolded
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
                inputNewData
                multiselect
                addButtonShouldBeShown={false}
                inputNewDataPlaceholder="Odaberi ili upiši"
                handleSelect={item => {
                  if (item.id) {
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
                headerTitle="Odaberi ili upiši"
                defaultHeaderOption="Odaberi ili upiši"
              />
              {userDetailsInfo.alergies && userDetailsInfo.alergies.length > 0 && (
                <>
                  <div className="alergy-list-display-title">
                    Odabrane alergije:
                  </div>
                  <table
                    style={{
                      width: '100%',
                      marginTop: '20px',
                      marginBottom: '110px',
                    }}
                    className="list-table"
                  >
                    <tbody className="list-table__item-row">
                      {userDetailsInfo.alergies.map(alergy => (
                        <tr
                          className="spacer item-row"
                          style={{ textAlign: 'center' }}
                          key={alergy.id}
                        >
                          <td>{alergy.name}</td>
                          <td
                            style={{
                              paddingLeft: '20px',
                              width: '55px',
                            }}
                          >
                            <button
                              id="link-to-medication-page"
                              onClick={() => {
                                setUserDetailsInfo({
                                  ...userDetailsInfo,
                                  alergies: [
                                    ...userDetailsInfo.alergies.filter(
                                      savedAlergy =>
                                        savedAlergy.id !== alergy.id
                                    ),
                                  ],
                                });
                              }}
                            >
                              Obriši
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          }
        />
      </div>
      <div className="footer">
        <button
          className="footer__send-button"
          onClick={() => {
            dispatch(updateUserDetails(userDetailsInfo, true));
          }}
        >
          Spremi
        </button>
      </div>
    </div>
  );
};

UserDetailsPage.propTypes = {
  userId: PropTypes.number,
  theme: PropTypes.object,
};

export default UserDetailsPage;
