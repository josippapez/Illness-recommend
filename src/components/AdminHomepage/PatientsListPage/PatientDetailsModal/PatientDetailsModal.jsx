import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../SharedComponents/Modal/Modal';
import DataDisplay from '../../../SharedComponents/DataDisplay/DataDisplay';
import './PatientDetailsModa.scss';
import AlertModal from '../../../SharedComponents/AlertModal/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import { removePatientDetailsById } from '../../../../store/actions';

const PatientDetailsModal = props => {
  const dispatch = useDispatch();
  const patient = useSelector(state => state.patient);

  const { selectedPatient, userRole } = props;
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isTryingToDelete, setIsTryingToDelete] = useState(false);

  useEffect(() => {
    if (patient.status === 201 || patient.status === 200) {
      props.setShowPatientViewInfo(false);
    }
  }, [patient]);

  return (
    <Modal closeModal={() => props.setShowPatientViewInfo(false)}>
      <div className="patient-info-modal">
        <div className="patient-info-modal__header">
          <div className="header-info-image"></div>
          <div className="patient-info-modal__header__header-text">
            <div className="header-main-text">Pregled detalja pacijenta</div>
          </div>
          <div
            className="header-close-icon"
            onClick={() => props.setShowPatientViewInfo(false)}
          ></div>
        </div>
        <div className="patient-info-modal__body">
          <DataDisplay
            dataHeader="Ime i prezime"
            displayInColumn
            headerBolded
            removeTopSeparator
            dataSeparatorTopSpacing={4}
            data={selectedPatient.name}
          />
          <DataDisplay
            dataHeader="OIB"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={selectedPatient.oib}
          />
          <DataDisplay
            dataHeader="Težina (kg)"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={selectedPatient.weight}
          />
          <DataDisplay
            dataHeader="Dob (g)"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={selectedPatient.age}
          />
          <DataDisplay
            dataHeader="Dojenje ili trudnoća?"
            displayInColumn
            headerBolded
            dataSeparatorTopSpacing={4}
            data={selectedPatient.pregnantOrBreastFeed ? 'Da' : 'Ne'}
          />
          {selectedPatient.symptomsSelected &&
            selectedPatient.symptomsSelected.length > 0 && (
            <DataDisplay
              dataHeader="Alergije"
              displayInColumn
              headerBolded
              dataSeparatorTopSpacing={4}
              data={selectedPatient.symptomsSelected.map(symptom => (
                <div key={symptom.id}>{symptom.name}</div>
              ))}
            />
          )}
          {selectedPatient.alergies && selectedPatient.alergies.length > 0 && (
            <DataDisplay
              dataHeader="Alergije"
              displayInColumn
              headerBolded
              dataSeparatorTopSpacing={4}
              data={selectedPatient.alergies.map(alergy => (
                <div key={alergy.id}>{alergy.name}</div>
              ))}
            />
          )}
          {selectedPatient.medicationsSelected &&
            selectedPatient.medicationsSelected.length > 0 && (
            <DataDisplay
              dataHeader="Odabrani lijekovi"
              displayInColumn
              headerBolded
              dataSeparatorTopSpacing={4}
              data={selectedPatient.medicationsSelected.map(medication => (
                <div key={medication.id}>{medication.name}</div>
              ))}
            />
          )}
        </div>
        {userRole === 'admin' && (
          <div className="footer">
            <button
              className="footer__remove-button"
              onClick={() => {
                setIsTryingToDelete(true);
                setShowAlertModal(true);
              }}
            >
              Obriši unos o pacijentu
            </button>
          </div>
        )}
        {showAlertModal && (
          <AlertModal
            alertInfotext={
              isTryingToDelete && 'Želite li obrisati ovog korisnika?'
            }
            confirmOptions={() => {
              setShowAlertModal(false);
              if (isTryingToDelete) {
                dispatch(removePatientDetailsById(selectedPatient.id));
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

PatientDetailsModal.propTypes = {
  userRole: PropTypes.string,
  selectedPatient: PropTypes.object,
  setSelectedPatient: PropTypes.func,
  setShowPatientViewInfo: PropTypes.func,
};

export default PatientDetailsModal;
