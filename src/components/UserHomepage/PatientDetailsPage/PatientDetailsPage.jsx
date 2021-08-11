import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';
import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import './PatientDetailsPage.scss';
import {
  createPatientDetails,
  fetchPatientById,
  fetchUserInfoById,
  getAllAlergies,
  patientInfoFetched,
  updatePatientDetails,
} from '../../../store/actions';

const PatientDetailsPage = props => {
  const dispatch = useDispatch();
  const PatientDetails = useSelector(state => state.patient);
  const alergies = useSelector(state => state.alergies.alergies);

  const [PatientDetailsInfo, setPatientDetailsInfo] = useState(
    PatientDetails && PatientDetails.patientInfo
      ? { ...PatientDetails.patientInfo }
      : {
        oib: null,
        name: null,
        age: null,
        alergies: [],
        pregnantOrBreastFeed: false,
        weight: null,
      }
  );

  useEffect(() => {
    dispatch(getAllAlergies());
    if (PatientDetails.patientInfo && PatientDetails.patientInfo.id) {
      dispatch(fetchPatientById(PatientDetails.patientInfo.id));
    }
  }, []);

  useEffect(() => {
    if (PatientDetails && PatientDetails.patientInfo) {
      setPatientDetailsInfo(PatientDetails.patientInfo);
    }
  }, [PatientDetails]);

  return (
    <div className="patient-details-page">
      <DataDisplay
        dataHeader="Podaci o pacijentu"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        centerHeaderVertically
        TopSpacing={30}
        floatDataRight
        data={
          <button
            className="new-patient-button"
            onClick={() => {
              dispatch(patientInfoFetched(null));
              setPatientDetailsInfo({
                oib: null,
                name: null,
                age: null,
                alergies: [],
                pregnantOrBreastFeed: false,
                weight: null,
              });
            }}
          >
            Novi pacijent
          </button>
        }
      />
      <div className="patient-details-page__body">
        <DataDisplay
          dataHeader="Ime i prezime"
          displayInColumn
          headerBolded
          dataSeparatorTopSpacing={4}
          data={
            <input
              type="text"
              min="0"
              value={PatientDetailsInfo.name ? PatientDetailsInfo.name : ''}
              onChange={e => {
                setPatientDetailsInfo({
                  ...PatientDetailsInfo,
                  name: e.target.value,
                });
              }}
            />
          }
        />
        <DataDisplay
          dataHeader="OIB"
          displayInColumn
          headerBolded
          dataSeparatorTopSpacing={4}
          data={
            <input
              type="number"
              min="0"
              value={PatientDetailsInfo.oib ? PatientDetailsInfo.oib : ''}
              onChange={e => {
                setPatientDetailsInfo({
                  ...PatientDetailsInfo,
                  oib: e.target.value,
                });
              }}
            />
          }
        />
        <DataDisplay
          dataHeader="Dob (g)"
          displayInColumn
          headerBolded
          dataSeparatorTopSpacing={4}
          data={
            <input
              type="number"
              min="0"
              value={PatientDetailsInfo.age ? PatientDetailsInfo.age : ''}
              onChange={e => {
                setPatientDetailsInfo({
                  ...PatientDetailsInfo,
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
              value={PatientDetailsInfo.weight ? PatientDetailsInfo.weight : ''}
              onChange={e => {
                setPatientDetailsInfo({
                  ...PatientDetailsInfo,
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
                  PatientDetailsInfo.pregnantOrBreastFeed
                    ? PatientDetailsInfo.pregnantOrBreastFeed
                    : false
                }
                onChange={e => {
                  setPatientDetailsInfo({
                    ...PatientDetailsInfo,
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
                    setPatientDetailsInfo({
                      ...PatientDetailsInfo,
                      alergies: [...PatientDetailsInfo.alergies, item],
                    });
                  }
                }}
                list={
                  alergies
                    ? [
                      ...alergies.filter(alergy =>
                        PatientDetailsInfo.alergies.length > 0
                          ? !PatientDetailsInfo.alergies.find(
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
              {PatientDetailsInfo.alergies &&
                PatientDetailsInfo.alergies.length > 0 && (
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
                      {PatientDetailsInfo.alergies.map(alergy => (
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
                                setPatientDetailsInfo({
                                  ...PatientDetailsInfo,
                                  alergies: [
                                    ...PatientDetailsInfo.alergies.filter(
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
            if (PatientDetails.patientInfo && PatientDetails.patientInfo.id) {
              dispatch(updatePatientDetails(PatientDetailsInfo));
            } else {
              dispatch(createPatientDetails(PatientDetailsInfo));
            }
          }}
        >
          Spremi
        </button>
      </div>
    </div>
  );
};

PatientDetailsPage.propTypes = {
  userId: PropTypes.number,
  theme: PropTypes.object,
};

export default PatientDetailsPage;
