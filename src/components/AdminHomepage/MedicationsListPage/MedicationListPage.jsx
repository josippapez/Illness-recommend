import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './MedicationListPage.scss';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import MedicationInfoModal from './MedicationInfoModal/MedicationInfoModal';
import MedicationList from './MedicationList/MedicationList';

import { getAllMedications } from '../../../store/actions/medicationActions';
import AddButton from '../../SharedComponents/AddButton/AddButton';

const MedicationListPage = props => {
  const dispatch = useDispatch();
  const medicationList = useSelector(state => state.medicationList);

  const [showMedicationInfoModal, setShowMedicationInfoModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  useEffect(() => {
    dispatch(getAllMedications());
  }, []);

  return (
    <div className="medications-list-page">
      <DataDisplay
        dataHeader="Popis lijekova"
        headerBolded
        headerFontSize={23}
        headerTextColor={'#005BA7'}
        dataFullWidth
        centerHeaderVertically
        TopSpacing={30}
        floatDataRight
        data={
          <AddButton
            customClassName="add-medication-button"
            setShowModal={setShowMedicationInfoModal}
            text="Dodaj lijek"
          />
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
          selectedMedication={selectedMedication}
          setSelectedMedication={setSelectedMedication}
          setShowMedicationInfoModal={setShowMedicationInfoModal}
        />
      )}
    </div>
  );
};

MedicationListPage.propTypes = {};

export default MedicationListPage;
