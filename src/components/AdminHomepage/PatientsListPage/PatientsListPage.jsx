import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './PatientsListPage.scss';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import MedicationInfoModal from './MedicationInfoModal/MedicationInfoModal';
import MedicationList from './MedicationList/MedicationList';

import {
  getAllMedications,
  searchMedicationsByText,
} from '../../../store/actions/medicationActions';
import AddButton from '../../SharedComponents/AddButton/AddButton';
import Search from '../../SharedComponents/Search/Search';

const PatientsListPage = props => {
  const dispatch = useDispatch();
  const medicationList = useSelector(state => state.medicationList);

  const [showMedicationInfoModal, setShowMedicationInfoModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  useEffect(() => {
    dispatch(getAllMedications());
  }, []);

  return (
    <div className="patients-list-page">
      <DataDisplay
        dataHeader="Popis lijekova"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        centerHeaderVertically
        TopSpacing={30}
        floatDataRight
        data={
          <div className="patients-list-page__actions">
            <Search
              setSearchQuery={setSearchQuery}
              fetchData={() => {
                return getAllMedications();
              }}
              fetchDataByName={name => {
                return searchMedicationsByText(name);
              }}
              searchingByInfo="*Pretraživanje po Imenu i prezimenu, OIB-u"
            />
            <AddButton
              customClassName="add-medication-button"
              setShowModal={setShowMedicationInfoModal}
              text="Dodaj lijek"
            />
          </div>
        }
      />
      <DataDisplay
        TopSpacing={40}
        dataFullWidth
        data={
          <div className="patients-list-page__list__display-list">
            {medicationList &&
            medicationList.medications &&
            medicationList.medications.length > 0 ? (
                <MedicationList
                  medicationList={medicationList.medications}
                  setShowMedicationInfoModal={setShowMedicationInfoModal}
                  setSelectedMedication={setSelectedMedication}
                />
              ) : (
                <div className="patients-list-page__list__display-list__not-found">
                Nema unesenih lijekova.
                </div>
              )}
          </div>
        }
      />
      {showMedicationInfoModal && (
        <MedicationInfoModal
          userRole="admin"
          selectedMedication={selectedMedication}
          setSelectedMedication={setSelectedMedication}
          setShowMedicationInfoModal={setShowMedicationInfoModal}
        />
      )}
    </div>
  );
};

PatientsListPage.propTypes = {
  theme: PropTypes.object,
};

export default PatientsListPage;
