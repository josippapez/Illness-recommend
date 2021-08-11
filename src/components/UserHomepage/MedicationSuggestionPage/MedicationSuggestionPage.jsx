import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import {
  getAllMedications,
  getAllSymptoms,
  getMedicationsBySymptomsAndAlergies,
  currentPatientInfoFetched,
  updatePatientDetails,
} from '../../../store/actions';
import { Dropdown } from '../../SharedComponents/Dropdown/Dropdown';
import './MedicationSuggestionPage.scss';
import MedicationList from '../../AdminHomepage/MedicationsListPage/MedicationList/MedicationList';
import MedicationInfoModal from '../../AdminHomepage/MedicationsListPage/MedicationInfoModal/MedicationInfoModal';

const MedicationSuggestionPage = props => {
  const dispatch = useDispatch();

  const symptoms = useSelector(state => state.symptoms.symptoms);
  const medicationList = useSelector(state => state.medicationList);
  const PatientDetails = useSelector(state => state.patient);

  const [PatientDetailsInfo, setPatientDetailsInfo] = useState(
    PatientDetails.currentPatientInfo
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState(
    PatientDetailsInfo ? PatientDetailsInfo.symptomsSelected : []
  );
  const [showMedicationInfoModal, setShowMedicationInfoModal] = useState(false);
  const [medicationToView, setMedicationToView] = useState(null);
  const [selectedMedication, setSelectedMedication] = useState(
    PatientDetailsInfo ? PatientDetailsInfo.medicationsSelected : []
  );

  useEffect(() => {
    let timeout;
    if (
      JSON.stringify(selectedMedication) !==
      JSON.stringify(PatientDetailsInfo.medicationsSelected)
    ) {
      timeout = setTimeout(() => {
        setPatientDetailsInfo({
          ...PatientDetailsInfo,
          medicationsSelected: selectedMedication,
        });
      }, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedMedication]);

  useEffect(() => {
    dispatch(getAllSymptoms());
  }, []);

  const setMedicationList = medication => {
    if (
      selectedMedication.find(
        savedMedication => savedMedication.id === medication.id
      )
    ) {
      setSelectedMedication(
        [...selectedMedication].filter(
          savedMedication => savedMedication.id !== medication.id
        )
      );
    } else {
      setSelectedMedication([...selectedMedication, medication]);
    }
  };

  return (
    <div className="medication-suggestions-page">
      <DataDisplay
        dataHeader="Predlaganje lijekova"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        centerHeaderVertically
        TopSpacing={30}
        floatDataRight
        data={
          <>
            <button
              type="button"
              className="save-patient-info"
              onClick={() => {
                dispatch(
                  updatePatientDetails(PatientDetailsInfo, selectedSymptoms)
                );
              }}
            >
              Spremi odabrane lijekove
            </button>
            <button
              type="button"
              className="search-medications-button"
              onClick={() => {
                dispatch(getMedicationsBySymptomsAndAlergies(selectedSymptoms));
              }}
            >
              Pretraži
            </button>
          </>
        }
      />
      <div className="medication-suggestions-page__body">
        <div className="medication-suggestions-page__body__symptoms">
          <DataDisplay
            dataHeader="Simptomi"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={
              <div>
                <Dropdown
                  fullWidth
                  customclass="symptoms-dropdown"
                  multiselect
                  addButtonShouldBeShown={false}
                  searchData
                  searchDataPlaceholder="Odaberi ili pretraži postojeće simptome"
                  handleSelect={item => {
                    if (item.id) {
                      setSelectedSymptoms([...selectedSymptoms, item]);
                    }
                  }}
                  list={
                    symptoms
                      ? [
                        ...symptoms.filter(symptom =>
                          selectedSymptoms.length > 0
                            ? !selectedSymptoms.find(
                              medicationSymptom =>
                                medicationSymptom.id === symptom.id
                            )
                            : symptom
                        ),
                      ]
                      : []
                  }
                  headerTitle="Odaberi ili pretraži postojeće simptome"
                  defaultHeaderOption="Odaberi ili pretraži postojeće simptome"
                />
                {selectedSymptoms && (
                  <div>
                    <table
                      style={{ width: '100%', marginTop: '20px' }}
                      className="list-table"
                    >
                      <tbody className="list-table__item-row">
                        {selectedSymptoms.length > 0 &&
                          selectedSymptoms.map((symptom, index) => {
                            return (
                              <tr
                                className="spacer item-row"
                                style={{ textAlign: 'center' }}
                                key={index}
                              >
                                <td>{symptom.name}</td>
                                <td
                                  style={{
                                    paddingLeft: '20px',
                                    width: '55px',
                                  }}
                                >
                                  <button
                                    id="link-to-medication-page"
                                    onClick={() => {
                                      setSelectedSymptoms(
                                        [...selectedSymptoms].filter(
                                          saveSymptom =>
                                            saveSymptom.name !== symptom.name
                                        )
                                      );
                                    }}
                                  >
                                    Obriši
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            }
          />
        </div>
        <div className="medication-suggestions-page__body__medication-list">
          {medicationList &&
          medicationList.medications &&
          medicationList.medications.length > 0 ? (
              <MedicationList
                medicationList={medicationList.medications}
                setShowMedicationInfoModal={setShowMedicationInfoModal}
                setSelectedMedication={setMedicationToView}
                setMedicationList={setMedicationList}
                selectedMedicationList={PatientDetailsInfo.medicationsSelected}
              />
            ) : (
              medicationList.medications && (
                <div className="medications-list-page__list__display-list__not-found">
                Nema pronađenih lijekova.
                </div>
              )
            )}
        </div>
      </div>
      {showMedicationInfoModal && (
        <MedicationInfoModal
          userRole="user"
          selectedMedication={medicationToView}
          setSelectedMedication={setMedicationToView}
          setShowMedicationInfoModal={setShowMedicationInfoModal}
        />
      )}
    </div>
  );
};

MedicationSuggestionPage.propTypes = { theme: PropTypes.object };

export default MedicationSuggestionPage;
