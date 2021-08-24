import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './MedicationListPage.scss';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import MedicationInfoModal from './MedicationInfoModal/MedicationInfoModal';
import MedicationList from './MedicationList/MedicationList';

import {
  getAllMedications,
  searchMedicationsByText,
} from '../../../store/actions';
import AddButton from '../../SharedComponents/AddButton/AddButton';
import Search from '../../SharedComponents/Search/Search';

const MedicationListPage = props => {
  const dispatch = useDispatch();
  const medicationList = useSelector(state => state.medicationList);

  const [showMedicationInfoModal, setShowMedicationInfoModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  useEffect(() => {
    dispatch(getAllMedications());
  }, []);

  return (
    <div className="medications-list-page">
      <DataDisplay
        dataHeader="Popis lijekova"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        TopSpacing={30}
        floatDataRight
        data={
          <div className="medications-list-page__actions">
            <Search
              setSearchQuery={setSearchQuery}
              fetchData={() => {
                return getAllMedications();
              }}
              fetchDataByName={name => {
                return searchMedicationsByText(name);
              }}
              searchingByInfo="*Pretraživanje po nazivu i opisu"
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
          <div className="medications-list-page__list__display-list">
            {medicationList &&
            medicationList.medications &&
            medicationList.medications.length > 0 ? (
                <MedicationList
                  medicationList={medicationList.medications}
                  setShowMedicationInfoModal={setShowMedicationInfoModal}
                  setSelectedMedication={setSelectedMedication}
                />
              ) : (
                <div className="medications-list-page__list__display-list__not-found">
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

MedicationListPage.propTypes = {
  theme: PropTypes.object,
};

export default MedicationListPage;
