import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './PatientsListPage.scss';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';

import {
  getAllMedications,
  searchMedicationsByText,
} from '../../../store/actions/medicationActions';
import AddButton from '../../SharedComponents/AddButton/AddButton';
import Search from '../../SharedComponents/Search/Search';
import {
  getAllPatientsForAdmin,
  getAllPatientsForUser,
  searchPatientsByText,
} from '../../../store/actions';
import PatientsList from './PatientsList/PatientsList';
import PatientDetailsModal from './PatientDetailsModal/PatientDetailsModal';

const PatientsListPage = props => {
  const dispatch = useDispatch();
  const patientsList = useSelector(state => state.patient.patientList);

  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientViewInfo, setShowPatientViewInfo] = useState(null);

  useEffect(() => {
    getPatientsForUserByRole();
  }, []);

  const getPatientsForUserByRole = () => {
    if (props.userRole === 'user') {
      dispatch(getAllPatientsForUser());
    } else {
      dispatch(getAllPatientsForAdmin());
    }
  };

  return (
    <div className="patients-list-page">
      <DataDisplay
        dataHeader="Popis prošlih pacijenata"
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
                if (props.userRole === 'user') {
                  return getAllPatientsForUser();
                } else {
                  return getAllPatientsForAdmin();
                }
              }}
              fetchDataByName={name => {
                return searchPatientsByText(name);
              }}
              searchingByInfo="*Pretraživanje po Imenu i prezimenu, OIB-u"
            />
          </div>
        }
      />
      <DataDisplay
        TopSpacing={40}
        dataFullWidth
        data={
          <div className="patients-list-page__list__display-list">
            {patientsList && patientsList.length > 0 ? (
              <PatientsList
                patientsList={patientsList}
                setShowPatientViewModal={setShowPatientViewInfo}
                setSelectedPatient={setSelectedPatient}
              />
            ) : (
              <div className="patients-list-page__list__display-list__not-found">
                {searchQuery
                  ? 'Nema pronađenih pacijenata.'
                  : 'Nema unesenih pacijenata.'}
              </div>
            )}
          </div>
        }
      />
      {showPatientViewInfo && (
        <PatientDetailsModal
          userRole={props.userRole}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          setShowPatientViewInfo={setShowPatientViewInfo}
        />
      )}
    </div>
  );
};

PatientsListPage.propTypes = {
  theme: PropTypes.object,
  userRole: PropTypes.string.isRequired,
};

export default PatientsListPage;
